import {useState, useCallback} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Login = ({history}) => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    error: false,
    errorMsg: '',
  })

  const onChangeHandler = event => {
    const {name, value} = event.target // Fixed: event.target
    setUserData(data => ({...data, [name]: value}))
  }

  const fetchApi = useCallback(
    async event => {
      event.preventDefault()
      try {
        const response = await fetch('https://apis.ccbp.in/login', {
          method: 'POST',
          body: JSON.stringify(userData),
        })
        const data = await response.json()
        const {jwt_token: token} = data
        if (token) {
          Cookies.set('jwt_token', token, {expires: 1})
          history.replace('/')
        } else {
          setUserData(datas => ({
            ...datas,
            error: true,
            errorMsg: data.error_msg,
          }))
        }
      } catch (e) {
        console.error('Login error:', e)
      }
    },
    [userData, history],
  )

  const authToken = Cookies.get('jwt_token')
  if (authToken) {
    return <Redirect to="/" />
  }

  return (
    <div className="login-route">
      <form onSubmit={fetchApi}>
        <div>
          <label htmlFor="username">USERNAME</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={onChangeHandler}
            value={userData.username}
            placeholder="username"
          />
        </div>
        <div>
          <label htmlFor="password">PASSWORD</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={onChangeHandler}
            value={userData.password}
            placeholder="password"
          />
        </div>
        <button type="submit">SUBMIT</button>
        {userData.error && <p style={{color: 'red'}}>{userData.errorMsg}!</p>}
      </form>
    </div>
  )
}

export default Login
