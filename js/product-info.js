let productArray = []
let commentsArray = []
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("btn_addComment").addEventListener("click", function(){ 
        let user = localStorage.getItem('username');
        let newcomment = document.getElementById('descripcion').value;
        let date = document.getElementById('btn_addComment').value;
        document.getElementById("comments").innerHTML += `<div class='container'>
    
        <div class="media comment-box">
               <div class="media-left">
                   <a href="#">
                       <img class="img-responsive user-photo" src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png">
                   </a>
                </div>
               <div class="media-body">
                   <h4 class="media-heading"><div class="rating">${scoreToStars(realscore)}</div> ${user} <span class="text-muted" >${date}</span></h4>
                   <p>${newcomment}</p>
                 
               </div>
           </div>
    </div>`
    document.getElementById('descripcion').value =""
    })
    var user = localStorage.getItem('username');
    document.getElementById("username").innerHTML = user;


    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            productArray = resultObj.data
            showProductInfo();
        }
    });
    
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            commentsArray = resultObj.data
            showComments();   
        }
    })

});
//Funciton para mostrar informacion de los productos y su imagenes

function showProductInfo(){
    let ProductInfoToAppend= `
    <div class="container-fluid pl-4 pt-4">
    <div class="row">

    <div class="preview col-md-6">
						
          <div class="preview-pic tab-content">
            <div class="tab-pane active" id="pic-1"><img src="${productArray.images[0]}" /></div>
            <div class="tab-pane" id="pic-2"><img src="${productArray.images[1]}" /></div>
            <div class="tab-pane" id="pic-3"><img src="${productArray.images[2]}" /></div>
            <div class="tab-pane" id="pic-4"><img src="${productArray.images[3]}" /></div>
            <div class="tab-pane" id="pic-5"><img src="${productArray.images[4]}" /></div>
          </div>
          <ul class="preview-thumbnail nav nav-tabs">
            <li class="active"><a data-target="#pic-1" data-toggle="tab"><img src="${productArray.images[0]}" /></a></li>
            <li><a data-target="#pic-2" data-toggle="tab"><img src="${productArray.images[1]}" /></a></li>
            <li><a data-target="#pic-3" data-toggle="tab"><img src="${productArray.images[2]}" /></a></li>
            <li><a data-target="#pic-4" data-toggle="tab"><img src="${productArray.images[3]}" /></a></li>
            <li><a data-target="#pic-5" data-toggle="tab"><img src="${productArray.images[4]}" /></a></li>
          </ul>
          
        </div>
    
    <div class="details col-md-6">
    <h3 class="product-title">${productArray.name}</h3>
    <p class="product-description">${productArray.description}</p>
    <h4 class="price">Precio ${productArray.currency} <span>${productArray.cost}</span></h4>
    <h5 class="sold">Vendidos ${productArray.soldCount}</h5>
    <div class="action">
      <button class="add-to-cart btn btn-default" type="button">add to cart</button>
      <button class="like btn btn-default" type="button"><span class="fa fa-heart"></span></button>
    </div>
  </div>
  </div> 
  </div>
  `
  document.getElementById("productInfo").innerHTML = ProductInfoToAppend;  

}
//Funcion para mostrar Comentarios
function showComments(){
let commentsToAppend=''
for (let i=0; i < commentsArray.length; i++){
    let comment=commentsArray[i]
    commentsToAppend+=`<div class='container'>
    
    <div class="media comment-box">
           <div class="media-left">
               <a href="#">
                   <img class="img-responsive user-photo" src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png">
               </a>
            </div>
           <div class="media-body">
               <h4 class="media-heading"><div class="rating">${scoreToStars(comment.score)}</div> ${comment.user} <span class="text-muted" >${comment.dateTime}</span></h4>
               <p>${comment.description}</p>
             
           </div>
       </div>
</div>`
document.getElementById("comments").innerHTML = commentsToAppend;
}
}
//Transforma el Score en estrellas para los comentarios

function scoreToStars(score){
    let starHtml="";
    for (let i=0;i<score;i++){
        starHtml+=`<i class="rating__star fas fa-star"></i>`
    }
    return starHtml;
}
//Agregar estrellas a los comentarios en base al clic
let realscore=0
const ratingStars = [...document.getElementsByClassName("rating__star")];
function executeRating(stars) {
    const starClassActive = "rating__star fas fa-star";
    const starClassInactive = "rating__star far fa-star";
    const starsLength = stars.length;
    let i;
    stars.map((star) => {
        star.onclick = () => {
          i = stars.indexOf(star);
            realscore=i+1;
          if (star.className===starClassInactive) {
            for (i; i >= 0; --i) stars[i].className = starClassActive;
          } else {
            for (i; i < starsLength; ++i) stars[i].className = starClassInactive;
          }
        };
      });
    }
    executeRating(ratingStars);
    