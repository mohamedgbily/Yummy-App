$('.open').click(function(){
    $('.open').addClass('d-none')
    $('.close').removeClass('d-none')
    $('.nav-side').animate({ width: 230 } ,500).css('display' , 'flex');
    
    

})
   

    //------------
    

$('.close').click(function(){
    $('.open').removeClass('d-none')
    $('.close').addClass('d-none')
    $('.nav-side').animate({ width: 0 } ,500 , function(){
        $('.nav-side').css('display' , 'none')
    });
  
})
//--------------------[loading screen]----------------
$(document).ready(function(){
    $('.loadingScreen').fadeOut(1000 , function(){
      getMeal();
     $('html').css('overflow' , 'auto')
  
    })
});
//---------------------------------get meal--------------------
let mealBox = '';
async function getMeal(){
    const api = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const res = await api.json();
    let x = res.meals;
    console.log(x);
    for (let i = 0; i < x.length; i++) {
        mealBox += ` <div class="col-md-3 " id="${x[i].idMeal}">
        <div class="meal-inner position-relative overflow-hidden rounded-2">
          <img src="${x[i].strMealThumb}" alt="" class="w-100">
          <div class="layer position-absolute p-2  text-danger d-flex align-items-center justify-content-start">
            <h3>${x[i].strMeal}</h3>
          </div>
        </div>
      </div>`
    }
// console.log(mealBox);
// let idMeal = x[i].idMeal;
// let z = $('.col-md-3').addClass('id' , idMeal)
$('.container .detailsMeal').fadeOut();
    document.querySelector('.fpage').innerHTML = mealBox;
  let v = document.querySelectorAll('.fpage .col-md-3');
  for (let i = 0; i < v.length; i++) {
    v[i].addEventListener('click', function(){
        let idMeal= v[i].getAttribute('id')
        console.log(idMeal);
        $('.fpage').hide();
        $('.container .detailsMeal').fadeIn(1000)
        
        getDetailsMeals(idMeal)
    })
   
}
}


getMeal();
$('.container .detailsMeal ,.contactusPage').fadeOut();
//----------------------------------------------------
//-----------------------get details----------------------------
async function getDetailsMeals(idMeal) {
const api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
const response = await api.json();
let result = response.meals
console.log(result[0]);
console.log(result[0].strTags);
document.querySelector('.detailsMeal').innerHTML = `  <div class="col-md-4 text-white ">
<img src="${result[0].strMealThumb}" class="w-100 rounded-2">
<h2>${result[0].strMeal}</h2>
</div>
<div class="col-md-8 text-white">
<h2>Instructions</h2>
<p>${result[0].strInstructions}</p>
<h3><span>Area :</span> ${result[0].strArea}</h3>
<h3><span>Category :</span> ${result[0].strCategory}</h3>
<h3>Recipes :</h3>
<ul class="details-list g-3">
  <li>${result[0].strMeasure1}  ${result[0].strIngredient1}</li>
  <li>${result[0].strMeasure2}  ${result[0].strIngredient2}</li>
  <li>${result[0].strMeasure3}  ${result[0].strIngredient3}</li>
  <li>${result[0].strMeasure4}  ${result[0].strIngredient4}</li>
  <li>${result[0].strMeasure5}  ${result[0].strIngredient5}</li>
  <li>${result[0].strMeasure6}  ${result[0].strIngredient6}</li>
  <li>${result[0].strMeasure7}  ${result[0].strIngredient7}</li>
  <li>${result[0].strMeasure8}  ${result[0].strIngredient8}</li>
  <li>${result[0].strMeasure9}  ${result[0].strIngredient9}</li>
  <li>${result[0].strMeasure10}  ${result[0].strIngredient10}</li>
  <li>${result[0].strMeasure11}  ${result[0].strIngredient11}</li>
  <li>${result[0].strMeasure12}  ${result[0].strIngredient12}</li>
  <li>${result[0].strMeasure13}  ${result[0].strIngredient13}</li>
</ul>
<h3>Tags :</h3>
<ul class="p-0">
<li class=" btn btn-info p-2">${result[0].strTags}</li>
</ul>

<a href="${result[0].strSource}" class="btn btn-success"  target="_blank">Source</a>
<a href="${result[0].strYoutube}" class="btn btn-danger" target="_blank">Youtube</a>

</div>`
    
       
    
}

//-----------------------search --------------------------
$('#search').click(function(){
  $('.searchPagecontent').fadeIn();
  $('.detailsMeal ,.ingredient-meal ,.categories-body ,.area-meal ,.fpage , .detailsMeals ,.contactusPage').fadeOut();
    $('.search-page ').fadeIn();
  $('.open').removeClass('d-none')
  $('.close').addClass('d-none')
  $('.nav-side').animate({ width: 0 } ,500 , function(){
    $('.nav-side').css('display' , 'none')
   
});
})
document.querySelector('.searchByName , .searchByFristLetter').addEventListener('keyup',function(e){
  let key = e.target.value;
console.log(key);
 search(key);
 $('.search-items').fadeIn();
 
})
let searchBox = ''

