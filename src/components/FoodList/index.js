import {useContext, useState, useEffect} from 'react'
import {FoodDetails} from '../../context/FoodDetailsContext'
import FoodListCard from '../FoodListCard'
import './index.css'

const FoodList = props => {
  const [dishList, setDishList] = useState([])
  const {activeTab} = props
  const {menuList} = useContext(FoodDetails)

  useEffect(() => {
    const filteredFoodList = Array.isArray(menuList)
      ? menuList.find(item => item.menuCategory === activeTab)
      : []

    setDishList(filteredFoodList.categoryDishes)
  }, [menuList, activeTab])

  return (
    <ul className="food-list">
      {Array.isArray(dishList)
        ? dishList.map(eachItem => (
            <FoodListCard key={eachItem.dishId} foodDetails={eachItem} />
          ))
        : []}
    </ul>
  )
}

export default FoodList
