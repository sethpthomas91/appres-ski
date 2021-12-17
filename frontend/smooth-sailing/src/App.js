// styling
import './App.css';
// browser router
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// pages
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupPage';
import AddTripPage from './pages/AddTripPage';
import TripDetailPage from './pages/TripDetailPage';
// context
import UserContext from './contexts/UserContext';
// API cals
import UserAPI from './api/UserAPI';
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// Google Maps



function App() {
  // states
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ user, setUser ] = useState(null)
  const [ error, setError ] = useState(null)

  // effects
  useEffect(() => {
    const getUser = async () => {
      if (localStorage.getItem('auth-user') !== 'null') {
        let response = await UserAPI.getLoggedInUser(localStorage.getItem("auth-user"))
        let data = await response.json()
        if (data.username) {
          setIsLoggedIn(true)
          setUser(data)
        }
      }
    }
    // only calls if there is NOT a user present, so if user = null it will try to get a user
    if (!user) {
      getUser()
    }
  }, [user])

  // handler
  const handleLogin = async (event) => {
    event.preventDefault()
    let userObj = {
      username: event.target.username.value,
      password: event.target.password.value
    }
    let response = await UserAPI.login(userObj)
    let data = await response.json()
    if (data.token) {
      // sets the local storage to hold the token
      localStorage.setItem("auth-user", `${data.token}`)
      setIsLoggedIn(true)
      setUser(data.user)
    }
  }

  const handleLogout = () => {
    localStorage.setItem("auth-user", null)
    setIsLoggedIn(false)
    setUser(null)
  }

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ user: user, setUser: handleLogin, error: error }} >
          <Routes>
            <Route path='/' element={<LandingPage isLoggedIn={isLoggedIn} handleLogout={handleLogout} />} />
            <Route path='/login' element={<LoginPage isLoggedIn={isLoggedIn} handleLogin={handleLogin} />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='trips/add' element={<AddTripPage />} />
            <Route path='trips/:tripID/' element={<TripDetailPage />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossorigin="anonymous"
      />
    </div>
  );
}

export default App;
