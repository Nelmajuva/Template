import { Component } from '@angular/core';

import { LucideBoxes, LucideCode, LucideGrid2x2, LucidePen } from '@lucide/angular';

@Component({
  selector: 'app-start',
  imports: [LucideBoxes, LucideGrid2x2, LucideCode, LucidePen],
  templateUrl: './start.html',
  styleUrl: './start.scss',
})
export class Start {}
