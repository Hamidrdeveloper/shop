/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useRef, useState} from 'react';
import {BackgroundView, Padding} from '../../css/main.style';
import HeaderScComponent from '../../components/header2';
import {TextInputSign} from '../signUp/style/signUp.style';
import {Space} from '../../infrastructuer/theme/space.style';
import {Text, ScrollView, Button, View, TouchableOpacity} from 'react-native';
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
type FormValues = {
  first_name: string;
  last_name: string;
  name: string;
  company_name: string;
  phone: string;
};
export default function AddAddressScreen({navigation}) {
  let dropDownAlertRef = useRef();
  const {...methods} = useForm();
  const {addAddressFn, isAddToData} = useContext(AddressContext);

  const [formError, setError] = useState<Boolean>(false);
  
  
  const _fetchData = async (text, type) => {
    const response = await fetch('https://httpbin.org/uuid');
    const {uuid} = await response.json();
    dropDownAlertRef.alertWithType(type, text);
  };

  useEffect(() => {
    if (isAddToData) {
      _fetchData('Add Address', 'success');
    }
  }, [isAddToData]);

  function onSubmit(data: FormValues) {
    const finalData: ContactGroupsContext = {
      country_id: 83,
      translate: {
        de: {
          locale: 'de',
          title: 'contadct group title',
        },
      },
      people: [
        {
          first_name: data.first_name + '',
          last_name: data.last_name + '',
          company_name: data.company_name + '',
        },
      ],
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

  const onError: SubmitErrorHandler<FormValues> = errors => {
    return console.log('errors', errors);
  };
  return (
    <>
      <BackgroundView>
        <ScrollView>
          <HeaderScComponent navigation={navigation} title={'Add Address'} />

          <Padding>
            <FormProvider {...methods}>
              <ControlledInput
                name="company_name"
                label="Company Name"
                placeholder={'Abcd@1234'}
                placeholderTextColor={'#000'}
                rules={{required: 'Password is required!'}}
                setFormError={setError}
              />
              <ControlledInput
                name="first_name"
                label="First Name"
                placeholder={'Abcd@1234'}
                placeholderTextColor={'#000'}
                rules={{required: 'Password is required!'}}
                setFormError={setError}
              />
              <ControlledInput
                name="last_name"
                label="Last Name"
                placeholder={'Abcd@1234'}
                placeholderTextColor={'#000'}
                rules={{required: 'Password is required!'}}
                setFormError={setError}
              />
              <ControlledInput
                name="address1"
                label="Address Line"
                placeholder={'Abcd@1234'}
                placeholderTextColor={'#000'}
                rules={{required: 'Password is required!'}}
                setFormError={setError}
              />
              <ControlledInput
                name="address2"
                label="Street"
                placeholder={'Abcd@1234'}
                placeholderTextColor={'#000'}
                rules={{required: 'Password is required!'}}
                setFormError={setError}
              />
              <ControlledInput
                name="house_number"
                label="House Number"
                placeholder={'Abcd@1234'}
                placeholderTextColor={'#000'}
                rules={{required: 'Password is required!'}}
                setFormError={setError}
              />
              <ControlledInput
                name="postal_code"
                label="Post Code"
                placeholder={'Abcd@1234'}
                placeholderTextColor={'#000'}
                rules={{required: 'Password is required!'}}
                setFormError={setError}
              />
              <ControlledInput
                name="city"
                label="City"
                placeholder={'Abcd@1234'}
                placeholderTextColor={'#000'}
                rules={{required: 'Password is required!'}}
                setFormError={setError}
              />
              <ControlledInput
                name="state"
                label="State"
                placeholder={'Abcd@1234'}
                placeholderTextColor={'#000'}
                rules={{required: 'Password is required!'}}
                setFormError={setError}
              />

              <ControlledInput
                name="phone"
                label="Phone"
                placeholder={'Abcd@1234'}
                placeholderTextColor={'#000'}
                rules={{required: 'Password is required!'}}
                setFormError={setError}
              />
            </FormProvider>
            <TouchableOpacity onPress={methods.handleSubmit(onSubmit, onError)}>
              <View
                style={{
                  height: 50,
                  marginTop: 15,
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
                  {'Submit'}
                </Text>
              </View>
            </TouchableOpacity>
            <Space lineH={80} />
          </Padding>
        </ScrollView>
      </BackgroundView>
      <DropdownAlert
        ref={ref => {
          if (ref) {
            dropDownAlertRef = ref;
          }
        }}
      />
    </>
  );
}
