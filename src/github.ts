import * as Octokit from '@octokit/rest'

export class Github {
  octokit: Octokit
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

  async test() {
    const repos = await this.octokit.repos.list()
    console.log(repos)
  }

  tempBody(compare: string): string {
    return `**Yarn Upgraded:**
    
    ${compare}

    Powered by [circleci-yarn-upgrade-pr](https://github.com/endotakuya/circleci-yarn-upgrade-pr)
    `
  }
}