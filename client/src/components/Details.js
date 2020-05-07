import React, { Component } from "react";
import { ProductConsumer } from "../context";
import { ButtonContainer } from "./Button";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

class Details extends Component {

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
      console.log("response is : "+response.data);
      const {data} = await Axios.get('/cart/cartOperation', {params: {email: "kiran@gmail.com", password: "123456"}});
      console.log("this is here");
      console.log("data is :"+data);
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

  render() {
    return (
      <ProductConsumer>
        {value => {
          const {
            id,
            company,
            img,
            info,
            price,
            title,
            inCart,
          } = value.detailProduct;

          return (
            <div className="container py-5">
              {/* title */}
              <div className="row">
                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                  <h1>{title}</h1>
                </div>
              </div>
              {/* end of title */}
              <div className="row">
                <div className="col-10 mx-auto col-md-6 my-3">
                  <img src={img} className="img-fluid" alt="" />
                </div>
                {/* prdoduct info */}
                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                  <h1>model : {title}</h1>
                  <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                    made by : <span className="text-uppercase">{company}</span>
                  </h4>
                  <h4 className="text-blue">
                    <strong>
                      price : <span>$</span>
                      {price}
                    </strong>
                  </h4>
                  <p className="text-capitalize font-weight-bold mt-3 mb-0">
                    some info about product :
                  </p>
                  <p className="text-muted lead">{info}</p>
                  {/* buttons */}
                  <div>
                    <Link to="/products">
                      <ButtonContainer>back to products</ButtonContainer>
                    </Link>
                    <ButtonContainer
                      cart
                      disabled={inCart ? true : false}
                      onClick={async() => {
                        const valid = await this.validateUserSession();
                        console.log("valid is : "+valid);
                        if(valid){
                          console.log("valid");
                          value.addToCart(id);
                          value.openModal(id);
                        }
                        else{
                          console.log("invalid");
                          this.setState({snackbaropen:true, snackbarmsg:"Please login before adding to cart"});
                          sleep(1000).then(() => { this.props.history.push('/'); }); 
                        }
                      }}
                      
                    >
                      {inCart ? "in cart" : "add to cart"}
                    </ButtonContainer>
                  </div>
                </div>
              </div>
              <Snackbar anchorOrigin={{vertical:'bottom', horizontal:'center'}} open={this.state.snackbaropen} autoHideDuration = {2000} onClose={this.snackbarClose}
                    message={this.state.snackbarmsg} action={[
                        <IconButton key='close' arial-label='Close' color='inherit' onClick={this.snackbarClose}>
                            X
                        </IconButton>
                        ]}/>
            </div>
          );
        }}
      </ProductConsumer>
    );
  }
}
export default  withRouter(Details); 