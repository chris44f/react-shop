import React, { Component } from 'react';
import './index.css'

const Product = ({ productId, productName, productPrice, productImage, handleQuantity, handleAddProduct}) => {
  return(
  <div className="product">
    <img src={productImage} />
    <h4>{productName}</h4>
    <h5>{"£" + productPrice}</h5>
    <div className="basket-add-container">
      <h5>Quantity</h5>
      <input className="quantityInput" type="number" placeholder="1" min="1" max="50" onChange={(e)=>handleQuantity(e.target.value,productId)}/>
      <button onClick={()=>handleAddProduct(productName,productPrice,productId)}>Add to Basket</button>
    </div>
  </div>
)
}

export default Product
