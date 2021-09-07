function validar(){
    var name,description, price,stock, discount,category, expresion;
    name = document.getElementById("name").value;
    description = document.getElementById("description").value;
    price = document.getElementById("price").value;
    stock = document.getElementById("stock").value;
    discount = document.getElementById("discount").value;
    category = document.getElementById("category").value;
    

    if(name === "" || description === "" || price === "" || stock === "" || discount === "" || category === ""){
        alert("todos los campos son obligatorios");
        return false;
    }
    else if(name.length>25){
        alert("el nombre es muy largo");
        return false;
    }
}
