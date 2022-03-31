import { GetApartmentsResponseModel } from './../models/apartments';
import { ApartmentServiceService } from './../services/apartment-service.service';
import { Component, OnInit } from '@angular/core';
import { ApartmentResponseModel, FiltersApartmentsModel } from '../models/apartments';

@Component({
  selector: 'app-apartments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.css']
})
export class ApartmentsComponent implements OnInit {

  isLoadingPage: boolean;
  isLoadingData: boolean;
  apartments: ApartmentResponseModel[];
  apartmentsResponse: GetApartmentsResponseModel;
  filters: FiltersApartmentsModel;

  pagesToShow: number[];

  constructor(private apartmentServiceService: ApartmentServiceService) {
    this.isLoadingPage = true;
    this.isLoadingData = false;
    this.apartments = [];
    this.apartmentsResponse = {} as GetApartmentsResponseModel;
    this.filters = { page: 1 } as FiltersApartmentsModel;
    this.pagesToShow = new Array(1);
  }

  ngOnInit(): void {
    this.getApartments();
  }

  getApartments(): void {
    this.apartmentServiceService.getApartments(this.filters).subscribe(response => {
      this.apartmentsResponse = response;
      this.apartments = this.apartmentsResponse.apartments;
      if (this.apartmentsResponse.pages >= 3) {
        this.pagesToShow = [this.filters.page, this.filters.page + 1, this.filters.page + 2];
      } else if (this.apartmentsResponse.pages === 2) {
        this.pagesToShow = [1, 2];
      } else {
        this.pagesToShow = [1];
      }
      this.isLoadingPage = false;
      this.isLoadingData = false;
    }, () => {
      this.isLoadingPage = false;
      this.isLoadingData = false;
    });
  }

  changePage(page: number): void {
    this.isLoadingData = true;
    this.filters.page = page;
    this.getApartments();
  }

}
