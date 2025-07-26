import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
    </Switch>
  </BrowserRouter>
)

export default App
