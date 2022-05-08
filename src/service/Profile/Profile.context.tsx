import React, {createContext, ReactElement, useContext, useState} from 'react';
import {AddressContext} from '../Address/Address.context';
import {profileAc, updateUserProfileAc} from './Profile.action';
import {User, UserProfile} from './types';

interface IProfileContext {
  isLodUser: string;
  isUpdate: boolean;
  isLoading: boolean;
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
  const [isUpdate, setUpdate] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [user, setUser] = useState<User>();
  const [userUpdate, setUserUpdate] = useState<UserProfile>();

  const {getAddressFn} = useContext(AddressContext);
  function setDataUser(value: User) {
    let formUser = {
      email: value?.email,
      birth_date: value?.birth_date,
      people: {
        first_name: value?.person?.first_name,
        last_name: value?.person?.last_name,
      },
    };
    setUser(value);
    setLodUser('1');
    setUserUpdate(formUser);
  }
  function profileFn() {
    profileAc()
      .then(is => {
        getAddressFn();
        setDataUser(is);
      })
      .catch(() => {
        setLodUser('2');
      });
  }
  function profileUpdateFn(value: UserProfile) {
    setLoading(true);
    setUpdate(false);
    updateUserProfileAc(value)
      .then(is => {
        setDataUser(is);
        setUpdate(true);
        setLoading(false);
      })
      .catch(() => {});
  }

  return (
    <ProfileContext.Provider
      value={{
        profileFn,
        user,
        isLodUser,
        userUpdate,
        profileUpdateFn,
        isUpdate,
        isLoading,
      }}>
      {children}
    </ProfileContext.Provider>
  );
}
