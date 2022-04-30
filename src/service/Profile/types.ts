export interface User {
  id: number;
  avatar: string;
  created_at: Date;
  birth_date: string;
  credit_limit: number;
  default_payment_terms_id: number;
  default_shipping_method_id: number;
  discount_ratio: number;
  email: string;
  eori_number: string;
  file_id: number;
  invoice_contact_group_id: number | null;
  is_vat_valid: number;
  payment_method_id: number;
  sponsor: string;
  tax_number: string;
  updated_at: Date;
  use_gln_indocuments: boolean;
  username: string;
  // basket: UserBasket;
  // person: UserPerson;
  // language: Language;
  // roles: UserRole[];
  // country: Country;
  // paymentTerm: PaymentTerm;
  // shippingMethod: ShippingMethod;
  // paymentMethod: PaymentMethodType;
}
export interface UserProfile {
  email: string;
  birth_date?: string;
  people: {
    first_name: string;
    last_name: string;
  };
}
