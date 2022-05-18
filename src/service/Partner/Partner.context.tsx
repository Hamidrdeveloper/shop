import React, {createContext, ReactElement, useState} from 'react';
import {PartnerAc, PartnerIdAc} from './Partner.action';
import {PartnerId, Partners} from './type';

interface IPartnerContext {
  partner: Partners;
  partnerId: PartnerId;
  PartnerFn: () => void;
  partnerIdFn: (id: number) => void;
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

  const [partner, setPartner] = useState<Partners>();
  const [partnerId, setPartnerId] = useState<PartnerId>();

  function PartnerFn() {
    PartnerAc()
      .then(is => {
        setPartner(is);
        setLoading(true);
      })
      .catch(() => {});
  }
  async function partnerIdFn(id: number) {
   
    const res = await PartnerIdAc(id);
    setPartnerId(res);
    setLoading(true);
  }

  return (
    <PartnerContext.Provider
      value={{
        PartnerFn,
        partner,
        isLoading,
        partnerId,
        partnerIdFn,
      }}>
      {children}
    </PartnerContext.Provider>
  );
}
