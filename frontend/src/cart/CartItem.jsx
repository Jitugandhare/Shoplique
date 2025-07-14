import React, { useState } from 'react';
import '../cartStyles/Cart.css';

const CartItem = ({ item }) => {

  console.log(item)
  const [quantity, setQuantity] = useState(1)

  const increaseQuantity = () => {
    setQuantity(qty => qty + 1)
  }
  const decreaseQuantity = () => {
    setQuantity(qty => (qty > 1 ? qty - 1 : 1))
  }

  return (

    <div className="cart-item">
      <div className="item-info">
        <img src={item.image} alt={item.name} className="item-image" />
        <div className="item-details">
          <h3 className="item-name">{item.name}</h3>
          <p className="item-price"><strong>Price:</strong> {item.price}/-</p>
          <p className="item-quantity"><strong>Quantity:</strong> {item.quantity}</p>
        </div>
      </div>

      <div className="quantity-controls">
        <button className="quantity-button decrease-btn" onClick={decreaseQuantity}>-</button>
        <input
          type="number"
          className="quantity-input"
          value={quantity}
          readOnly
        />
        <button className="quantity-button increase-btn" onClick={increaseQuantity}>+</button>
      </div>

      <div className="item-total">
        <span className="item-total-price">{item.price * quantity}/-</span>
      </div>

      <div className="item-actions">
        <button className="update-item-btn">Update</button>
        <button className="remove-item-btn">Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
