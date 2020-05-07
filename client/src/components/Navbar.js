import React, { Component } from "react";
import { Link} from "react-router-dom";
import styled from "styled-components";
import logo from "../app_icon.png";
import { ButtonContainer } from "./Button";
import { ProductConsumer } from "../context";

export default class Navbar extends Component {
  render() {
    return (
      <ProductConsumer>
                      {value => {

    return (
      <Nav className="navbar navbar-expand-sm  navbar-dark px-sm-5">
         <Link to="/" onClick = {() => {value.clearCart();}}>
          <img id = "applogo" src={logo} alt="store" className="navbar-brand" /> 
        </Link>
        <div className="nav-link" style={{ padding: '0rem' }}>ShopQuikr</div>
        <ul className="navbar-nav align-items-center" style={{ "padding-left": '300px' }}>
          <li className="nav-item ml-5">
            <Link to="/" onClick = {() => {value.clearCart();}} className="nav-link">
              Login
            </Link>
          </li>
          <li className="nav-item ml-5">
            <Link to="/register" onClick = {() => {value.clearCart();}} className="nav-link">
              Register
            </Link>
          </li>
          <li className="nav-item ml-5">
            <Link to="/products" className="nav-link">
              Products
            </Link>
          </li>
          <li className="nav-item ml-5">
            <Link to="/logout" onClick = {() => {value.clearCart();}} className="nav-link">
              Logout
            </Link>
          </li>
        </ul>
        <Link to="/cart" className="ml-auto">
          <ButtonContainer>
            <span className="mr-2">
              <i className="fas fa-cart-plus " />
            </span>
            my cart
          </ButtonContainer>
        </Link>
      </Nav>
    );

  }}
  </ProductConsumer>
  );

  }
}

const Nav = styled.nav`
  background: var(--mainBlue);
  .nav-link {
    color: var(--mainWhite) !important;
    font-size:1.3rem;
    text-transform:capitalize;
  }

  @media (max-width: 576px) {
    .navbar-nav {
      flex-direction: row !important;
`;




