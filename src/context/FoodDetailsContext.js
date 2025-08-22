import {createContext, useState, useEffect} from 'react'

export const CartContext = createContext(null)

export const FoodDetailProvider = ({children}) => {
  const [restaurantDetails, setRestaurantDetails] = useState({})
  const [menuList, setMenuList] = useState({})
  const [cartList, setCartList] = useState([])

  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        const response = await fetch(
          'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
        )
        const data = await response.json()
        const restaurantData = data?.[0] || {}
        const convertedData = {
          restaurantName: restaurantData.restaurant_name,
          restaurantImage: restaurantData.restaurant_image,
          branchname: restaurantData.branch_name,
        }
        setRestaurantDetails(convertedData)

        // convert menu item in camelcase
        const convertDetails = restaurantData.table_menu_list.map(item => ({
          menuCategory: item.menu_category,
          menuCategoryId: item.menu_category_id,
          menuCategoryImage: item.menu_category_image,
          nextUrl: item.nexturl,
          categoryDishes: item.category_dishes.map(dish => ({
            dishId: dish.dish_id,
            dishName: dish.dish_name,
            dishPrice: dish.dish_price,
            dishImage: dish.dish_image,
            dishCurrency: dish.dish_currency,
            dishCalories: dish.dish_calories,
            dishDescription: dish.dish_description,
            dishAvailability: dish.dish_Availability,
            dishType: dish.dish_Type,
            nexturl: dish.nexturl,
            addonCat: dish.addonCat.map(each => ({
              addonCategory: each.addon_category,
              addonCategoryId: each.addon_category_id,
              addonSelection: each.addon_selection,
              nextUrl: each.nextUrl,
              addons: each.addons.map(eachItem => ({
                dishId: eachItem.dish_id,
                dishName: eachItem.dish_name,
                dishPrice: eachItem.dish_price,
                dishImage: eachItem.dish_image,
                dishCurrency: eachItem.dish_currency,
                dishCalories: eachItem.dish_calories,
                dishDescription: eachItem.dish_description,
                dishAvailability: eachItem.dish_Availability,
                dishType: eachItem.dish_Type,
              })),
            })),
          })),
        }))

        setMenuList(convertDetails)
      } catch (e) {
        console.log(e)
      }
    }

    fetchFoodDetails()
  }, [])

  const removeAllCartItems = () => {
    setCartList([])
  }

  useEffect(() => {
    const savedCart = localStorage.getItem('cartList')
    if (savedCart) {
      setCartList(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cartList', JSON.stringify(cartList))
  }, [cartList])

  const addCartItem = id => {
    const existing = cartList.find(eachItem => eachItem.dishId === id)
    if (existing) {
      setCartList(prev =>
        prev.map(eachItem =>
          eachItem.dishId === id
            ? {...eachItem, quantity: eachItem.quantity + 1}
            : eachItem,
        ),
      )
    } else {
      const newCartList = menuList
        .flatMap(each => each.categoryDishes)
        .find(eachItem => eachItem.dishId === id)
      setCartList(prev => [...prev, {...newCartList, quantity: 1}])
      localStorage.setItem('cartList', newCartList)
    }
  }
  const removeCartItem = id => {
    const filteredList = cartList.filter(eachItem => eachItem.dishId !== id)
    setCartList(filteredList)
  }
  const incrementCartItemQuantity = id => {
    const existing = cartList.find(eachItem => eachItem.dishId === id)
    if (existing) {
      setCartList(prev =>
        prev.map(item =>
          item.dishId === id ? {...item, quantity: item.quantity + 1} : item,
        ),
      )
    } else {
      console.log('No data found')
    }
  }
  const decrementCartItemQuantity = id => {
    const existing = cartList.find(eachItem => eachItem.dishId === id)
    if (existing.quantity > 0) {
      setCartList(prev =>
        prev.map(each =>
          each.dishId === id ? {...each, quantity: each.quantity - 1} : each,
        ),
      )
    } else {
      const filtered = cartList.filter(
        eachItem => eachItem.dishId !== existing.dishId,
      )
      setCartList([filtered])
    }
  }

  return (
    <CartContext.Provider
      value={{
        restaurantDetails,
        menuList,
        cartList,
        removeAllCartItems,
        addCartItem,
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
