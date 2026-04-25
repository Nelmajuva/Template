import { Component, OnInit } from '@angular/core';

import { RoutingUtil } from '@eudoo-consultorias/utilities';

@Component({
  selector: 'app-buttons',
  imports: [],
  templateUrl: './buttons.html',
  styleUrl: './buttons.scss',
})
export class Buttons implements OnInit {
  ngOnInit(): void {
    RoutingUtil.scrollToTop();
  }
}
