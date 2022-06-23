import React, {createContext, ReactElement, useState} from 'react';
import Toast from '../../components/toast';
import {ProductVariation} from '../Products/types';
import * as AC from './Basket.action';
import {BasketBulkModel} from './model';

interface IBasketContext {
  addToBasket: (product: ProductVariation) => void;
  removeToBasket: (product: ProductVariation) => void;
  basketsExited: Array<any>;
  numberBasket: number;
  resultSymbol: string;
  resultPrice: string;
  numberProducts: Array<any>;
  bulkAdd: (id) => void;
  listOrderSale: Array<any>;
  orderSale: () => void;
  orderSalePadding: Array<any>;
  orderSaleCompleted: Array<any>;
  orderSaleCancel: Array<any>;
  orderSaleWhiting: Array<any>;
  crateOrderSale: (id) => void;
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
  const [listOrderSale, setListOrderSale] = useState<any>([]);
  const [orderSalePadding, setOrderSalePadding] = useState<any>([]);
  const [orderSaleCompleted, setOrderSaleCompleted] = useState<any>([]);
  const [orderSaleCancel, setOrderSaleCancel] = useState<any>([]);
  const [orderSaleWhiting, setOrderSaleWhiting] = useState<any>([]);

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

    setResultPrice(parseInt(resultPrice) + parseInt(product?.productVariationPrices[0].value));
    setResultSymbol(product?.productVariationPrices[0].price.currency.symbol);
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
    let price = parseInt(resultPrice) - parseInt(product?.productVariationPrices[0].value);
    setResultPrice(price.toString());
    setResultSymbol(product?.productVariationPrices[0].price.currency.symbol);
  }
  function bulkAdd(id) {
    let product = basketsExited.map(value => {
      return {count: value.numberBasket, product_variation_id: value.id};
    });
    let params = (BasketBulkModel.items = product);
    AC.BasketsAc(params).then(res => {
      console.log('bulkAdd', res);
      crateOrderSale(id);
      orderSale();
    });
  }
  function crateOrderSale(id) {
    AC.crateOrderSaleAc(id).then(res => {
      setBasketsExited([]);
      console.log('bulkAdd', res);
      orderSale();
    });
  }
  function orderSale() {
    AC.orderSalesAc().then(res => {
      console.log('orderSale', res);
      setListOrderSale(res);
      res.forEach(element => {
        switch (element.payment_status) {
          case 'not_paid':
            setOrderSalePadding([...orderSalePadding, element]);
            return;
          case '':
            return;
        }
      });
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
        numberProducts
      }}>
      {children}
    </BasketContext.Provider>
  );
}
