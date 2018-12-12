import React from 'react';
import {fbase, firebaseApp} from '../fbase';
import BookView from './BookView';

class AdminPanel extends React.Component{
   constructor() {
        super();
        
        this.state = {
            book : {
                name : '',
                author: '',
                description: '',
                onStock: false,
                image: ''
            },
            loggedIn: false,
            email: "",
            password: ""
        };
    };


    handleChange = (event) => {

        let newBook;
        if(event.target.name === 'onStock'){
            newBook = {
                ...this.state.book,
                [event.target.name] : event.target.checked //parametrowi o takiej nazwię przypisze nową rzecz :P dla checkboxa
            }; 
        } else {
             newBook = {
                ...this.state.book,
                [event.target.name] : event.target.value //parametrowi o takiej nazwię przypisze nową rzecz :P
            };
        }

        this.setState({
            book: newBook
        })
    }

    addNewBook = (event) => {
        event.preventDefault(); // sprawia że po kliknięciu w add strona się nie przeładowuje, i dodaje do listy    
    //    let newBooks = [ ...this.state.books ]; // kopia tak się robi, nie referencja
       let newBook = { ...this.state.book }; // rozbije książke na pojedyńcze propertisy i przypiszedo nowego obiektu
     //   this.props.addBook(newBook)

        this.setState({
           // books : [...this.state.books, newBook],
            book : {
               name: "",
               author: "",
               description: "",
               onStock: false,
               image: "",
           }
           
       });

       if(Array.isArray(this.state.books)) {
        this.setState({books: [...this.state.books, newBook]});
     } else {
       this.setState({books: [newBook]})
     }

     
        // event.currentTarget.reset();
    }
    
    componentDidMount(){
        this.ref = fbase.syncState('bookstore/books', {
            context: this,
            state: 'books'
        });
    }

    componentWillUnmount(){
        fbase.removeBinding(this.ref);
    }

    authenticate =(event) => {
        event.preventDefault();
        firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then ( () => {
            this.setState({
                loggedIn: true
                })
        })
        .catch( ()=> {
            console.log('Unable to authenticate');
        })
        this.setState({
        loggedIn: true
        })
    }

    handleLoginChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
            })        
    }

    render() {

        //let bookListing = <h4>No books on stock, sorry</h4>
        if(Array.isArray(this.state.books)) {
           let bookListing = this.state.books.map( book => {
                return <BookView key={book.name} book={book} addToOrder={this.props.addToOrder}/>
            });
        }

        const adminCss = {
            padding: '10px'
        } 

        return(
            <div>
                {!this.state.loggedIn &&
                    <form onSubmit={this.authenticate}>
                        <input type ='text' placeholder='email' id='email' name='email' className='form-control'
                        onChange={this.handleLoginChange} value={this.state.email} />
                        <input type ='password' placeholder='password' id='password' name='password' className='form-control'
                        onChange={this.handleLoginChange} value={this.state.password} />
                        <button type="submit" className="btn btn-primary">Log In</button>
                    </form>
                }
                {this.state.loggedIn &&
            <div className = 'adminPanel col-md-4' style={adminCss}>
                <form onSubmit={this.addNewBook}>
                    <div className="form-group">
                        <input type="text" placeholder = "Book name" id = "name" name = 'name' className = 'form-control' 
                        onChange = {this.handleChange}    value = {this.state.book.name} />
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder = "Book author" id = "author" name = 'author' className = 'form-control' 
                        onChange = {this.handleChange}    value = {this.state.book.author} />
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder = "Book description" id = "description" name = 'description' className = 'form-control' 
                        onChange = {this.handleChange}    value = {this.state.book.description} />
                    </div>                    
                    <div className="form-group">
                        <input type="checkbox" id = "onStock" name = 'onStock' className = 'form-control' 
                        onChange = {this.handleChange}    value = {this.state.book.onStock} />
                        <label for = 'onStock' className = 'form-check-label '>On stock</label>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder = "Book image" id = "image" name = 'image' className = 'form-control' 
                        onChange = {this.handleChange}    value = {this.state.book.image} />
                    </div>
                    <button type='submit' className = 'btn btn-primary'>Add</button>
                </form>
            </div>
                }
            </div>
        ); //return
    } //render
} // clas

export default AdminPanel;