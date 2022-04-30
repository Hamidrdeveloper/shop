import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import {ArrowLeft} from 'react-native-iconly';
import {
  BackgroundView,
  ButtonColor,
  Padding,
  ShadowButton,
} from '../../css/main.style';
import {Color} from '../../infrastructuer/theme/colors.style';
import {Space} from '../../infrastructuer/theme/space.style';
import {AuthContext} from '../../service/Auth/Auth.context';
import PartFive from './partFive';
import PartFour from './partFour';
import PartOne from './partOne';
import PartThree from './partThree';
import PartTwo from './partTwo';
import {SignUp} from '../../service/Auth/types';
import {SignUpModel} from '../../service/Auth/model';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Header} from './header';
import {
  BoldTitle,
  TitleWelcome,
  ViewButtonBottom,
  ViewRowPart,
} from './style/signUp.style';
const heightFull = Dimensions.get('screen').height;
export default function SignUpScreen({navigation}) {
  const [index, setIndex] = useState(2);
  const [active, setActive] = useState(false);
  const {singUpFn} = useContext(AuthContext);

  function ProcessView() {
    return (
      <View style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>
        {[1, 2, 3, 4, 5].map((id, i) => {
          return (
            <>
              <View style={{width: 35}}>
                <View
                  style={{
                    borderWidth: 8,
                    borderColor:
                      index >= id ? Color.brand.green : Color.brand.c4,
                    width: 30,
                    height: 30,
                    borderRadius: 30,
                  }}
                />
                <Space lineH={8} />
                <Text
                  style={{
                    color: Color.brand.black,
                    fontSize: 12,
                  }}>{`Step ${id}`}</Text>
              </View>

              <View style={{height: 30}}>
                <View
                  style={{
                    width: 65,
                    height: 2,
                    borderStyle: 'dashed',
                    borderColor:
                      index > id ? Color.brand.green : Color.brand.c4,
                    borderBottomWidth: 1.8,
                  }}
                />
              </View>
              <Space lineW={5} />
            </>
          );
        })}
      </View>
    );
  }

  function RenderPart() {
    switch (index) {
      case 1:
        return <PartOne onChangeValue={value => setActive(!value)} />;
      case 2:
        return <PartTwo onChangeValue={value => setActive(!value)} />;
      case 3:
        return <PartThree onChangeValue={value => setActive(!value)} />;
      case 4:
        return <PartFour />;
      case 5:
        return <PartFive navigation={navigation} />;
    }
  }
  function onSignUpButton() {
    switch (index) {
      case 1:
        if (
          SignUpModel.first_name.length > 1 &&
          SignUpModel.last_name.length > 1 &&
          SignUpModel.email.length > 5
        ) {
          setIndex(index + 1);
          setActive(true);
        }
        break;
      case 2:
        if (
          SignUpModel.country_id > 1 &&
          SignUpModel.language_id > 1 &&
          SignUpModel.gender.length > 2
        ) {
          setIndex(index + 1);
          setActive(true);
        }
        break;
      case 3:
        if (SignUpModel.password.length > 5) {
          singUpFn();
          setIndex(index + 1);
          setActive(false);
        }
        break;
      case 4:
        setIndex(index + 1);
        setActive(false);
        singUpFn();
        break;
      case 5:
        navigation.navigate('Bottom_SCREEN');
        break;
    }
  }

  return (
    <>
      <BackgroundView>
        <KeyboardAwareScrollView style={{width: '100%', height: '100%'}}>
          <Header
            onBack={() => {
              if (index != 1) {
                setIndex(index - 1);
              }
            }}
          />
          <Padding>
            {index >= 4 ? null : (
              <>
                <BoldTitle>{'Get Started'}</BoldTitle>
                <Space lineH={10} />
                <TitleWelcome>{'welcome to cleafin online shop'}</TitleWelcome>
                <Space lineH={30} />
              </>
            )}
            <ProcessView />
            <Space lineH={30} />
            <ViewRowPart
              height={index >= 4 ? heightFull - 220 : heightFull - 420}>
              {RenderPart()}
            </ViewRowPart>
            <ViewButtonBottom>
              <View>
                <ButtonColor>
                  <Text
                    style={{
                      alignSelf: 'center',
                      fontSize: 18,
                      color: Color.brand.white,
                    }}>
                    {index < 4 ? 'Next' : 'Submit'}
                  </Text>
                </ButtonColor>
                {active ? <ShadowButton /> : null}
              </View>
              {index >= 4 ? null : (
                <>
                  <Space lineH={10} />
                  <View
                    style={{
                      height: 50,
                      width: '100%',
                      borderRadius: 10,
                      alignSelf: 'center',
                      justifyContent: 'center',
                      backgroundColor: Color.brand.white,
                      borderColor: Color.brand.border,
                      borderWidth: 1,
                      flexDirection: 'row',
                    }}>
                    <Image
                      style={{width: 30, height: 30, alignSelf: 'center'}}
                      source={require('../../assets/image/suche.png')}
                    />
                    <Space lineW={10} />
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontSize: 18,
                        color: Color.brand.textGrey,
                      }}>
                      {'Sign up with google'}
                    </Text>
                  </View>
                  <Space lineH={15} />
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('SignInScreen');
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: Color.brand.black,
                        width: '100%',
                        textAlign: 'center',
                      }}>
                      <Text style={{fontSize: 18, color: Color.brand.black}}>
                        {'Have An Account? '}
                      </Text>
                      <Text
                        style={{fontSize: 20, color: Color.brand.colorButton}}>
                        {'Log In'}
                      </Text>
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </ViewButtonBottom>
          </Padding>
        </KeyboardAwareScrollView>
      </BackgroundView>
    </>
  );
}
