import { GroupDetails } from 'uf/modules/groups/details';

export class OpenUserListGroupDialog {
  static readonly type = '[Groups] Open User List Group Dialog';

  constructor(
    public readonly group: GroupDetails,
    public readonly name: string,
  ) {}
}

export class CloseUserListGroupDialog {
  static readonly type = '[Groups] Close User List Group Dialog';
}
