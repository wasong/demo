// ------------------------------------
// Constants
// ------------------------------------
const CHANGE_MENU = 'CHANGE_MENU'

// ------------------------------------
// Actions
// ------------------------------------
export const changeMenu = (name, value) => ({
  type: CHANGE_MENU,
  name,
  value,
})

export const actions = {
  changeMenu,
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const orderHandler = (state, { name, value }) => {
  if (name === 'vegetables' || name === 'meats' || name === 'sauces') {
    return {
      ...state,
      [name]: state[name].includes(value) ?
              state[name].filter(x => x !== value) :
              [...state[name], value],
    }
  }
  return {
    ...state,
    [name]: value,
  }
}

const ACTION_HANDLERS = {
  [CHANGE_MENU]: (state, action) => ({
    ...state,
    orders: orderHandler(state.orders, action),
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  orders: {
    bread: '',
    vegetables: [],
    meats: [],
    sauces: [],
  },
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
