import React, {createContext, ReactElement, useState} from 'react';
import Toast from '../../components/toast';
import {
  addAddressAc,
  editAddressAc,
  getAddressAc,
  removeAddressAc,
} from './Address.action';
import * as Type from './types';
import Storage from '../../utils/storeData/index';
import {KEY} from '../../utils/storeData/key';
interface IAddressContext {
  addresses: Array<Type.ContactGroups>;
  saveAddresses: Array<Type.ContactGroups>;
  isAddToData: boolean;
  getAddressFn: () => void;
  loadedSaveAddressFn: () => void;
  addAddressFn: (address: Type.ContactGroupsContext) => void;
  editAddressFn: (address: Type.ContactGroupsContext, id: number) => void;
  removeAddressFn: (address: Type.ContactGroupsContext) => void;
  addToMainAddressFn: (address: Type.ContactGroupsContext) => void;
  deleteAddressFn: (product) => void;
  addressSelect: any;
  getAddressSelect: () => void;
  isAddToDataLodging: boolean;
}
export const AddressContext = createContext<IAddressContext>(
  {} as IAddressContext,
);
export default function AddressContextProvider({
  children,
}: {
  children: ReactElement;
}) {
  const [addressSelect, setAddressSelect] = useState('');

  const [isAddToDataLodging, setAddToDataLoding] = useState(false);

  const [isAddToData, setAddToData] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [saveAddresses, setSaveAddresses] = useState([]);

  function getAddressSelect() {
    Storage.retrieveData(KEY.AddressSelect).then(res => {
      console.log('==============retrieveData======================');
      console.log(JSON.parse(res));
      console.log('===============retrieveData=====================');
      setAddressSelect(JSON.parse(res));
    });
  }
  function deleteAddressFn(product) {
    Storage.removeData(product.name);
    Storage.retrieveData(KEY.MySave).then(res => {
      let productsSave = JSON.parse(res);
      let setData = productsSave?.filter(function (value) {
        return value.id !== product.id;
      });

      console.log('setData', setData);
      Storage.storeData(KEY.MySave, JSON.stringify(setData)).then(() => {
        loadedSaveAddressFn();
      });
    });
  }
  function loadedSaveAddressFn() {
    console.log(KEY.MySave, KEY.MySave);

    Storage.retrieveData(KEY.MySave).then(res => {
      console.log(KEY.MySave, JSON.parse(res));

      setSaveAddresses(JSON.parse(res));
    });
  }
  function addToMainAddressFn(address: Type.ContactGroupsContext) {
    console.log('===================JSON.stringify(address)=================');
    console.log(JSON.stringify(address));
    console.log('====================JSON.stringify(address)================');
    setAddressSelect(address);
    Storage.storeData(KEY.AddressSelect, JSON.stringify(address));
  }
  function addAddressFn(address: Type.ContactGroupsContext) {
    setAddToData(false);
    setAddToDataLoding(true);
    addAddressAc(address).then(is => {
      getAddressFn();
      if (is != null) setAddToData(true);
    });
    setAddToDataLoding(false);
  }
  function editAddressFn(address: Type.ContactGroupsContext, id: number) {
    setAddToData(false);
    setAddToDataLoding(true);
    editAddressAc(address, id).then(is => {
      getAddressFn();
      if (is != null) setAddToData(true);
    });
    setAddToDataLoding(false);
  }
  function getAddressFn() {
    getAddressAc().then(is => {
      setAddresses(is);
    });
  }
  function removeAddressFn(address: Type.ContactGroupsContext) {
    removeAddressAc(address).then(is => {
      getAddressFn();
      setAddresses(is);
      deleteAddressFn(address);
    });
  }

  return (
    <AddressContext.Provider
      value={{
        addToMainAddressFn,
        addAddressFn,
        editAddressFn,
        getAddressFn,
        removeAddressFn,
        addresses,
        isAddToData,
        loadedSaveAddressFn,
        saveAddresses,
        deleteAddressFn,
        addressSelect,
        getAddressSelect,
        isAddToDataLodging,
      }}>
      {children}
    </AddressContext.Provider>
  );
}
