import { Octokit } from '@octokit/rest'

export class Github {
  public octokit: Octokit
  private _accessToken: string

  constructor(token: string) {
    this._accessToken = token
    this.octokit = new Octokit({
      auth: this._accessToken
    })
  }

  get accessToken(): string {
    return this._accessToken
  }

  public async test() {
    const repos = await this.octokit.repos.list()
    console.log(repos)
  }
}
