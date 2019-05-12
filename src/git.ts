import * as moment from "moment"
import run from "./run"

export class Git {
  username: string
  reponame: string
  email: string
  prBranch: string

  constructor(username: string, reponame: string, email: string) {
    this.username = username
    this.reponame = reponame
    this.email = email
  }

  async init(token: string) {
    await run(`git remote add github-url-with-token ${this.remote(token)}`)
    await run(`git config user.name ${this.username}`)
    await run(`git config user.email ${this.email}`)
    this.prBranch = this.branch()
  }

  async push() {
    await run('git add yarn.lock')
    await run("git commit -m '$ yarn upgrade'")
    await run(`git checkout -b ${this.prBranch}`)
    // await run(`git push github-url-with-token ${this.prBranch}`)
  }

  private branch(): string {
    const prefix: string = "yarn-upgrade-"
    return prefix + moment().format('YYYYMMDDHHmmss')
  }

  private token(): string {
    return process.env.GITHUB_ACCESS_TOKEN
  }

  private remote(token: string): string {
    return `https://${token}@github.com/${this.repoFullName()}`
  }

  private repoFullName(): string {
    return `${this.username}/${this.reponame}`
  }
}
