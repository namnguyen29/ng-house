import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const noWhiteSpace = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    let controlVal = control.value;
    if (typeof controlVal === 'string') {
      controlVal = `${controlVal}`;
    }
    const isWhitespace = (controlVal || '').trim().length === 0;
    const isValid = !isWhitespace;

    return isValid ? null : { whitespace: 'Value is only whitespace' };
  };
};
