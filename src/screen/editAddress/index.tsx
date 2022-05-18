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
import CheckBox from '../../components/checkBox';
import LineW from '../../components/lineW';
import {LoadingButton} from '../../components/buttonLoading';
import ControlledCheckBox from '../../components/controlledCheckBox';
type FormValues = {
  first_name: string;
  last_name: string;
  name: string;
  company_name: string;
  phone: string;
  cart_title: string;
};
export default function EditAddressScreen({navigation, route}) {
  const defaultValues = route.params.address;
  const {...methods} = useForm({
    defaultValues,
  });

  const {
    editAddressFn,
    isAddToData,
    isAddToDataLoding: isAddToDataLodging,
  } = useContext(AddressContext);
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
    editAddressFn(finalData, defaultValues.id);
  }
  useEffect(() => {
    if (isAddToDataLodging) {
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    }

    return;
  }, [isAddToDataLodging]);

  const onError: SubmitErrorHandler<FormValues> = errors => {
    dropDownAlertRef.alertWithType('error', 'All fields must be filled');

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
                name="cart_title"
                label="Cart Title"
                defaultValue={defaultValues.title}
                placeholder={defaultValues.title}
                placeholderTextColor={'#000'}
                rules={{required: 'Password is required!'}}
                setFormError={setError}
              />
              <ControlledInput
                name="company_name"
                label="Company Name"
                defaultValue={defaultValues?.people[0]?.company_name}
                placeholder={defaultValues?.people[0]?.company_name}
                placeholderTextColor={'#000'}
                rules={{required: 'Password is required!'}}
                setFormError={setError}
              />
              <ControlledInput
                defaultValue={defaultValues?.people[0]?.first_name}
                placeholder={defaultValues?.people[0]?.first_name}
                name="first_name"
                label="First Name"
                placeholderTextColor={'#000'}
                rules={{required: 'Password is required!'}}
                setFormError={setError}
              />
              <ControlledInput
                name="last_name"
                label="Last Name"
                defaultValue={defaultValues?.people[0]?.last_name}
                placeholder={defaultValues?.people[0]?.last_name}
                placeholderTextColor={'#000'}
                rules={{required: 'Password is required!'}}
                setFormError={setError}
              />
              <ControlledInput
                name="address2"
                label="Street"
                defaultValue={defaultValues?.address?.address2}
                placeholder={defaultValues?.address?.address2}
                placeholderTextColor={'#000'}
                rules={{required: 'Password is required!'}}
                setFormError={setError}
              />
              <ControlledInput
                name="postal_code"
                label="Post Code"
                defaultValue={defaultValues?.address?.postal_code}
                placeholder={defaultValues?.address?.postal_code}
                placeholderTextColor={'#000'}
                rules={{required: 'Password is required!'}}
                setFormError={setError}
              />
              <ControlledInput
                name="city"
                label="City"
                defaultValue={defaultValues?.address?.city}
                placeholder={defaultValues?.address?.city}
                placeholderTextColor={'#000'}
                rules={{required: 'Password is required!'}}
                setFormError={setError}
              />
              <ControlledInput
                name="state"
                label="State"
                defaultValue={defaultValues?.address?.state}
                placeholder={defaultValues?.address?.state}
                placeholderTextColor={'#000'}
                rules={{required: 'Password is required!'}}
                setFormError={setError}
              />

              <ControlledInput
                name="phone"
                label="Phone"
                defaultValue={defaultValues?.phones[0]?.number}
                placeholder={defaultValues?.phones[0]?.number}
                placeholderTextColor={'#000'}
                rules={{required: 'Password is required!'}}
                setFormError={setError}
              />
              <View style={{flexDirection: 'row', paddingTop: 30}}>
                <ControlledCheckBox
                  defaultValue={defaultValues.address.is_pack_station}
                  name="is_pack_station"
                  isCheck={true}
                />
                <Space lineW={10} />
                <Text style={{fontSize: 15}}>{'Pack station'}</Text>
                <Space lineW={50} />
                <ControlledCheckBox
                  defaultValue={defaultValues.address.is_post_office}
                  name="is_post_office"
                  isCheck={true}
                />
                <Text style={{fontSize: 15}}>{'Post office'}</Text>
              </View>

              <ControlledInput
                name="address1"
                label="Address Line"
                defaultValue={defaultValues?.address?.address1}
                placeholder={defaultValues?.address?.address1}
                placeholderTextColor={'#000'}
                rules={{required: 'Password is required!'}}
                setFormError={setError}
                style={{height: 130, textAlignVertical: 'top'}}
              />
            </FormProvider>

            <View
              style={{
                height: 50,
                marginTop: 15,
                width: '100%',
              }}>
              <LoadingButton
                isActive={isAddToDataLodging}
                title={'Submit'}
                onNext={methods.handleSubmit(onSubmit, onError)}
                onClose={() => {}}
              />
            </View>
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
