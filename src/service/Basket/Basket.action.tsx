import BasketDataService from './Basket.service';
import React, {useContext} from 'react';
import * as Type from './types';
import {CommentContext} from '../Comment/Comment.context';
export function BasketsAc(data) {
  return BasketDataService.bulkAdd(data);
}
export function crateOrderSaleAc(data: Type.BasketAddForPay) {
  return BasketDataService.crateOrderSale(data);
}
export function orderSalesAc() {
  return BasketDataService.orderSale();
}
export function paymentMethodsAc() {
  return BasketDataService.paymentMethods();
}
export function couponsAc(code: string) {
  return BasketDataService.coupons(code);
}
export function favoritesAc() {
  return BasketDataService.favorites();
}
export function favoritesAddAc(id: number) {
  return BasketDataService.favoritesAdd(id);
}
