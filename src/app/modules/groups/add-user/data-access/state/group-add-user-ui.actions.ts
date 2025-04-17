export class OpenAddUserDialog {
  static readonly type = '[Groups] Open Add User Dialog';

  constructor(public readonly groupId: number) {}
}

export class CloseAddUserDialog {
  static readonly type = '[Groups] Close Add User Dialog';
}
