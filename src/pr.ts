import * as moment from 'moment'
import { Github } from './github'
import run from './run'

interface PrParameters {
  owner: string
  repo: string
  title: string
  head: string
  base: string
  body: string
}

export class Pr {
  private _targetBranches: string[]

  constructor(targetBranches = ['master']) {
    this._targetBranches = targetBranches
  }

  public async create(github: Github, params: PrParameters) {
    const titlePrefix = 'yarn upgrade at '
    params.title = titlePrefix + moment().format('YYYY-MM-DD HH:mm:ss Z')
    await github.octokit.pulls.create(params)
  }

  public async isUpdatedYarnLock(): Promise<boolean> {
    const changeFiles = await run('git status -sb 2> /dev/null')
    return changeFiles.includes('yarn.lock')
  }

  public isTargetBranch(runningBranch: string): boolean {
    return this._targetBranches.includes(runningBranch)
  }

  public tempBody(compare: string): string {
    return `**Yarn Upgraded:**
${compare}

Powered by [circleci-yarn-upgrade-pr](https://github.com/endotakuya/circleci-yarn-upgrade-pr)`
  }
}
