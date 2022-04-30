import React, {createContext, ReactElement, useState} from 'react';
import Toast from '../../components/toast';
import {singUpAc, singInAc, forgetPasswordAc, languageAc, countriesAc} from './Auth.action';
import {Email, SignUp} from './types';

interface IAuthContext {
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
  isForgotPasswordOpen: boolean;
  setLoginOpen: (toggle: boolean) => void;
  setRegisterOpen: (toggle: boolean) => void;
  setForgotPasswordOpen: (toggle: boolean) => void;
  singUpFn: () => void;
  singInFn: () => void;
  forgetPasswordFn: () => void;
  countriesFn: () => void;
  languageFn: () => void;
  language:any;
  countries:any;
}
export const AuthContext = createContext<IAuthContext>({} as IAuthContext);
export default function AuthContextProvider({
  children,
}: {
  children: ReactElement;
}) {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isForgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  const [language, setLanguage] = useState([]);
  const [countries, setCountries] = useState([]);
  function singUpFn() {
    singUpAc().then(is => {
      setLoginOpen(is);
    });
  }
  function singInFn() {
    singInAc().then(is => {
      setLoginOpen(is);
    });
  }
  function forgetPasswordFn() {
    forgetPasswordAc().then(is => {
      
    });
  }
  function countriesFn() {
    countriesAc().then(is => {
        let data = is.map((value)=>{
            return {label:value.name,value:value.id}
        })
        setCountries(data)
    });
  }
  function languageFn() {
    languageAc().then(is => {
        let data = is.map((value)=>{
            return {label:value.title,value:value.id}
        })
        setLanguage(data)
    });
  }
  return (
    <AuthContext.Provider
      value={{
        isLoginOpen,
        isRegisterOpen,
        isForgotPasswordOpen,
        setLoginOpen,
        setRegisterOpen,
        setForgotPasswordOpen,
        singUpFn,
        singInFn,
        forgetPasswordFn,
        countriesFn,
        languageFn,
        countries,
        language
      }}>
      {children}
    </AuthContext.Provider>
  );
}
