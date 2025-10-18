import axios from 'axios';
import {
    authRequest,
    stuffAdded,
    authSuccess,
    authFailed,
    authError,
    authLogout,
    doneSuccess,
    getDeleteSuccess,
    getRequest,
    getFailed,
    getError,
} from './userSlice';

// Base URL fallback
const baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

// ------------------------ LOGIN USER ------------------------
export const loginUser = (fields, role) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const result = await axios.post(`${baseURL}/${role}Login`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });

        if (result.data.role) {
            dispatch(authSuccess(result.data));
        } else {
            dispatch(authFailed(result.data.message || "Login failed"));
        }
    } catch (error) {
        dispatch(authError(error.response?.data?.message || error.message));
    }
};

// ------------------------ REGISTER USER ------------------------
export const registerUser = (fields, role) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const result = await axios.post(`${baseURL}/${role}Reg`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });

        if (result.data.schoolName) {
            dispatch(authSuccess(result.data));
        } else if (result.data.school) {
            dispatch(stuffAdded());
        } else {
            dispatch(authFailed(result.data.message || "Registration failed"));
        }
    } catch (error) {
        dispatch(authError(error.response?.data?.message || error.message));
    }
};

// ------------------------ LOGOUT USER ------------------------
export const logoutUser = () => (dispatch) => {
    dispatch(authLogout());
};

// ------------------------ GET USER DETAILS ------------------------
export const getUserDetails = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${baseURL}/${address}/${id}`);
        if (result.data) {
            dispatch(doneSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error.response?.data?.message || error.message));
    }
};

// ------------------------ DELETE USER ------------------------
export const deleteUser = (id, address) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.delete(`${baseURL}/${address}/${id}`);
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(getDeleteSuccess());
    }
  } catch (error) {
    dispatch(getError(error.response?.data?.message || error.message));
  }
};


// ------------------------ UPDATE USER ------------------------
export const updateUser = (fields, id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.put(`${baseURL}/${address}/${id}`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });

        if (result.data.schoolName) {
            dispatch(authSuccess(result.data));
        } else {
            dispatch(doneSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error.response?.data?.message || error.message));
    }
};

// ------------------------ ADD STUFF ------------------------
export const addStuff = (fields, address) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const result = await axios.post(`${baseURL}/${address}Create`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });

        if (result.data.message) {
            dispatch(authFailed(result.data.message));
        } else {
            dispatch(stuffAdded(result.data));
        }
    } catch (error) {
        dispatch(authError(error.response?.data?.message || error.message));
    }
};
