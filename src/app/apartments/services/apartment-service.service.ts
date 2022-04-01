import { ApartmentCreateModel } from './../models/apartments';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApartmentResponseModel, FiltersApartmentsModel, GetApartmentsResponseModel } from '../models/apartments';

@Injectable({
  providedIn: 'root'
})
export class ApartmentServiceService {

  habiApiCreateUrl: string;
  habiApiGetUrl: string;
  habiApiDeleteUrl: string;

  constructor(private http: HttpClient) {
    this.habiApiCreateUrl = environment.habiApiCreateUrl;
    this.habiApiGetUrl = environment.habiApiGetUrl;
    this.habiApiDeleteUrl = environment.habiApiDeleteUrl;
  }

  getApartments(filtersApartments: FiltersApartmentsModel): Observable<GetApartmentsResponseModel> {
    let query = '?page=' + filtersApartments.page;
    if (filtersApartments.order) {
      query += '&order=' + filtersApartments.order;
    }
    if (filtersApartments.limit) {
      query += '&limit=' + filtersApartments.limit;
    }
    if (filtersApartments.location) {
      query += '&location=' + filtersApartments.location;
    }
    if (filtersApartments.created_at) {
      query += '&created_at=' + filtersApartments.created_at;
    }
    return this.http.get<GetApartmentsResponseModel>(this.habiApiGetUrl + 'apartments' + query);
  }

  createApartment(apartmentCreate: ApartmentCreateModel): Observable<ApartmentResponseModel> {
    return this.http.post<ApartmentResponseModel>(this.habiApiCreateUrl + 'apartments', apartmentCreate);
  }

  createApartments(apartmentsDto: { apartmentsDto: ApartmentCreateModel[] }): Observable<ApartmentResponseModel> {
    return this.http.post<ApartmentResponseModel>(this.habiApiCreateUrl + 'apartments/array', apartmentsDto);
  }

}
