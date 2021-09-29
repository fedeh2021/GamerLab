import React, {Component} from "react"
import '../assets/css/app.css';

  class LastProductDb extends Component {

  constructor(){
    super()
    this.state = {
        products: []
    }
}

apiCall(url, consecuencia){
    fetch(url)
    .then(response => response.json())
    .then(data => consecuencia(data))
    .catch(error => console.log(error))
}

componentDidMount(){
    console.log("me monte")
    this.traerApi()
}

traerApi(){
    this.apiCall("http://localhost:3077/products/api", this.mostrarData)
}

mostrarData = (data) => {
    this.setState(
        {
            products: data.products
        }
    )
}
render(){
    console.log(this.state.products)

        let ultimoProducto = this.state.products[this.state.products.length-1]

    console.log(ultimoProducto)

  return (
    <div className="col-lg-6 mb-4">
    <div className="card shadow mb-4">
        <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Last product in Data Base</h6>
        </div>
        <div className="card-body">
            <div className="text-center">

            <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style= {{width: 25 + "rem"}} src= {ultimoProducto} alt="ultimoProducto"/>
            </div>
            <p></p>
            <a target="_blank" rel="nofollow" href="/">View product detail</a>
        </div>
    </div>
  </div>
  );
}
}

export default LastProductDb