import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react';
import {TOKEN} from '../../utils/main';
import Storage from '../../utils/storeData';
import {AuthContext} from '../Auth/Auth.context';
import {ProductsModel} from '../Products/model';
import {ProductContext} from '../Products/Product.context';
import http from '../../utils/http-common';
import {ProfileContext} from '../Profile/Profile.context';
import {BasketContext} from '../Basket/Basket.context';
import {PartnerContext} from '../Partner/Partner.context';

interface IMainContext {
  token: string;
  onRunAllApi: () => void;
  onGetUser: () => void;
  onDeleteUser: () => void;
  catchMessage: string;
  catchMessageShow: boolean;
}
export const MainContext = createContext<IMainContext>({} as IMainContext);
export default function MainContextProvider({
  children,
}: {
  children: ReactElement;
}) {
  const [token, setToken] = useState('');
  const {setLoginOpen, countriesFn, languageFn} = useContext(AuthContext);
  const {profileFn} = useContext(ProfileContext);
  const {orderSale} = useContext(BasketContext);
  const {PartnerFn} = useContext(PartnerContext);

  const {
    productsFn,
    newProductsFn,
    categoriesFn,
    arrivalFn,
    cardBottomArrivalFn,
    bestSellingFn,
    categoriesTreeFn,
  } = useContext(ProductContext);

  function onDeleteUser() {
    setLoginOpen(false);
    Storage.removeData('TOKEN');
  }
  function onGetUser() {
    Storage.retrieveData('TOKEN').then(res => {
      console.log('MainContext', res);

      http.defaults.headers.common.Authorization = `Bearer ${res}`;
      profileFn();
      PartnerFn();

      orderSale();
      cardBottomArrivalFn();
      setToken(res);
      TOKEN.token = res;
    });
  }
  useEffect(() => {
    onRunAllApi();
  }, []);

  function onRunAllApi() {
    countriesFn();
    languageFn();
    productsFn();
    categoriesFn();

    arrivalFn();
    cardBottomArrivalFn();
    bestSellingFn();
    newProductsFn();
    categoriesTreeFn();
    Storage.retrieveData('TOKEN').then(res => {
      console.log('MainContext', res);

      http.defaults.headers.common.Authorization = `Bearer ${res}`;
      PartnerFn();

      if (res.length > 15) {
        setLoginOpen(true);
      }
      setToken(res);
      TOKEN.token = res;

      ProductsModel.pagination = {
        page: 1,
        per_page: 12,
      };

      profileFn();
      orderSale();
    });
  }
  return (
    <MainContext.Provider value={{token, onRunAllApi, onGetUser, onDeleteUser}}>
      {children}
    </MainContext.Provider>
  );
}
