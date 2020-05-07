import React, { Component } from "react";
import Product from "./Product";
import Title from "./Title";
import { storeProducts } from "../data";
import styled from "styled-components";
import { ProductConsumer } from "../context";
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import LoginPage from '../pages/LoginPage';

class ProductList extends Component {

  constructor(props) {
    super(props);
    let user = "user";
    if(this.props.location.state){
    user = this.props.location.state.detail.name}
    this.state = {
      products: storeProducts,
      username: user
    };
}

  render() {
    const name = "Welcome "+this.state.username+",";
    return (
      <React.Fragment>
        <ProductWrapper className="py-5">
          <div className="container">
            <Title name={name} title="our products" />
            <div className="row">
              <ProductConsumer>
                {value => {
                  return value.products.map(product => {
                  return <Product key={product.id} product={product} />;
                  });
                }}
              </ProductConsumer>
            </div>
          </div>
        </ProductWrapper>
      </React.Fragment>
    );
  }
}

const ProductWrapper = styled.section``;

export default withRouter(ProductList);

