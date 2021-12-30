const login = (userObj) => {
  const url = 'https://smooth-sailing-backend.herokuapp.com/token-auth/'
  const init = {
    method: "POST",
    headers : {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(userObj)
  }

  return fetch(url, init).then(res => res)
}

const getLoggedInUser = (token) => {
  const url = 'https://smooth-sailing-backend.herokuapp.com/core/current_user/'
  const init = {
    headers : {
      'Content-Type' : 'application/json',
      'Authorization' : `JWT ${token}`
    }
  }

  return fetch(url, init).then(res => res)
}

const signupUser = (userObj) => {
  const url = 'https://smooth-sailing-backend.herokuapp.com/core/users/'
  const init = {
    method: "POST",
    headers : {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(userObj)
  }

  return fetch(url, init).then(res => res)
}

const createProfile = (profileObj, token) => {
  const url = 'https://smooth-sailing-backend.herokuapp.com/core/profiles/'
  const init = {
    method: 'POST',
    headers : {
      'Content-Type' : 'application/json',
      Authorization : `JWT ${token}`
    },
    body : JSON.stringify(profileObj)
  }

  return fetch(url, init).then(res => res)
}

const exportCalls = {
  login,
  getLoggedInUser,
  signupUser,
  createProfile,
}

export default exportCalls