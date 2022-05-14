/* eslint-disable no-unused-vars */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {NavigationStart} from './src/infrastructuer/navigations';
import AuthContextProvider from './src/service/Auth/Auth.context';
import MainContextProvider from './src/service/Main/Main.context';
import ProductContextProvider from './src/service/Products/Product.context';
import ProfileContextProvider from './src/service/Profile/Profile.context';
import BasketContextProvider from './src/service/Basket/Basket.context';
import AddressContextProvider from './src/service/Address/Address.context';
import CommentContextProvider from './src/service/Comment/Comment.context';
import FileContextProvider from './src/service/File/File.context';
import './src/core/i18n/config';
import PartnerContextProvider from './src/service/Partner/Partner.context';
import MapContextProvider from './src/service/map/Map.context';

const App = () => {
  console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
  console.disableYellowBox = true;
  return (
    <>
      <BasketContextProvider>
        <PartnerContextProvider>
          <AuthContextProvider>
            <AddressContextProvider>
              <CommentContextProvider>
                <FileContextProvider>
                  <ProductContextProvider>
                    <ProfileContextProvider>
                      <MapContextProvider>
                        <MainContextProvider>
                          <NavigationStart />
                        </MainContextProvider>
                      </MapContextProvider>
                    </ProfileContextProvider>
                  </ProductContextProvider>
                </FileContextProvider>
              </CommentContextProvider>
            </AddressContextProvider>
          </AuthContextProvider>
        </PartnerContextProvider>
      </BasketContextProvider>
    </>
  );
};

export default App;
