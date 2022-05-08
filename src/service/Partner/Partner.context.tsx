import React, {createContext, ReactElement, useState} from 'react';
import {PartnerAc} from './Partner.action';

interface IPartnerContext {
  partner: any;
  PartnerFn: () => void;
  isLoading: boolean;
}
export const PartnerContext = createContext<IPartnerContext>(
  {} as IPartnerContext,
);
export default function PartnerContextProvider({
  children,
}: {
  children: ReactElement;
}) {
  const [isLoading, setLoading] = useState(false);

  const [partner, setPartner] = useState<any>();

  function PartnerFn() {
    PartnerAc()
      .then(is => {
        setPartner(is);
        setLoading(true);
      })
      .catch(() => {});
  }

  return (
    <PartnerContext.Provider
      value={{
        PartnerFn,
        partner,
        isLoading,
      }}>
      {children}
    </PartnerContext.Provider>
  );
}
