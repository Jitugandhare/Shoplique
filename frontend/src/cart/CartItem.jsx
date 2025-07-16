import React, { useEffect, useState } from 'react';
import '../cartStyles/Cart.css';
import { toast } from "react-toastify"
import { addItemsToCart, removeError, removeSuccess } from "../features/cart/cartSlice"
import { useDispatch, useSelector } from 'react-redux';

const CartItem = ({ item }) => {

  console.log(item)
  const [quantity, setQuantity] = useState(item.quantity)
  const { loading, error, success, message, cartItems } = useSelector((state) => state.cart)
  const dispatch = useDispatch();

  const increaseQuantity = () => {
    if (item.stock <= quantity) {
      toast.error("Cannot exceeds available stocks", { position: "top-center", autoClose: 3000 });
      dispatch(removeError());
      return;
    }
    setQuantity(qty => qty + 1)
  }
  const decreaseQuantity = () => {
    if (quantity <= 1) {
      toast.error("Quantity cannot be less than 1", { position: "top-center", autoClose: 3000 });
      dispatch(removeError());
      return;
    }
    setQuantity(qty => qty - 1)
  }
  // quantity update
  const handleUpdateQuantity = () => {
    if (loading) {
      return
    }

    if (quantity !== item.quantity) {
      dispatch(addItemsToCart({ id: item.product, quantity }))
    }
  }


  useEffect(() => {
    if (success) {
      toast.success("Quantity updated", { position: "top-center", autoClose: 3000,toastId:"Cart-update" });
      dispatch(removeSuccess());
    }
  }, [dispatch, success, message])



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
        <button className="quantity-button decrease-btn" onClick={decreaseQuantity} disabled={loading}>-</button>
        <input
          type="number"
          className="quantity-input"
          value={quantity}
          readOnly
        />
        <button className="quantity-button increase-btn" onClick={increaseQuantity} disabled={loading}>+</button>
      </div>

      <div className="item-total">
        <span className="item-total-price">{item.price * quantity}/-</span>
      </div>

      <div className="item-actions">
        <button className="update-item-btn" disabled={loading || quantity === item.quantity} onClick={handleUpdateQuantity}>{loading ? "Updating" : "Update"}</button>
        <button className="remove-item-btn" >Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
