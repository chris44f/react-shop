import React, { Component } from 'react';
import './index.css'

class Basket extends Component {

  itemsInBasket = (basket) => (
    basket.map((item)=>(
      <tr>
        <td className="col-quantity">{item.basketProductQuantity + "x "}</td>
        <td className="col-product">{item.basketProductName}</td>
        <td className="col-price">{"£" + item.basketProductPrice}</td>
      </tr>
    ))
  )

  basketQuantity = (basket) => (
    basket.reduce((total, item) => total + item.basketProductQuantity, 0)
  )

  basketTotal = (basket) => (
    basket.reduce((total, item) => total + item.basketProductPrice, 0)
  )

  render(){
    return(
      <div>
        <h4>Items in your basket</h4>
        {this.props.basket.length>0 ? `You have ${this.basketQuantity(this.props.basket)} items in your basket.` : "You have nothing in your basket!"}
        <table>
          {this.props.basket.length>0 ? this.itemsInBasket(this.props.basket) : ""}
        </table>
        <h4 className="basket-total">{this.props.basket.length>0 ? `Total: £${this.basketTotal(this.props.basket)}` : ""}</h4>
      </div>
    )
  }

}

export default Basket
