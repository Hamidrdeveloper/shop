import React from 'react';
import PropTypes from 'prop-types';
import http from '../../utils/http-common';
import {TOKEN} from '../../utils/main';
import Storage from '../../utils/storeData';
import * as Type from './types';
import * as Address from '../../utils/adress.api';

class ProductDataService {
  productsSearch(data: Type.Products) {
    console.log(Address.PRODUCTS_VARIATIONS_ADDRESS, data);

    return http
      .get(Address.PRODUCTS_VARIATIONS_ADDRESS, {params: data})
      .then(res => {
        console.log(Address.PRODUCTS_VARIATIONS_ADDRESS, res);
        return res.data.data;
      })
      .catch(error => {
        console.log(Address.PRODUCTS_VARIATIONS_ADDRESS, error.response);
      });
  }
  products(data: Type.Products) {
    console.log(Address.PRODUCTS_ADDRESS, data);

    return http
      .get(Address.PRODUCTS_ADDRESS, {params: data})
      .then(res => {
        console.log(Address.PRODUCTS_ADDRESS, res);
        return res.data.data;
      })
      .catch(error => {
        console.log(Address.PRODUCTS_ADDRESS, error.response);
      });
  }
  categories() {
    console.log(Address.PRODUCTS_CATEGORIES_ADDRESS, TOKEN.token);

    return http
      .get(Address.PRODUCTS_CATEGORIES_ADDRESS)
      .then(res => {
        console.log(Address.PRODUCTS_CATEGORIES_ADDRESS, res.data.data);
        return res.data.data;
      })
      .catch(error => {
        console.log(Address.PRODUCTS_CATEGORIES_ADDRESS, error.response);
      });
  }
  categoriesTree() {
    console.log(Address.PRODUCTS_CATEGORIES_TREE_ADDRESS, TOKEN.token);

    return http
      .get(Address.PRODUCTS_CATEGORIES_TREE_ADDRESS)
      .then(res => {
        console.log(Address.PRODUCTS_CATEGORIES_TREE_ADDRESS, res.data.data);
        return res.data.data;
      })
      .catch(error => {
        console.log(Address.PRODUCTS_CATEGORIES_TREE_ADDRESS, error.response);
      });
  }

  async getVariationsByProduct(
    productId: number,
  ): Promise<Type.ProductVariation> {
    return http
      .get(Address.PRODUCTS_BY_ID_ADDRESS, {params: {productId: productId}})
      .then(res => {
        console.log(Address.PRODUCTS_BY_ID_ADDRESS, res.data.data[0]);
        return res.data.data[0];
      })
      .catch(error => {
        console.log(Address.PRODUCTS_BY_ID_ADDRESS, error.response);
      });
  }

  //   async productComments (productVariationId: number): Promise<ProductComment[]>{

  //     return await http
  //     .get(Address.PRODUCTS_BY_ID_ADDRESS,{
  //       params: {
  //         foo: 'bar'
  //       }}
  //     .then(res => {
  //       console.log(Address.PRODUCTS_BY_ID_ADDRESS, res);
  //       return res.data.data;
  //     })
  //     .catch(error => {
  //       console.log(Address.PRODUCTS_BY_ID_ADDRESS, error.response);
  //     });

  // };
}
export default new ProductDataService();
