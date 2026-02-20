export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface UserFormData {
  name: string;
  email: string;
  phone?: string;
  website?: string;
  address?: {
    street: string;
    city: string;
    zipcode: string;
  };
  company?: {
    name: string;
  };
}

export type SortField = 'name' | 'email' | 'company.name' | null;
export type SortDirection = 'asc' | 'desc';
