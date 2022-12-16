import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private categoriesService: CategoriesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.get();
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
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
    }
  }

  addCategory() {
    if (this.form.valid) {
      this.categoriesService.CreateCategory(this.form.value).subscribe({
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
    if (this.form.valid) {
      this.categoriesService
        .UpdateCategory({ id: this.id, ...this.form.value })
        .subscribe({
          next: (data) => {
            this.showAddNewListModal = false;
            this.form.reset();
            this.isEdit = false;
            this.get();
          },
        });
    }
  }
}
