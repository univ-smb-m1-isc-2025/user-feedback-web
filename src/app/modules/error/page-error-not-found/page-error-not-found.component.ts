import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { UfRoute } from 'uf/shared/data-access/router';

@Component({
  selector: 'uf-page-error-not-found',
  standalone: true,
  templateUrl: './page-error-not-found.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatAnchor, RouterLink],
})
export class PageErrorNotFoundComponent {
  readonly routeHome: UfRoute = ['/'];
}
