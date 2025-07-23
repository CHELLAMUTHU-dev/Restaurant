import {useContext} from 'react'
import {IoCartOutline} from 'react-icons/io5'
import {FoodDetails} from '../../context/FoodDetailsContext'
import './index.css'

const Header = () => {
  const {restaurantDetails, cartCount} = useContext(FoodDetails)

  return (
    <>
      <nav className="header">
        <h1>{restaurantDetails.restaurantName}</h1>
        <div className="order-container">
          <h1>My Orders</h1>
          <div className="cart-container">
            <IoCartOutline size={35} />
            <div className="count">
              <p>{cartCount}</p>
            </div>
          </div>
        </div>
      </nav>
      <hr className="header-hr" />
    </>
  )
}

export default Header
