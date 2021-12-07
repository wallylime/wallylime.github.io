import {
  readFromLS,
  writeToLS
} from "./ls.js";

//variables for use with api url
const baseURL = "https://api.spoonacular.com/recipes/complexSearch?number=24&addRecipeInformation=true&sort=random&type=main course";
const apiKey = "&apiKey=9a3cf066a8854da19ab328252cf0843b";

//variables for getting elements from the DOM
const displayDiv = document.querySelector("#menu-options");

//This is the template for setting up each day of the week's menu planning square
export class PlannerSquare {
	constructor(name) {
		//Grab the radio buttons and attach an event listener to each one
		this.input = document.querySelectorAll(`input[name="${name}-time"]`);
		this.input.forEach(radio => radio.addEventListener("click", event => {
			/*Modify the fetch request based on the user's input.
			If the user selects that they are busy, the recipes that are returned will take less than 30 min. to make.
			If the user says it's a normal day, the recipes that are returned will take less than an hour to make.
			If the user says they have extra time, recipes of any duration will be returned.*/
			if (event.target.value === "busy") {
				const busyReadyTime = "&maxReadyTime=30";
				const busyParagraph = "The following recipes take under 30 minutes to prepare. Scroll through until you find one that sounds good and then click on the recipe's title to add it to your menu plan."
				this.fetchRecipes(busyReadyTime, busyParagraph, name);
			}
			else if (event.target.value === "normal") {
				const normalReadyTime = "&maxReadyTime=60";
				const normalParagraph = "The following recipes take under 60 minutes to prepare. Scroll through until you find one that sounds good and then click on the recipe's title to add it to your menu plan."
				this.fetchRecipes(normalReadyTime, normalParagraph, name);
			}
			else if (event.target.value === "extra-time") {
				const anyReadyTime = "";
				const extraParagraph = "The prep time for the following recipes will vary. Scroll through until you find one that sounds good and then click on the recipe's title to add it to your menu plan."
				this.fetchRecipes(anyReadyTime, extraParagraph, name);
			}
		}));
	}

	fetchRecipes(readyTime, paragraph, name) {
		fetch(baseURL + readyTime + apiKey)
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

		//This  allows the user to add a recipe to their menu plan by clicking on the recipe's title. It also removes the recipe ideas div.
		const recipeNames = document.querySelectorAll(".recipes h4");
		recipeNames.forEach(recipe => recipe.addEventListener("click", event => {
			displayDiv.classList.remove("shown");
			this.addToPlan(event, name);
		}));
	}

	addToPlan(event, name) {
		const radioInputs = document.querySelector(`div.${name}-inputs`);
		radioInputs.classList.add("hide");
		const planningSquare = document.querySelector(`#${name}`);
		planningSquare.innerHTML = 
		 `<a href="${event.target.nextElementSibling.nextElementSibling}" class="recipe-links">${event.target.textContent}</a>
		 <div class="remove">X</div>`;

		 const removeBtns = document.querySelectorAll("div.remove");
		 removeBtns.forEach(button => button.addEventListener("click", () => {
			 planningSquare.classList.add("hide");
			 radioInputs.classList.remove("hide");
		 }
		 ))

	}
}