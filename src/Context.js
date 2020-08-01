import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    // products: [...storeProducts],
    products: [],
    detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubtotal: 0,
    cartTax: 0,
    cartTotal: 0,
  };
  setProducts = () => {
    /*method 1:  */
    // let str = JSON.stringify(storeProducts);
    // console.log(str);
    // let tempProducts = JSON.parse(str);
    // console.log(tempProducts);
    // this.setState(() => {
    //   return { products: tempProducts };
    // });
    /* method 2 */
    let tempProducts = [];
    storeProducts.forEach((item) => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });
    this.setState(() => {
      return { products: tempProducts };
    });
  };

  openModal = (id) => {
    const product = this.getItem(id);
    this.setState(() => {
      return { modalProduct: product, modalOpen: true };
    });
  };

  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };

  getItem = (id) => {
    const product = this.state.products.find((item) => item.id === id);
    return product;
  };

  handleDetail = (id) => {
    const product = this.getItem(id);
    this.setState(() => {
      return { detailProduct: product };
    });
  };

  addToCart = (id) => {
    // const tempProducts = [...this.state.products]; //ok
    const tempProducts = this.state.products;
    // const str = JSON.stringify(this.state.products);
    // const tempProducts = JSON.parse(str);
    // console.log(tempProducts[0].inCart);
    // tempProducts[0].inCart = tempProducts[0].inCart ? false : true;
    // console.log(tempProducts[0].inCart);
    // console.log(this.state.products[0].inCart);

    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    product.total = product.price;
    this.setState(
      () => {
        return {
          products: tempProducts,
          cart: [...this.state.cart, product],
        };
      },
      () => {
        this.addTotals();
      }
    );
    // console.log(this.state.cart); //error.watch using google tool : component-context.consumer
  };
  componentDidMount() {
    this.setProducts();
  }
  test = () => {
    // this.setProducts();
    console.log(this.state.products);
    this.state.products[0].id = 0;
    console.log(this.state.products);
    console.log(storeProducts);
  };

  increment = (id) => {
    let tempCart = this.state.cart;
    const selectedItem = tempCart.find((item) => {
      return item.id == id;
    });
    // console.log(this.getItem(id).count);
    selectedItem.count++;
    // console.log(this.getItem(id).count);
    selectedItem.total = selectedItem.count * selectedItem.price;
    this.addTotals();
    console.log(this.state.cart);
  };
  decrement = (id) => {
    let tempCart = this.state.cart;
    const selectedItem = tempCart.find((item) => {
      return item.id == id;
    });
    // console.log(this.getItem(id).count);
    if (selectedItem.count > 0) {
      selectedItem.count--;
      if (selectedItem.count == 0) {
        this.removeItem(id);
      }
    }
    // console.log(this.getItem(id).count);
    selectedItem.total = selectedItem.count * selectedItem.price;
    this.addTotals();
    // console.log(this.state.cart);
  };
  removeItem = (id) => {
    let tempCart = this.state.cart;
    tempCart = tempCart.filter((item) => {
      return item.id != id;
    });

    const tempProduct = this.getItem(id);

    tempProduct.count = 0;
    tempProduct.inCart = false;
    tempProduct.total = 0;

    this.setState(
      () => {
        return {
          cart: tempCart,
        };
      },
      () => {
        this.addTotals();
        console.log(tempCart, tempProduct, this.state.products, this.state.cart);
      }
    );
  };
  clearCart = () => {
    this.setState(
      () => {
        return {
          cart: [],
        };
      },
      () => {
        this.setProducts();
        this.addTotals();
      }
    );
  };

  addTotals = () => {
    let subTotal = 0;
    this.state.cart.map((item) => {
      subTotal += item.total;
    });
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    this.setState(() => {
      return {
        cartSubtotal: subTotal,
        cartTax: tax,
        cartTotal: total,
      };
    });
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          getItem: this.getItem,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart,
        }}>
        {/* <button onClick={this.test}>test</button> */}
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
