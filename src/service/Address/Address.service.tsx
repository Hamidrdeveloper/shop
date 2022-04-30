import React from 'react';
import PropTypes from 'prop-types';
import * as Type from './types';
import http from '../../utils/http-common';
import {TOKEN} from '../../utils/main';
import * as Url from '../../utils/adress.api';
import Storage from '../../utils/storeData';
import axios from 'axios';

class AddressDataService {
  async addAddress(address:Type.ContactGroupsContext) {
    try {
      const res = await http
        .post(Url.Contact_Groups_ADDRESS,address);
      console.log(Url.Contact_Groups_ADDRESS, res.data.data);
      return res.data.data;
    } catch (error) {
      console.log(Url.Contact_Groups_ADDRESS, error.response);

      throw new Error(error);
    }
  }
  async removeAddress(address:Type.ContactGroupsContext) {
    try {
      const res = await http
        .post(Url.Contact_Groups_ADDRESS);
      console.log(Url.Contact_Groups_ADDRESS, res.data.data);
      return res.data.data;
    } catch (error) {
      console.log(Url.Contact_Groups_ADDRESS, error.response);

      throw new Error(error);
    }
  }
  async getAddress() {
    try {
      const res = await http
        .get(Url.Contact_Groups_ADDRESS);
      console.log(Url.Contact_Groups_ADDRESS, res.data.data);
      return res.data.data;
    } catch (error) {
      console.log(Url.Contact_Groups_ADDRESS, error.response);

      throw new Error(error);
    }
  }
  
}

export default new AddressDataService();
