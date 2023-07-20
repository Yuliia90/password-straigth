import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  submitted = false;
  working = false;
  complete = false;
  strongPassword = false;

  signupForm = new FormGroup({
    password: new FormControl(null, [
      Validators.minLength(8),
      Validators.required,
    ]),
  });

  get f() {
    return this.signupForm.controls;
  }

  onPasswordStrengthChanged(event: boolean) {
    this.strongPassword = event;
  }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }

    this.working = true;
    setTimeout(() => {
      this.signupForm.reset();
      this.working = false;
      this.complete = true;
    }, 1000);
  }
}

