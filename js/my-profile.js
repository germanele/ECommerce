function saveUserData(username, email, age, phone){
    let userData = {
        username: username,
        email: email,
        age: age,
        phone: phone
    }
    localStorage.setItem("fullUserData", JSON.stringify(userData))
   // console.log(localStorage.getItem("fullUserData"))

}

function showUserData(){
    let userData = JSON.parse(localStorage.getItem("fullUserData"))
    document.getElementById("iptName").value = userData.username
    document.getElementById("iptEmail").value = userData.email
    document.getElementById("iptAge").value = userData.age
    document.getElementById("iptTel").value = userData.phone
}

function checkData(){
    if(localStorage.getItem("fullUserData")){
        showUserData()
    }
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    checkData();


    document.getElementById("modify").addEventListener("click", function(){
        document.getElementById("iptName").removeAttribute("readonly")
        document.getElementById("iptEmail").removeAttribute("readonly")
        document.getElementById("iptAge").removeAttribute("readonly")
        document.getElementById("iptTel").removeAttribute("readonly")
        document.getElementById("modify").setAttribute("hidden","")
        document.getElementById("saveChanges").removeAttribute("hidden")


    })

    document.getElementById("saveChanges").addEventListener("click", function(){
        let username =  document.getElementById("iptName").value
        let email = document.getElementById("iptEmail").value
        let age = document.getElementById("iptAge").value
        let phone = document.getElementById("iptTel").value
        saveUserData(username, email, age, phone)
        
        document.getElementById("saveChanges").setAttribute("hidden","")
        document.getElementById("modify").removeAttribute("hidden")
        document.getElementById("iptName").setAttribute("readonly","")
        document.getElementById("iptEmail").setAttribute("readonly","")
        document.getElementById("iptAge").setAttribute("readonly","")
        document.getElementById("iptTel").setAttribute("readonly","")

        


    })

});