import {useContext} from 'react'
import {FaCircle} from 'react-icons/fa'
import {CartContext} from '../../context/FoodDetailsContext'
import './index.css'

const FoodListCard = props => {
  const {addCartItem} = useContext(CartContext)
  const {foodDetails} = props
  const {
    dishId,
    dishName,
    dishPrice,
    dishImage,
    dishCurrency,
    dishCalories,
    dishDescription,
    dishAvailability,
    dishType,
    addonCat,
  } = foodDetails

  return (
    <li className="food-details-card">
      {dishType === 1 ? (
        <div className="red-dot">
          <FaCircle color="darkred" />
        </div>
      ) : (
        <div className="green-dot">
          <FaCircle color="green" />
        </div>
      )}
      <div className="food-item-details">
        <h1>{dishName}</h1>
        <p className="food-price">
          {dishCurrency} {dishPrice}
        </p>
        <p className="description">{dishDescription}</p>
        {dishAvailability ? (
          <div className="availablity-content">
            <div className="cart-controllers">
              <button
                type="button"
                id="add-to-cart"
                onClick={() => {
                  addCartItem(dishId)
                }}
              >
                ADD TO CART
              </button>
            </div>
            {addonCat.length !== 0 && (
              <p className="custom-available">Customizations Available</p>
            )}
          </div>
        ) : (
          <p className="not-available">Not Available</p>
        )}
      </div>

      <p className="calories">{dishCalories} Calories</p>
      <img src={dishImage} alt={dishName} />
    </li>
  )
}

export default FoodListCard
