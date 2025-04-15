import { AbstractControl } from "@angular/forms";

export const telephoneInputValidator = (control: AbstractControl) => {
    if (!control.value) {
        return null
    };
  
    const isRequired = control.errors && control.errors.required === true;
    const error = { telephoneInputValidate: { valid: false } };
    // @ts-ignore
    let number: libphonenumber.PhoneNumber;
    try {
        // @ts-ignore
      number = libphonenumber.PhoneNumberUtil.getInstance().parse(
        control.value.number,
        control.value.countryCode
      );
    } catch (e) {
      return isRequired ? error : null;
    }
  // @ts-ignore
    if (!libphonenumber.PhoneNumberUtil.getInstance().isValidNumberForRegion(number, control.value.countryCode)) {
      return error;
    }
  
    return null;
  };