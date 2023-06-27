// Cache DOM elements
const title = document.getElementById('title');
const price = document.getElementById('price');
const taxes = document.getElementById('taxes');
const ads = document.getElementById('ads');
const discount = document.getElementById('discount');
const total = document.getElementById('total');
const count = document.getElementById('count');
const category = document.getElementById('category');
const submit = document.getElementById('submit');
const tbody = document.getElementById('tbody');
const search = document.getElementById('search');
const deleteAllBtn = document.getElementById('deleteAll');

// Variables
let mood = 'create';
let tmp;
let newPro = localStorage.product ? JSON.parse(localStorage.product) : [];

// Calculate total price
function getTotal() {
  if (price.value !== '') {
    const result = (+price.value + +taxes.value + +ads.value) - +discount.value;
    total.textContent = result;
    total.style.background = '#040';
  } else {
    total.textContent = '';
    total.style.background = '#a00d02';
  }
}

// Create or update product
function submitHandler() {
  const dataPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.textContent,
    count: count.value,
    category: category.value.toLowerCase()
  };

  if (mood === 'create') {
    const itemCount = dataPro.count > 1 ? dataPro.count : 1;
    for (let i = 0; i < itemCount; i++) {
      newPro.push(dataPro);
    }
  } else {
    newPro[tmp] = dataPro;
    mood = 'create';
    submit.textContent = 'Create';
    count.style.display = 'block';
  }

  localStorage.setItem('product', JSON.stringify(newPro));
  clearData();
  showData();
}

// Clear inputs
function clearData() {
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  total.textContent = '';
  count.value = '';
  category.value = '';
}

// Read data
function showData() {
  getTotal();

  let table = '';
  for (let i = 0; i < newPro.length; i++) {
    const product = newPro[i];
    table += `
      <tr>
        <td>${i}</td>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td>${product.taxes}</td>
        <td>${product.ads}</td>
        <td>${product.discount}</td>
        <td>${product.total}</td>
        <td>${product.category}</td>
        <td><button onclick="updateData(${i})" id='update'>Update</button></td>
        <td><button onclick="deleteData(${i})" id='delete'>Delete</button></td>
      </tr>
    `;
  }

  tbody.innerHTML = table;

  if (newPro.length > 0) {
    deleteAllBtn.innerHTML = `
      <button onclick="deleteAll()">Delete All (${newPro.length})</button>
    `;
  } else {
    deleteAllBtn.innerHTML = '';
  }
}

// Delete a product
function deleteData(i) {
  newPro.splice(i, 1);
  localStorage.product = JSON.stringify(newPro);
  showData();
}

// Delete all products
function deleteAll() {
  localStorage.clear();
  newPro.length = 0;
  showData();
}

// Update a product
function updateData(i) {
  const product = newPro[i];
  title.value = product.title;
  price.value = product.price;
  taxes.value = product.taxes;
  ads.value = product.ads;
  discount.value = product.discount;
  getTotal();
  count.style.display = 'none';
  category.value = product.category;
  submit.textContent = 'Update';
  mood = 'update';
  tmp = i;
  scroll({
    top: 0,
    behavior: 'smooth'
  })
}

// Search by title or category
function searchData(value) {
  const searchMood = search.dataset.mood;
  const filteredProducts = newPro.filter((product) => {
    if (searchMood === 'title') {
      return product.title.includes(value.toLowerCase());
    } else {
      return product.category.includes(value.toLowerCase());
    }
  });

  let table = '';
  for (let i = 0; i < filteredProducts.length; i++) {
    const product = filteredProducts[i];
    table += `
      <tr>
        <td>${i}</td>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td>${product.taxes}</td>
        <td>${product.ads}</td>
        <td>${product.discount}</td>
        <td>${product.total}</td>
        <td>${product.category}</td>
        <td><button onclick="updateData(${i})" id='update'>Update</button></td>
        <td><button onclick="deleteData(${i})" id='delete'>Delete</button></td>
      </tr>
    `;
  }

  tbody.innerHTML = table;
}

// Event Listeners
submit.addEventListener('click', submitHandler);
search.addEventListener('keyup', () => searchData(search.value));
document.getElementById('searchTitle').addEventListener('click', () => {
  search.dataset.mood = 'title';
  search.placeholder = 'Search By Title';
});
document.getElementById('searchCategory').addEventListener('click', () => {
  search.dataset.mood = 'category';
  search.placeholder = 'Search by Category';
});

// Initial function calls
showData();





// let title = document.getElementById('title');
// let price = document.getElementById('price');
// let taxes = document.getElementById('taxes');
// let ads = document.getElementById('ads');
// let discount = document.getElementById('discount');
// let total = document.getElementById('total');
// let count = document.getElementById('count');
// let category = document.getElementById('category');
// let submit = document.getElementById('submit');

// let mood = 'create';
// let tmp;


// // calculate total price
// function getTotal() {
//     if (price.value != ''){
//         let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
//         total.innerHTML = result;
//         total.style.background = '#040'
//     } else {
//         total.innerHTML = '';
//         total.style.background = '#a00d02';
//     }
// }


