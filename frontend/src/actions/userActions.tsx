import axios from 'axios';
import { Dispatch } from 'react';
import { State } from '../store';
import { Action } from '../interface/userInterface';
import {
  USER_LOGIN_ACTION,
  USER_REGISTER_ACTION,
  USER_DETAILS_ACTION,
  USER_UPDATE_PROFILE_ACTION,
  USER_LIST_ACTION,
  USER_REQUEST_ACTION,
  USER_UPDATE_ACTION,
} from '../constants/userConstants';

type GetState = () => State;

export const login =
  (email: string, password: string) =>
  async (dispatch: Dispatch<Action>, getState: GetState) => {
    try {
      dispatch({
        type: USER_LOGIN_ACTION.USER_LOGIN_REQUEST,
      });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        '/api/users/login',
        {
          email,
          password,
        },
        config,
      );
      dispatch({
        type: USER_LOGIN_ACTION.USER_LOGIN_SUCCESS,
        payload: data,
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_LOGIN_ACTION.USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const register =
  (name: string, email: string, password: string) =>
  async (dispatch: Dispatch<Action>) => {
    try {
      dispatch({
        type: USER_REGISTER_ACTION.USER_REGISTER_REQUEST,
      });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        '/api/users',
        {
          name,
          email,
          password,
        },
        config,
      );
      dispatch({
        type: USER_REGISTER_ACTION.USER_REGISTER_SUCCESS,
        payload: data,
      });
      dispatch({
        type: USER_LOGIN_ACTION.USER_LOGIN_SUCCESS,
        payload: data,
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_ACTION.USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const logout = () => (dispatch: Dispatch<Action>) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGIN_ACTION.USER_LOGOUT });
  dispatch({ type: USER_REGISTER_ACTION.USER_REGISTER_LOGOUT });
  dispatch({ type: USER_DETAILS_ACTION.USER_DETAILS_RESET });
  dispatch({ type: USER_LIST_ACTION.USER_LIST_RESET });
};

export const getUserDetails =
  (id: string) => async (dispatch: Dispatch<Action>, getState: GetState) => {
    try {
      dispatch({
        type: USER_DETAILS_ACTION.USER_DETAILS_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.get(`/api/users/${id}`, config);
      dispatch({
        type: USER_DETAILS_ACTION.USER_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_DETAILS_ACTION.USER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateUserProfile =
  (user: object) => async (dispatch: Dispatch<Action>, getState: GetState) => {
    try {
      dispatch({
        type: USER_UPDATE_PROFILE_ACTION.USER_UPDATE_PROFILE_REQUEST,
      });
      const {
        userLogin: { userInfo },
      }: any = getState();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(`/api/users/profile`, user, config);
      dispatch({
        type: USER_UPDATE_PROFILE_ACTION.USER_UPDATE_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_UPDATE_PROFILE_ACTION.USER_UPDATE_PROFILE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listUsers =
  () => async (dispatch: Dispatch<Action>, getState: GetState) => {
    try {
      dispatch({
        type: USER_LIST_ACTION.USER_LIST_REQUEST,
      });
      const {
        userLogin: { userInfo },
      }: any = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/users`, config);
      dispatch({
        type: USER_LIST_ACTION.USER_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_LIST_ACTION.USER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteUser =
  (id: string) => async (dispatch: Dispatch<Action>, getState: GetState) => {
    try {
      dispatch({
        type: USER_REQUEST_ACTION.USER_DELETE_REQUEST,
      });
      const {
        userLogin: { userInfo },
      }: any = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.delete(`/api/users/${id}`, config);
      dispatch({
        type: USER_REQUEST_ACTION.USER_DELETE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: USER_REQUEST_ACTION.USER_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateUser =
  (user: any) => async (dispatch: Dispatch<Action>, getState: GetState) => {
    try {
      dispatch({
        type: USER_UPDATE_ACTION.USER_UPDATE_REQUEST,
      });
      const {
        userLogin: { userInfo },
      }: any = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(`/api/users/${user._id}`, user, config);
      dispatch({
        type: USER_UPDATE_ACTION.USER_UPDATE_SUCCESS,
      });
      dispatch({
        type: USER_DETAILS_ACTION.USER_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_UPDATE_ACTION.USER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
