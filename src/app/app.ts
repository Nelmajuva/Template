import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Sidebar } from './documentation/components/sidebar/sidebar';

@Component({
  selector: 'app-root',
  imports: [Sidebar, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
