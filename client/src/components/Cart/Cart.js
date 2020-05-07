import React, { Component } from "react";
import Title from "../Title";
import CartColumns from "./CartColumns";
import CartList from "./CartList";
import CartTotals from "./CartTotals";
import { ProductProvider, ProductConsumer } from "../../context";
import { withRouter } from 'react-router-dom';
import EmptyCart from "./EmptyCart";
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import Axios from 'axios';

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

class Store extends Component {

  constructor(props) {
    super(props);
    this.state = {
        snackbaropen: false,
        snackbarmsg: ''
    };
    
}

  async validateUserSession(event) {
    console.log("In validateUserSession");
    try {
      const response = await Axios.get('/cart/cartOperation', {params: {email: "kiran@gmail.com", password: "123456"}});
      const {data} = await Axios.get('/cart/cartOperation', {params: {email: "kiran@gmail.com", password: "123456"}});
      console.log("this is here");
      console.log("data is :"+data);
      console.log("response is : "+response.data);
      if(response.data === "valid")
        return true;
      else
        return false;

  }
  catch(error){
    console.log(error);
    return false;
  }
  }

  snackbarClose = (event) => {
    this.setState({snackbaropen:false});
}

async componentDidMount() {  
    try {
      const valid = await this.validateUserSession();  // it will wait here untill function finishes
      if(!valid){
        console.log("invalid");
        this.setState({snackbaropen:true, snackbarmsg:"Please login to access your cart"});
        sleep(1000).then(() => { this.props.history.push('/'); }); 
      }
      
    } catch(err) {}
}


  render() {
    return (
      <section>
        <ProductConsumer>
          {value => {
            const { cart } = value;
            if (cart.length > 0) {
              return (
                <React.Fragment>
                  <Title name="your" title="cart" />
                  <CartColumns />
                  <CartList value={value} />
                  <CartTotals value={value} history={this.props.history} />
                </React.Fragment>
              );
            } else {
              return <EmptyCart />;
            }
          }}
        </ProductConsumer>
        <Snackbar anchorOrigin={{vertical:'bottom', horizontal:'center'}} open={this.state.snackbaropen} autoHideDuration = {2000} onClose={this.snackbarClose}
                    message={this.state.snackbarmsg} action={[
                        <IconButton key='close' arial-label='Close' color='inherit' onClick={this.snackbarClose}>
                            X
                        </IconButton>
                        ]}/>
      </section>
    );
  }
}


export default withRouter(Store);