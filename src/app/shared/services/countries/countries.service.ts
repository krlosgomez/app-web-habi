import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from '../../models/country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  apiUrlCountries: string;

  constructor(private http: HttpClient) {
    this.apiUrlCountries = environment.apiUrlCountries;
  }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.apiUrlCountries + '/v3.1/all');
  }

}
