import { GET_ERRORS, CLEAR_ERRORS, ErrorActionTypes } from "../actions/types";

export interface ErrorState {
  message: string;
}

const initialState: ErrorState = {
  message: ""
};

// reducer to handle error Actions
const errorReducer = (state = initialState, action: ErrorActionTypes): ErrorState => {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        message: action.payload.msg
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        message: ""
      };
    default:
      return state;
  }
};

export default errorReducer;
