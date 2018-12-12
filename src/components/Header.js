import React from 'react';
import {Link} from 'react-router-dom';

class Header extends React.Component{
    constructor(){
        super();
        this.state = {
            bookstoreName : "BlackBooks",
            clicked : true,
            textColor : 'white',
            backgroundColor : 'black' 
        }
    }    
        handleClick = () => {
           
            if(this.state.clicked) {
                this.setState({
                    bookstoreName: 'WhiteBooks',
                    textColor : 'white',
                    backgroundColor : 'black'
                })  
            } else {
                this.setState({
                    bookstoreName: "BlackBooks",
                    textColor : 'white',
                    backgroundColor : 'black'
                })
            }
        
            this.setState({
                clicked : !this.state.clicked
            })
        }
    
    render(){

let headerCss = {
    color : this.state.textColor,
    backgroundColor : this.state.backgroundColor
}

            return(
                <div className = 'row header' style = {headerCss}>
                    <div className = 'col-md-10' >
                        <center> <h1>Witaj w sklepie próbnym</h1> </center>
                {/* <button onClick={this.handleClick}><h3>Click!</h3></button>
            \       <center><i>{this.state.bookstoreName}</i></center>  */}
                    </div>
                     <div className = 'col-md-10'></div>
                        <Link to="/admin"><button className='btn btn-info  goToAdmin'>Panel Admina</button></Link>
                    </div>
            );
        }
}

export default Header;
