import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp( {
    apiKey: "AIzaSyCpD2U7fYi57Lnq6jqZDOaP9bl8DPNk7LY",
    authDomain: "clockwork-bookstore-693fc.firebaseapp.com",
    databaseURL: "https://clockwork-bookstore-693fc.firebaseio.com",
    projectId: "clockwork-bookstore-693fc",
    storageBucket: "clockwork-bookstore-693fc.appspot.com",
    messagingSenderId: "691702391217"
  });

  const fbase = Rebase.createClass(firebaseApp.database());

  export {fbase, firebaseApp} ;