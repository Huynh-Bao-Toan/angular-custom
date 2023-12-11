import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
} from '@angular/forms';

interface City {
  text: string;
  value: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-custom';
  defaultCityValue: string = 'RM'; // Giá trị mặc định
  cities: City[] | undefined = [
    { text: 'New York', value: 'NY' },
    { text: 'Rome', value: 'RM' },
    { text: 'London', value: 'LDN' },
    { text: 'Istanbul', value: 'IST' },
    { text: 'Paris', value: 'PRS' },
  ];
  searchForm: FormGroup | undefined;

  constructor(private _fb: UntypedFormBuilder) {
    this.searchForm = this.initSearchForm();
  }

  ngOnInit(): void {
    this.searchForm = this.initSearchForm();
  }

  public initSearchForm(): UntypedFormGroup {
    return this._fb.group({
      cities: [null],
    });
  }

  public onClientIDChange(value: any) {
    console.log(this.searchForm?.getRawValue().cities); // tôi muốn nhận giá trị 2
  }
}