// // create product
// let newPro;
// if (localStorage.product != null) {
//     newPro = JSON.parse(localStorage.product);
// } else {
//     newPro = []
// }


// submit.onclick = function() {
//     let dataPro = {
//         title: title.value.toLowerCase(),
//         price: price.value,
//         taxes: taxes.value,
//         ads: ads.value,
//         discount: discount.value,
//         total: total.innerHTML,
//         count: count.value,
//         category: category.value.toLowerCase()
//     }
//     if (mood === 'create') {
//         if (dataPro.count>1){
//         for ( i=0; i<dataPro.count; i++) {
//             newPro.push(dataPro)}
//     } else {
//         newPro.push(dataPro);
//     }} else {
//         newPro[tmp] = dataPro;
//         mood = 'create';
//         submit.innerHTML = 'create';
//         count.style.display = 'block';
//     }
    

//     // save to local storage
//     localStorage.setItem('product', JSON.stringify(newPro));
//     clearData();
//     showData();
// }


// // clear inputs
// function clearData(){
//     title.value = '';
//     price.value = '';
//     taxes.value = '';
//     ads.value = '';
//     discount.value= '';
//     total.innerHTML = '';
//     count.value = '';
//     category.value = '';
// }

// // read data
// function showData(){
//     getTotal()

//     let table = '';
//     for(let i=0; i<newPro.length; i++){
//         table += `
//         <tr>
//             <td>${i}</td>
//             <td>${newPro[i].title}</td>
//             <td>${newPro[i].price}</td>
//             <td>${newPro[i].taxes}</td>
//             <td>${newPro[i].ads}</td>
//             <td>${newPro[i].discount}</td>
//             <td>${newPro[i].total}</td>
//             <td>${newPro[i].category}</td>
//             <td><button onclick="updateData(${i})" id='update'>update</button></td>
//             <td><button onclick='deleteData(${i})' id='delete'>delete</button></td>
//         </tr>
//         `
// }
// document.getElementById('tbody').innerHTML = table; 

// let deleteAllBtn = document.getElementById('deleteAll');
//     if (newPro.length>0){
//         deleteAllBtn.innerHTML = `
//         <button onclick="deleteAll()">delete all (${newPro.length })</button>
//         `
//     } else {
//         deleteAllBtn.innerHTML = '';
//     }
// }
// showData();

// // delete
// function deleteData(i) {
//     newPro.splice(i,1)
//     localStorage.product = JSON.stringify(newPro);
//     showData();
// }

// function deleteAll() {
//     localStorage.clear();
//     newPro.splice(0);
//     showData();
// }

// // count

// // update
// function updateData(i) {
//     title.value = newPro[i].title;
//     price.value = newPro[i].price;
//     taxes.value = newPro[i].taxes;
//     ads.value = newPro[i].ads;
//     discount.value = newPro[i].discount;
//     getTotal();
//     count.style.display = 'none';
//     category.value = newPro[i].category;
//     submit.innerHTML = 'update';
//     mood = 'update';
//     tmp = i;
// }



// // search
// let searchMood = 'title';

// function getSearchMood(id){
//     let search = document.getElementById('search');
//     if (id == 'searchTitle'){
//         searchMood = 'title';
//         search.placeholder = 'Search By Title';
//     } else {
//         searchMood = 'category';
//         search.placeholder = 'Search by Category';
//     }
//     search.focus();
//     search.value = '';
//     showData();
// }

// function searchData(value){
//     let table = '';
//     if (searchMood == 'title'){
//         for (i=0; i<newPro.length; i++) {
//             if(newPro[i].title.includes(value.toLowerCase())){
//                 table += `
//                     <tr>
//                         <td>${i}</td>
//                         <td>${newPro[i].title}</td>
//                         <td>${newPro[i].price}</td>
//                         <td>${newPro[i].taxes}</td>
//                         <td>${newPro[i].ads}</td>
//                         <td>${newPro[i].discount}</td>
//                         <td>${newPro[i].total}</td>
//                         <td>${newPro[i].category}</td>
//                         <td><button onclick="updateData(${i})" id='update'>update</button></td>
//                         <td><button onclick='deleteData(${i})' id='delete'>delete</button></td>
//                     </tr>
//         `
//             } else {}
            
    
//         }
//     } else {
//         for (i=0; i<newPro.length; i++) {
//             if(newPro[i].category.includes(value.toLowerCase())){
//                 table += `
//                     <tr>
//                         <td>${i}</td>
//                         <td>${newPro[i].title}</td>
//                         <td>${newPro[i].price}</td>
//                         <td>${newPro[i].taxes}</td>
//                         <td>${newPro[i].ads}</td>
//                         <td>${newPro[i].discount}</td>
//                         <td>${newPro[i].total}</td>
//                         <td>${newPro[i].category}</td>
//                         <td><button onclick="updateData(${i})" id='update'>update</button></td>
//                         <td><button onclick='deleteData(${i})' id='delete'>delete</button></td>
//                     </tr>
//         `
//             } else {}
            
    
//         }
//     }
//     document.getElementById('tbody').innerHTML = table;
// }

// // clean data
