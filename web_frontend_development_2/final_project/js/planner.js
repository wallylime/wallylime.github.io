import {
	readFromLS,
	writeToLS
} from "./ls.js";

//variables for use with api url
const baseURL = "https://api.spoonacular.com/recipes/complexSearch?number=24&addRecipeInformation=true&sort=random"; //One of the options that I've included in this base url is limiting the returned results to 24 because more than that is probably not necessary
const mainCourse = "&type=main course";
const sideDish = "&type=side dish";
const apiKey = "&apiKey=9a3cf066a8854da19ab328252cf0843b";

//this div is what will pop up and show the results of the api request
const displayDiv = document.querySelector("#menu-options");

let plan = [];
//This is the template for setting up each day of the week's menu planning square
export default class PlannerSquare {
	constructor(name) {
		//These are for local storage
		this.key = name;
		plan = this.getList();
		//Radio buttons
		this.input = document.querySelectorAll(`input[name="${name}-time"]`);
		//This is where the selected menu item will show up
		this.recipePlan = document.querySelector(`#${name}`);
		//After the user has added one menu item, this button will show up so that the user can add another menu item
		this.addButton = document.querySelector(`#${name}-add`);
		//Div with all the radio buttons in it
		this.radioInputs = document.querySelector(`div.${name}-inputs`);

		//Add event listener for the radio buttons
		this.input.forEach(radio => radio.addEventListener("click", event => this.evaluate(event.target.value, mainCourse)));

		//Show what's already been saved in local storage if anything is there
		this.showSavedPlan();
	}

	showSavedPlan() {
		this.recipePlan.innerHTML = "";
		//This makes sure that there's actually something in the array
		if (plan.length > 0) {
			this.radioInputs.classList.add("hide");
			plan.forEach(item => this.renderMenuItem(item));
			//attach the listeners to remove a recipe or add more recipes
			this.addPlannedRecipeListeners();
			//display an add button to allow adding more recipes
			this.addButton.classList.remove("hide");
		} else {
			this.radioInputs.classList.remove("hide");
			this.input.forEach(radio => radio.checked = false);
			this.addButton.classList.add("hide");
		}
	}

	renderMenuItem(item) {
		this.recipePlan.innerHTML +=
			`<li id="${item.id}"><a href="${item.link}" class="recipe-links">${item.title}</a><span class="remove">X</span></li>`;
	}

	addPlannedRecipeListeners() {
		const removeButtons = this.recipePlan.querySelectorAll("span.remove");
		removeButtons.forEach(button => button.addEventListener("click", event => {
			let removeItem = plan.findIndex(i => i.id === event.target.parentNode.id);
			plan.splice(removeItem, 1);
			writeToLS(this.key, plan);
			this.showSavedPlan();
		}));

		this.addButton.addEventListener("click", () => {
			this.input.forEach(radio => {
				if (radio.checked) {
					this.evaluate(radio.value, sideDish);
				} else {
					this.evaluate("busy", sideDish); //This is a good default prep time if none of the radio buttons are checked (which is the case when an item is retrieved from ls on a new browser session)
				}
			})
		});
	}

	/*This function allows me to evaluate the user's time needs and modify the fetch request based on their input. It also allows me to change the type of dish requested from main dish to side dish depending on whether the user made the request with the add button or by selecting a radio button. (Radio button for main dish; add button for side dish.)*/
	evaluate(radioButton, course) {
		if (radioButton === "busy") {
			const busyReadyTime = "&maxReadyTime=30";
			const busyParagraph = "These recipes take under 30 minutes to prepare. Scroll through until you find one that sounds good and then click on the recipe's title to add it to your menu plan."
			this.fetchRecipes(busyReadyTime, busyParagraph, course);
		} else if (radioButton === "normal") {
			const normalReadyTime = "&maxReadyTime=60";
			const normalParagraph = "These recipes take under 60 minutes to prepare. Scroll through until you find one that sounds good and then click on the recipe's title to add it to your menu plan."
			this.fetchRecipes(normalReadyTime, normalParagraph, course);
		} else if (radioButton === "extra-time") {
			const anyReadyTime = "";
			const extraParagraph = "These recipes have various prep times. Scroll through until you find one that sounds good and then click on the recipe's title to add it to your menu plan."
			this.fetchRecipes(anyReadyTime, extraParagraph, course);
		}
	}

	fetchRecipes(readyTime, paragraph, course) {
		fetch(baseURL + readyTime + course + apiKey)
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error("Uh-oh! Something went wrong.");
				}
			})
			.then(data => {
				this.displayResults(data, paragraph);
				this.addResultListeners();
			})
			.catch(error => {
				console.log("Error: ", error);
			});
	}

	displayResults(data, paragraph) {
		displayDiv.classList.add("shown");
		displayDiv.innerHTML =
			`<button class="close">X</button> 
		<p>${paragraph}</p>`;
		//I only set the api to return 24 recipes each time which is why I set i < 24 in this loop
		for (let i = 0; i < 24; i++) {
			const recipeName = data.results[i].title;
			const recipeImg = data.results[i].image;
			const recipeSrc = data.results[i].sourceUrl;
			const srcName = data.results[i].sourceName;
			displayDiv.innerHTML +=
				`<div class="recipes">
			<h4 title="click to add to menu plan">${recipeName}</h4>
			<img src=${recipeImg} alt="${recipeName}">
			<a href=${recipeSrc}>See the recipe from ${srcName}</a>
		 </div>`;
		}
	}

	//Adding event listeners to close button and recipe titles
	addResultListeners() {
		//This closes the recipe ideas div (displayDiv)
		const closeButton = document.querySelector("button.close");
		closeButton.addEventListener("click", () => {
			displayDiv.classList.remove("shown");
			/*This if statement is so that I clear the checked radio button if the X is clicked before any recipes are selected.
			If the X is clicked when there's already a recipe in the planner, it won't be cleared. That's because I'm using which radio button was checked for my side dish logic to indicate how much time the side dishes should take. */
			if (this.recipePlan.textContent === "") {
				this.input.forEach(radio => radio.checked = false);
			};
		});

		//This  allows the user to add a recipe to their menu plan by clicking on the recipe's title. It also hides the recipe ideas div.
		const recipeNames = document.querySelectorAll(".recipes h4");
		recipeNames.forEach(recipe => recipe.addEventListener("click", event => {
			displayDiv.classList.remove("shown");
			displayDiv.innerHTML = "";
			this.radioInputs.classList.add("hide");
			this.saveToPlan(event);
			this.showSavedPlan();
		}));
	}

	saveToPlan(event) {
		let timestamp = Date.now();
		const newItem = {
			id: timestamp,
			title: event.target.textContent,
			link: event.target.nextElementSibling.nextElementSibling.getAttribute("href"),
		};
		plan.push(newItem); //add new item to menu plan
		writeToLS(this.key, plan); //save plan to ls
	}

	getList() {
		let ls = readFromLS(this.key);
		return ls === null ? [] : ls;
	}
}