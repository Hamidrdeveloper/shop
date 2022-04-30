import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useContext} from 'react';
import {Image, Text} from 'react-native';
import ShopScreen from '../../screen/shop';
import Home from '../../assets/image/Iconly-Bold-Home.png';
import Buy from '../../assets/image/Iconly-Light-Buy.png';
import Document from '../../assets/image/Iconly-Light-Document.png';
import Profile from '../../assets/image/Iconly-Light-Profile.png';
import {Color} from '../theme/colors.style';
import BasketScreen from '../../screen/basket';
import ProfileScreen from '../../screen/profile';
import OrderProcessingScreen from '../../screen/orderProcessing';
import {BasketContext} from '../../service/Basket/Basket.context';

const Tab = createBottomTabNavigator();

function BottomTab(props) {
  const {numberBasket} = useContext(BasketContext);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Color.brand.colorButton,
      }}>
      <Tab.Screen
        name={'Home_SCREEN'}
        component={ShopScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Image
              source={Home}
              style={{width: size, height: size, tintColor: color}}
            />
          ),
        }}
      />
      <Tab.Screen
        name={'Basket_SCREEN'}
        component={BasketScreen}
        options={{
          tabBarLabel: 'Basket',
          tabBarIcon: ({color, size}) => (
            <>
              <Image
                source={Buy}
                style={{width: size, height: size, tintColor: color}}
              />
              {numberBasket > 0 ? (
                <Text
                  style={{
                    position: 'absolute',
                    left: 23,
                    top: 2,
                    backgroundColor: Color.brand.colorButton,
                    borderRadius: 100,
                    width: 18,
                    height: 18,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    color: Color.brand.white,
                  }}>
                  {numberBasket}
                </Text>
              ) : null}
            </>
          ),
        }}
      />
      <Tab.Screen
        name={'OrderProcessingScreen'}
        component={OrderProcessingScreen}
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: ({color, size}) => (
            <Image
              source={Document}
              resizeMode="center"
              style={{width: size - 5, height: size, tintColor: color}}
            />
          ),
        }}
      />
      <Tab.Screen
        name={'SHOP4_SCREEN'}
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Image
              resizeMode="center"
              source={Profile}
              style={{width: size, height: size, tintColor: color}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTab;
