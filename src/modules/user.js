import {
  getAuth,
  updateProfile,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const REGISTER_START = "REGISTER_START";
const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const REGISTER_FAIL = "REGISTER_FAIL";

const SET_USER = "SET_USER";

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const registerStart = () => ({
  type: REGISTER_START,
});

const registerSuccess = (user) => ({
  type: REGISTER_SUCCESS,
  payload: user,
});
const registerFail = (error) => ({
  type: REGISTER_FAIL,
  payload: error,
});

const initialState = {
  loading: false,
  currentUser: null,
  error: null,
};

export const registerInitiate = (email, password, displayName) => {
  return async function (dispatch) {
    dispatch(registerStart);
    try {
      const auth = getAuth();
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL: "",
      });
      dispatch(registerSuccess(user));
      console.log(user, "Login");
    } catch (error) {
      dispatch(registerFail);
      console.log(error.code, "error code");
      console.log(error.message, "errorMessage");
    }
  };
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_START:
      return { ...state, loading: true };
    case REGISTER_SUCCESS:
      return { ...state, loading: false, currentUser: action.payload };
    case REGISTER_FAIL:
      return { ...state, error: action.payload };
    case SET_USER:
      return { ...state, loading: false, currentUser: action.payload };
    default:
      return state;
  }
};

export default userReducer;
