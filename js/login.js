//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("btn_singin").addEventListener("click", function(){
        let email = document.getElementById("inputEmail").value
        let password = document.getElementById("inputPassword").value
       if(email.length <1){
           alert("Ingrese un Email")
       }
        if(password.length < 1){
           alert("Ingrese una contraseña")
       }
        else{
             localStorage.setItem('username',email);
            window.location.href = "home.html"}
    });

});