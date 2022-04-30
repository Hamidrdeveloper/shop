import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react';
import {TOKEN} from '../../utils/main';
import Storage from '../../utils/storeData';
import { AuthContext } from '../Auth/Auth.context';
import {ProductsModel} from '../Products/model';
import {ProductContext} from '../Products/Product.context';
import http from '../../utils/http-common';
import { ProfileContext } from '../Profile/Profile.context';
import { BasketContext } from '../Basket/Basket.context';

interface IMainContext {
  token: string;
}
export const MainContext = createContext<IMainContext>({} as IMainContext);
export default function MainContextProvider({
  children,
}: {
  children: ReactElement;
}) {
  const [token, setToken] = useState('');
  const {setLoginOpen,countriesFn,languageFn} = useContext(AuthContext);
  const {profileFn,isLodUser} = useContext(ProfileContext);
  const {orderSale} = useContext(BasketContext);
  const {productsFn,newProductsFn,categoriesFn,arrivalFn,cardBottomArrivalFn,bestSellingFn} = useContext(ProductContext);
 
  useEffect(() => {
    countriesFn();
    languageFn();
    productsFn();
    categoriesFn();
    arrivalFn();
    cardBottomArrivalFn();
    bestSellingFn();
    newProductsFn();
    Storage.retrieveData('TOKEN').then(res => {
      console.log("MainContext",res);
      
      http.defaults.headers.common['Authorization'] = `Bearer ${res}`;

      setLoginOpen(true);
      setToken(res);
      TOKEN.token = res;
      
      ProductsModel.pagination = {
        page: 1,
        per_page: 12,
      };

      productsFn();
      categoriesFn();
      arrivalFn();
      profileFn();
      cardBottomArrivalFn();
      bestSellingFn();
      newProductsFn();
      orderSale();
    });
  }, []);
  return (
    <MainContext.Provider value={{token}}>{children}</MainContext.Provider>
  );
}
