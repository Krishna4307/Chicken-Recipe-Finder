
let api1="https://www.themealdb.com/api/json/v1/1/categories.php";
let api2="https://www.themealdb.com/api/json/v1/1/search.php?s=chicken";
            
let Container=document.getElementById("container");
let itemsDiv=document.getElementById("items-div");
let searchInput=document.getElementById("search-input");
let favItemsSection=document.getElementById("fav-items-section");
let favItemsContainer=document.getElementById("fav-items-container");
let mealsDiv=document.getElementById("meals-div-container");



// =============================================================================================
//                         Getting Data From API
// =============================================================================================


async function getRecipies() {
    let res=await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=chicken");
    let data=await res.json();
    console.log(data);
    let meals=data.meals;
    renderAllRecipies(meals)
}
let getstoredRecipies=JSON.parse(localStorage.getItem("storedRecipies"));

// let storedFavMeals=localStorage.setItem("storedFavMeal",JSON.stringify(favItemsArr));
// let getstoredFavMeals=JSON.parse(localStorage.getItem("storedFavMeal"));

// ===========================================================================================
//                     Displaying All Meals
// ===========================================================================================

function renderAllRecipies(mealsArr){
    let storedRecipies=localStorage.setItem("storedRecipies",JSON.stringify(mealsArr));
    let getstoredRecipies=JSON.parse(localStorage.getItem("storedRecipies"));
    
    mealsArr.map((meal)=>{
        mealsDiv.innerHTML+=`
            <div class="meal-div">
                <img src="${meal.strMealThumb}" alt=${meal.strMeal} width="150px" height="150px"/>
                <h3>${meal.strMeal}</h3>
                <p>Category : <span class="category">${meal.strCategory}</span></p>
                <p>Place: <span class="country">${meal.strCountry}</span></p>
                <button onClick="HandleFavuoritesMeals(${meal.idMeal})" class="fav-btn">Add to Favorites </button>
                <button onClick="HandleDetails(${meal.idMeal})" class="details-btn">Show Full Details</button>
            </div>
        `;
    })

}


// =====================================================================================
//                         Searching  Meal Section
// ======================================================================================
searchInput.addEventListener("input",()=>{
    let mealsDivContainer=document.getElementById("meals-div-container");
    let getstoredRecipies=JSON.parse(localStorage.getItem("storedRecipies"));
    let filterSearchedResults=getstoredRecipies.filter((meal)=>{
        return (
            meal.strMeal.trim().toLowerCase().includes(searchInput.value) || 
            meal.strCountry.trim().toLowerCase().includes(searchInput.value)
        );
    })
    if(filterSearchedResults.length>0){
        mealsDivContainer.innerHTML="";
        renderAllRecipies(filterSearchedResults);
    }
    else{
        alert("No Recepies Found")
    }
    
});


        // ===========================================================================
        //             Storing Fav Meals in Local Storage
        // ==========================================================================

let favItemsArr = JSON.parse(localStorage.getItem("storedFavMeal")) || [];
function HandleFavuoritesMeals(id){
    let filterFavItem=getstoredRecipies.find((item)=>{
        return item.idMeal === String(id);
    })
    favItemsArr.push(filterFavItem);
    localStorage.setItem("storedFavMeal",JSON.stringify(favItemsArr));
    favItemsContainer.innerHTML="";
    renderFavMeals(favItemsArr);
}

// let getstoredFavMeals=JSON.parse(localStorage.getItem("storedFavMeal"));

        // =============================================================================
        //                 Displaying Fav Meals
        // =============================================================================

function renderFavMeals(favmeals){
    if (!favmeals || favmeals.length === 0) {
        let nofavItemsMsg = document.createElement("h2");
        nofavItemsMsg.className = "not-added-msg";
        nofavItemsMsg.textContent = "No Favorite Meals Added";
        favItemsContainer.append(nofavItemsMsg);
        return;
    }
    else{
        favmeals.forEach((item)=>{
            favItemsContainer.innerHTML+=`
                <div class="fav-item-div">
                    <img src="${item.strMealThumb}" alt=${item.strMeal} width="150px" height="150px"/>
                    <h3>${item.strMeal}</h3>
                    <p>Category : <span class="category">${item.strCategory}</span></p>
                    <p>Natvie Place: <span class="country">${item.strCountry}</span></p>
                    <button onClick="HandleRemoveFavuoritesMeals(${item.idMeal})" class="fav-btn">Remove</button>
                    <button onClick="HandleDetails(${item.idMeal})" class="details-btn">Show Full Details</button>            
                </div>
            `;
        })
    }
}

        // =======================================================================
        //             Removing Fav Meals From Fav meals Arr
        // =======================================================================

