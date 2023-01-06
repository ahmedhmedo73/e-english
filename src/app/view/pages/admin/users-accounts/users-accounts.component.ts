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
  heads: any[] = [
    { key: '', title: '#' },
    { key: 'userName', title: 'Username' },
    {
      key: 'fname',
      title: 'First Name',
    },
    {
      key: 'lname',
      title: 'Last Name',
    },
    {
      key: 'email',
      title: 'Email',
    },
    {
      key: 'age',
      title: 'Age',
    },
    {
      key: 'gender',
      title: 'Gender',
    },
    {
      title: 'Login Count',
      key: 'loginCount',
    },
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
        this.users = data.data['$values'];
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
  viewReport(id: any): void {
    this.router.navigate(['/admin/user-report/' + id]);
  }
}
