import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import {withRouter} from 'react-router-dom';
import { Button,Grid} from '@material-ui/core' ;
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#f9fbe7' },
    secondary: { main: '#f9fbe7' },
  },
  typography: { useNextVariants: true },
});

class SimpleModal extends React.Component {
  state = {
    open: true,
    
  };

  getModalStyle = () => {
    const top = 50;
    const left = 50;

    return {
        position: 'absolute',
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
  }

  handleClose = () => {
    const { router } = this.props;
    
    this.setState({ open: false });
    this.props.history.push(router);
  };

  render() {
    const { title } = this.props;

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-router"
          open={this.state.open}
          onClose={this.handleClose}
          style={{ alignItems:'center',justifyContent:'center' }}
        >
          <div style={this.getModalStyle()} >
          <MuiThemeProvider theme={theme}>
            <Grid container alignContent="center"  justify="center" direction="row" spacing={24} alignItems="center" style={{marginTop: 25}}>
                <Typography variant="h6" align="center" color='primary' id="modal-title">
                  {title}
                </Typography>
            </Grid>
                <Grid container alignContent="center" justify="center" direction="row" spacing={24} alignItems="center" style={{marginTop: 25}}>
                  <Button variant="outlined" onClick={this.handleClose} color="primary">Fechar</Button>
                </Grid>
          </MuiThemeProvider>
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  title: PropTypes.string.isRequired,
  router: PropTypes.string.isRequired,
  
};

export default withRouter(SimpleModal);