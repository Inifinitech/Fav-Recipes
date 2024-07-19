//call the variables
const title = document.getElementById('title');
const poster = document.getElementById('poster');
const ingredientInfo = document.getElementById('ingredientInfo');
const recipeInfo = document.getElementById('recipeInfo');
const summary = document.getElementById('summary');
const submit = document.getElementById('submit');
const search = document.getElementById('search');

const addTitle = document.getElementById('title2');
const addPoster = document.getElementById('poster2');
const addSummary = document.getElementById('summary2');
const addSubmit = document.getElementById('submitRecip');

const trends = document.getElementById('trends');
const title3 = document.getElementById('title3');
const poster3 = document.getElementById('poster3');
const list3 = document.getElementById('list3');
const ul3 = document.getElementById('ul3');
const summary3 = document.getElementById('summary3');

const addedRecipes = document.getElementById('addedRecipes');
// const showTitle = document.getElementById('showTitle')
// const showPoster = document.getElementById('showPoster');
// const deleteSpace = document.getElementById('deleteSpace');
// const showSummary = document.getElementById('showSummary');
const p = document.getElementById('list');
const ul = document.getElementById('ul');
const h1 = document.createElement('h1');
h1.textContent = '#KENYA No1 Trusted web By restaurant owners';


title.style.marginTop = '15vh';
//function to search a recipe
const foodCom = (query) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then((resp) => resp.json())
    .then((result) => {
        const recipee = result.meals;
        if(recipee.length > 0) {

            const recipeData = recipee[0];

            if(recipeData) {
                title.textContent = recipeData.strMeal;
                poster.textContent = '';
                const img = document.createElement('img');
                img.src = recipeData.strMealThumb;
                img.alt = 'recipe';
                poster.appendChild(img);
                const pInfo = document.createElement('p');
                pInfo.textContent = ''
                pInfo.textContent = 'Ingredients';
                ingredientInfo.appendChild(pInfo);
        
                const p2Info = document.createElement('p');
                p2Info.textContent = ''
                p2Info.textContent = 'Recipe';
                
                const li = document.createElement('li');
                const li2 = document.createElement('li');
                const li3 = document.createElement('li');
                const li4 = document.createElement('li');
                const li5 = document.createElement('li');
                const li6 = document.createElement('li');
                const li7 = document.createElement('li');
                const li8 = document.createElement('li');
                const li9 = document.createElement('li');
    
                li.textContent = recipeData.strIngredient1;
                li2.textContent = recipeData.strIngredient2;
                li3.textContent = recipeData.strIngredient3;
                li4.textContent = recipeData.strIngredient4;
                li5.textContent = recipeData.strIngredient5;
                li6.textContent = recipeData.strIngredient6;
                li7.textContent = recipeData.strIngredient7;
                li8.textContent = recipeData.strIngredient8;
                li9.textContent = recipeData.strIngredient9;
                p2Info.textContent = 'Recipe';
                ul.appendChild(li);
                ul.appendChild(li2);
                ul.appendChild(li3);
                ul.appendChild(li4);
                ul.appendChild(li5);
                ul.appendChild(li6);
                ul.appendChild(li7);
                ul.appendChild(li8);
                ul.appendChild(li9);

                const directions = document.createElement('ol');
                const bysteps = recipeData.strInstructions.split('\n');
                bysteps.forEach(byStep => {
                    if(byStep.trim() !== ''){
                    const direction = document.createElement('li');
                    direction.textContent = '';
                    direction.textContent = byStep.trim();
                    directions.appendChild(direction);
                    }
            })
            summary.appendChild(directions)
        }else {
            title.textContent = 'No recipe found';
            poster.textContent = '';
            summary.textContent = '';
        }
    }else {
        title.textContent = 'No result found';
        poster.textContent = '';
        summary.textContent = '';
    }
})
    .catch((error) => {
        alert('Could not find Meal: ' + error);
    });
};

