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
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      repassword: [{ value: '', disabled: false }, [Validators.required]],
      gender: ['', [Validators.required]],
      age: ['', [Validators.required]],
    });
  }
  passwordConfirming(c: AbstractControl): ValidationErrors | null {
    if (c.get('password')?.value !== c.get('confirm_password')?.value) {
      return { invalid: false };
    }
    return null;
  }
  register() {
    if (this.registerForm.valid) {
      this._AuthService
        .register(this.registerForm.value)
        .subscribe((response) => {
          localStorage.setItem('token', response.token);
          this._Router.navigate(['/home']);
        });
    }
  }

  confirmPassword(control: AbstractControl): ValidationErrors | null {
    if (control.value) {
      return { samePass: true };
    }
    return null;
  }
}
