let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let tbody = document.getElementById("tbody");

let mood = "create";
let tmpI;
// == Get Total == //

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}

// == Create Product == //

// Save Data  In Local Sorage ( Always )
let dataPro;
if (localStorage.product != null) {
  // convert Array to String
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

submit.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (title.value != ""
   && price.value != "" 
   && category.value != ""
   && newPro.count < 1000) {
    // Add Object In Array * count
    if (mood === "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[tmpI] = newPro;
      mood = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
    }
  // clearInputs
  clearData();

  }
  // convert Array to String And Set Data In Local Storage
  localStorage.setItem("product", JSON.stringify(dataPro));
  //   console.log(newPro);

  // clearInputs
  // clearData();
  // Add Data In Page
  showData();
};

// == Clear Inputs == //
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// == Read == //
function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `
<tr>
<td>${i+1}</td>
<td>${dataPro[i].title}</td>
<td>${dataPro[i].price}</td>
<td>${dataPro[i].taxes}</td>
<td>${dataPro[i].ads}</td>
<td>${dataPro[i].discount}</td>
<td>${dataPro[i].total}</td>
<td>${dataPro[i].category}</td>
<td><button id="update" onclick="updateData(${i})">Update</button></td>
<td><button id="delete" onclick=" deleteData( ${i} )">Delete</button></td>
</tr>
`;
  }
  tbody.innerHTML = table;
  // == Delete All == //
  let btnDeleteAll = document.getElementById("delete-all");
  if (dataPro.length > 0) {
    btnDeleteAll.innerHTML = `
<button id="btnDel" onclick='deleteAllData()'> Delete All ( ${dataPro.length} )</button>`;
  } else {
    btnDeleteAll.innerHTML = "";
  }
}
showData();

// == Delete Data == //

function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}

// == Delete All == //
function deleteAllData() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}

// == update == //
function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = dataPro[i].category;
  submit.innerHTML = "Update";
  mood = "update";
  tmpI = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
// == Search == //
let searchMood = "title";
function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    searchMood = "Title";
    // search.placeholder = "Search By Title";
  } else {
    searchMood = "Category";
    // search.placeholder = "Search By Category";
  }
  search.placeholder = "Search By " + searchMood;

  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    if (searchMood == "Title") {
      if (dataPro[i].title.includes(value.toLowerCase())) {
        table += `
      <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button id="update" onclick="updateData(${i})">Update</button></td>
        <td><button id="delete" onclick=" deleteData( ${i} )">Delete</button></td>
      </tr>
      `;
      }
    } else {
      if (dataPro[i].category.includes(value.toLowerCase())) {
        table += `
      <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button id="update" onclick="updateData(${i})">Update</button></td>
        <td><button id="delete" onclick=" deleteData( ${i} )">Delete</button></td>
      </tr>
      `;
      }
    }
  }
  tbody.innerHTML = table;
}
