import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss'],
})
export class StarterComponent implements OnInit {
  engagingCards: any[] = [
    {
      Image: 'assets/img/landing page/yes-no.png',
      title: 'Simple questions',
      description: 'Answer a few simple questions after ech lesson.',
    },
    {
      Image: 'assets/img/landing page/Voice chat.png',
      title: 'Better pronounciation',
      description:
        'Enhance your conversation skills by testing your pronunciation.',
    },
    {
      Image: 'assets/img/landing page/Levels.png',
      title: 'Level up',
      description: 'Enhance your level by answering more questions',
    },
  ];
  constructor() {}

  ngOnInit(): void {
    AOS.init();
  }
}
