import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Self,
  ViewChild
} from '@angular/core';
import {
  ControlValueAccessor,
  NgControl
} from '@angular/forms';
import {
  MatFormFieldControl
} from '@angular/material/form-field';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-telephone-input',
  templateUrl: './telephone-input.component.html',
  styleUrls: ['./telephone-input.component.css'],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: TelephoneInputComponent
    }
  ]
})
export class TelephoneInputComponent implements OnInit, OnDestroy, AfterViewInit, ControlValueAccessor {

  @Input() maxLength: number = 15;
  @Input() placeholder: string = '';
  @Input() required: boolean = false;

  @Input()
  get value(): string {
    return this._value;
  }
  set value(val: string) {
    this._value = val;
    this.onChange({
      number: val,
      countryCode: this.countryCode,
      dialCode: this.dialCode
    });
    this.stateChanges.next();
  }

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(dis: boolean) {
    this._disabled = dis;
    this.setDisabledState(dis);
    this.stateChanges.next();
  }

  @ViewChild('phoneInput') phoneInput!: ElementRef<HTMLInputElement>;
  @Output() phoneValid = new EventEmitter<string>();

  // Form field control
  stateChanges = new Subject<void>();
  focused: boolean = false;
  controlType = 'intl-phone';
  autofilled?: boolean;
  dialCode: string = `+050`;
  countryCode: string;

  @HostBinding() id = `${this.controlType}`;
  @HostBinding('attr.aria-describedby') userAriaDescribedBy: string = '';

  private _value: string = '';
  private _disabled: boolean = false;

  private intlTelInputInstance: any;

  constructor(
    @Optional() @Self() public ngControl: NgControl
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() { }

  ngAfterViewInit() {
    // @ts-ignore
    this.intlTelInputInstance = globalThis.intlTelInput(this.phoneInput.nativeElement, {
      initialCountry: 'auto',
      separateDialCode: true,
      geoIpLookup: (callback: (country: string) => void) => {
        fetch('https://ipapi.co/json')
          .then(res => res.json())
          .then(data => callback(data.country_code))
          .catch(() => callback('he'));
      }
    });

    this.intlTelInputInstance.searchInput.style.padding = '10px 0px';

    this.phoneInput.nativeElement.addEventListener('countrychange', this.onCountryChange);
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this.phoneInput.nativeElement.removeAllListeners('countrychange');
  }

  // MatFormFieldControl
  get empty() {
    return !this._value;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  get errorState() {
    return this.ngControl?.invalid && (this.ngControl?.touched || this.ngControl?.dirty);
  }

  setDescribedByIds(ids: string[]){
    this.userAriaDescribedBy = ids.join(' ');
  }

  onContainerClick() {
    this.onFocus();
    this.phoneInput.nativeElement.focus();
  }

  onFocus() {
    this.onTouched();
    this.focused = true;
    this.stateChanges.next();
  }

  onBlur() {
    if (!this._value) {
      this.focused = false;
    }

    this.onTouched();
    this.stateChanges.next();
  }

  onCountryChange = () => {    
    const iso2 = this.intlTelInputInstance.getSelectedCountryData().iso2;
    const dialCode = this.intlTelInputInstance.getSelectedCountryData().dialCode;

    this.dialCode = `+${dialCode}`;
    this.stateChanges.next();
    this.countryCode = iso2;

    try {
      // @ts-ignore
      const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
      // @ts-ignore
      const exampleNumber = phoneUtil.getExampleNumberForType(this.countryCode, libphonenumber.PhoneNumberType.MOBILE);
      // @ts-ignore
      const formatted = phoneUtil.format(exampleNumber, libphonenumber.PhoneNumberFormat.E164);
      this.maxLength = formatted.replace(this.dialCode, '').length;
    } catch (e) {
      this.maxLength = 15;
    }
  }

  handleChange() {
    this.value = this.phoneInput.nativeElement.value;
  }

  // ControlValueAccessor
  onChange = (_: any) => { };
  onTouched = () => { };

  writeValue(obj: string): void {
    this.value = obj || '';
    if (this.intlTelInputInstance) {
      this.intlTelInputInstance.setNumber(this.value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
    if (this.phoneInput) {
      this.phoneInput.nativeElement.disabled = isDisabled;
    }
    this.stateChanges.next();
  }
}
