import React from 'react';


export default class OrderView extends React.Component {
        
    render(){
         return (
            <div className='orderView row'>
                <div className='col-md-8'>
                    <b>{this.props.book.name}</b>
                </div>
                <div className='col-md-4'>
                    <button className = 'btn btn-danger' onClick={ () => this.props.removeFromOrder(this.props.book.name)}>Remove to Order</button>
                </div>
            </div>
        );
    }
}

