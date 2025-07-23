import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {FoodDetailProvider} from './context/FoodDetailsContext'

ReactDOM.render(
  <React.StrictMode>
    <FoodDetailProvider>
      <App />
    </FoodDetailProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
