import React, { Component } from 'react';
import { Grid, Button, TextField } from '@material-ui/core' ;
import logo from '../../Assets/img/Logo.png';
import './SignUp.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';
import {Link} from 'react-router-dom';
import firebase from 'firebase';
import Course from '../EditProfile/Course'
import axios from 'axios';

const theme = createMuiTheme({
  palette: {
    primary: { main: lightBlue[50] },
    secondary: { main: '#11cb5f' },
  },
  typography: { useNextVariants: true },
});


class SignUp extends Component {
  state = {
    email: '',
    password: '',
    name: '',
    isAuthenticated: false,
    course: '',
    photo: null,
  };
  
  register = async () => {
    const { email, password } = this.state;  
    var aux = {}

    await firebase.auth()
      .createUserWithEmailAndPassword(email, password).then((user)=>{
        firebase.auth().currentUser.getIdToken().then(function(idToken) {  
          aux = { 'token': idToken }        
      });
    });
    
    const fd = new FormData();
    fd.append('access_token', aux['token'])
    fd.append('name', this.state.name)
    fd.append('course', this.state.course)
    fd.append('photo', this.state.photo)

    const header = { headers: { 'content-type': 'multipart/form-data' } }

    await axios.post(process.env.REACT_APP_GATEWAY+"/create_user/", fd, header).then(res =>{
      console.log(res)
    })
  }
  
  render() {
    return (
      <div className="SignUpBackground" style={{overflowY:'scroll'}}>
        <Grid style={{paddingLeft:10}}>
          <Grid container alignContent="center" justify="center" direction="column" alignItems="center" spacing={8}>
            <img src={logo} alt="Logo" width="120" height="120"/>
          </Grid>
          <Grid container alignContent="center" justify="center" direction="column" alignItems="center" spacing={24}>
            <Grid item >
              <TextField 
              id="nomeTextField"
              label="Nome"
              margin="normal"
              onChange={(event)=>this.setState({
                name: event.target.value,
              })}
              />
            </Grid>
            <Grid item >
              <TextField
                id="emailTextField"
                label="Email"
                margin="normal"
                type="email"
                onChange={(event)=>this.setState({
                  email: event.target.value,
                })}
                />
            </Grid>
            <Grid item >
              <TextField
                id="telegramTextField"
                label="Telegram"
                margin="normal"
                placeholder="@"
                type="text"
                onChange={(event)=>this.setState({
                  telegram: event.target.value,
                })}
                />
            </Grid>
            <Grid item>
                <Course action={(course)=>{this.setState({course})}}/>
            </Grid>
                    
            <Grid item >
              <TextField
                id="senhaTextField"
                label="Senha"
                margin="normal"
                type="password"
                onChange={(event)=>this.setState({
                  password: event.target.value,
                })}
              
                />
            </Grid>
            <Grid item >
              <TextField
                id="repetirSenhaTextField"
                label="Repetir senha"
                margin="normal"
                type="password"
                />
            </Grid>
            <Grid item>              
              <input 
                accept="image/*" 
                id="raised-button-file" 
                multiple 
                type="file" 
                onChange={(event)=>this.setState({
                  photo: event.target.files[0],
                })}
                
              /> 
              <label htmlFor="raised-button-file"> 
              <MuiThemeProvider theme={theme}>
                <Button raised component="span" variant="outlined" color="primary" > 
                  Escolher foto 
                </Button> 
              </MuiThemeProvider>
              </label>  
            </Grid>

            </Grid>
            <Grid container alignContent="center" justify="center" direction="row" spacing={24} alignItems="center" style={{marginTop: 25}}>
              <Grid item >
                <MuiThemeProvider theme={theme}>
                  <Button component={Link} to="/" variant="outlined" onClick={this.register} color="primary">
                  Registrar
                  </Button>
                </MuiThemeProvider>
              </Grid>
              <Grid item>
                <MuiThemeProvider theme={theme}>
                  <Button component={Link} to="/" variant="outlined" color="primary" >
                    Cancelar
                  </Button>
                </MuiThemeProvider>
              </Grid>
        
            </Grid>
          </Grid>
            
        </div>
    );   
  }
}

export default SignUp;