async function search(key){
  const api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${key}`);
const resApi = await api.json();
let y = resApi.meals;
    console.log(y);
    for (let i = 0; i < y.length; i++) {
        searchBox += ` <div class="col-md-3 " id="${y[i].idMeal}">
        <div class="meal-inner position-relative overflow-hidden rounded-2">
          <img src="${y[i].strMealThumb}" alt="" class="w-100">
          <div class="layer position-absolute p-2  text-danger d-flex align-items-center justify-content-start">
            <h3>${y[i].strMeal}</h3>
          </div>
        </div>
      </div>`
      document.querySelector('.search-row').innerHTML = searchBox;
     
    }
    let v = document.querySelectorAll('.col-md-3');
  for (let i = 0; i < v.length; i++) {
    v[i].addEventListener('click', function(){
        let idMeal= v[i].getAttribute('id')
        console.log(idMeal);
        $('.fpage').hide();
        $('.container .detailsMeal').fadeIn(1000)
        $('.search-page ,.search-row').fadeOut();
        getDetailsMeals(idMeal)
       
          
    })}
     
}
//--------------------------------------------------------
//-------------category page------------------------

$('#Category').click(function(){
  getCategoryMeal();
  $('.fpage , .detailsMeals , .searchPagecontent ,.ingredient-meal ,.contactusPage').fadeOut();
  $('.open').removeClass('d-none')
  $('.close').addClass('d-none')
  $('.nav-side').animate({ width: 0 } ,500 , function(){
    $('.nav-side').css('display' , 'none')
    $('.categories-body').fadeIn();
    $('.area-meal').fadeOut()
 
  console.log('don');
  })
})
let categoryBox = '';
async function getCategoryMeal(){
  const api = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
  const relative = await api.json();
  let y = relative.categories;
  console.log(y);
  for (let i = 0; i < y.length; i++) {
    categoryBox += ` <div class="col-md-3 " id="${y[i].strCategory}">
    <div class="meal-inner position-relative overflow-hidden rounded-2">
      <img src="${y[i].strCategoryThumb}" alt="" class="w-100">
      <div class="layer position-absolute p-2   text-center ">
        <h3 class="text-danger" >${y[i].strCategory}</h3>
        <p class="text-black">${y[i].strCategoryDescription}</p>
      </div>
    </div>
  </div>`}

console.log(document.querySelector('.categories-body'));
// let idMeal = x[i].idMeal;
// let z = $('.col-md-3').addClass('id' , idMeal)
$('.container .detailsMeal').fadeOut();
document.querySelector('.categories-body').innerHTML = categoryBox;
let v = document.querySelectorAll('.col-md-3');
for (let i = 0; i < v.length; i++) {
v[i].addEventListener('click', function(){
    let idCategory = v[i].getAttribute('id');
    console.log(idCategory);
    // $('.fpage').hide();
    // $('.container .detailsMeal').fadeIn(1000)
    
    getMealByCategoryId(idCategory)
})

}
}
//----------------------[get meals by categoroy id]----------------------------------
let mealByIDBox = '';
async function getMealByCategoryId(idCategory) {
  const api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${idCategory}`);
  const respo = await api.json();
  let w = respo.meals;
  console.log(w);
  for (let i = 0; i < w.length; i++) {
    mealByIDBox += ` <div class="col-md-3 " id="${w[i].idMeal}">
    <div class="meal-inner position-relative overflow-hidden rounded-2">
      <img src="${w[i].strMealThumb}" alt="" class="w-100">
      <div class="layer position-absolute p-2   text-center ">
        <h3 class="text-danger" >${w[i].strMeal}</h3>
      </div>
    </div>
  </div>`}
  console.log(document.querySelector('.categories-body'));
// let idMeal = x[i].idMeal;
// let z = $('.col-md-3').addClass('id' , idMeal)
$('.container .detailsMeal').fadeOut();
document.querySelector('.categories-body').innerHTML = mealByIDBox;

let v = document.querySelectorAll('.col-md-3');
for (let i = 0; i < v.length; i++) {
v[i].addEventListener('click', function(){
    let idMeal= v[i].getAttribute('id')
    console.log(idMeal);
    $('.fpage').hide();
    $('.container .detailsMeal').fadeIn(1000)
    
    getDetailsMeals(idMeal)
    $('.categories-body ,.search-page ').fadeOut();
})
}
}


//-----------------------------function get meal by area-----------------------

