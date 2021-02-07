const searchBtn = document.getElementById('searchBtn');


//get main meal details
searchBtn.addEventListener('click', () => {
    let mealInput = document.getElementById('meal-name-input').value;
    if(mealInput==="")
    {
        alert("Sorry! Enter your meal name Please!")
    }
    else 
    {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealInput}`)
        .then(res => res.json())
        .then(data => displayMealList(data));
    } 
})


//show main meal details
const displayMealList = data => {
    const mealsName = document.getElementById('mealmaindiv');
    let mealName = " ";
    if (data.meals) {
        data.meals.forEach(meal => {
            mealName = mealName + `
                    <div onclick='mealDetails("${meal.idMeal}")' class = "meal-main-div">
                        <img class="meal-img" src = "${meal.strMealThumb}" alt = "meal">
                        <h3 class="meal-name">${meal.strMeal}</h3>
                    </div>`;
        });
    }
    else {
        mealName = "Sorry, we didn't find it. please enter valid name again";
    }
    mealsName.innerHTML = mealName;
}



//get show ingredientsDetails
const mealDetails = mealId => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(res => res.json())
        .then(data => {
            ingredientsDetails(data.meals[0]);
        })
}



//show ingredientsDetails
const ingredientsDetails = inputMeal => {
    
    const singleMailDetails = document.getElementById("single-meal-details");
    singleMailDetails.innerHTML =  
    `
    <div id="single_meal">
    <div class="single-meal-div fixed">
    <img class="mealDetails-img" src="${inputMeal.strMealThumb}">
    <h1 class="text-danger fw-bold"> ${inputMeal.strMeal}</h1>
    <h3 class="fw-bold text-primary">Ingredients:</h3>
    <li>${inputMeal.strMeasure1} ${inputMeal.strIngredient1}</li>
    <li>${inputMeal.strMeasure2} ${inputMeal.strIngredient2}</li>
    <li>${inputMeal.strMeasure3} ${inputMeal.strIngredient3}</li>
    <li>${inputMeal.strMeasure4} ${inputMeal.strIngredient4}</li>
    <li>${inputMeal.strMeasure5} ${inputMeal.strIngredient5}</li>
    <li>${inputMeal.strMeasure6} ${inputMeal.strIngredient6}</li>
    <li>${inputMeal.strMeasure7} ${inputMeal.strIngredient7}</li>
    <li>${inputMeal.strMeasure8} ${inputMeal.strIngredient8}</li>
    </div>
    </div>`;  
}