function HandleRemoveFavuoritesMeals(id){
    favItemsArr=favItemsArr.filter((item)=>{
        return item.idMeal!==String(id);
    })
    favItemsContainer.innerHTML="";
    renderFavMeals(favItemsArr);
}

            // ======================================================================
            //             Get Full Details Section
            // ======================================================================

            
function HandleDetails(id){
    let getstoredRecipies=JSON.parse(localStorage.getItem("storedRecipies"));
    let findItem=getstoredRecipies.filter((item)=>{
        return item.idMeal ===String(id);
    });
    if(findItem.length>0){
        Container.innerHTML="";
        Container.setAttribute("class","details-section-container");
        Container.removeAttribute("id","container")
        findItem.map((item)=>{
            Container.innerHTML=`
            <div class="details-div">
                    <img src="${item.strMealThumb}"/>
                    <h1>${item.strMeal}</h1>
                    <h3>Native Place: ${item.strCountry}</h3>
                    <strong>Ingredients & Measurements</strong>
                    <ol type="number">
                        <span class="ingredient"><li>${item.strIngredient1}</span> - <span class="measurement">${item.strMeasure1}</span></li>
                        <span class="ingredient"><li>${item.strIngredient2}</span> - <span class="measurement">${item.strMeasure2}</span></li>
                        <span class="ingredient"><li>${item.strIngredient3}</span> - <span class="measurement">${item.strMeasure3}</span></li>
                        <span class="ingredient"><li>${item.strIngredient4}</span> - <span class="measurement">${item.strMeasure4}</span></li>
                        <span class="ingredient"><li>${item.strIngredient5}</span> - <span class="measurement">${item.strMeasure5}</span></li>
                        <span class="ingredient"><li>${item.strIngredient6}</span> - <span class="measurement">${item.strMeasure6}</span></li>
                        <span class="ingredient"><li>${item.strIngredient7}</span> - <span class="measurement">${item.strMeasure7}</span></li>
                        <span class="ingredient"><li>${item.strIngredient8}</span> - <span class="measurement">${item.strMeasure8}</span></li>
                        <span class="ingredient"><li>${item.strIngredient9}</span> - <span class="measurement">${item.strMeasure9}</span></li>
                        <span class="ingredient"><li>${item.strIngredient10}</span> - <span class="measurement">${item.strMeasure10}</span></li>
                        <span class="ingredient"><li>${item.strIngredient11}</span> - <span class="measurement">${item.strMeasure11}</span></li>
                        <span class="ingredient"><li>${item.strIngredient12}</span> - <span class="measurement">${item.strMeasure12}</span></li>
                        <span class="ingredient"><li>${item.strIngredient13}</span> - <span class="measurement">${item.strMeasure13}</span></li>
                        <span class="ingredient"><li>${item.strIngredient14}</span> - <span class="measurement">${item.strMeasure14}</span></li>
                        <span class="ingredient"><li>${item.strIngredient15}</span> - <span class="measurement">${item.strMeasure15}</span></li>
                        <span class="ingredient"><li>${item.strIngredient16}</span> - <span class="measurement">${item.strMeasure16}</span></li>
                        <span class="ingredient"><li>${item.strIngredient17}</span> - <span class="measurement">${item.strMeasure17}</span></li>
                        <span class="ingredient"><li>${item.strIngredient18}</span> - <span class="measurement">${item.strMeasure18}</span></li>
                        <span class="ingredient"><li>${item.strIngredient19}</span> - <span class="measurement">${item.strMeasure19}</span></li>
                        <span class="ingredient"><li>${item.strIngredient20}</span> - <span class="measurement">${item.strMeasure20}</span></li>
                    </ol>
                    <p id="instructions-tag"><span class="instructions">Instructions</span> : ${item.strInstructions}</p>
                    <label>Click Here to Watch 👉🏼<a href=${item.strYoutube} target="_blank"/>Watch Now</a></label>
            </div>
        `;
        })
    }
}

renderFavMeals(favItemsArr);
getRecipies();
