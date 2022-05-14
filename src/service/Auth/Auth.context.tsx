import React, {createContext, ReactElement, useEffect, useState} from 'react';
import Toast from '../../components/toast';
import {
  singUpAc,
  singInAc,
  forgetPasswordAc,
  languageAc,
  countriesAc,
  linkForgetPasswordAc,
} from './Auth.action';
import {LinkForgetPassword} from './types';

interface IAuthContext {
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
  isRegister: boolean;
  isForgotPasswordOpen: boolean;
  linkForgetPasswordFn: (value: LinkForgetPassword) => void;
  setLoginOpen: (toggle: boolean) => void;
  setRegisterOpen: (toggle: boolean) => void;
  setForgotPasswordOpen: (toggle: boolean) => void;
  singUpFn: () => void;
  singInFn: () => void;
  forgetPasswordFn: () => void;
  countriesFn: () => void;
  languageFn: () => void;
  activeForm: (value: boolean) => void;
  language: any;
  countries: any;
  isForm: boolean;
  isLoginApi: boolean;
}
export const AuthContext = createContext<IAuthContext>({} as IAuthContext);
export default function AuthContextProvider({
  children,
}: {
  children: ReactElement;
}) {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegister, setRegister] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isForgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [countries, setCountries] = useState([]);
  const [language, setLanguage] = useState([]);
  const [isForm, setForm] = useState(false);
  const [isLoginApi, setLoginApi] = useState(false);
  function activeForm(value: boolean) {
   
    setForm(value);
  }
  
  function singUpFn() {
    setRegister(true);
    setLoginOpen(false);
    singUpAc().then(is => {
      setRegister(false);
      setLoginOpen(is);
  
    });
  }
  function singInFn() {
    setLoginApi(true);
    setLoginOpen(false);
    singInAc().then(is => {
      setLoginOpen(is);
      setLoginApi(false);
    });
  }
  function linkForgetPasswordFn(value: LinkForgetPassword) {
    linkForgetPasswordAc(value).then(is => {
      // setLoginOpen(is);
    });
  }
  function forgetPasswordFn() {
    forgetPasswordAc().then(is => {});
  }
  function countriesFn() {
    countriesAc().then(is => {
      let data = is.map(value => {
        return {label: value.name, value: value.id};
      });
      setCountries(data);
    });
  }
  function languageFn() {
    languageAc().then(is => {
      let data = is.map(value => {
        return {label: value.title, value: value.id};
      });
      setLanguage(data);
    });
  }
  return (
    <AuthContext.Provider
      value={{
        isLoginOpen,
        isRegisterOpen,
        isForgotPasswordOpen,
        setLoginOpen,
        isRegister,
        setRegisterOpen,
        setForgotPasswordOpen,
        singUpFn,
        singInFn,
        forgetPasswordFn,
        countriesFn,
        languageFn,
        countries,
        language,
        linkForgetPasswordFn,
        isForm,
        activeForm,
        isLoginApi
      }}>
      {children}
    </AuthContext.Provider>
  );
}
