import React from 'react';
import PropTypes from 'prop-types';
import http from '../../utils/http-common';
import {TOKEN} from '../../utils/main';
import Storage from '../../utils/storeData';
import * as Type from './types';
import * as Address from '../../utils/adress.api';

class BasketDataService {
  taxCalculation(data: any) {
    return data.map(res => {
      let vat =
        res?.sale_price?.value *
        res?.product?.min_order_quantity *
        (1 + res?.product?.default_vat / 100);
      return {
        ...res,
        sale_price: {
          value: vat,
        },
      };
    });
  }
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
  crateOrderSale(data: Type.BasketAddForPay) {
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
        return this.taxCalculation(res.data.data);
      })
      .catch(error => {
        console.log(Address.Basket_OrderSale_ADDRESS, error.response);
      });
  }
  basketAdd() {
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
  paymentMethods() {
    return http
      .get(
        Address.PAYMENT_METHODS +
          '?page=1&per_page=100&companyCountryId=83&companyCurrencyId=49',
      )
      .then(res => {
        console.log(Address.PAYMENT_METHODS, res);
        return res.data.data;
      })
      .catch(error => {
        console.log(Address.PAYMENT_METHODS, error.response);
      });
  }
  coupons(code: string) {
    return http
      .post(Address.COUPONS, {code: code})
      .then(res => {
        console.log(Address.PAYMENT_METHODS, res);
        return res.data.data;
      })
      .catch(error => {
        console.log(Address.PAYMENT_METHODS, error.response);
      });
  }
  favorites() {
    return http
      .get(Address.Favorites + '?per_page=50')
      .then(res => {
        console.log(Address.PAYMENT_METHODS, res);
        return res.data.data;
      })
      .catch(error => {
        console.log(Address.PAYMENT_METHODS, error.response);
      });
  }
  favoritesAdd(id: number) {
    return http
      .post(Address.Favorites, {product_variation_ids: [{id}]})
      .then(res => {
        console.log(Address.Favorites, res);
        return res.data.data;
      })
      .catch(error => {
        console.log(Address.Favorites, error.response);
      });
  }
}
export default new BasketDataService();
