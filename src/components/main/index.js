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
import ShortsImage from '../shorts.jpg'
import SocksImage from '../socks.jpg'
import isEqual from 'lodash.isequal'

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
  {
    productId: 10007,
    productName: "Shorts",
    productPrice: 7,
    productImage: ShortsImage
  },
  {
    productId: 10008,
    productName: "Socks",
    productPrice: 8,
    productImage: SocksImage
  },
]

class Main extends Component {

  state = {
    basket: [],
    latestQuantity: undefined,
    basketDisplayed: false,
  }
// NOTE: this section regarding session storage isnt quite right - won't allow empty basket!! Speak to Rich
  componentDidMount = () => {
    this.updateStateWithStorage()
  }

  componentDidUpdate = (prevProps, prevState) => {
      this.saveToSession()
    }

  updateStateWithStorage = () => {
    let value = sessionStorage.getItem("savedBasket")
      value = JSON.parse(value)
      this.setState({ basket: value})
  }

  saveToSession = () => {
    let sessionBasket = [...this.state.basket]
    sessionStorage.setItem("savedBasket", JSON.stringify(sessionBasket))
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
    if (this.state.latestQuantity === 1 || this.state.latestQuantity === undefined || this.state.quantityId !== id) {
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
    } else if (this.state.latestQuantity >1 && this.state.quantityId === id) {
      if (stateBasket.some((item) => item.basketProductId === id)){
        let duplicate = stateBasket.filter((item) => item.basketProductId === id)
        duplicate[0].basketProductQuantity = duplicate[0].basketProductQuantity + this.state.latestQuantity
        duplicate[0].basketProductPrice = duplicate[0].basketProductPrice + (price * this.state.latestQuantity)
        this.setState({duplicate})
      } else {
        this.setState({
          basket: stateBasket.concat([{
            basketProductQuantity: this.state.latestQuantity,
            basketProductName: name,
            basketProductPrice: (price*this.state.latestQuantity),
            basketProductId: id
          }])
        })
      }
    }
  }

  handleQuantity = (e,id) => {
    this.setState({
      latestQuantity: parseInt(e),
      quantityId: id})
  }

  displayBasket = () => {
    this.setState({ basketDisplayed: !this.state.basketDisplayed })
  }

  render() {

    return (
      <div>
        <ul className="navbar">
          <li>New Arrivals</li>
          <li>All Men</li>
          <li>All Women</li>
          <li id="sale">Sale</li>
          <li
            onMouseEnter={()=>this.displayBasket()}
            onMouseLeave={()=>this.displayBasket()}
          >Basket ({this.state.basket.reduce((total, item) => total + item.basketProductQuantity, 0)})
          { this.state.basketDisplayed &&
            <Basket
              basket={this.state.basket}
              handleRemoveProduct={this.handleRemoveProduct}/>
          }</li>
        </ul>
        <div className="productsGrid">
          {products.map((product)=>(
            <Product
              productId={product.productId}
              productName={product.productName}
              productPrice={product.productPrice}
              productImage={product.productImage}
              handleQuantity={this.handleQuantity}
              handleAddProduct={this.handleAddProduct}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default Main
