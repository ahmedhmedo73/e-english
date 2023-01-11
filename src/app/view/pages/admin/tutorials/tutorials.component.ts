import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { environment } from 'src/app/core/environments/environment';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { AdminService } from '../../../../core/services/admin/admin.service';

@Component({
  selector: 'app-tutorials',
  templateUrl: './tutorials.component.html',
  styleUrls: ['./tutorials.component.scss'],
})
export class TutorialsComponent implements OnInit {
  form!: FormGroup;
  showAddNewListModal: boolean = false;
  selectedCategorie!: number;

  categories: any;
  isEdit!: boolean;
  id: any;

  heads = ['#', 'Name', 'Description', 'Image', 'Actions'];
  mediaSrc = environment.mediaSrc;
  img: any;

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private categoriesService: CategoriesService,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.get();
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      pictureFile: ['', Validators.required],
    });
  }

  get() {
    this.categoriesService.GetCategories().subscribe({
      next: (data: any) => {
        this.categories = data.data.$values;
      },
    });
  }

  ShowAddNewListModal(category?: any) {
    this.showAddNewListModal = true;
    if (category) {
      this.id = category.id;
      this.form.reset(category);
      this.isEdit = true;
    } else {
      this.isEdit = false;
    }
  }

  addCategory() {
    if (this.form.valid) {
      let formData = new FormData();
      let values = this.form.value;
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('pictureFile', this.img);

      this.categoriesService.CreateCategory(formData).subscribe({
        next: (data) => {
          this.get();
          this.showAddNewListModal = false;
          this.form.reset();
        },
      });
    }
  }

  deleteCategory(id: number) {
    this.categoriesService.DeleteCategories(id).subscribe({
      next: (data) => {
        this.get();
      },
    });
  }

  updateCategory() {
    let formData = new FormData();
    let values = this.form.value;
    formData.append('id', this.id);
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('pictureFile', this.img);

    this.categoriesService.UpdateCategory(formData).subscribe({
      next: (data) => {
        this.showAddNewListModal = false;
        this.form.reset();
        this.isEdit = false;
        this.get();
      },
    });
  }

  handleFile(event: any) {
    this.img = event.target.files[0];
  }
}
