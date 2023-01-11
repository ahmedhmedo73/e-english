import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/core/environments/environment';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // categories: any = [
  //   {
  //     title: 'Beginner',
  //     description:
  //       'Start learning English from the basics such as letters, basic words,and grammer',
  //     img: '../../../../../assets/img/categories/Group 1951.png',
  //     firstVideo: ' Checking understanding',
  //   },
  //   {
  //     title: 'Intermediate',
  //     description:
  //       'Time to go beyond basics. Start adding more vocabulary and grammer to your learning journey',
  //     img: '../../../../../assets/img/categories/Group 1952.png',
  //     firstVideo: 'Apologising',
  //   },
  //   {
  //     title: 'Advanced',
  //     description:
  //       'Master your English skills by adjusting your conversation skills, and vocabulary',
  //     img: '../../../../../assets/img/categories/Group 1953.png',
  //     firstVideo: 'Agreeing and disagreeing',
  //   },
  // ];

  categories: any;
  firstVideo: string[] = [
    'Checking understanding',
    'Apologising',
    'Agreeing and disagreeing',
  ];
  mediaSrc = environment.mediaSrc;

  constructor(private categoriesService: CategoriesService) {}
  ngOnInit(): void {
    this.get();
  }

  get() {
    this.categoriesService.GetCategories().subscribe({
      next: (data: any) => {
        this.categories = data.data.$values;
      },
    });
  }
}
