import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ProductConsumer } from "../Context";

export default class Product extends Component {
  render() {
    const { id, title, img, price, inCart } = this.props.product;
    return (
      <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
        <ProductConsumer>
          {(value) => {
            return (
              <div className="card">
                <div
                  className="img-container p-5"
                  onClick={() => {
                    value.handleDetail(id);
                  }}>
                  <Link to="details">
                    <img src={img} alt="product" className="card-img-top"></img>
                  </Link>
                  <button
                    className="cart-btn"
                    disabled={inCart ? true : false}
                    onClick={() => {
                      value.addToCart(id);
                      value.openModal(id);
                    }}>
                    {inCart ? (
                      <p className="text-capitalize mb-0" disabled>
                        {" "}
                        inCart
                      </p>
                    ) : (
                      <i className="fas fa-cart-plus"></i>
                    )}
                  </button>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <p>{title}</p>
                  <h5 className="text-blue font-italic">
                    <span className="mr-1">$</span>
                    {price}
                  </h5>
                </div>
              </div>
            );
          }}
        </ProductConsumer>
      </ProductWrapper>
    );
  }
}

const ProductWrapper = styled.div`
  .card {
    border-color: transparent;
    transition: all 1s linear;
  }

  .card-footer {
    background: transparent;
    border-top: transparent;
    transition: all 1s linear;
  }

  &:hover {
    .card {
      border: 0.04rem solid rgba(0, 0, 0, 0.2);
      box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
    }

    .card-footer {
      background: rgba(247, 247, 247);
    }
  }
  .img-container {
    position: relative;
    overflow: hidden;
  }
  .img-container:hover .card-img-top {
    transform: scale(1.2);
  }

  .card-img-top {
    transition: all 0.5s linear;
  }
  .cart-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0.2rem 0.4rem;
    background: var(--lightBlue);
    border: none;
    color: var(--mainWhite);
    font-size: 1.4rem;
    border-radius: 0.5 0 0 0;
    transform: translate(100%, 100%);
    transition: all 0.5s linear;
  }
  .img-container:hover .cart-btn {
    transform: translate(0, 0);
  }
  .cart-btn:hover {
    color: var(--mainBlue);
    cursor: pointer;
  }
`;