$('#area').click(function(){
  $('.fpage , .detailsMeals , .ingredient-meal, .searchPagecontent ,.contactusPage').fadeOut();
  $('.open').removeClass('d-none')
  $('.close').addClass('d-none')
  $('.nav-side').animate({ width: 0 } ,500 , function(){
    $('.nav-side').css('display' , 'none')
    $('.area-meal').fadeIn()
   
});
  
  $('.categories-body ,.container .detailsMeal, .fpage').fadeOut()
  getAreaMeals();
})


  let areaBox = '';
async function getAreaMeals() {
  const api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
  const respo = await api.json();
  let w = respo.meals;
  console.log(w);
  for (let i = 0; i < w.length; i++) {
    
   areaBox += `<div class="col-md-3 " id="${w[i].strArea}">
    <i class="fa-solid fa-house-laptop fa-4x"></i>
    <h3>${w[i].strArea}</h3>
  </div>`

  
  }
  document.querySelector('.area-meal').innerHTML = areaBox;
  let v = document.querySelectorAll('.area-meal .col-md-3');
for (let i = 0; i < v.length; i++) {
v[i].addEventListener('click', function(){
    let areaName = v[i].getAttribute('id');
    console.log(areaName);
    $('.categories-body').fadeIn();
    $('.area-meal').fadeOut()
    filterByArea(areaName);
    getDetailsMeals(idMeal)
})

}

}
let areaNameBox =''
async function filterByArea(areaName) {
  const api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`);
  const respo = await api.json();
  let w = respo.meals;
  console.log(w);
  for (let i = 0; i < w.length; i++) {
    areaNameBox += ` <div class="col-md-3 " id="${w[i].idMeal}">
    <div class="meal-inner position-relative overflow-hidden rounded-2">
      <img src="${w[i].strMealThumb}" alt="" class="w-100">
      <div class="layer position-absolute p-2   text-center ">
        <h3 class="text-danger" >${w[i].strMeal}</h3>
      </div>
    </div>
  </div>`}
  console.log(document.querySelector('.categories-body'));
// let idMeal = x[i].idMeal;
// let z = $('.col-md-3').addClass('id' , idMeal)
$('.container .detailsMeal').fadeOut();
document.querySelector('.categories-body').innerHTML = areaNameBox;
let v = document.querySelectorAll('.col-md-3');
for (let i = 0; i < v.length; i++) {
v[i].addEventListener('click', function(){
    let idMeal= v[i].getAttribute('id')
    console.log(idMeal);
    $('.fpage').hide();
    $('.container .detailsMeal').fadeIn(1000)
    $('.area-meal').fadeOut()
    getDetailsMeals(idMeal)
    $('.categories-body').fadeOut();
  })

}}

$('.searchPagecontent , .categories-body ,.area-meal').fadeOut();
///---------------------function get meal ingrediant-------------------
$('#ingredient').click(function(){
  $('.fpage , .detailsMeals ,.searchPagecontent ,.area-meal ,.contactusPage').fadeOut();
  $('.open').removeClass('d-none')
  $('.close').addClass('d-none')
  $('.nav-side').animate({ width: 0 } ,500 , function(){
    $('.nav-side').css('display' , 'none')
    $('.ingredient-meal').fadeIn()
   
});
  
  $('.categories-body ,.container .detailsMeal, .fpage').fadeOut()
  getIngrediantMeals();
})
let a = "ahmedmohamed"
 console.log(a.substring(0,5));

  let ingrediantmealBox = '';
async function getIngrediantMeals() {
  const api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
  const respo = await api.json();
  let w = respo.meals;
  console.log(w);
  for (let i = 0; i < w.length; i++) {
  //  console.log(w[i].strDescription.substring(0,100));
  if (w[i].strDescription != null ) {
    ingrediantmealBox += `<div class="col-md-3 text-center" id="${w[i].strIngredient}">
    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
    <h3>${w[i].strIngredient}</h3>
    <p>${(w[i].strDescription).substring(0,125)}</p>
   </div>`
  }
 

  
  }
  document.querySelector('.ingredient-meal').innerHTML = ingrediantmealBox;
  let v = document.querySelectorAll('.ingredient-meal .col-md-3');
for (let i = 0; i < v.length; i++) {
v[i].addEventListener('click', function(){
    let idIngredient = v[i].getAttribute('id');
    console.log(idIngredient);
    $('.categories-body').fadeIn();
    $('.area-meal').fadeOut()
     $('.ingredient-meal').fadeOut()
     filterByingrediant(idIngredient);
  
})

}

}
let ingrediantBox =''
async function filterByingrediant(idIngredient) {
  const api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${idIngredient}`);
  const ingredResponse = await api.json();
  let z = ingredResponse.meals;
  console.log(z);
  for (let i = 0; i < z.length; i++) {
    ingrediantBox += ` <div class="col-md-3 " id="${z[i].idMeal}">
    <div class="meal-inner position-relative overflow-hidden rounded-2">
      <img src="${z[i].strMealThumb}" alt="" class="w-100">
      <div class="layer position-absolute p-2   text-center ">
        <h3 class="text-danger" >${z[i].strMeal}</h3>
      </div>
    </div>
  </div>`}
  console.log(document.querySelector('.categories-body'));
