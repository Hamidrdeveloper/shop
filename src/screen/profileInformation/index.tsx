/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {FunctionComponent, useContext, useState} from 'react';
import {Image, Text, View} from 'react-native';
import {CloseSquare, IconlyProvider} from 'react-native-iconly';
import {Color} from '../../infrastructuer/theme/colors.style';
import {Space} from '../../infrastructuer/theme/space.style';
import Birthday from './component/birthday';
import Country from './component/country';
import Language from './component/language';
import Personal from './component/personal';
import Gender from './component/gender';
import Email from './component/email';
import {FormProvider, SubmitErrorHandler, useForm} from 'react-hook-form';
import {User, UserProfile} from '../../service/Profile/types';
import {HandleEvent} from '../../css/main.style';
import {ProfileContext} from '../../service/Profile/Profile.context';
import DownAlertToast from '../../components/dropDownAlertRef';
import Indicator from '../../components/lodging/indicator';

export default function ProfileInformation({route, navigation}) {
  const {typeInformation, title, text} = route.params;
  const {...methods} = useForm();
  const [formError, setError] = useState<Boolean>(false);
  const {userUpdate, profileUpdateFn, isLoading, isUpdate} =
    useContext(ProfileContext);

  function onSubmit(user: UserProfile) {
    let params: UserProfile = {...userUpdate, ...user};
    profileUpdateFn(params);
    
  }

  const onError: SubmitErrorHandler<UserProfile> = errors => {
    return console.log('errors', errors);
  };
  function RenderEditInformation() {
    switch (typeInformation) {
      case 'Personal':
        return <Personal />;

      case 'Birthday':
        return <Birthday />;

      case 'Country':
        return <Country />;

      case 'Language':
        return <Language />;

      case 'Gender':
        return <Gender />;

      case 'Email':
        return <Email />;
    }
  }
  return (
    <>
      <View
        style={{
          backgroundColor: Color.brand.white,
          width: '100%',
          height: '100%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            height: 50,
            padding: 15,
            backgroundColor: Color.brand.white,
            justifyContent: 'space-between',
          }}>
          <Text style={{color: Color.brand.black, fontSize: 18}}>{title}</Text>
          <IconlyProvider
            primaryColor={Color.brand.black}
            secondaryColor={Color.brand.black}
            stroke="bold"
            size="xlarge">
            <CloseSquare />
          </IconlyProvider>
        </View>
        <Space lineH={25} />
        <View
          style={{
            paddingLeft: 15,
            paddingRight: 15,
            paddingBottom: 15,
            width: '100%',
            height: '90%',
          }}>
          <Text style={{fontSize: 16, color: Color.brand.black}}>{text}</Text>
          <Space lineH={25} />
          <FormProvider {...methods}>
            <RenderEditInformation />
          </FormProvider>
          <HandleEvent
            onPress={methods.handleSubmit(onSubmit, onError)}
            style={{
              height: 50,
              width: '100%',
              position: 'absolute',
              bottom: 15,
              borderRadius: 10,
              alignSelf: 'center',
              justifyContent: 'center',
              backgroundColor: Color.brand.colorButton,
            }}>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 18,
                color: Color.brand.white,
              }}>
              {'Submit'}
            </Text>
          </HandleEvent>
        </View>
        <DownAlertToast visible={isUpdate} text={'Test'} type={'success'} />
        <Indicator isVisible={isLoading} />
      </View>
    </>
  );
}
