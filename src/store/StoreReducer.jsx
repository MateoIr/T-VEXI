const types = {
  authLogin: "auth-login",
  authLogout: "auth-logout",
};

const initialStore = {
  user: { email: "", token: "" },
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case types.authLogout:
      return {
        ...state,
        user: null,
      };
    case types.authLogin:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
export { initialStore, types };
export default storeReducer;
