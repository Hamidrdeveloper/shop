import React, {useEffect, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {Message} from 'react-native-iconly';
import {Color} from '../../infrastructuer/theme/colors.style';
import {Space} from '../../infrastructuer/theme/space.style';
import {SignUpModel} from '../../service/Auth/model';
import {TextInputSign, ViewRowTextInput, ViewIcon} from './style/signUp.style';

export default function PartOne({onChangeValue = value => {}}) {
  const [firstName, setFirstName] = useState(SignUpModel.first_name);
  const [email, setEmail] = useState(SignUpModel.email);
  const [lastName, setLastName] = useState(SignUpModel.last_name);
  useEffect(() => {
    if (firstName && lastName && email) {
      onChangeValue(true);
    } else {
      onChangeValue(false);
    }
  }, [firstName, lastName, email]);
  return (
    <>
      <Text style={{color: Color.brand.black}}>{'First Name'}</Text>
      <Space lineH={10} />
      <TextInputSign
        placeholder={'First Name'}
        placeholderTextColor={'#000'}
        value={firstName}
        onChangeText={e => {
          SignUpModel.first_name = e;
          setFirstName(e);
        }}
      />
      <Space lineH={20} />
      <Text style={{color: Color.brand.black}}>{'Last Name'}</Text>
      <Space lineH={10} />
      <TextInputSign
        placeholder={'Last Name'}
        placeholderTextColor={'#000'}
        onChangeText={e => {
          SignUpModel.last_name = e;
          setLastName(e);
        }}
      />
      <Space lineH={20} />
      <Text style={{color: Color.brand.black}}>{'Email'}</Text>
      <Space lineH={10} />
      <ViewRowTextInput>
        <TextInputSign
          placeholder={'Yourmail@gmail.com'}
          placeholderTextColor={'#000'}
          onChangeText={e => {
            SignUpModel.email = e;
            setEmail(e);
          }}
        />
        <ViewIcon>
          <Message size={'medium'} primaryColor={Color.brand.textGrey} />
        </ViewIcon>
      </ViewRowTextInput>
      <Space lineH={10} />
    </>
  );
}
