import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login-in',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  alert_message: string = '';
  alert_message_status: boolean = false;
  error: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  sign_in() {
    console.log('signed in!');
    console.log(this.loginForm);

    // SIGN IN
    // let sign_in_status = this.userS.sign_in(this.loginForm.value);
    let sign_in_status = '200';

    if (sign_in_status == '200') {
      this.router.navigate(['/home']);
    } else {
      // SHOW ALERT MESSAGE
      this.alert_message = sign_in_status;
      this.alert_message_status = true;

      setTimeout(() => {
        this.alert_message_status = false;
      }, 2000);

      // RESET FORM
      this.loginForm.reset();
    }
  }
  login() {
    if (this.loginForm.valid)
      this.authService.login(this.loginForm.value).subscribe((response) => {
        localStorage.setItem('token', response.token);
        this.authService.saveCurrentUser();

        switch (response.roles.$values[0]) {
          case 'Admin':
            this.router.navigate(['/admin/tutorials']);
            break;
          case 'User':
            this.router.navigate(['/home']);
            break;
        }
      });
  }
}
