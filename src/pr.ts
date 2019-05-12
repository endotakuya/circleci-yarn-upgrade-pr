export class Pr {
  private _targetBranches: string[]

  constructor(targetBranches = ["master"]) {
    this._targetBranches = targetBranches
  }

  create() {}

  isTargetBranch(runningBranch: string): boolean {
    return this._targetBranches.includes(runningBranch)
  }
}
