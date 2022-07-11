// Reducers related to the github state will be here
// Reducers are pure functions we use to manipulate the state.
// It accepts 2 parameters: the current state & an action object
// The action is an object that has a type, which is just a string
// https://www.robinwieruch.de/javascript-reducer/

const githubReducer = (state, action) => {
  // check the action type
  switch(action.type) {
    case 'GET_USERS':
      return {
        ...state, // The state processed by a reducer function is immutable. Therefore the reducer function always has to return a new state object. Hence, we use the JavaScript spread operator to create a new state object from the incoming state and the part we want to change. We use all the properties from the current state object for the new state object but override specific properties (e.g. lastname) for this new object.
        users: action.payload,
        loading: false
      }
      case 'SET_LOADING':
        return {
          ...state,
          loading: true
        }
      case 'CLEAR_USERS':
        return {
          ...state,
          users: []
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
