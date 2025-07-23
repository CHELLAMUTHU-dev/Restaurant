import {useContext, useState} from 'react'
import {FoodDetails} from '../../context/FoodDetailsContext'
import Header from '../../components/Header'
import NavList from '../../components/NavList'
import FoodList from '../../components/FoodList'
import './index.css'

const Home = () => {
  const {menuList} = useContext(FoodDetails)
  // Safely handle menuList data
  const categories = Array.isArray(menuList)
    ? menuList.map(item => item.menuCategory)
    : []
  const [activeTab, setActiveTab] = useState('Salads and Soup')

  const updateActiveTab = tab => {
    setActiveTab(tab)
  }

  return (
    <>
      <Header />
      <ul className="nav-list">
        {categories.map(eachItem => (
          <NavList
            key={eachItem}
            category={eachItem}
            active={eachItem === activeTab}
            updateActiveTab={updateActiveTab}
          />
        ))}
      </ul>
      <FoodList activeTab={activeTab} />
    </>
  )
}

export default Home
