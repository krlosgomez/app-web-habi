import { OwnerModel } from "./owner";

export interface FiltersApartmentsModel {
  page: number;
  created_at?: Date;
  location?: string;
  limit?: number;
  order?: 'ASC' | 'DESC';
};

export interface GetApartmentsResponseModel {
  apartments: ApartmentResponseModel[];
  page: number;
  pages: number;
  total: number;
  limit?: number;
};

export interface ApartmentResponseModel {
  id: string;
  area: number;
  number_rooms: number;
  price: number;
  address: number;
  location: number;
  city: number;
  created_at: number;
  owner?: OwnerModel;
};

export interface ApartmentCreateModel {

};
