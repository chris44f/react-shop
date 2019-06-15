import React, { Component } from 'react';
import './index.css'

const Product = ({ productId, productName, productPrice, productImage, handleQuantity, handleAddProduct}) => {
  return(
  <div className="product">
    <img className="product-image-container" src={productImage} />
    <div className="product-info-container">
      <h4>{productName}</h4>
      <h5>{"£" + productPrice}</h5>
    </div>
    <div className="basket-add-container">
      <h5>Quantity</h5>
      <input className="quantity-input" type="number" placeholder="1" min="1" max="50" onChange={(e)=>handleQuantity(e.target.value,productId)}/>
      <button onClick={()=>handleAddProduct(productName,productPrice,productId)}>Add to Basket</button>
    </div>
  </div>
)
}

export default Product
