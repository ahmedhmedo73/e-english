import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'e-learning';
  userGroupID!: number;

  ngOnInit(): void {
    if(localStorage["userGroupID"]){
      this.userGroupID = +localStorage["userGroupID"];
    }
  }
}
