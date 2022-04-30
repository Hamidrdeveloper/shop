import React from 'react';
import PropTypes from 'prop-types';
import {Email, SignIn, SignUp} from './types';
import http from '../../utils/http-common';
import {TOKEN} from '../../utils/main';
import {
  COUNTRIES_ADDRESS,
  EMAIL_ADDRESS,
  LANGUAGE_ADDRESS,
  SIGNIN_ADDRESS,
  SIGNUP_ADDRESS,
} from '../../utils/adress.api';
import Storage from '../../utils/storeData';

class AuthDataService {
  signUp(data: SignUp) {
    console.log(data);

    return http
      .post(SIGNUP_ADDRESS, data)
      .then(res => {
        console.log(SIGNUP_ADDRESS, res.data.data.token);
        TOKEN.token = res.data.data.token;
        Storage.storeData('TOKEN', res.data.data.token);
        return true;
      })
      .catch(error => {
        console.log(SIGNUP_ADDRESS, error.response);

        return false;
      });
  }
  signIn(data: SignIn) {
    console.log(data);

    return http
      .post(SIGNIN_ADDRESS, data)
      .then(res => {
        console.log(SIGNIN_ADDRESS, res.data.data.token);
        TOKEN.token = res.data.data.token;
        Storage.storeData('TOKEN', res.data.data.token);
        return true;
      })
      .catch(error => {
        console.log(SIGNIN_ADDRESS, error.response);
        return false;
      });
  }

  forgetPassword(data: Email) {
    console.log(data);

    return http
      .post(EMAIL_ADDRESS, data)
      .then(res => {
        console.log(EMAIL_ADDRESS, res.data.data.message);

        return res.data.data.message;
      })
      .catch(error => {
        console.log(EMAIL_ADDRESS, error.response);
        return 'Error';
      });
  }

  countries() {
    return http
      .get(COUNTRIES_ADDRESS, {params: {isActive: true, per_page: 200}})
      .then(res => {
        console.log(COUNTRIES_ADDRESS, res.data.data);
        return res.data.data;
      })
      .catch(error => {
        console.log(COUNTRIES_ADDRESS, error.response);

        return false;
      });
  }
  language() {
    return http
      .get(LANGUAGE_ADDRESS, {params: {isActive: true, per_page: 200}})
      .then(res => {
        console.log(LANGUAGE_ADDRESS, res.data.data);
        return res.data.data;
      })
      .catch(error => {
        console.log(LANGUAGE_ADDRESS, error.response);

        return error;
      });
  }
}
export default new AuthDataService();
