import {useContext} from 'react'
import {FaMinus} from 'react-icons/fa'
import {GoPlus} from 'react-icons/go'
import Header from '../../components/Header'
import {CartContext} from '../../context/FoodDetailsContext'
import './index.css'

const Cart = ({history}) => {
  const {
    removeAllCartItems,
    removeCartItem,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    cartList,
  } = useContext(CartContext)

  // calculat total cart price

  const totalPrice = cartList.reduce((total, item) => {
    const itemPrice = Number(item.dishPrice) || 0
    const itemQuantity = Number(item.quantity) || 0
    return total + itemPrice * itemQuantity
  }, 0)

  const redirect = () => {
    history.replace('/')
  }

  return (
    <div>
      <Header />
      <div className="cart-container">
        <div className="cart-header">
          <h1>My Orders</h1>
          {cartList.length > 0 && (
            <button
              type="button"
              onClick={removeAllCartItems}
              className="remove-all-btn"
            >
              Remove All
            </button>
          )}
        </div>

        {cartList.length === 0 ? (
          <>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
              alt="Empty cart"
              className="empty-cart"
            />
            <p className="empty-cart-message">
              Uh Oh! you don&apos;t have any food orders
            </p>
            <button
              type="button"
              onClick={redirect}
              className="order-now-button"
            >
              Order Now
            </button>
          </>
        ) : (
          <>
            <ul className="cart-items-list">
              {cartList.map(item => {
                const itemTotal =
                  (Number(item.dishPrice) || 0) * (Number(item.quantity) || 0)

                return (
                  <li key={`${item.dishId}-${item.dishName}`}>
                    <img src={item.dishImage} alt={item.dishName} />
                    <div className="item-details">
                      <h2 className="dish-name">{item.dishName}</h2>
                      <p className="dish-description">{item.dishDescription}</p>
                      <p className="dish-price">
                        {item.dishCurrency} {itemTotal.toFixed(2)}
                      </p>
                    </div>
                    <div className="quantity-controls">
                      <button
                        type="button"
                        disabled={item.quantity <= 1}
                        onClick={() => decrementCartItemQuantity(item.dishId)}
                      >
                        <FaMinus />
                      </button>
                      <p className="quantity">{item.quantity}</p>
                      <button
                        type="button"
                        onClick={() => incrementCartItemQuantity(item.dishId)}
                      >
                        <GoPlus />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeCartItem(item.dishId)}
                    >
                      Remove
                    </button>
                  </li>
                )
              })}
            </ul>
            <div className="cart-summary">
              <h3>
                Total: {cartList[0]?.dishCurrency || ''} {totalPrice.toFixed(2)}
              </h3>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart
