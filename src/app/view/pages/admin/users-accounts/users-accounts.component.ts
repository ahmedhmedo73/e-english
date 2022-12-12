import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersAccountsService } from 'src/app/core/services/users-accounts/users-accounts.service';

@Component({
  selector: 'app-users-accounts',
  templateUrl: './users-accounts.component.html',
  styleUrls: ['./users-accounts.component.scss'],
})
export class UsersAccountsComponent implements OnInit {
  users: any;
  heads: string[] = [
    '#',
    'id',
    'First Name',
    'Last Name',
    'Email',
    'Age',
    'Gender',
    'Actions',
  ];
  constructor(
    private usersAccountsService: UsersAccountsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.get();
  }
  get(): void {
    this.usersAccountsService.GetUsers().subscribe({
      next: (data: any) => {
        this.users = data['$values'];
      },
    });
  }
  deleteUser(id: string): void {
    this.usersAccountsService.DeleteUser(id).subscribe({
      next: (data) => {},
      error: (error) => {
        this.get();
      },
    });
  }
  viewQuestionsReport(id: any): void {
    this.router.navigate(['/admin/questions-report-user/' + id]);
  }
}
