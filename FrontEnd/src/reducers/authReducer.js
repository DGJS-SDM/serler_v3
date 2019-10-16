const initState = {
  user: null
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "user_data_success":
      return {
        ...state,
        user: action.data
      };
    case "user_data_failed":
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
};

export default authReducer;
