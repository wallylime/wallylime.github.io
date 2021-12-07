import {
  readFromLS,
  writeToLS
} from "./ls.js";

//variables for use with api url
const baseURL = "https://api.spoonacular.com/recipes/complexSearch?number=24&addRecipeInformation=true&sort=random";//One of the options that I've included in this base url is limiting the returned results to 24 because more than that is probably not necessary
const mainCourse = "&type=main course";
const sideDish = "&type=side dish";
const apiKey = "&apiKey=9a3cf066a8854da19ab328252cf0843b";

//this div is what will pop up and show the results of the api request
const displayDiv = document.querySelector("#menu-options");

//This is the template for setting up each day of the week's menu planning square
export default class PlannerSquare {
	constructor(name) {
		//Grab the radio buttons and attach an event listener to each one
		this.input = document.querySelectorAll(`input[name="${name}-time"]`);
		this.input.forEach(radio => radio.addEventListener("click", event => this.evaluateAndFetch(event.target.value, name, mainCourse)));
	}

/*This function allows me to evaluate the user's time needs and modify the fetch request based on their input. It also allows me to change the type of dish requested from main dish to side dish depending on whether the user made the request with the add button or by selecting a radio button. */
	evaluateAndFetch(radioButton, name, course) {
		if (radioButton === "busy") {
			const busyReadyTime = "&maxReadyTime=30";
			const busyParagraph = "These recipes take under 30 minutes to prepare. Scroll through until you find one that sounds good and then click on the recipe's title to add it to your menu plan."
			this.fetchRecipes(busyReadyTime, busyParagraph, name, course);
		}
		else if (radioButton === "normal") {
			const normalReadyTime = "&maxReadyTime=60";
			const normalParagraph = "These recipes take under 60 minutes to prepare. Scroll through until you find one that sounds good and then click on the recipe's title to add it to your menu plan."
			this.fetchRecipes(normalReadyTime, normalParagraph, name, course);
		}
		else if (radioButton === "extra-time") {
			const anyReadyTime = "";
			const extraParagraph = "These recipes have various prep times. Scroll through until you find one that sounds good and then click on the recipe's title to add it to your menu plan."
			this.fetchRecipes(anyReadyTime, extraParagraph, name, course);
		}
	}

	fetchRecipes(readyTime, paragraph, name, course) {
		fetch(baseURL + readyTime + course + apiKey)
		.then(response => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error("Uh-oh! Something went wrong.");
			}
		})
		.then(data =>	{
			this.displayResults(data, paragraph);
			this.addListeners(name);
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
		for (let i=0; i < 24; i++) {
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
	addListeners(name) {
		//This allows the user to close the recipe ideas div (displayDiv)
		const closeButton = document.querySelector("button.close");
		closeButton.addEventListener("click", () => displayDiv.classList.remove("shown"));

		//This  allows the user to add a recipe to their menu plan by clicking on the recipe's title. It also hides the recipe ideas div.
		const recipeNames = document.querySelectorAll(".recipes h4");
		recipeNames.forEach(recipe => recipe.addEventListener("click", event => {
			displayDiv.classList.remove("shown");
			this.addToPlan(event, name);
		}));
	}

	addToPlan(event, name) {
		//hide the radio buttons
		const radioInputs = document.querySelector(`div.${name}-inputs`);
		radioInputs.classList.add("hide");
		//add the recipe title as a link
		const recipePlan = document.querySelector(`#${name}`);
		recipePlan.innerHTML += 
		 `<li><a href="${event.target.nextElementSibling.nextElementSibling}" class="recipe-links">${event.target.textContent}</a><span class="remove">X</span></li>`;
		 //display an add button to allow adding more recipes
		 const addButton = document.querySelector(`#${name}-add`);
		 addButton.classList.remove("hide");
		 //attach listeners
		 const recipeXs = document.querySelectorAll("span.remove");
		 recipeXs.forEach(x => x.addEventListener("click", () => {
			 recipePlan.classList.add("hide");
			 addButton.classList.add("hide");
			 radioInputs.classList.remove("hide");
		 }
		 ))
		 addButton.addEventListener("click", () => {
			 const checked = this.input.forEach(radio => 
				{if (radio.checked) {
					this.evaluateAndFetch(radio.value, name, sideDish);
				}
				})
	})
}
}