import PartnerDataService from './Partner.service';
export function PartnerAc() {
  return PartnerDataService.partner();
}
export async function PartnerIdAc(id: number) {
  return await PartnerDataService.partnerId(id);
}
