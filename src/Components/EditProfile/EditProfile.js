import React, { Component } from 'react';
import { Grid, Button, TextField } from '@material-ui/core' ;
import AppBar from '../AppBar/AppBar.js';
import Pp from '../../Assets/img/Pp.png';
import Course from './Course.js';
import { Link } from 'react-router-dom';
import { async } from 'q';
import axios from 'axios';
import firebase from 'firebase';
import './EditProfile.css'

class EditProfile extends Component {


    state = {
        name:'',
        course: '',
        telgram: '',
        email: '',
        isSignedin: false
    }

    componentDidMount(){
        this.getUserData();
    }

    getUserData = () =>{
        let userData = {};
        let token = {}
        firebase.auth().onAuthStateChanged(user =>{
            if(user){
                firebase.auth().currentUser.getIdToken().then(function(idToken){
                    token["access_token"] = idToken;
                })
              
                axios.post(process.env.REACT_APP_URL+"/get_user/", token).then(user=>{
                    userData = user.data;
                    this.setState({name:userData["name"],course:userData["course"],email:userData["email"]}) 
                   
                });  
            }     
        })
    }

    editProfile = () =>{
        
        let userData = {};
        let token = {}
        const {name,course,email} = this.state;
        firebase.auth().onAuthStateChanged(user =>{
            if(user){
                firebase.auth().currentUser.getIdToken().then(function(idToken){
                    token["access_token"] = idToken;
                    token["name"] = name;
                    token["course"] = course;
                    token["email"] = email;
                })
              
                axios.post(process.env.REACT_APP_URL+"/update_user/",token);  
            }     
        })
    }
    
  render() {
    return (
        
        <div style={{overflowX:'hidden'}} className="editBackground"> 
            <Grid style={{position: "absolute"}} container justify="center" alignItems="stretch">
                <AppBar/>
            </Grid>   
            <Grid container justify="center" alignContent="center" alignItems="center">
                <Grid item> 
                    <img src={Pp} className="ProfilePic" alt="Profilepic" style={{width: 130,height:130,margin:80,borderRadius:2}} ></img>
                </Grid>
            </Grid>
            <Grid container justify="center" alignContent="center" alignItems="center" direction="column" >
                <Grid item xs={12}> 
                    <TextField
                        id="name"
                        label="Nome"
                        multiline
                        Maxrows="4"
                        margin="normal"
                        defaultValue={this.state.name}
                        onChange={(event)=>this.setState({
                            name: event.target.value,
                        })}
                    />
                </Grid>
                <Grid item> 
                    <TextField
                        id="telegram"
                        label="Telegram"
                        multiline
                        Maxrows="4"
                        placeholder="@"
                        margin="normal"
                        onChange={(event)=>this.setState({
                            telegram: event.target.value,
                        })}
                    />
                </Grid>
                <Grid item style={{padding:30}}>
                    <Course action={(course)=>{this.setState({course})}}/>
                </Grid>
            </Grid>
            <Grid container justify="center" alignContent="center" alignItems="center" direction="row" spacing={24}>
                <Grid item>
                    <Button component={Link} to="/Feed" variant="outlined" onClick={this.editProfile} color="primary">
                        Confirmar
                    </Button>
                </Grid>
                <Grid item>
                    <Button component={Link} to="/Profile" variant="outlined" color="primary">
                        Cancelar
                    </Button>
                </Grid>
            </Grid>
            
        </div>
        
    );   
  }
}

export default EditProfile;
