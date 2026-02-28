import { Component } from '@angular/core';
import { Container } from '@/layout/container/container';

@Component({
  selector: 'app-choose-us',
  imports: [Container],
  templateUrl: './choose-us.html',
  styleUrl: './choose-us.css',
  standalone: true,
})
export class ChooseUs {
  chooseUsBoxes = [
    {
      title: 'Luxury facilities',
      description:
        'The advantage of hiring a workspace with us is that givees you comfortable service and all-around facilities.',
      linkTo: '',
    },

    {
      title: 'Affordable Price',
      description:
        'You can get a workspace of the highst quality at an affordable price and still enjoy the facilities that are oly here.',
      linkTo: '',
    },

    {
      title: 'Many Choices',
      description:
        'We provide many unique work space choices so that you can choose the workspace to your liking.',
      linkTo: '',
    },
  ];
}
