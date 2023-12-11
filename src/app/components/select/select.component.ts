import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

interface DataSourceType {
  value: any;
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
  @Input() autoDisplayFirst: boolean = false;

  @Input() form!: FormGroup | undefined;
  @Output() valueChanged = new EventEmitter<string>(); // Sự kiện EventEmitter trả về giá trị đã chọn

  selectedValue: string | null = null;

  constructor() {}

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges) {
    if (changes['form'] && this['form'] && this.controlName) {
      const value = this['form'].get(this.controlName)?.value;
      if (value !== undefined && value !== null) {
        this.updateSelectedValue(value);
      }
    }
  }

  private updateSelectedValue(value: any) {
    const selectedOption = this.dataSource?.find(
      (option) => option.value === value
    );

    if (selectedOption) {
      this.form?.get(this.controlName)?.setValue(selectedOption.value);
      this.selectedValue = selectedOption;
    }
  }

  onSelectionChange(event: any) {
    if (event && event.value && event.value.value) {
      const selectedValue = event.value.value; // Lấy giá trị 'value' của lựa chọn từ sự kiện onChange của p-dropdown
      this.form?.get(this.controlName)?.setValue(selectedValue); // Set giá trị của control tương ứng trong FormGroup
      this.valueChanged.emit(selectedValue); // Trả về giá trị 'value' đã chọn thông qua EventEmitter
    }
  }
}
