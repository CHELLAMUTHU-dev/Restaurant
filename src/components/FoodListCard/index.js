import {useState, useContext} from 'react'
import {FaCircle, FaMinus} from 'react-icons/fa'
import {GoPlus} from 'react-icons/go'
import {FoodDetails} from '../../context/FoodDetailsContext'
import './index.css'

const FoodListCard = props => {
  const {increaseCartCount, decreaseCartCount} = useContext(FoodDetails)
  const [count, setCount] = useState(0)
  const {foodDetails} = props
  const {
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

  const increaseHandler = () => {
    setCount(prev => prev + 1)
    increaseCartCount()
  }

  const decreaseHandler = () => {
    setCount(prev => prev - 1)
    decreaseCartCount()
  }

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
            <div>
              <GoPlus onClick={increaseHandler} />
              {count}
              <button
                type="button"
                onClick={decreaseHandler}
                disabled={count === 0}
              >
                <FaMinus />
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
