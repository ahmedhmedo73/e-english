import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  form!: FormGroup;
  img: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      fname: ['', Validators.required],
      Lname: ['', Validators.required],
      Username: ['', Validators.required],
      Email: ['', Validators.required],
      Gender: ['', Validators.required],
      Age: ['', Validators.required],
      pictureFile: ['', Validators.required],
    });
  }

  editProfile(): void {
    if (this.form.valid) {
      let formData = new FormData();
      let values = this.form.value;
      formData.append('fname', values.fname);
      formData.append('Lname', values.Lname);
      formData.append('Username', values.Username);
      formData.append('Email', values.Email);
      formData.append('Gender', values.Gender);
      formData.append('Age', values.Age);
      formData.append('pictureFile', this.img);

      this.userService.EditProfile(formData).subscribe({
        next: (data) => {
          this.authService.logout();
        },
      });
    }
    console.log(this.form);
  }

  handleFile(event: any) {
    this.img = event.target.files[0];
  }
}
