import {
  getAuth,
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const REGISTER_START = "REGISTER_START";
const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const REGISTER_FAIL = "REGISTER_FAIL";

const SET_USER = "SET_USER";

const LOGIN_START = "LOGIN_START";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAIL = "LOGIN_FAIL";

const LOGOUT_START = "LOGOUT_START";
const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
const LOGOUT_FAIL = "LOGOUT_FAIL";

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

const loginStart = () => ({
  type: LOGIN_START,
});

const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

const loginFail = (error) => ({
  type: LOGIN_FAIL,
  payload: error,
});

const logoutStart = () => ({
  type: LOGOUT_START,
});

const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

const logoutFail = (error) => ({
  type: LOGOUT_FAIL,
  payload: error,
});

const initialState = {
  loading: false,
  currentUser: null,
  error: null,
};

export const registerInitiate = (email, password, displayName) => {
  return async function (dispatch) {
    dispatch(registerStart());
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
      dispatch(registerFail(error));
      console.log(error.code, "error code");
      console.log(error.message, "errorMessage");
    }
  };
};

export const loginInitiate = (email, password) => {
  return async function (dispatch) {
    dispatch(loginStart());
    try {
      const auth = getAuth();
      const user = await signInWithEmailAndPassword(auth, email, password);
      dispatch(loginSuccess(user));
      console.log(user, "Login");
    } catch (error) {
      dispatch(loginFail(error));
      console.log(error.code, "error code");
      console.log(error.message, "errorMessage");
    }
  };
};

export const logoutInitiate = () => {
  return async function (dispatch) {
    dispatch(logoutStart());
    try {
      const auth = getAuth();
      await signOut(auth);
      dispatch(logoutSuccess());
    } catch (error) {
      dispatch(logoutFail(error));
      console.log(error.code, "error code");
      console.log(error.message, "errorMessage");
    }
  };
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_START:
    case LOGIN_START:
    case LOGOUT_START:
      return { ...state, loading: true };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return { ...state, loading: false, currentUser: action.payload };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, currentUser: null };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT_FAIL:
      return { ...state, error: action.payload };
    case SET_USER:
      return { ...state, loading: false, currentUser: action.payload };
    default:
      return state;
  }
};

export default userReducer;
