const toggleBtn = document.querySelector(".icono-carrito")
const divList = document.querySelector("#carrito")


toggleBtn.addEventListener("click", ()=>{
    if(divList.style.display == "none"){

        divList.style.display = "block"

    }else{
        divList.style.display = "none"
    }
})