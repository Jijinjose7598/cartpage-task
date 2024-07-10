import React, { useContext } from 'react';
import { CartContext } from '../App';

function Cart() {
  const { cartItems, loading, cartTotal, grandTotal, handleCountChange } = useContext(CartContext);
  const shippingCost = 10;
  const gst = 12;

  return (
    <div className="cart-container">
      <div className="cart-cards-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          cartItems.map(item => (
            <div key={item.id} className="cart-card">
              <div className="cart-item">
                <img src={item.image} alt={item.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <h2 className="cart-item-title">{item.title}</h2>
                  <h6 className="cart-item-description">{item.description}</h6>
                  <div className="cart-item-actions">
                    <span className="cart-item-price">${item.price.toFixed(2)}</span>
                    <div className="btn-container">
                      <button onClick={() => handleCountChange(item.id, -1)} className="btn">-</button>
                      <h1>{item.count}</h1>
                      <button onClick={() => handleCountChange(item.id, 1)} className="btn">+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="cart-summary">
        <h1 className='cart'>Cart</h1>
        <div className="cart-body">
          <div className="cart-row">
            <div className="cart-label">Sub Total</div>
            <div className="cart-value">${cartTotal.toFixed(2)}</div>
          </div>
          <div className="cart-row">
            <div className="cart-label">GST</div>
            <div className="cart-value">{gst}%</div>
          </div>
          <div className="cart-row">
            <div className="cart-label">Shipping Charges</div>
            <div className="cart-value">${shippingCost}</div>
          </div>
          <div className="cart-row">
            <div className="cart-label">
              <div className="cart-value"><h3>Grand Total</h3></div></div>
            <div className="cart-value"><h3>${grandTotal.toFixed(2)}</h3></div>
          </div>
          <div className="d-grid gap-2 mt-5">
            <button className="btn " type="button" onClick={() => { alert("Order Placed") }}><h4>Place Order</h4></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