// let idMeal = x[i].idMeal;
// let z = $('.col-md-3').addClass('id' , idMeal)
$('.container .detailsMeal').fadeOut();
document.querySelector('.categories-body').innerHTML = ingrediantBox;
let v = document.querySelectorAll('.col-md-3');
for (let i = 0; i < v.length; i++) {
v[i].addEventListener('click', function(){
    let idMeal= v[i].getAttribute('id')
    console.log(idMeal);
    $('.fpage').hide();
    $('.container .detailsMeal').fadeIn(1000)
    $('.area-meal').fadeOut()
    getDetailsMeals(idMeal)
    $('.categories-body').fadeOut();
  })

}
}



//-------------------------------------------[function contact us link]--------------------
let nameInput = document.querySelector('.nameInput')
let emailInput = document.querySelector('.emailInput')
let passwordInput = document.querySelector('.passwordInput')
let ageInput = document.querySelector('.ageInput')
let repasswordInput = document.querySelector('.repasswordInput')
let phoneInput = document.querySelector('.phoneInput')
function validateName(){
  var nameRegex = /^([a-z]|[A-Z]){1,8}$/;
  nameRegex.test(nameInput.value);
  return nameRegex.test(nameInput.value);
}
function validateEmail(){
  var nameRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  nameRegex.test(emailInput.value);
  return nameRegex.test(emailInput.value);
}
function validatePass(){
  var nameRegex = /^[a-zA-Z0-9!@#$%^&*]{8,12}$/;
  nameRegex.test(passwordInput.value);
  return nameRegex.test(passwordInput.value);
}
function validateRePass(){
  var nameRegex = /^[a-zA-Z0-9!@#$%^&*]{8,12}$/;
  nameRegex.test(repasswordInput.value);
  return nameRegex.test(repasswordInput.value);
}
function validateAge(){
  var nameRegex = /^(1[0-9]|[2-9]\d)$/;
  nameRegex.test(ageInput.value);
  return nameRegex.test(ageInput.value);
}
function validatePhone(){
  var nameRegex = /^01[0-2,5]{1}[0-9]{8}$/;
  nameRegex.test(phoneInput.value);
  return nameRegex.test(phoneInput.value);
}
//-----------

//---------------contacts us clicked fun-------------------
$('#contacts').click(function(){
  $('.contactusPage').fadeIn();
  $('.fpage , .detailsMeals ,.searchPagecontent ,.area-meal ,.categories-body').fadeOut();
  $('.open').removeClass('d-none')
  $('.close').addClass('d-none')
  $('.nav-side').animate({ width: 0 } ,500 , function(){
    $('.nav-side').css('display' , 'none')})
})
//--------------btn condition------------------------------
$('.col-md-6 input').keyup(function(){
  if( validateName() && validateEmail() && validateAge() && validatePhone() && validatePass() && validateRePass() && passwordInput.value == repasswordInput.value ){
    console.log($('#submitBtn'));
   $('#submitBtn').removeAttr('disabled')
   }
   else{
    $('#submitBtn').attr('disabled','disabled')
   }
})
 

//--------------------
$('.nameInput').keyup(function(){
  console.log(this.value);
  if(validateName()){
  console.log('ok');
  $(this).siblings().addClass('d-none')

  }
  else{
    $(this).siblings().removeClass('d-none')
  }
})
$('.emailInput').keyup(function(){
  console.log(this.value);
  if(validateEmail()){
  console.log('ok');
  $(this).siblings().addClass('d-none')

  }
  else{
    $(this).siblings().removeClass('d-none')
  }
})
$('.ageInput').keyup(function(){
  console.log(this.value);
  if(validateAge()){
  console.log('ok');
  $(this).siblings().addClass('d-none')

  }
  else{
    $(this).siblings().removeClass('d-none')
  }
})
$('.phoneInput').keyup(function(){
  console.log(this.value);
  if(validatePhone()){
  console.log('ok');
  $(this).siblings().addClass('d-none')

  }
  else{
    $(this).siblings().removeClass('d-none')
  }
})
$('.passwordInput').keyup(function(){
  console.log(this.value);
  if(validatePass()){
  console.log('ok');
  $(this).siblings().addClass('d-none')

  }
  else{
    $(this).siblings().removeClass('d-none')
  }
})
$('.repasswordInput').keyup(function(){
  console.log(this.value);
  if(validateRePass() && passwordInput.value == repasswordInput.value){
  console.log('ok');
  $(this).siblings().addClass('d-none')

  }
  else{
    $(this).siblings().removeClass('d-none')
  }
})
