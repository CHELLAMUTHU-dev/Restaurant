import {useContext} from 'react'
import {FaCircle, FaMinus} from 'react-icons/fa'
import {GoPlus} from 'react-icons/go'
import {FoodDetails} from '../../context/FoodDetailsContext'
import './index.css'

const FoodListCard = props => {
  const {cartList, updateCartCount} = useContext(FoodDetails)
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

  const quantity =
    cartList.find(eachItem => eachItem.dishId === dishId)?.quantity || 0

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
              <div className="cart-btns">
                <button
                  type="button"
                  onClick={() => updateCartCount(foodDetails, 1)}
                >
                  <GoPlus />
                </button>
                {quantity}
                <button
                  type="button"
                  onClick={() => updateCartCount(foodDetails, -1)}
                  disabled={quantity === 0}
                >
                  <FaMinus />
                </button>
              </div>
              <button
                type="button"
                id="add-to-cart"
                disabled={quantity === 0}
                onClick={() => updateCartCount(foodDetails, 0)}
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
