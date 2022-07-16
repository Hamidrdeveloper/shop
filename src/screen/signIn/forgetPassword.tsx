import React, {useContext, useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Color} from '../../infrastructuer/theme/colors.style';
import {Space} from '../../infrastructuer/theme/space.style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {BackgroundView, Padding} from '../../css/main.style';
import HeaderScComponent from '../../components/header2';
import {ArrowLeft} from 'react-native-iconly';
import {AuthContext} from '../../service/Auth/Auth.context';
import {ForgetPasswordModel} from '../../service/Auth/model';
import {TextInputSign} from '../signUp/style/signUp.style';
// import Toast from '../../components/toast';

export default function ForgetPassword({navigation}) {
  const {forgetPasswordFn} = useContext(AuthContext);
  const [forgetPassword, setForgetPassword] = useState();

  function HeaderScComponent() {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            height: 55,
            padding: 15,
            backgroundColor: Color.brand.white,
          }}>
          <ArrowLeft
            set="light"
            size={'large'}
            primaryColor={Color.brand.black}
            onPress={() => navigation.goBack()}
          />

          <View
            style={{
              justifyContent: 'center',
              position: 'absolute',
              alignItems: 'center',
              width: '100%',
            }}>
            <Image
              resizeMode="stretch"
              style={{width: 100, height: 50}}
              source={require('../../assets/image/cleafin_logo.png')}
            />
          </View>
        </View>
      </>
    );
  }
  return (
    <>
      <BackgroundView>
        <HeaderScComponent />
        <Space lineH={30} />
        <Padding>
          <Text style={{fontSize: 26, color: Color.brand.black}}>
            {'Forget password'}
          </Text>
          <Space lineH={10} />
          <Text style={{fontSize: 15, color: Color.brand.black}}>
            {
              'We Just Need Your Registered Email Address\nTo Send Your Password Recovery Link'
            }
          </Text>
          <Space lineH={60} />
          <Text style={{color: Color.brand.black}}>{'Email'}</Text>
          <Space lineH={10} />
          <TextInputSign
            placeholder={'Email'}
            placeholderTextColor={'#000'}
            value={forgetPassword}
            onChangeText={e => {
              ForgetPasswordModel.email = e;
              setForgetPassword(e);
            }}
          />
          <Space lineH={20} />
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 14,
                color: Color.brand.textGry,
              }}>
              {"Didn't Receive Recovery Link?"}
            </Text>
            <Space lineW={10} />
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 14,
                color: forgetPassword
                  ? Color.brand.colorButton
                  : Color.brand.grey,
              }}>
              {'Send Link Again.'}
            </Text>
          </View>
          <Space lineH={70} />
          {/* <Toast
          text={""}
          show={true}
          renderToggleButton={()=>  <TouchableOpacity  onPress={()=>{
              // navigation.navigate("ResetPassword")
              forgetPasswordFn();
              }}>
              <View
                style={{
                  height: 50,
                  width: `100%`,
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
                  {'Send code'}
                </Text>
              </View>
            </TouchableOpacity>}
          /> */}

          <Space lineH={80} />
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 14,
                color: Color.brand.textGry,
              }}>
              {'Dont Have An Account?'}
            </Text>
            <Space lineW={10} />
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 14,
                color: Color.brand.colorButton,
              }}>
              {'Register now'}
            </Text>
          </View>
        </Padding>
      </BackgroundView>
    </>
  );
}
