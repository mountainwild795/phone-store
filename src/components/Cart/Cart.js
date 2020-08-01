import React, { Component } from "react";
import Title from "../Title";
import CartColumns from "../CartColumns";
import EmptyCart from "./EmptyCart";
import { ProductConsumer } from "../../Context";
import CartList from "./CartList";
import CartTotals from "./CartTotals";

export default class Cart extends Component {
  render() {
    return (
      <div>
        <ProductConsumer>
          {(value) => {
            const { cart } = value;
            if (cart.length > 0) {
              return (
                <>
                  <Title name="your" title="cart"></Title>
                  <CartColumns></CartColumns>
                  <CartList value={value}></CartList>
                  <CartTotals value={value}></CartTotals>
                </>
              );
            } else {
              return <EmptyCart></EmptyCart>;
            }
          }}
        </ProductConsumer>
      </div>
    );
  }
}
