import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom'
import './Card.css'
import CardContent from '@material-ui/core/CardContent';
import { Grid, Typography } from "@material-ui/core";



const styles = theme => ({
  card: {
    minWidth: '100%',
  },

  teste: {
    width:90,
    height: 90,
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 50,
    

  }

});

class ContractCard extends React.Component {
  
  state =  {  
    lista : [],
    name_monitoring:'', 
    matter:'',
    id_tutoring:'',
  }
  componentDidMount(){
    console.log(this.props)
  }
  render() {
    const { classes } = this.props;
    var photoUrl = this.props.photo;
    
    if( photoUrl != null ){
      photoUrl = photoUrl.replace("api-monitoria","localhost")
    } else {
      photoUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzaLMnex1QwV83TBQgxLTaoDAQlFswsYy62L3mO4Su-CMkk3jX"
    }

    return (
      <Card className={classes.card} >
        <Link to={`/expandedcard/${this.props.id_tutoring}`}>
        <Grid container alignContent="center" direction="row" >
          <Grid item>
            <Grid container direction="column" alignContent="center" alignItems="center" >
              <Grid item>
                <img className={classes.teste}  src={photoUrl}></img>
              </Grid>
              <Grid item>
                {this.props.monitorName}
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container justify='center'>
              <Grid item> 
                <CardContent>
                  <Typography component="h5" variant="h5">
                  {this.props.name_monitoring}
                  </Typography>
                  <Typography>
                  {this.props.description}
                  </Typography>               
                </CardContent>
                </Grid>
            </Grid>
          </Grid>
        </Grid>
        </Link>
      </Card>
    );
  }
}

ContractCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContractCard);