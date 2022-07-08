// Reducers related to the guthub state will be here
// Reducers are functions we use to manipulate the state
// The action is an object that has a type, which is just a string
const githubReducer = (state, action) => {
  // check the action type
  switch(action.type) {
    case 'GET_USERS':
      return {
        ...state,
        users: action.payload,
        loading: false
      }
    default:
      return state // If there is no action, don't change the state - return the state as is
  }
}

export default githubReducer;

// To use the Reducer (in the Context):
// 1. import { useReducer } from 'react'
// 2. import githubReducer from 'PATH'
// 3. Set initial state
// const initialState = {
//  users: [],
//  loading: true
// }
// 4. Use useReducer Hook
//  const [state, dispatch] = useReducer(githubReducer, initialState)
// 5. Use the dispatch function (takes an action object)
