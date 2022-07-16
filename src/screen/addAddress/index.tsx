/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useRef, useState} from 'react';
import {BackgroundView, Padding} from '../../css/main.style';
import HeaderScComponent from '../../components/header2';
import {TextInputSign} from '../signUp/style/signUp.style';
import {Space} from '../../infrastructuer/theme/space.style';
import {Text, ScrollView, Button, View, TouchableOpacity, Modal} from 'react-native';
import {Color} from '../../infrastructuer/theme/colors.style';
import {
  useForm,
  FormProvider,
  SubmitHandler,
  SubmitErrorHandler,
  useController,
} from 'react-hook-form';
import {ContactGroupsContext} from '../../service/Address/types';
import {ControlledInput} from '../../components/textInputController';
import {AddressContext} from '../../service/Address/Address.context';
import {useContext} from 'react';
import {TOKEN} from '../../utils/main';
import DropdownAlert from 'react-native-dropdownalert';
import CheckBox from '../../components/checkBox';
import LineW from '../../components/lineW';
import {LoadingButton} from '../../components/buttonLoading';
import ControlledCheckBox from '../../components/controlledCheckBox';
import styled from 'styled-components';
import PickerController from '../../components/pickerController';
import {AuthContext} from '../../service/Auth/Auth.context';

const ViewLoading = styled(View)`
  height: 50;
  margin-top: 15;
  width: 100%;
`;
type FormValues = {
  first_name: string;
  last_name: string;
  name: string;
  company_name: string;
  phone: string;
  cart_title: string;
};
export default function AddAddressScreen({navigation}) {
  const {...methods} = useForm();
  const {addAddressFn, isAddToData, isAddToDataLodging, getAddressSelect} =
    useContext(AddressContext);
  const {countries} = useContext(AuthContext);

  let dropDownAlertRef = useRef();

  const [formError, setError] = useState<Boolean>(false);

  useEffect(() => {
    if (isAddToData) {
    }
  }, [isAddToData]);

  function onSubmit(data: FormValues) {
    const finalData: ContactGroupsContext = {
      country_id: 83,
      translate: {
        de: {
          locale: 'de',
          title: data.cart_title,
        },
      },
      people: {
        first_name: data.first_name + '',
        last_name: data.last_name + '',
        company_name: data.company_name + '',
      },
      addresses: [
        {
          ...data,
          country: undefined,
          latitude: 51.5285582,
          longitude: -0.2416815,
        },
      ],
      phones:
        data.phone || data.phone !== ''
          ? [
              {
                type: 'phone',
                number: data.phone,
              },
            ]
          : undefined,
    };
    addAddressFn(finalData);
  }
  useEffect(() => {
    if (isAddToDataLodging) {
      getAddressSelect();
      setTimeout(() => {
        navigation.goBack();
      }, 3000);
    }

    return;
  }, [isAddToDataLodging]);
  const onError: SubmitErrorHandler<FormValues> = errors => {
    dropDownAlertRef.alertWithType('error', 'All fields must be filled');

    return console.log('errors', errors);
  };
//   function popupSelectAddress(){
//     <Modal
//     transparent
//     visible={true}>
//       <View style={{width:`100%`,height:`100%`,backgroundColor:'rgba(0,0,0,0.3)'}}>
//        <View style={{position:'absolute',bottom:0,width:`100%`,height:250}}>
// {/* <View style={{flexDirection: 'row', paddingTop: 30}}>
//                 <ControlledCheckBox
//                   defaultValue={true}
//                   name="is_pack_station"
//                   isCheck={true}
//                 />
//                 <Space lineW={10} />
//                 <Text style={{fontSize: 15}}>{'Pack station'}</Text>
//                 <Space lineW={50} />
//                 <ControlledCheckBox
//                   defaultValue={true}
//                   name="is_post_office"
//                   isCheck={true}
//                 />
//                 <Text style={{fontSize: 15}}>{'Post office'}</Text>
//               </View> */}
//        </View>
       
//         </View>


//     </Modal>
//   }
  return (
    <>
      <BackgroundView>
        <ScrollView>
          <HeaderScComponent navigation={navigation} title={'Add Address'} />

          <Padding>
            <FormProvider {...methods}>
              <PickerController
                name={'cart_title'}
                containerStyle={{width: '100%'}}
                placeholderStyle={{fontSize: 18}}
                placeholder={'Cart Title'}
                style={{
                  borderColor: Color.brand.border,
                  backgroundColor: Color.brand.f9,
                }}
                items={[
                  {label: 'Standard', value: 'Standard'},
                  {label: 'Home', value: 'Home'},
                  {label: 'Office', value: 'Office'},
                  {label: 'Other', value: 'Other'},
                ]}
                onChange={() => {}}
              />
              <ControlledInput
                name="company_name"
                label="Company Name"
                placeholder={'Apple'}
                placeholderTextColor={'#F9F9F9'}
                rules={{required: 'Password is required!'}}
                setFormError={setError}
              />
              <ControlledInput
                name="first_name"
                label="First Name"
                placeholder={'Jordan'}
                placeholderTextColor={'#F9F9F9'}
                rules={{required: 'Password is required!'}}
                setFormError={setError}
              />
              <ControlledInput
                name="last_name"
                label="Last Name"
                placeholder={'Bardon'}
                placeholderTextColor={'#F9F9F9'}
                rules={{required: 'Password is required!'}}
                setFormError={setError}
              />
              <ControlledInput
                name="address2"
                label="Street"
                placeholder={'German no 4'}
                placeholderTextColor={'#F9F9F9'}
                rules={{required: 'Password is required!'}}
                setFormError={setError}
              />
              <ControlledInput
                name="house_number"
                label="House Number"
                placeholder={'12345678'}
                placeholderTextColor={'#F9F9F9'}
                rules={{required: 'Password is required!'}}
                setFormError={setError}
              />
              <ControlledInput
                name="postal_code"
                label="Post Code"
                placeholder={'54000'}
                placeholderTextColor={'#F9F9F9'}
                rules={{required: 'Password is required!'}}
                setFormError={setError}
              />
               <ControlledInput
                name="state"
                label="State"
                placeholder={'DW'}
                placeholderTextColor={'#F9F9F9'}
                rules={{required: 'Password is required!'}}
                setFormError={setError}
              />
               <ControlledInput
                name="city"
                label="City"
                placeholder={'Frankfurt'}
                placeholderTextColor={'#F9F9F9'}
                rules={{required: 'Password is required!'}}
                setFormError={setError}
              />
              <Space lineH={10} />
              <Text style={{color: 'black'}}>{'Country'}</Text>
              <Space lineH={10} />
              <PickerController
                name={'country_id'}
                containerStyle={{width: '100%'}}
                placeholderStyle={{fontSize: 18}}
                placeholder={'country'}
                style={{
                  borderColor: Color.brand.border,
                  backgroundColor: Color.brand.f9,
                }}
                items={countries}
                onChange={() => {}}
              />
             
             

              <ControlledInput
                name="phone"
                label="Phone"
                placeholder={'123456789'}
                placeholderTextColor={'#F9F9F9'}
                rules={{required: 'Password is required!'}}
                setFormError={setError}
              />
              {/* <View style={{flexDirection: 'row', paddingTop: 30}}>
                <ControlledCheckBox
                  defaultValue={true}
                  name="is_pack_station"
                  isCheck={true}
                />
                <Space lineW={10} />
                <Text style={{fontSize: 15}}>{'Pack station'}</Text>
                <Space lineW={50} />
                <ControlledCheckBox
                  defaultValue={true}
                  name="is_post_office"
                  isCheck={true}
                />
                <Text style={{fontSize: 15}}>{'Post office'}</Text>
              </View> */}

              <ControlledInput
                name="address1"
                label="Address Line"
                placeholder={'German No 4'}
                placeholderTextColor={'#F9F9F9'}
                rules={{required: 'Password is required!'}}
                setFormError={setError}
                style={{height: 130, textAlignVertical: 'top'}}
              />
            </FormProvider>

            <ViewLoading>
              <LoadingButton
                isActive={isAddToDataLodging}
                title={'Submit'}
                onNext={methods.handleSubmit(onSubmit, onError)}
                onClose={() => {}}
              />
            </ViewLoading>
            <Space lineH={80} />
          </Padding>
        </ScrollView>
        <DropdownAlert
          ref={ref => {
            if (ref) {
              dropDownAlertRef = ref;
            }
          }}
        />
      </BackgroundView>
    </>
  );
}
