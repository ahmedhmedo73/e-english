import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  // VARIABLES
  registerForm!: FormGroup;
  alert_message: boolean = false;
  error: any;
  password: string = '';

  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      Fname: ['', [Validators.required]],
      Lname: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      repassword: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      age: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }
  passwordConfirming(c: AbstractControl): ValidationErrors | null {
    if (c.get('password')?.value !== c.get('confirm_password')?.value) {
      return { invalid: false };
    }
    return null;
  }
  register() {
    const formData = new FormData(); 
    formData.append('Fname', this.registerForm.controls['Fname'].value);
    formData.append('Lname', this.registerForm.controls['Lname'].value);
    formData.append('username', this.registerForm.controls['username'].value);
    formData.append('password', this.registerForm.controls['password'].value);
    formData.append('repassword', this.registerForm.controls['repassword'].value);
    formData.append('age', this.registerForm.controls['age'].value);
    formData.append('gender', this.registerForm.controls['gender'].value);
    formData.append('email', this.registerForm.controls['email'].value);

    this._AuthService.register(formData).subscribe((response) => {
      if (response.message == 'success') {
        this._Router.navigate(['/login']);
      } else {
        this.error = response.errors.email.message;
      }
    });
  }

  confirmPassword(control: AbstractControl): ValidationErrors | null {
    if (control.value) {
      return { samePass: true };
    }
    return null;
  }
}
