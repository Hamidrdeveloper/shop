import ProductDataService from './Product.service';
import React, {useContext} from 'react';
import {ProductsModel} from './model';
import * as Type from './types';
import {CommentContext} from '../Comment/Comment.context';
export function productsAc(data) {
  return ProductDataService.products(data);
}

export function productsSearchAc(data) {
  return ProductDataService.productsSearch(data);
}
export function categoriesAc() {
  return ProductDataService.categories();
}
export function categoriesTreeAc() {
  return ProductDataService.categoriesTree();
}
export function productByIdAc(productId: number) {
  return ProductDataService.getVariationsByProduct(productId);
}
export function goToScreenDetails(navigation, product, prFn, cmFn, reFn) {
  navigation.navigate('Details_SCREEN', {data: product});
  prFn(product.id, navigation);
  cmFn(product.id);
  cmFn(product.id);
  reFn(product.productCategories[0].id);
}
export function goToScreenCategory(navigation, product, prFn) {
  navigation.navigate('CategoryPageScreen_SCREEN', {data: product});
  prFn('', product.id);
}
