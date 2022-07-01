import {ButtonHeart} from '../../screen/shop/style/shop.style';
import Storage from '../../utils/storeData/index';
import React, {useContext, useEffect, useState} from 'react';
import {KEY} from '../../utils/storeData/key';
import {AddressContext} from '../../service/Address/Address.context';

export function CheckSaveProduct({item}) {
  const {loadedSaveAddressFn, saveProduct} = useContext(AddressContext);

  const [state, setState] = useState(false);

  useEffect(() => {
    Storage.retrieveData(item.name).then(res => {
      if (res != null) {
        setState(true);
      } else {
        setState(false);
      }
    });
  }, [saveProduct]);
  const _onSaveProduct = (nameProduct, product: any) => {
    if (state) {
      setState(false);
      Storage.removeData(nameProduct);
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
    } else {
      setState(true);
      Storage.storeData(nameProduct, JSON.stringify(product));
      Storage.retrieveData(KEY.MySave).then(res => {
        let productsSave = [];
        if (res != null) {
          productsSave = [...JSON.parse(res), product];
        } else {
          productsSave.push(product);
        }

        console.log(productsSave);
        Storage.storeData(KEY.MySave, JSON.stringify(productsSave)).then(() => {
          loadedSaveAddressFn();
        });
      });
    }
  };
  return (
    <>
      <ButtonHeart
        set={state ? 'bold' : 'light'}
        onPress={() => _onSaveProduct(item.name, item)}
      />
    </>
  );
  // });
}
