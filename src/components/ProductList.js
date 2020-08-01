import React, { Component } from "react";
import Product from "./Product";
import Title from "./Title";
// import { storeProducts } from "../data";
import { ProductConsumer } from "../Context";

export default class ProductList extends Component {
  // state = {
  //   products: storeProducts,
  // };
  render() {
    return (
      <>
        <div>
          <div className="container">
            <Title name="our" title="products"></Title>
            <div className="row">
              <ProductConsumer>
                {(value) => {
                  return value.products.map((product) => {
                    return <Product key={product.id} product={product}></Product>;
                  });
                }}
              </ProductConsumer>
            </div>
          </div>
        </div>
      </>
    );
  }
}
