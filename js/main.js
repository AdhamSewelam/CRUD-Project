var productName=document.getElementById("productName");
var productPrice=document.getElementById("productPrice");
var productCategory=document.getElementById("productCategory");
var productDesc=document.getElementById("productDesc");
var submitBtn=document.getElementById("submitBtn");
var inputs=document.getElementsByClassName("form-control");
var searchInput=document.getElementById("search");
var nameAlert=document.getElementById("nameAlert");
var products=[];
var currentIndex=0;


if(JSON.parse(localStorage.getItem("productsList"))!=null)
{
    products=JSON.parse(localStorage.getItem("productsList"));
    displayData()
}

submitBtn.onclick=function(){
    if(submitBtn.innerHTML=="Add Product")
    {
        addProduct();
    }
    else
    {
        updateProduct()
    }
 
   displayData();
   clearForm()
}

function addProduct(){
    var product=
    {
        name:productName.value,
        price:productPrice.value,
        category:productCategory.value,
        description:productDesc.value
    }
    products.push(product);
    localStorage.setItem("productsList",JSON.stringify(products))
}
function displayData(){
    var trs='';
    for(var i=0;i<products.length;i++){
        trs+=`<tr>
                <td>${i+1}</td>
                <td>${products[i].name}</td>
                <td>${products[i].price}</td>
                <td>${products[i].category}</td>
                <td>${products[i].description}</td>
                <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
                <td><button onclick="getProductInfo(${i})" class="btn btn-warning">Update</button></td>
                <td><button onclick="visitProduct()" class="btn btn-primary">Visit</button></td>
             </tr>`
    }
    document.getElementById("tableBody").innerHTML=trs;
}
function clearForm(){
    for(var i=0;i<inputs.length;i++){
        inputs[i].value=""
    }
}
function deleteProduct(index){
    products.splice(index,1);
    displayData();
     localStorage.setItem("productsList",JSON.stringify(products))
}

searchInput.onkeyup=function()
{
    var trs='';
    var val=searchInput.value;
    for(var i=0;i<products.length;i++){
        if(products[i].name.toLowerCase().includes(val.toLowerCase()))   //h==hp
        {
          trs+=
          `<tr>
              <td>${i+1}</td>
              <td>${products[i].name}</td>
              <td>${products[i].price}</td>
              <td>${products[i].category}</td>
              <td>${products[i].description}</td>
              <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
              <td><button onclick="editProduct()" class="btn btn-warning">Update</button></td>
              <td><button onclick="visitProduct()" class="btn btn-primary">Visit</button></td>
          </tr>`
        }
       
    }
    document.getElementById("tableBody").innerHTML=trs
}


function getProductInfo(index){
    productName.value=products[index].name;
    productPrice.value=products[index].price;
    productCategory.value=products[index].category;
    productDesc.value=products[index].description;
    submitBtn.innerHTML="update product";
    currentIndex=index;
}

function updateProduct(){
    var product=
    {
        name:productName.value,
        price:productPrice.value,
        category:productCategory.value,
        description:productDesc.value
    }
    products[currentIndex]=product;
    localStorage.setItem("productsList",JSON.stringify(products))
}











