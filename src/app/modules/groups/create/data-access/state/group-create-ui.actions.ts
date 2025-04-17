export class OpenCreateGroupDialog {
  static readonly type = '[Groups] Open Create Group Dialog';

  constructor(public readonly groupId?: number) {}
}

export class CloseCreateGroupDialog {
  static readonly type = '[Groups] Close Create Group Dialog';
}
