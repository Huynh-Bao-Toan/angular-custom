import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

interface DataSourceType {
  value: string;
  text: string;
}

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() dataSource: DataSourceType[] | any[] | undefined = [];
  @Input() label: string = 'text';
  @Input() showClear: boolean = true;
  @Input() filter: boolean = true;
  @Input() disabled: boolean = false;
  @Input() virtualScroll: boolean = false;
  @Input() virtualScrollItemSize: number = 38;
  @Input() controlName!: string;

  @Input() form!: FormGroup | undefined;
  @Output() valueChanged = new EventEmitter<string>(); // Sự kiện EventEmitter trả về giá trị đã chọn

  constructor() {}

  ngOnInit() {}

  onSelectionChange(event: any) {
    if (event && event.value && event.value.value) {
      const selectedValue = event.value.value; // Lấy giá trị 'value' của lựa chọn từ sự kiện onChange của p-dropdown
      this.form?.get(this.controlName)?.setValue(selectedValue); // Set giá trị của control tương ứng trong FormGroup
      this.valueChanged.emit(selectedValue); // Trả về giá trị 'value' đã chọn thông qua EventEmitter
    }
  }
}
