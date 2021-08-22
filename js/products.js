

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    let url = "https://japdevdep.github.io/ecommerce-api/product/all.json"
    fetch(url)
    .then(respuesta => respuesta.json())

    .then(currentProductsArray => {
            
        let htmlContentToAppend = "";
        for(let i = 0; i < currentProductsArray.length; i++){
            let product = currentProductsArray[i];
    
                htmlContentToAppend += `
                <a href="category-info.html" class="list-group-item list-group-item-action">
                    <div class="row">
                        <div class="col-3">
                            <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">`+ product.name +`</h4>
                                <small class="text-muted">` + product.soldCount + ` artículos vendidos</small>
                            </div>
                            <p class="mb-1">` + product.description + `</p>
                            <br>
                            <p class="mb-1">Precio `+ product.currency + ` ` + product.cost + `</p>
                        </div>
                    </div>
                </a>
                `
            }
    
            document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;

    })
    .catch(error => alert("Hubo un error: " + error));

   
});
