import React, { Component } from 'react';
import './index.css';
import Product from '../product'
import Basket from '../basket'
import JumperImage from '../jumper.JPG'
import WoollyImage from '../woollyhat.JPG'
import JeansImage from '../Jeans_for_men.jpg'
import StripeImage from '../stripes.jpg'
import HoodyImage from '../Hoodie_self.JPG'
import TshirtImage from '../Blue_Tshirt.jpg'

const products = [
  {
    productId: 10001,
    productName: "T-shirt",
    productPrice: 9,
    productImage: TshirtImage
  },
  {
    productId: 10002,
    productName: "Jumper",
    productPrice: 40,
    productImage: JumperImage
  },
  {
    productId: 10003,
    productName: "Striped T-shirt",
    productPrice: 14,
    productImage: StripeImage
  },
  {
    productId: 10004,
    productName: "Hoodie",
    productPrice: 30,
    productImage: HoodyImage
  },
  {
    productId: 10005,
    productName: "Jeans",
    productPrice: 45,
    productImage: JeansImage
  },
  {
    productId: 10006,
    productName: "Woolly Hat",
    productPrice: 6,
    productImage: WoollyImage
  },
]

class Main extends Component {

  state = {
    basket: []
  }

handleRemoveProduct = (id,price) => {
  let stateBasket = [...this.state.basket]
  let productToRemove = stateBasket.filter((item)=>item.basketProductId===id)
  let productRemovePrice = productToRemove[0].basketProductPrice / productToRemove[0].basketProductQuantity
  if (productToRemove[0].basketProductQuantity >1) {
    productToRemove[0].basketProductQuantity = productToRemove[0].basketProductQuantity -1
    productToRemove[0].basketProductPrice = productToRemove[0].basketProductPrice - productRemovePrice
    this.setState({productToRemove})
  } else {
    let productsRemaining = stateBasket.filter((item)=>item.basketProductId !== id)
    this.setState({ basket: productsRemaining})
  }
}

handleAddProduct = (name,price,id) => {
  let stateBasket = [...this.state.basket]
  if (stateBasket.some((item) => item.basketProductId === id)){
    let duplicate = stateBasket.filter((item) => item.basketProductId === id)
    duplicate[0].basketProductQuantity = duplicate[0].basketProductQuantity + 1
    duplicate[0].basketProductPrice = duplicate[0].basketProductPrice + price
    this.setState({duplicate})
  } else {
    this.setState({
      basket: stateBasket.concat([{
        basketProductQuantity: 1,
        basketProductName: name,
        basketProductPrice: price,
        basketProductId: id
      }])
    })
  }
}
  render() {

    return (
      <div>
        <div className="productsGrid">
          {products.map((product)=>(
            <Product
              productId={product.productId}
              productName={product.productName}
              productPrice={product.productPrice}
              productImage={product.productImage}
              handleAddProduct={this.handleAddProduct}
            />
          ))}
        </div>
        <div className="basketView">
          <Basket
            basket={this.state.basket}
            handleRemoveProduct={this.handleRemoveProduct}/>
        </div>
      </div>
    )
  }
}

export default Main
