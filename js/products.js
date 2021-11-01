const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
var currentSortCriteria = undefined;
var currentProductsArray = [];
var minCost = undefined;
var maxCost = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = a.soldCount;
            let bCount = b.soldCount;

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showProductsList();
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            productsArray = resultObj.data
            sortAndShowProducts(ORDER_BY_PROD_COUNT, productsArray);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";
    
        minCost = undefined;
        maxCost = undefined;
        showProductsList();
    
    });
    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCost = document.getElementById("rangeFilterCountMin").value;
        maxCost = document.getElementById("rangeFilterCountMax").value;
    
        showProductsList();
    });

   
    
});


function showProductsList (){
            
    let htmlContentToAppend = "";
    for(let i = 0; i < productsArray.length; i++){
        let product = productsArray[i];

        if (((minCost == undefined) || (minCost != undefined && product.cost >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && product.cost <= maxCost))){
            //     `
            //     <a href="product-info.html" class="list-group-item list-group-item-action">
            //     <div class="row">
            //         <div class="col-3">
            //             <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
            //         </div>
            //         <div class="col">
            //             <div class="d-flex w-100 justify-content-between">
            //                 <h4 class="mb-1">`+ product.name +`</h4>
            //                 <small class="text-muted">` + product.soldCount + ` artículos vendidos</small>
            //             </div>
            //             <p class="mb-1">` + product.description + `</p>
            //             <br>
            //             <p class="mb-1">Precio `+ product.currency + ` ` + product.cost + `</p>
            //         </div>
            //     </div>
            // </a>
            // `

            htmlContentToAppend +=  ` <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
              <img class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail" src="` + product.imgSrc + `">
              <div class="card-body">
              <b class="card-text">`+ product.name +`</b>
                <p class="card-text">` + product.description + `</p>
                <p class="mb-1">Precio `+ product.currency + ` ` + product.cost + `</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button type="button" class="btn btn-sm btn-outline-secondary" onclick="window.location.href='product-info.html'" >View</button>
                    
                  </div>
                  <small class="text-muted">` + product.soldCount + ` articulos vendidos</small>
                </div>
              </div>
            </div>
          </div>`


        }
    }

        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;

}



