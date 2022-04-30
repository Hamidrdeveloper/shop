import React, {createContext, ReactElement, useContext, useState} from 'react';
import Toast from '../../components/toast';
import {AddressContext} from '../Address/Address.context';
import {profileAc, updateUserProfileAc} from './Profile.action';
import {Email, SignUp, UserProfile} from './types';

interface IProfileContext {
  isLodUser: string;
  user: any;
  profileFn: () => void;
  profileUpdateFn: (value: UserProfile) => void;
  userUpdate: any;
}
export const ProfileContext = createContext<IProfileContext>(
  {} as IProfileContext,
);
export default function ProfileContextProvider({
  children,
}: {
  children: ReactElement;
}) {
  const [isLodUser, setLodUser] = useState('0');
  const [user, setUser] = useState();
  const [userUpdate, setUserUpdate] = useState();

  const {getAddressFn} = useContext(AddressContext);

  function profileFn() {
    profileAc()
      .then(is => {
        getAddressFn();
        setUser(is);
        setLodUser('1');
        setUserUpdate({
          email: is?.email,
          birth_date: is?.birth_date,
          people: {
            first_name: is?.person?.first_name,
            last_name: is?.person?.last_name,
          },
        });
      })
      .catch(e => {
        setLodUser('2');
      });
  }
  function profileUpdateFn(value: UserProfile) {
    updateUserProfileAc(value)
      .then(is => {})
      .catch(e => {});
  }

  return (
    <ProfileContext.Provider
      value={{
        profileFn,
        user,
        isLodUser,
        userUpdate,
        profileUpdateFn,
      }}>
      {children}
    </ProfileContext.Provider>
  );
}
