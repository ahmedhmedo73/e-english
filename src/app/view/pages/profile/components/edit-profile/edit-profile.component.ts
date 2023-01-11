import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
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
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.userService.GetUserInfo().subscribe({
      next: (response: any) => {
        this.form.patchValue(response.data);
        console.log(response.data);
      },
    });
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', Validators.required],
      pictureFile: ['', Validators.required],
    });
  }

  editProfile(): void {
    if (this.form.valid) {
      let formData = new FormData();
      let values = this.form.value;
      formData.append('fname', values.fname);
      formData.append('Lname', values.lname);
      formData.append('username', values.username);
      formData.append('Email', values.email);
      formData.append('Gender', values.gender);
      formData.append('Age', values.age);
      formData.append('pictureFile', this.img);

      this.userService.EditProfile(formData).subscribe({
        next: (data) => {
          this.authService.logout();
        },
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Edit Profile',
        detail: 'Please fill all fields',
      });
    }
    console.log(this.form);
  }

  handleFile(event: any) {
    this.img = event.target.files[0];
  }
}
