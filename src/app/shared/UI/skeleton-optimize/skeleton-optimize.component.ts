import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-optimize',
  templateUrl: './skeleton-optimize.component.html',
  styleUrls: ['./skeleton-optimize.component.scss'],
})
export class SkeletonOptimizeComponent {
  @Input() width!: string;
  @Input() height!: string;
  @Input() borderRadius!: string;
  @Input() class!: string;
}
