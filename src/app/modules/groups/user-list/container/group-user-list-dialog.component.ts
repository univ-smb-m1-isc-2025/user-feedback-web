import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatList, MatListItem } from '@angular/material/list';
import { GroupDetails } from 'uf/modules/groups/details';
import { AvatarComponent } from 'uf/shared/components/avatar';

@Component({
  selector: 'uf-create-group-dialog',
  standalone: true,
  templateUrl: './group-user-list-dialog.component.html',
  styleUrl: './group-user-list-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    MatDialogActions,
    MatIcon,
    MatDialogTitle,
    MatList,
    MatListItem,
    MatDivider,
    AvatarComponent,
  ],
})
export class GroupUserListDialogComponent {
  readonly data = inject<{
    group: GroupDetails;
    name: string;
  }>(MAT_DIALOG_DATA);
}
