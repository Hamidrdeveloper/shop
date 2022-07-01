import React from 'react';
import PropTypes from 'prop-types';
import http from '../../utils/http-common';
import {TOKEN} from '../../utils/main';
import Storage from '../../utils/storeData';
import * as Type from './types';
import * as Address from '../../utils/adress.api';

class BasketDataService {
  bulkAdd(basket: Type.Baskets) {
    console.log(Address.Basket_Bulk_ADDRESS, basket);
    let data = {items: basket};
    return http
      .post(Address.Basket_Bulk_ADDRESS, JSON.stringify(data))
      .then(res => {
        console.log(Address.Basket_Bulk_ADDRESS, res);
        return res.data.data;
      })
      .catch(error => {
        console.log(Address.Basket_Bulk_ADDRESS, error.response);
      });
  }
  crateOrderSale(id) {
    let data = {
      payment_method_id: 1,
      delivery_contact_group_id: id,
      invoice_contact_group_id: id,
    };

    return http
      .post(Address.Basket_CREATE_ORDER_ADDRESS, JSON.stringify(data))
      .then(res => {
        console.log(Address.Basket_CREATE_ORDER_ADDRESS, res);
        return res.data.data;
      })
      .catch(error => {
        console.log(Address.Basket_CREATE_ORDER_ADDRESS, error.response);
      });
  }
  orderSale() {
    return http
      .get(Address.Basket_OrderSale_ADDRESS + '?page=1&per_page=30')
      .then(res => {
        console.log(Address.Basket_OrderSale_ADDRESS, res);
        return res.data.data;
      })
      .catch(error => {
        console.log(Address.Basket_OrderSale_ADDRESS, error.response);
      });
  }
}
export default new BasketDataService();
