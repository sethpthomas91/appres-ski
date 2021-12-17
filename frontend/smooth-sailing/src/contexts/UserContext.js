import { createContext } from 'react'

const UserContext = createContext({
  user : null, // sets default user to null
  setUser : () => {} // this is an empty set user function
})

export default UserContext