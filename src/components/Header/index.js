import {useContext} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {IoCartOutline} from 'react-icons/io5'
import Cookies from 'js-cookie'
import {FoodDetails} from '../../context/FoodDetailsContext'
import './index.css'

const Header = ({history}) => {
  const {restaurantDetails, cartCount} = useContext(FoodDetails)

  const logoutHandler = () => {
    console.log('triggered')
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <>
      <nav className="header">
        <Link to="/">
          <h1>{restaurantDetails.restaurantName}</h1>
        </Link>
        <div className="order-container">
          <h1>My Orders</h1>
          <Link to="/cart">
            <div className="cart-container">
              <IoCartOutline size={35} />
              <div className="count">
                <p>{cartCount}</p>
              </div>
            </div>
          </Link>
          <button type="button" className="logout-btn" onClick={logoutHandler}>
            Logout
          </button>
        </div>
      </nav>
      <hr className="header-hr" />
    </>
  )
}

export default withRouter(Header)
