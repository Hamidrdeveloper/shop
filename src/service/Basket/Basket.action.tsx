import BasketDataService from './Basket.service';
import React, { useContext } from 'react';
import * as Type from './types';
import { CommentContext } from '../Comment/Comment.context';
export function BasketsAc(data) {
  return BasketDataService.bulkAdd(data);
}
export function crateOrderSaleAc(id) {
  return BasketDataService.crateOrderSale(id);
}
export function orderSalesAc() {
  return BasketDataService.orderSale();
}
