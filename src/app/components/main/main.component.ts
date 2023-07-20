import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {validatePassword} from "../../shared/validators/password-validators";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  submitted: boolean = false;
  complete: boolean = false;
  strongPassword: boolean = false;

  signupForm = new FormGroup({
    password: new FormControl(null, [
      Validators.required,
      validatePassword
    ]),
  });

  get form() {
    return this.signupForm.controls;
  }

  onPasswordStrengthChanged(event: boolean): void {
    this.strongPassword = event;
  }
}

