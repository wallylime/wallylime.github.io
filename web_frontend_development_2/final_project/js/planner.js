//variables for use with api url
const baseURL = "https://api.spoonacular.com/recipes/complexSearch?number=24&addRecipeInformation=true&sort=random&type=main course";
const apiKey = "&apiKey=9a3cf066a8854da19ab328252cf0843b";

//This is the template for setting up each day of the week's menu planning square
export class PlannerSquare {
	constructor(name) {
		this.square = document.querySelector(`div#${name}`);
		//Grab the radio buttons and attach an event listener to each one
		this.input = document.querySelectorAll(`input[name="${name}-time"]`);
		this.input.forEach(radio => radio.addEventListener("click", event => {
			/*Modify the fetch request based on the user's input.
			If the user selects that they are busy, the recipes that are returned will take less than 30 min. to make.
			If the user says it's a normal day, the recipes that are returned will take less than an hour to make.
			If the user says they have extra time, recipes of any duration will be returned.*/
			if (event.target.value === "busy") {
				const busyReadyTime = "&maxReadyTime=30";
				const busyParagraph = "The following recipes take under 30 minutes to prepare. Scroll through until you find one that sounds good and then click on the title or image to add it to your menu plan."
				this.fetchRecipes(busyReadyTime, busyParagraph);
			}
			else if (event.target.value === "normal") {
				const normalReadyTime = "&maxReadyTime=60";
				const normalParagraph = "The following recipes take under 60 minutes to prepare. Scroll through until you find one that sounds good and then click on the title or image to add it to your menu plan."
				this.fetchRecipes(normalReadyTime, normalParagraph);
			}
			else if (event.target.value === "extra-time") {
				const anyReadyTime = "";
				const extraParagraph = "The prep time for the following recipes will vary. Scroll through until you find one that sounds good and then click on the title or image to add it to your menu plan."
				this.fetchRecipes(anyReadyTime, extraParagraph);
			}
		}));
	}

	fetchRecipes(readyTime, paragraph) {
		fetch(baseURL + readyTime + apiKey)
		.then(response => response.json())
		.then(data =>	{
			this.displayResults(data, paragraph);
			this.addRecipeListeners();
		});
}

	displayResults(data, paragraph) {
		const displayDiv = document.querySelector("#menu-options");
		displayDiv.classList.add("shown");
		displayDiv.innerHTML += 
		`<p>${paragraph}</p>`;
		for (let i=0; i < 24; i++) {
			const recipeName = data.results[i].title;
			const recipeImg = data.results[i].image;
			const recipeSrc = data.results[i].sourceUrl;
			const srcName = data.results[i].sourceName;
			displayDiv.innerHTML +=
			`<div class="recipes">
			<h4>${recipeName}</h4>
			<img src=${recipeImg} alt="${recipeName}">
			<a href=${recipeSrc}>See the recipe from ${srcName}</a>
		 </div>`;
		}
	}

	//Adding event listeners to recipe titles and images so that if a user clicks on one, it can be added to the meal plan
	addRecipeListeners() {
		const recipeNames = document.querySelectorAll(".recipes h4");
		recipeNames.forEach(recipe => recipe.addEventListener("click", this.addToPlan));
		const recipeImgs = document.querySelectorAll(".recipes img");
		recipeImgs.forEach(img => img.addEventListener("click", this.addToPlan));
	}

	addToPlan(event) {
		console.log(this.square);
	}
}