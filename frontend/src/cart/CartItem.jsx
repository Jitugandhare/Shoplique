import React from 'react'
import '../cartStyles/Cart.css'

const CartItem = () => {
  return (

    <div className="cart-item">
      <div className="item-info">
        <img src="" alt="Item-image" className='item-image' />
        <div className="item-details">
          <h3 className="item-name">Mobile</h3>
          <p className="item-price"><strong>Price:</strong>200/-</p>
          <p className="item-quantity"><strong>Quantity:</strong>2</p>
        </div>


      </div>
      <div className="quantity-controls">
        <button className="quantity-button decrease-btn">
          -
        </button>
        <input type="number"
          className='quantity-input'
          value={2} readOnly />
        <button className="quantity-button increase-btn">
          +
        </button>
      </div>

      <div className="item-total">
        <span className="item-total-price">200/-</span>
      </div>
      <div className="item-actions">
        <button className="update-item-btn">Update</button>
        <button className="remove-item-btn">Remove</button>
      </div>
    </div>



  )
}

export default CartItem