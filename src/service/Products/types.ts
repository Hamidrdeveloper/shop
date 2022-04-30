import { PaginationRequest, VariationFiles } from "../Main/type";

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export interface Products{
  pagination: PaginationRequest; productCategoryIds?: string
}


interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
  exportColumns: string[];
  filters: Filters;
  orderByColumns: string[];
  filterLinks: FilterLinks;
}

interface FilterLinks {
  ownerId: string;
  fileId: string;
}

interface Filters {
  ids: string;
  number: string;
  maximumSaleForEachUser: string;
  isActive: string;
  defaultVat: string;
  autoActiveNetStock: string;
  autoDeactiveNetStock: string;
  maxOrderQuantity: string;
  minOrderQuantity: string;
  intervalOrderQuantity: string;
  ownerId: string;
  ownerType: string;
  attributeName: string;
  attributeValue: string;
  fileId: string;
  productCategoryIds: string;
  name: string;
  priceVisible: string;
  sort: string;
}

interface Link {
  url?: string;
  label: string;
  active: boolean;
}

interface Links {
  first: string;
  last: string;
  prev?: any;
  next: string;
}

export interface ProductItem {
  id: number;
  name: string;
  description: string;
  number: string;
  maximum_sale_for_each_user?: any;
  is_active: boolean;
  price_visible: boolean;
  default_vat: number;
  auto_active_net_stock: boolean;
  auto_deactive_net_stock: boolean;
  max_order_quantity?: any;
  min_order_quantity: number;
  interval_order_quantity?: any;
  release_date?: string;
  available_until?: any;
  file_id: number;
  sort?: number;
  file: string;
  productCategories: ProductCategory[];
  prices: Price[];
  main_variation_id: number;
}

interface Price {
  id: number;
  interval: string;
  display_for_new_item: boolean;
  min_quantity: number;
  unit_price?: any;
  created_at: string;
  updated_at: string;
  name: string;
  currency: Currency;
  priceType: PriceType;
  value: number;
}

interface PriceType {
  id: number;
  name: string;
}

interface Currency {
  name: string;
  id: number;
  ratio: number;
  is_default: boolean;
  symbol: string;
  iso3: string;
  is_active: boolean;
}

interface ProductCategory {
  id: number;
  partner_id?: any;
  subdomain_id?: any;
  file_id?: any;
  file_path?: any;
  slug: string;
  sort: number;
  show_in_website: boolean;
  only_partner: number;
  name: string;
  description: string;
  file?: any;
  parent?: (Parent | null)[];
}

interface Parent {
  id: number;
  partner_id?: any;
  subdomain_id?: any;
  file_id?: any;
  file_path?: any;
  slug: string;
  sort: number;
  show_in_website: boolean;
  only_partner: number;
  name: string;
  description: string;
  file?: any;
  parent?: any;
}
export interface ProductByID {
  productId:number
}
export interface ProductVariation {
  prices: any;
  numberBasket: number;
  id: number;
  name: string;
  type: string;
  point: number;
  number: string;
  inherit: boolean;
  is_main: boolean;
  quantity: number;
  is_active: boolean;
  description: string;
  review_count: number;
  preview_text: string;
  meta_keywords: string;
  weight: number | null;
  average_rating: number;
  technical_data: string;
  meta_description: string;
  max_order_quantity: number;
  min_order_quantity: number;
  release_date: string | Date;
  available_until: string | Date;
  auto_active_net_stock: boolean;
  auto_deactivate_net_stock: boolean;
  maximum_sale_for_each_user: number;

  // product: Product;
  // barcodes: Barcode[];
  // unit: ProductVariationUnit;
  // availability: Availability;
  // custom_tariff: CustomTariff;
  // packages: VariationPackages[];
  // translate: VariationTranslate[];
  // shippingProfiles: ShippingProfile[];
  // attributes: VariationAttributeTypes[];
  // productVariationVats: VariationVats[];
  productVariationFiles:Array<VariationFiles>;
  // productVariationPrices: VariationPrice[];
  // crossSellingVariations: ProductVariation[];
  // userVariationPrices: UserVariationPrices[];
  // productVariationCategories: VariationCategory[];
  // productVariationSuppliers: VariationSuppliers[];
}
