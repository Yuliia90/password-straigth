import {AbstractControl} from "@angular/forms";
import {checkStrength} from "../helpers/helpers";
import {changePassword$} from "../../components/password/password.component";
import {ValidationStatus} from "../core/constans";

export function validatePassword(control: AbstractControl) {
  if(control.value) {
    const validatorValue: number = checkStrength(control.value);
    changePassword$.next(validatorValue);

    switch (validatorValue) {
      case ValidationStatus.lessThenEight:
        return { lessThenEight: true };
      case ValidationStatus.upperLetters:
        return { upperLetters: true };
      case ValidationStatus.numbers:
        return { numbers: true };
      case ValidationStatus.symbols:
        return { symbols: true };
    }
  }
  return null;
}