submit.addEventListener('click', (e) => {
    e.preventDefault();
    const query = search.value;
    search.value = '';
    if (query) {
    foodCom(query);
    }else {
        alert('Enter a recipe to search')
    }
});
//event listener to trigger enter key to be same as click
search.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        const query = search.value;
        if (query) {
            foodCom(query);
        }else {
            alert('Enter a recipe to search')
        }
    }
})
//function to add recipe to the list/favourites
const ownRecipe = async () => {
    const title = addTitle.value.trim();
    const image = addPoster.value.trim();
    const summary = addSummary.value.trim();


//function to post the added recipe to the server
    if(title && image && summary) {
        try {
        const response = await fetch("http://localhost:3000/results", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({title, image, summary})
        });
    
//message to show when recipe is not added 
        if(!response.ok) {
            alert('Could not add recipe!')
            return;
        }
        alert('Recipe added successfully');

//clear the input fields
addTitle.value = '';
addPoster.value = '';
addSummary.value = '';
    }catch (error) {
        alert('Error!' + error)
    }
}else {
    alert('Please enter all fields to add a new Recipe!')
}
};
//fuction to add recipe to the dom
const domAddedRecipe = () => {
//getting the added recipe info
        fetch("http://localhost:3000/results")
        .then((resp) => resp.json())
        .then((dataa) => {
            addedRecipes.textContent = '';
            dataa.forEach(data => {
//display the added on the dom
//create a div to hold the items
        const newRecipeItem = document.createElement('div');
        newRecipeItem.classList.add('recipeItem')
        const showTitle = document.createElement('h2')
        showTitle.textContent = data.title;
        newRecipeItem.appendChild(showTitle);
        
        const img = document.createElement('img');
        img.src = data.image;
        img.alt = 'addedImage';
        newRecipeItem.appendChild(img);
        
        const directions = document.createElement('ol')
        directions.classList.add('directions');
        const bySteps = data.summary.split('\n');
        
        bySteps.forEach(byStep => {
            if(byStep.trim() !== '') {
                const direction = document.createElement('li');
                direction.textContent = byStep.trim();
                directions.appendChild(direction);
            }
        });
        newRecipeItem.appendChild(directions);
//deleting a recipe from the server
            const deleteRecipe = document.createElement('button');
            deleteRecipe.textContent = '';
            deleteRecipe.textContent = 'Delete Permanently';
            newRecipeItem.appendChild(deleteRecipe);
    //target delete button to remove the recipe
            deleteRecipe.addEventListener('click', async () => {
                const response = await fetch(`http://localhost:3000/results/${data.id}`, {
                    method: 'DELETE'
                });
                if(response.ok){
                    alert('Are you sure you want to continue with this action? This action is permanent');
                newRecipeItem.remove();
                }else {
                    alert('Could not delete recipe');
                }
            });
            addedRecipes.appendChild(newRecipeItem);
        })
        .catch((error) => {
            alert('Could not fetch recipes: ' + error)
        });
    })
 };

addSubmit.addEventListener('click', async (event) => {
    event.preventDefault();
    await ownRecipe();
    domAddedRecipe();
});

document.addEventListener('DOMContentLoaded', domAddedRecipe)

//function to get trending recipes
document.addEventListener('DOMContentLoaded', () => {
    const latest = () => {
        fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then((resp) => resp.json())
        .then((dataa) => {
            const data = dataa.meals[0];
            title3.textContent = data.strMeal;
            poster3.textContent = '';
            const img3 = document.createElement('img');
            img3.src = data.strMealThumb;
            img3.alt = 'latestRecipe';
            poster3.appendChild(img3);
            const h5 = document.createElement('h5');
            h5.textContent = '';
            h5.textContent = 'Ingredients';
            list3.appendChild(h5)
            const li = document.createElement('li');
            const li2 = document.createElement('li');
            const li3 = document.createElement('li');
            const li4 = document.createElement('li');
            const li5 = document.createElement('li');
            const li6 = document.createElement('li');
            const li7 = document.createElement('li');
            const li8 = document.createElement('li');
            const li9 = document.createElement('li');
            ul3.textContent = '';
            li.textContent = data.strIngredient1;
            li2.textContent = data.strIngredient2;
            li3.textContent = data.strIngredient3;
            li4.textContent = data.strIngredient4;
            li5.textContent = data.strIngredient5;
            li6.textContent = data.strIngredient6;
            li7.textContent = data.strIngredient7;
            li8.textContent = data.strIngredient8;
            li9.textContent = data.strIngredient9;
            ul3.appendChild(li);
            ul3.appendChild(li2);
            ul3.appendChild(li3);
            ul3.appendChild(li4);
            ul3.appendChild(li5);
            ul3.appendChild(li6);
            ul3.appendChild(li7);
            ul3.appendChild(li8);
            ul3.appendChild(li9);
            
        const directions = document.createElement('ol');
        directions.classList.add('directions');
        const bySteps = data.strInstructions.split('\n');
        
        bySteps.forEach(byStep => {
            if(byStep.trim() !== '') {
                const direction = document.createElement('li');
                direction.textContent = byStep.trim();
                directions.appendChild(direction);
            }
        });
        summary3.appendChild(directions);
        })
    }
    latest();
})

