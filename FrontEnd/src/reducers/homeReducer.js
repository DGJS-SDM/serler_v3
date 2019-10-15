const initState = {
    data: [],
  };
  
  const homeReducer = (state = initState, action) => {
    switch (action.type) {
      case "home_data_success":
        return {
          ...state,
          data: action.data
        };
      case "filter_data":
        return{
          ...state,
          data: action.data
        };
      default:
        return state;
    }
  };
  
  export default homeReducer;
  