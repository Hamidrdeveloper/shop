import React, {createContext, ReactElement, useState} from 'react';
import {PartnerAc, PartnerIdAc} from './Partner.action';
import {PartnerId, Partners} from './type';

interface IPartnerContext {
  partner: Partners;
  partnerId: PartnerId;
  partnerSelectId: PartnerId;
  PartnerFn: (countryId?: number) => void;
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
  const [partnerSelectId, setPartnerSelectId] = useState<PartnerId>();

  function PartnerFn(countryId: number) {
    PartnerAc(countryId)
      .then(is => {
        setPartner(
          is?.map(data => {
            return {...data, select: false};
          }),
        );
        setLoading(true);
      })
      .catch(() => {});
  }
  async function partnerIdFn(id: number) {
    const res = await PartnerIdAc(id);
    setPartnerId(res);
    setPartnerSelectId(res);
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
        partnerSelectId
      }}>
      {children}
    </PartnerContext.Provider>
  );
}
