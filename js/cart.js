//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const CART_2_ITEMS = "https://japdevdep.github.io/ecommerce-api/cart/654.json"
var cart = {};

function toPesos(currency,unitCost){
    if(currency === "USD"){
        newCost = unitCost * 40
        return newCost
} else return unitCost   
}

function calcSubtotal(unitCost, i){
    let cantidad = parseInt(document.getElementById(`cantidad${i}`).value)
    let currencyContainer = document.getElementById(`currency${i}`)
    let currency = currencyContainer.getAttribute("value")
    let cost = toPesos(currency, unitCost) * cantidad
    document.getElementById(`cost${i}`).innerHTML = cost
    calcTotal();

}

function calcTotal(){
    let total = 0
    let subs = document.getElementsByClassName("subtotal");
    
    for (let i = 0; i < subs.length; i++) {
        total += parseInt(subs[i].innerHTML)
       
    } 
    document.getElementById("subs").innerHTML = total
   cart = {
       subtotalParcial: total
   }

}

function showcartProducts(array) {
let contenido = ""
for (let i = 0; i < array.length; i++) {
    
    let product = array[i];
    
    let unitTotalPrice =  toPesos(product.currency,product.unitCost) * product.count

    contenido += `
    <div  class="col-11">
    <div class="row">
    <div class="col"><img src="${product.src}" alt="imagen" style="width:100%" ></div>
    <div class="col">${product.name}
    <div class="row" id="currency${i}" value="${product.currency}">Precio unitario ${product.currency} ${product.unitCost}</div>
    </div>
    <div class="col">Cantidad <input min="1" type="number" style="width: 60px;" onchange="calcSubtotal(${product.unitCost}, ${i})" id="cantidad${i}" value="${product.count}">
    </div>
    <div class="col">Precio UYU  <span class="subtotal" id="cost${i}">${unitTotalPrice}</span></div>
  </div>
  </div>
  <hr>

   `
    
  document.getElementById("shop-cart").innerHTML = contenido;
  
}
calcTotal();
}
$(".radioShipping").change(function(){
   
    let radios = document.getElementsByClassName("radioShipping");
    let value
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].type === "radio" && radios[i].checked){
            value = radios[i].value
        }
    }
let totalPlusShipping = cart.subtotalParcial
totalPlusShipping += totalPlusShipping * value

document.getElementById("subs").innerHTML = totalPlusShipping

})






document.addEventListener("DOMContentLoaded", function(e){
   
    getJSONData(CART_2_ITEMS).then(function(resultObj){
        if (resultObj.status === "ok"){
           cartProducts = resultObj.data.articles
          showcartProducts(cartProducts)
          
        }
    })
});