import { Component, OnInit } from '@angular/core';

import { LucideShieldAlert } from '@lucide/angular';

import { RoutingUtil } from '@eudoo-consultorias/utilities';

@Component({
  selector: 'app-alerts',
  imports: [LucideShieldAlert],
  templateUrl: './alerts.html',
  styleUrl: './alerts.scss',
})
export class Alerts implements OnInit {
  ngOnInit(): void {
    RoutingUtil.scrollToTop();
  }
}
