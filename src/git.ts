import * as moment from 'moment'
import run from './run'

export class Git {
  public username: string
  public reponame: string
  private _prBranch: string

  constructor(username: string, reponame: string) {
    this.username = username
    this.reponame = reponame
  }

  public async init(token: string) {
    await run(`git remote add github-url-with-token ${this.remote(token)}`)
    await run(`git config user.name ${this.username}`)
    this._prBranch = this.branch()
  }

  public async push() {
    await run('git add yarn.lock')
    await run("git commit -m '$ yarn upgrade'")
    await run(`git checkout -b ${this._prBranch}`)
    await run(`git push github-url-with-token ${this._prBranch}`)
  }

  get prBranch(): string {
    return this._prBranch
  }

  private branch(): string {
    const prefix: string = 'yarn-upgrade-'
    return prefix + moment().format('YYYYMMDDHHmmss')
  }

  private remote(token: string): string {
    return `https://${token}@github.com/${this.repoFullName()}`
  }

  private repoFullName(): string {
    return `${this.username}/${this.reponame}`
  }
}
