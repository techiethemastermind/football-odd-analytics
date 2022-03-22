import * as c from "./ActionTypes";

// Root reducer
const rootReducer = (state, action) => {

  switch (action.type) {
    case action.type === 'INIT_STATE':
      state = undefined;

    case c.ADD_DATA:
      return action.payload;
  }
};

export default rootReducer;
