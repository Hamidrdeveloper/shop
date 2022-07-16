import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react';
import {AddressContext} from '../Address/Address.context';
import {PartnerContext} from '../Partner/Partner.context';
import {
  profileAc,
  updateUserProfileAc,
  userInvoiceAddressAC,
} from './Profile.action';
import {User, UserProfile} from './types';

interface IProfileContext {
  isLodUser: string;
  isUpdate: boolean;
  isLoading: boolean;
  user: any;
  profileFn: () => void;
  profileUpdateFn: (value: UserProfile) => void;
  userUpdate: any;
  showInvoiceAddress: any;
  setShowInvoiceAddress: any;
  userInvoiceAddressFn: (invoice_contact_group_id: unknown) => void;
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
  const {partnerMeFn,PartnerFn} = useContext(PartnerContext);
  const {addresses} = useContext(AddressContext);

  const [showInvoiceAddress, setShowInvoiceAddress] = useState();

  const [user, setUser] = useState<User>();
  const [userUpdate, setUserUpdate] = useState<UserProfile>();

  const {getAddressFn} = useContext(AddressContext);

  useEffect(() => {
    return () => {
      addresses.forEach(e => {
        if (user?.invoice_contact_group_id == e.id) {
          setShowInvoiceAddress(e);
        }
      });
    };
  }, [addresses]);
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
        console.log('partnerIdFn', is?.sponsor_id);

        getAddressFn();
        setDataUser(is);
        PartnerFn();
        partnerMeFn(is?.sponsor_id);
      })
      .catch(() => {
        setLodUser('2');
      });
  }
  function profileUpdateFn(value: UserProfile) {
    console.log('profileUpdateFn', value);

    setLoading(true);
    setUpdate(false);
    updateUserProfileAc(value)
      .then(is => {
        setDataUser(is);
        setUpdate(true);
        setTimeout(() => {
          setUpdate(false);
        }, 1000);

        setLoading(false);
      })
      .catch(() => {});
  }
  function userInvoiceAddressFn(invoice_contact_group_id: unknown) {
    userInvoiceAddressAC(invoice_contact_group_id?.id).then(() => {
      setShowInvoiceAddress(invoice_contact_group_id);
    });
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
        userInvoiceAddressFn,
        setShowInvoiceAddress,
        showInvoiceAddress,
      }}>
      {children}
    </ProfileContext.Provider>
  );
}
