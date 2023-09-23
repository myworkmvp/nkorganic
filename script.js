
//cart
function displaycart(){
    let cart = document.getElementsByClassName("cartdivhide")[0];
    cart.classList.add("cartdiv");
    cart.classList.remove("cartdivhide");
}
function closecart(){
    let cart = document.getElementsByClassName("cartdiv")[0];
    cart.classList.add("cartdivhide");
    cart.classList.remove("cartdiv");
}
//
if(document.readyState ==  'loading'){
    document.addEventListener("DOMContentLoaded",ready);
}
else{
    ready();
}
//ready function
 function ready(){
    var removecardbutton = document.getElementsByClassName('cartrmve') 
    console.log(removecardbutton);
    for(var i=0 ; i < removecardbutton.length; i++){
        var button = removecardbutton[i];
        button.addEventListener('click',removeCartItem)
        updateTotal();
    } 
    var quantityInput = document.getElementsByClassName('qunty');
    for(var i=0 ; i < quantityInput.length; i++){
        var input = quantityInput[i];
        input.addEventListener("change",quantityChanged);
    }
    var addCart = document.getElementsByClassName("card-footer");
    for(var i=0 ; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click",addCartClicked);
    }
 }
 //remove from cart
 function removeCartItem(event){
    var butonClicked = event.target;
    butonClicked.parentElement.remove(); 
    updateTotal(); 
 }

//quantity change
 function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <0){
        input.value = 1;
    }
    updateTotal();
 }
 //add to cart
 function addCartClicked(event){
    var button= event.target;
    var shopProducts = button.parentElement;
    var carimg = shopProducts.parentElement;
    var title =  shopProducts.getElementsByClassName("card-title")[0].innerText;
    var price =  shopProducts.getElementsByClassName("prtprice")[0].innerText;
    var productImg = carimg.getElementsByClassName("cartimg")[0].src;
    addProductToCart(title,price,productImg); 
    updateTotal();
}
function addProductToCart(title,price,productImg){
    var cartShopBox =  document.createElement("div");
    cartShopBox.classList.add("row");
    var cartItems = document.getElementsByClassName("cartbdy")[0];
    var cartItemsNames = cartItems.getElementsByClassName("card-title");
    for(var i=0 ; i < cartItemsNames.length; i++){
        if(cartItemsNames[i].innerText == title){
        alert("you have alredy add this product in cart");
        return ;
        }
    }

var cartBoxContent = `<div class="col-4">
                      <img src="${productImg}" class="card-img-top " alt="..." height="120">
                      </div>
                      <div class="col-6">
                        <h5 class="card-title"><b>${title}</b></h5>
                        <h6>Price :<span class="pricecart">${price}</span></h6>
                        <h6>Quantity : <input type="number" min="0" max="10" value="0" class="qunty"></h6>
                      </div><i class="col-2 cartrmve bi bi-trash-fill"></i></div>
                      </div>`;
cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName("cartrmve")[0].addEventListener('click',removeCartItem);
cartShopBox.getElementsByClassName("qunty")[0].addEventListener('change',quantityChanged);
updateTotal();
}
function updateTotal(){
    var cartContent =document.getElementsByClassName("cartbdy")[0];
    var cartBoxes = cartContent.getElementsByClassName("row");
    var total=0;
    for(var i=0 ; i < cartBoxes.length; i++){
        var cartBox =  cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("pricecart")[0];
        var quantityElement = cartBox.getElementsByClassName("qunty")[0];
        var quantity = quantityElement.value;
        var price=parseFloat(priceElement.innerText);
        total = total + (price * quantity);
        document.getElementsByClassName("totalcart")[0].innerText = total;
    }
}      
          
       