import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  @Input() user: any;

  defaultImg: string = '../../../../../assets/icons/person.png';
  user_details: any[] = [
    { key: 'email', icon: 'fa-envelope' },
    { key: 'userName', icon: 'fa-person' },
    { key: 'age', icon: 'fa-calendar-days' },
    { key: 'gender', icon: 'fa-venus-mars' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
