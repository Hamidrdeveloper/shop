/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useContext, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Color} from '../../infrastructuer/theme/colors.style';
import {Space} from '../../infrastructuer/theme/space.style';
import DateField from 'react-native-datefield';
import Picker from '../../components/picker/components/Picker';
import {SignUpModel} from '../../service/Auth/model';
import {TitleInput, ViewRowTextPicker} from './style/signUp.style';
import {useEffect} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {AuthContext} from '../../service/Auth/Auth.context';
import BirthdayComponent from '../../components/birthday';
import RadioButton from '../../components/radioButton';
import email from '../profileInformation/component/email';
import {BackgroundForm, ButtonColor, ShadowButton} from '../../css/main.style';

export default function PartTwo({onChangeValue}) {
  const {countries, language} = useContext(AuthContext);
  const [openCountry, setOpenCountry] = useState(false);
  const [openLanguage, setOpenLanguage] = useState(false);
  const [valueLanguage, setValueLanguage] = useState(null);
  const [valueCountry, setValueCountry] = useState(null);
  const [birthDay, setBirthDay] = useState(null);
  const [isForm, setForm] = useState(false);

  SignUpModel.gender = 'male';
  useEffect(() => {
    if (valueCountry && valueLanguage && birthDay) {
      setForm(true);
    } else {
      setForm(false);
    }
  }, [valueCountry, valueLanguage]);
  function radioClick(index) {
    if (index == 1) {
      SignUpModel.gender = 'male';
    } else {
      SignUpModel.gender = 'female';
    }
  }

  return (
    <>
      <BackgroundForm>
        <TitleInput>{'Birthday'}</TitleInput>
        <Space lineH={10} />
        <BirthdayComponent
          onChange={value => {
            SignUpModel.birth_date = value;
            setBirthDay(value);
          }}
        />
        <Space lineH={10} />
        <TitleInput>{'Country'}</TitleInput>
        <Space lineH={10} />
        <Picker
          containerStyle={{width: '100%'}}
          style={{
            borderColor: Color.brand.border,
            backgroundColor: Color.brand.f9,
          }}
          placeholderStyle={{fontSize: 18}}
          placeholder={'Your Country'}
          open={openCountry}
          value={valueCountry}
          items={countries}
          setOpen={setOpenCountry}
          setValue={setValueCountry}
        />
        <Space lineH={10} />
        <TitleInput>{'Language'}</TitleInput>
        <Space lineH={10} />
        <Picker
          containerStyle={{width: '100%'}}
          style={{
            borderColor: Color.brand.border,
            backgroundColor: Color.brand.f9,
          }}
          placeholderStyle={{fontSize: 18}}
          placeholder={'Your Language'}
          open={openLanguage}
          value={valueLanguage}
          items={language}
          setOpen={setOpenLanguage}
          setValue={setValueLanguage}
        />
        <Space lineH={30} />

        <RadioButton
          flexDirection={'row'}
          items={[
            {
              title: 'Male',
              description: '',
              id: 0,
            },
            {
              title: 'Female',
              description: '',
              id: 1,
            },
          ]}
          onClick={data => {
            radioClick(data);
          }}
        />

        <Space lineH={10} />
      </BackgroundForm>
      <View>
        <ButtonColor
          onPress={() => {
            onChangeValue();
          }}>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 18,
              color: Color.brand.white,
            }}>
            {'Next'}
          </Text>
        </ButtonColor>
        {!isForm ? <ShadowButton /> : null}
      </View>
    </>
  );
}
