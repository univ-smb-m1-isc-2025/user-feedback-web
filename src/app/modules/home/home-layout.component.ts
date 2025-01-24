import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'uf-home-layout',
  standalone: true,
  templateUrl: './home-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeLayoutComponent {}
