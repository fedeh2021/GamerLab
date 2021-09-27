import '../assets/css/app.css';
import React, {Component} from "react";


class CategoriesDb extends Component {
    constructor(){
        super()
        this.state = {
            categories: []
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
        this.apiCall("http://localhost:3077/products/api/categories", this.mostrarData)

    }
    mostrarData = (data) => {
        this.setState(
            {
                categories: data.categories
            }
        )
    }
    render(){
  return (
            <div className="col-lg-6 mb-4">						
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Categories in Data Base</h6>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-6 mb-4">
                            <div className="card bg-info text-white shadow">
                                <div className="card-body">
                                {
                this.state.categories.map((categorie, i) => {
                    return (
                        <li key={i}>
                            <h3>{categorie.nombre}</h3>
                        </li>
                    )
                })
            }
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mb-4">
                            <div className="card bg-info text-white shadow">
                                <div className="card-body">
                                    Category 02
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mb-4">
                            <div className="card bg-info text-white shadow">
                                <div className="card-body">
                                    Category 03
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mb-4">
                            <div className="card bg-info text-white shadow">
                                <div className="card-body">
                                    Category 04
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mb-4">
                            <div className="card bg-info text-white shadow">
                                <div className="card-body">
                                    Category 05
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mb-4">
                            <div className="card bg-info text-white shadow">
                                <div className="card-body">
                                    Category 06
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );
}
}

export default CategoriesDb;