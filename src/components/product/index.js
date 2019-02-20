import React, { Component } from 'react';
import './index.css'

const Product = ({ productId, productName, productPrice, productImage, handleAddProduct}) => {
  return(
  <div className="product">
    <img src={productImage} />
    <h4>{productName}</h4>
    <h5>{"£" + productPrice}</h5>
    <button onClick={()=>handleAddProduct(productName,productPrice,productId)}>Add to Basket</button>
  </div>
)
}

export default Product
