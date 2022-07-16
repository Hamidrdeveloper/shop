import React, {createContext, ReactElement, useState} from 'react';
import Toast from '../../components/toast';
import {ProductVariation} from '../Products/types';
import * as AC from './Basket.action';
import {BasketBulkModel} from './model';
import {BasketAddForPay} from './types';

interface IBasketContext {
  addToBasket: (product: ProductVariation) => void;
  removeToBasket: (product: ProductVariation) => void;
  basketsExited: Array<any>;
  numberBasket: number;
  resultSymbol: string;
  resultPrice: string;
  totalPrice: number;
  shipping: number;
  numberProducts: Array<any>;
  bulkAdd: (id) => void;
  listOrderSale: Array<any>;
  orderSale: () => void;
  orderSalePadding: Array<any>;
  orderSaleCompleted: Array<any>;
  orderSaleCancel: Array<any>;
  orderSaleWhiting: Array<any>;
  paymentMethods: Array<any>;
  crateOrderSale: (id) => void;
  paymentMethodsFn: () => void;
  couponsFn: (code: string) => void;
  isCoupons: boolean;
  codePrice: string;
  favoritesAddFn: (id: number) => void;
  favoritesFn: () => void;
  arrayFavorite: undefined;
}
export const BasketContext = createContext<IBasketContext>(
  {} as IBasketContext,
);
export default function BasketContextProvider({
  children,
}: {
  children: ReactElement;
}) {
  const [basketsExited, setBasketsExited] = useState([]);
  const [numberBasket, setNumberBasket] = useState(0);
  const [resultPrice, setResultPrice] = useState('0');
  const [resultSymbol, setResultSymbol] = useState('');
  const [numberProducts, setNumberProducts] = useState<any>([]);
  const [paymentMethods, setPaymentMethods] = useState<any>([]);
  const [shipping, setShipping] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [codePrice, setCodePrice] = useState<string>('0');
  const [isCoupons, setCoupons] = useState<boolean>(false);

  const [listOrderSale, setListOrderSale] = useState<any>([]);
  const [orderSalePadding, setOrderSalePadding] = useState<any>([]);
  const [orderSaleCompleted, setOrderSaleCompleted] = useState<any>([]);
  const [orderSaleCancel, setOrderSaleCancel] = useState<any>([]);
  const [orderSaleWhiting, setOrderSaleWhiting] = useState<any>([]);
  const [arrayFavorite, setArrayFavorite] = useState<any>([]);

  function paymentMethodsFn() {
    AC.paymentMethodsAc().then(res => {
      setPaymentMethods(res);
    });
  }
  function addToBasket(product: ProductVariation) {
    const filter = basketsExited.filter(val => {
      return val.id == product.id;
    });
    console.log(filter);

    if (filter.length == 0) {
      let bask = {...product, numberBasket: 1};
      setBasketsExited([...basketsExited, bask]);
      setNumberBasket(numberBasket + 1);
    } else {
      let dataP = basketsExited;
      dataP.map((val, index) => {
        if (val.id == product.id) {
          dataP[index] = {...product, numberBasket: val.numberBasket + 1};
        }
      });
      console.log('dataP', dataP);

      setBasketsExited(dataP);
    }
    let price = parseFloat(resultPrice) + parseFloat(product?.sale_price.value);
    console.log('parseFloat', price);
    console.log('parseFloatresultPrice', resultPrice);
    console.log(
      'parseFloatproduct?.sale_price.value',
      product?.sale_price.value,
    );
    setResultPrice(price);
    if (price < 20) {
      setShipping(5);
      setTotalPrice(price + 5);
    } else {
      setShipping(0);
      setTotalPrice(price);
    }

    setResultSymbol('€');
  }

  function removeToBasket(product: ProductVariation) {
    if (product.numberBasket == 1) {
      setNumberBasket(numberBasket - 1);
      setBasketsExited(
        basketsExited.filter(function (val) {
          return val.id !== product.id;
        }),
      );
    } else {
      let dataP = basketsExited;
      dataP.map((val, index) => {
        if (val.id == product.id) {
          dataP[index] = {...product, numberBasket: val.numberBasket - 1};
        }
      });
      console.log('dataP', dataP);

      setBasketsExited(dataP);
    }
    let price = parseFloat(resultPrice) - parseFloat(product?.sale_price.value);
    setResultPrice(price.toString());
    if (price < 20) {
      setShipping(5);
      setTotalPrice(price + 5);
    } else {
      setTotalPrice(price);
    }

    setResultSymbol('€');
  }
  function bulkAdd(id) {
    let product = basketsExited.map(value => {
      return {count: value.numberBasket, product_variation_id: value.id};
    });
    let params = (BasketBulkModel.items = product);
    AC.BasketsAc(params).then(res => {
      setTotalPrice(0);
      setResultPrice(0);
      console.log('bulkAdd', res);
      crateOrderSale(id);
      orderSale();
    });
  }
  function crateOrderSale(data: BasketAddForPay) {
    AC.crateOrderSaleAc(data).then(res => {
      setBasketsExited([]);
      console.log('bulkAdd', res);
      setNumberBasket(0);
      orderSale();
    });
  }
  function orderSale() {
    AC.orderSalesAc().then(res => {
      console.log('orderSale', res);
      setListOrderSale(res);
      // res.forEach(element => {
      //   setOrderSalePadding([...orderSalePadding, element]);
      // });
    });
  }
  function couponsFn(code: string) {
    setCoupons(false);
    AC.couponsAc(code).then(res => {
      console.log('couponsFn', res);
      setCoupons(true);
      setCodePrice('5%');
      let offer = totalPrice - 5;
      setTotalPrice(offer);
    });
    setCoupons(false);
  }
  function favoritesAddFn(id: number) {
    AC.favoritesAddAc(id).then(res => {
      console.log('favoritesAddFn', res);
    });
  }

  function favoritesFn() {
    AC.favoritesAc().then(res => {
      console.log('favoritesFn', res);
      setArrayFavorite(res);
    });
  }

  return (
    <BasketContext.Provider
      value={{
        addToBasket,
        basketsExited,
        numberBasket,
        resultPrice,
        resultSymbol,
        removeToBasket,
        bulkAdd,
        orderSale,
        listOrderSale,
        orderSalePadding,
        orderSaleCompleted,
        orderSaleCancel,
        orderSaleWhiting,
        crateOrderSale,
        numberProducts,
        paymentMethodsFn,
        paymentMethods,
        shipping,
        totalPrice,
        couponsFn,
        isCoupons,
        codePrice,
        favoritesAddFn,
        arrayFavorite,
        favoritesFn,
      }}>
      {children}
    </BasketContext.Provider>
  );
}
