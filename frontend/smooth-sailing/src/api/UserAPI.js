const login = (userObj) => {
  const url = 'http://localhost:8000/token-auth/'
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
  const url = 'http://localhost:8000/core/current_user/'
  const init = {
    headers : {
      'Content-Type' : 'application/json',
      'Authorization' : `JWT ${token}`
    }
  }

  return fetch(url, init).then(res => res)
}

const signupUser = (userObj) => {
  const url = 'http://localhost:8000/core/users/'
  const init = {
    method: "POST",
    headers : {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(userObj)
  }

  return fetch(url, init).then(res => res)
}

const exportCalls = {
  login,
  getLoggedInUser,
  signupUser,
}

export default exportCalls