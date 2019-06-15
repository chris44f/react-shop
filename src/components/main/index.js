import React, { Component } from 'react';
import './index.css';
import Product from '../product'
import Basket from '../basket'
import JumperImage from '../sweater.jpg'
import HatImage from '../hat.jpg'
import JeansImage from '../jeans.jpg'
import PatternedTImage from '../patternedtee.jpg'
import HoodyImage from '../hoody.jpg'
import TshirtImage from '../tshirt.jpg'
import ShortsImage from '../short.jpg'
import SocksImage from '../socks.jpg'

const products = [
  {
    productId: 10001,
    productName: "T-shirt",
    productPrice: 14,
    productImage: TshirtImage
  },
  {
    productId: 10002,
    productName: "Jumper",
    productPrice: 30,
    productImage: JumperImage
  },
  {
    productId: 10003,
    productName: "Patterned T-shirt",
    productPrice: 16,
    productImage: PatternedTImage
  },
  {
    productId: 10004,
    productName: "Hoodie",
    productPrice: 40,
    productImage: HoodyImage
  },
  {
    productId: 10005,
    productName: "Jeans",
    productPrice: 60,
    productImage: JeansImage
  },
  {
    productId: 10006,
    productName: "Straw Hat",
    productPrice: 14,
    productImage: HatImage
  },
  {
    productId: 10007,
    productName: "Chino Shorts",
    productPrice: 20,
    productImage: ShortsImage
  },
  {
    productId: 10008,
    productName: "Striped Socks",
    productPrice: 17,
    productImage: SocksImage
  },
]

class Main extends Component {

  state = {
    basket: [],
    latestQuantity: undefined,
    basketDisplayed: false,
  }

  componentDidMount = () => {
    this.updateStateWithStorage()
  }

  componentDidUpdate = (prevProps, prevState) => {
      this.saveToSession()
    }

  updateStateWithStorage = () => {
    if(sessionStorage.getItem("savedBasket")){
    let value = sessionStorage.getItem("savedBasket")
      value = JSON.parse(value)
      this.setState({ basket: value})
  }}

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
      <div className="header-wrapper">
        <div className="logo-container">
          <p id="the">the</p><p id="store">store</p>
        </div>
        <ul className="navbar">
          <li>new</li>
          <li>men</li>
          <li>women</li>
          <li id="sale">sale</li>
          <li
            onMouseEnter={()=>this.displayBasket()}
            onMouseLeave={()=>this.displayBasket()}
          >basket ({this.state.basket.reduce((total, item) => total + item.basketProductQuantity, 0)})
          { this.state.basketDisplayed &&
            <Basket
              basket={this.state.basket}
              handleRemoveProduct={this.handleRemoveProduct}/>
          }</li>
        </ul>
      </div>
        <div className="products-grid">
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
