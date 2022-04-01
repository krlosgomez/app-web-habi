import { Router } from '@angular/router';
import { CountriesService } from './../../shared/services/countries/countries.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Country } from 'src/app/shared/models/country';
import { ApartmentCreateModel } from '../models/apartments';
import { ApartmentServiceService } from '../services/apartment-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-apartment',
  templateUrl: './create-apartment.component.html',
  styleUrls: ['./create-apartment.component.css']
})
export class CreateApartmentComponent implements OnInit {

  ownerFormGroup: FormGroup;
  apartmentFormGroup: FormGroup;
  countryFormControl: FormControl;

  numberRoomsOptions: number[];

  countries: Country[];
  countryPrefix: string;

  createApartments: ApartmentCreateModel[];

  constructor(
    private countriesServices: CountriesService,
    private apartmentService: ApartmentServiceService,
    private toastr: ToastrService,
    private router: Router
  ) {

    this.ownerFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    });
    this.apartmentFormGroup = new FormGroup({
      area: new FormControl(null, [Validators.required]),
      numberRooms: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      address: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
    });

    this.numberRoomsOptions = new Array(25);

    this.countryFormControl = new FormControl('', [Validators.required]);
    this.countries = [];
    this.countryPrefix = '';

    this.createApartments = [];
  }

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries(): void {
    this.countriesServices.getCountries().subscribe(data => {
      this.countries = data.sort((a, b) => {
        if (a.name.common > b.name.common) {
          return 1;
        }
        if (a.name.common < b.name.common) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
      this.countryFormControl.setValue(data.find(d => d.cca2 === 'CO'));
      this.countryPrefix = this.countryFormControl.value.idd.root + this.countryFormControl.value.idd.suffixes[0];
    });
  }

  changeCountrySelected(): void {
    if (this.countryFormControl.value.idd.root) {
      this.countryPrefix = this.countryFormControl.value.idd.root + this.countryFormControl.value.idd.suffixes[0];
    } else {
      this.countryPrefix = '';
    }
  }

  addCreateApartment(): void {
    this.createApartments.push({
      id: uuidv4(),
      area: this.apartmentFormGroup.get('area')?.value,
      number_rooms: this.apartmentFormGroup.get('numberRooms')?.value,
      price: this.apartmentFormGroup.get('price')?.value,
      address: this.apartmentFormGroup.get('address')?.value,
      location: this.apartmentFormGroup.get('location')?.value,
      city: this.apartmentFormGroup.get('city')?.value,
      owner: {
        id: uuidv4(),
        name: this.ownerFormGroup.get('name')?.value,
        email: this.ownerFormGroup.get('email')?.value,
        phone: this.ownerFormGroup.get('phone')?.value,
        countryCode: this.countryFormControl.value.cca2
      },
    });
    this.apartmentFormGroup.reset();
    this.ownerFormGroup.reset();
  }

  confirmRemoveApartment(index: number): void {
    const isConfirm = confirm('¿Desea eliminar el apartamento?');
    if (isConfirm) {
      this.createApartments.splice(index, 1);
    }
  }

  _createApartments(): void {
    this.apartmentService.createApartments({ apartmentsDto: this.createApartments }).subscribe(data => {
      this.toastr.success('!Apartamentos creados con éxito!', 'Apartamentos creados!');
      this.router.navigate(['/apartments']);
    })
  }

}
