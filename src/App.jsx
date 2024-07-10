import  { useState, useEffect, createContext,useContext } from 'react';
import Cart from './components/Cart';
import './style.css';


const CartContext = createContext();

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartTotal, setCartTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const shippingCost = 10;
  const gst = 12;

  useEffect(() => {
    fetch('http://localhost:5173/products.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const itemsWithCount = data.products.map((item) => ({ ...item, count: 0 }));
        setCartItems(itemsWithCount);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching cart items:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let currentCartTotal = 0;
    cartItems.forEach((item) => {
      currentCartTotal += item.count * item.price;
    });
    setCartTotal(currentCartTotal);
    if (shippingCost > 0) {
      currentCartTotal += shippingCost;
    }
    if (gst > 0) {
      currentCartTotal += (currentCartTotal / 100) * 12;
    }
    setGrandTotal(currentCartTotal);
  }, [cartItems]);

  function handleCountChange(id, change) {
    setCartItems(cartItems.map(item =>
      item.id === id && (item.count + change >= 0) ? { ...item, count: item.count + change } : item
    ));
  }

  return (
    <CartContext.Provider value={{ cartItems, loading, cartTotal, grandTotal, handleCountChange }}>
      <div className="App">
        <Cart />
      </div>
    </CartContext.Provider>
  );
}

export { CartContext };
export default App;
