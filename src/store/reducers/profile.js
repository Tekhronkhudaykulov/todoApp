const initialState = {
  user: {},
  token: null,
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PROFILE":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
export default profile;
