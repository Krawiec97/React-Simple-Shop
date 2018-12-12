import React from 'react';
//import AdminPanel from './AdminPanel';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';

import '../index.css';


class App extends React.Component{
    constructor() {
        super();
        this.state = {
            order: []
        }
    } 

    addToOrder = (book) => { // pobieramy starą listę zamówień, kopiujemy ją oraz dodać nową ksążkę która przyszła jako parametr
        this.setState({
            order : [...this.state.order, book] // kopia tablicy i dodatkowo book
        })
    }

    removeFromOrder = (title) => {
        this.setState({
            order : this.state.order.filter( book => title !== book.name)
        })
    }

    render(){
            return(
                <div className = 'app container'>
                    <Header />  
                    <div className = "row">
                        <Order order = {this.state.order} removeFromOrder={this.removeFromOrder} />  
                        <Inventory addToOrder={this.addToOrder}/> 
                    </div>     
                </div> 
            );
    }
}


export default App;