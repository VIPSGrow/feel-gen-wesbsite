export interface Address {
  id: number;
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  landmark: string;
  is_default: boolean;
  [key: string]: any; // For compatibility
}

export interface CreateAddressData {
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  landmark?: string;
  is_default?: boolean;
  [key: string]: any;
}

export interface UpdateAddressData {
  full_name?: string;
  phone?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  landmark?: string;
  is_default?: boolean;
  [key: string]: any;
}
