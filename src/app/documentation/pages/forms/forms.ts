import { Component, OnInit } from '@angular/core';

import { LucideChessQueen } from '@lucide/angular';

import { RoutingUtil } from '@eudoo-consultorias/utilities';

@Component({
  selector: 'app-forms',
  imports: [LucideChessQueen],
  templateUrl: './forms.html',
  styleUrl: './forms.scss',
})
export class Forms implements OnInit {
  ngOnInit(): void {
    RoutingUtil.scrollToTop();
  }
}
