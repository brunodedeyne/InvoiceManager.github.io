
import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import logoImg from '../../assets/img/logo2.png'
import TextField from "material-ui/TextField";
import * as firebase from 'firebase';
import {withRouter} from 'react-router-dom';

//Import CSS
import './Login.css';

class Login extends Component {   
    constructor (props) {
        super(props);
        this.state = {
            open: true,
            email: '',
            password: ''
        };
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
    this.setState({open: false});
    };

    updateEmail = (e) =>{ 
        this.setState({email: e.target.value});
    }

    updatePassword = (e) =>{ 
        this.setState({password: e.target.value});
    }

    handleSignIn = () => {
        var errorCode = "";
        var errorMessage = "";
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
            // Handle Errors here.
            errorCode = error.code;
            errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                console.log('Incorrect Wachtwoord');
            } else if (errorCode === 'auth/invalid-email') {
                console.log('Incorrect email, Controleer uw email');
            }{
                console.log(errorCode);
            }
        });
        var user = firebase.auth().currentUser;

        if (user) {
            this.props.history.push('/Clients'); 
        } else {
            this.props.history.push('/Login'); 
        }
    }
       
  render() {
    return (
        <section>
            <Dialog
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
                contentStyle={{width: "100%", maxWidth: "390px"}}
                className="section__Modal"
            >
                <div className="section__Box">
                    <img src={logoImg} alt="logo" className="section__Img" />              
                </div>
                <div className="section__Textfields">
                    <TextField
                        name="email"
                        floatingLabelText="Email"
                        onChange={this.updateEmail}
                    /><br/>
                    <TextField
                        name="password"
                        floatingLabelText="Wachtwoord"
                        type="password"
                        onChange={this.updatePassword}
                    /><br/><br/>
                    <RaisedButton 
                        onClick={this.handleSignIn}    
                    >    
                        Inloggen 
                    {/* <Link to={routes.HOME}>Inloggen</Link> */}
                    </RaisedButton>
                </div>
            </Dialog>        
        </section>
    );
  }
}

export default withRouter(Login);