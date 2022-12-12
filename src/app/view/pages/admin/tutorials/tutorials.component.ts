import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../../../core/services/admin/admin.service';

@Component({
  selector: 'app-tutorials',
  templateUrl: './tutorials.component.html',
  styleUrls: ['./tutorials.component.scss'],
})
export class TutorialsComponent implements OnInit {
  form: FormGroup;
  showAddNewListModal: boolean = false;
  selectedCategorie!: number;
  categories: any = [
    { id: 1, name: 'Step' },
    { id: 2, name: 'Structure' },
    { id: 3, name: 'Kids' },
  ];

  sections : any = [
    {id : 1 , name : 'Beginner'},
    {id : 2 , name : 'Intermediate'},
    {id : 3 , name : 'Advanced'},
    {id : 4 , name : 'Expert'},
  ]

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ) {
    this.form = this.formBuilder.group({
      Question: 'ddd',
      Answer1: 'ddd',
      Answer4: 'ddd',
      Answer2: 'dddd',
      Answer3: 'ddd',
      CorrectAnswer: 1,
      Vid: 2,
    });
  }

  ngOnInit(): void {}

  submit() {
    console.log(this.form);
    const formData = new FormData();
    formData.append('Question', this.form.controls['Question'].value);
    formData.append('Answer1', this.form.controls['Answer1'].value);
    formData.append('Answer2', this.form.controls['Answer2'].value);
    formData.append('Answer3', this.form.controls['Answer3'].value);
    formData.append('Answer4', this.form.controls['Answer4'].value);
    formData.append('CorrectAnswer', this.form.controls['CorrectAnswer'].value);
    formData.append('Vid', this.form.controls['Vid'].value);
    // this.adminService.submit(formData).subscribe({
    //   next: (data) => {
    //     console.log(data);
    //   },
    // });
  }

  ShowAddNewListModal() {
    this.showAddNewListModal = true;
  }

  addList() {
    this.showAddNewListModal = false;
  }
}
