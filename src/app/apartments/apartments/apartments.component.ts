import { FilterOrder, GetApartmentsResponseModel } from './../models/apartments';
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
  orderOptions: FilterOrder[];

  constructor(private apartmentServiceService: ApartmentServiceService) {
    this.isLoadingPage = true;
    this.isLoadingData = false;
    this.apartments = [];
    this.apartmentsResponse = {} as GetApartmentsResponseModel;
    this.filters = { page: 1, order: 'DESC' } as FiltersApartmentsModel;
    this.pagesToShow = new Array(1);
    this.orderOptions = [
      {
        label: 'Ascendente',
        value: 'ASC'
      },
      {
        label: 'Descendente',
        value: 'DESC'
      }
    ];
  }

  ngOnInit(): void {
    this.getApartments();
  }

  getApartments(): void {
    this.apartmentServiceService.getApartments(this.filters).subscribe(response => {
      this.apartmentsResponse = response;
      this.apartments = this.apartmentsResponse.apartments;
      const pagesToShow = [];
      for (let i = 0; i < this.apartmentsResponse.pages; i++) {
        pagesToShow.push(i + 1);
      }
      this.pagesToShow = pagesToShow;
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
