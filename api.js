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
    singleMailDetails.style.display="block";
    document.getElementById("mealmaindiv").style.display="none";
    singleMailDetails.innerHTML =  
    `
    <button onclick="mainPage()" class="btn btn-danger">Back</button>
    <div id="single_meal">
    <img class="mealDetails-img shadow" src="${inputMeal.strMealThumb}">
    <h1 class="text-danger fw-bold mt-3"> ${inputMeal.strMeal}</h1>
    <h3 class="fw-bold text-primary mt-4">Ingredients</h3>
    <li><i class="fas fa-check-square text-warning mx-2"></i>${inputMeal.strMeasure1} ${inputMeal.strIngredient1}</li>
    <li><i class="fas fa-check-square text-warning mx-2"></i>${inputMeal.strMeasure2} ${inputMeal.strIngredient2}</li>
    <li><i class="fas fa-check-square text-warning mx-2"></i>${inputMeal.strMeasure3} ${inputMeal.strIngredient3}</li>
    <li><i class="fas fa-check-square text-warning mx-2"></i>${inputMeal.strMeasure4} ${inputMeal.strIngredient4}</li>
    <li><i class="fas fa-check-square text-warning mx-2"></i>${inputMeal.strMeasure5} ${inputMeal.strIngredient5}</li>
    <li><i class="fas fa-check-square text-warning mx-2"></i>${inputMeal.strMeasure6} ${inputMeal.strIngredient6}</li>
    <li><i class="fas fa-check-square text-warning mx-2"></i>${inputMeal.strMeasure7} ${inputMeal.strIngredient7}</li>
    <li><i class="fas fa-check-square text-warning mx-2"></i>${inputMeal.strMeasure8} ${inputMeal.strIngredient8}</li> 
    </div>`;  
}


const mainPage = ()=>{
    document.getElementById("single-meal-details").style.display="none";
    document.getElementById("mealmaindiv").style.display="grid";
}




