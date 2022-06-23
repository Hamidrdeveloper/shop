import React, {useContext, useEffect, useState} from 'react';
import Picker from '../../components/picker/components/Picker';
import {Color} from '../../infrastructuer/theme/colors.style';
import {Space} from '../../infrastructuer/theme/space.style';
import {Attribute} from '../../service/Products/types';
import {TextBlack18, ViewRate} from './style/DetailsProduct.styles';
import styled from 'styled-components';
import {ProductContext} from '../../service/Products/Product.context';

const TextPicker = styled(TextBlack18)`
  width: 140;
  font-size: 16;
`;
interface Type {
  data: Array<any>;
  setProduct: any;
}

export default function AttributeItem({data, setProduct}: Type) {
  const {productByAttributesFn} = useContext(ProductContext);
  const [openArray, setOpenArray] = useState([]);
  const [openArrayDefault, setOpenArrayDefault] = useState([]);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);
  useEffect(() => {
    let openData = [];
    data.forEach(() => {
      openData.push(false);
    });
    setOpenArray(openData);
    setOpenArrayDefault(openData);
  }, []);
  useEffect(() => {
    if (value!=null) {
      setValueFn(value);
    }
  }, [value]);
  const setValueFn = e => {
    console.log('attribute', e);
    productByAttributesFn(e).then(res => {
      setProduct(res);
    });
  };
  const setOpenLanguage = i => {
    let changeData = openArray.map((v, index) => {
      console.log('typeBox', v + ' ' + index);

      if (index === i) {
        return !v;
      } else {
        return false;
      }
    });

    console.log('typeBox', openArray[i]);

    setOpenArray([...changeData]);
  };
  const ListAttr = () => {
    return (
      <>
        {openArray?.map((value, index) => {
          return typeBox(value, index);
        })}
      </>
    );
  };
  const typeBox = (item: Attribute, index: number) => {
    console.log('typeBox', item);

    return (
      <>
        <Space lineH={20} />
        <ViewRate>
          <TextPicker>{`${data[index][0]?.name} :`}</TextPicker>
          <Space lineW={20} />

          <Picker
            containerStyle={{width: 220}}
            style={{borderColor: Color.brand.border}}
            open={item}
            value={value}
            items={data[index]}
            setOpen={() => setOpenLanguage(index)}
            setValue={setValue}
            setItems={setItems}
          />
        </ViewRate>
      </>
    );
  };
  return (
    <>
      <ListAttr />
    </>
  );
}
