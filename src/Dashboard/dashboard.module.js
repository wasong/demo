// ------------------------------------
// Constants
// ------------------------------------
const CHANGE_MENU = 'CHANGE_MENU'
const CREATE_ORDER = 'CREATE_ORDER'
const LOAD_ORDER = 'LOAD_ORDER'

// ------------------------------------
// Actions
// ------------------------------------
export const changeMenu = (name, value) => ({
  type: CHANGE_MENU,
  name,
  value,
})

export const createOrder = id => ({
  type: CREATE_ORDER,
  id,
})

export const loadOrder = orderId => ({
  type: CREATE_ORDER,
  orderId,
})

export const actions = {
  changeMenu,
  createOrder,
  loadOrder,
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const orderHandler = (state, { name, value }) => {
  if (
    name === 'vegetables' ||
    name === 'meats' ||
    name === 'sauces' ||
    name === 'cheeses'
  ) {
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
  [CREATE_ORDER]: (state, action) => ({
    ...state,
    created: [
      ...state.created,
      {
        orderId: action.id,
        ...state.orders,
      },
    ],
    orders: {
      bread: '',
      vegetables: [],
      cheeses: [],
      meats: [],
      sauces: [],
    },
  }),
  [LOAD_ORDER]: (state, action) => ({
    ...state,
    orders: { ...state.created.find(order => action.orderId === order.id) },
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  orders: {
    bread: '',
    vegetables: [],
    cheeses: [],
    meats: [],
    sauces: [],
  },
  created: [],
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
