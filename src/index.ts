import { Git } from './git'
import { Github } from './github'
import { Pr } from './pr'
import * as program from 'commander'
import * as yarn from './yarn'

function die(message: string) {
  console.error(message)
  process.exit(1)
}

function branchList(val: string): string[] {
  return val.split(',')
}

program
  .option('-t, --token [token]', 'set Github access token')
  .option('-u, --username [username]', 'set Github user name')
  .option('-b, --branches [branch]', 'target branches', branchList, ['master'])
  .version(`v${require('../package.json').version}`, '-v, --version')
  .parse(process.argv)

export interface Options {
  username: string
  reponame: string
  runningBranch: string
  githubAccessToken: string
  targetBranches: string[]
}

;(async function() {
  const options: Options = {
    githubAccessToken: program.token || process.env.GITHUB_ACCESS_TOKEN,
    username: program.username || process.env.CIRCLE_PROJECT_USERNAME,
    reponame: process.env.CIRCLE_PROJECT_REPONAME,
    runningBranch: process.env.CIRCLE_BRANCH,
    targetBranches: program.branches || ['master']
  }

  if (!options.githubAccessToken) {
    die("$GITHUB_ACCESS_TOKEN isn't set")
  }

  if (!options.username) {
    die("$CIRCLE_PROJECT_USERNAME isn't set")
  }

  const pr = new Pr(options.targetBranches)
  if (!pr.isTargetBranch(options.runningBranch)) {
    const msg = `Skip because CIRCLE_BRANCH[${
      options.runningBranch
    }] is not included in target branches[${options.targetBranches.join(',')}].`
    console.log(msg)
    return
  }

  const git = new Git(options.username, options.reponame)
  const github = new Github(options.githubAccessToken)
  await git.init(github.accessToken)
  const compare = await yarn.outdated()
  if (!compare) {
    console.log('No changes to yarn upgrade')
    return
  }

  await yarn.upgrade()
  if (pr.isUpdatedYarnLock()) {
    const prBody: string = pr.tempBody(yarn.compareToMarkdown(compare))
    if (!prBody) {
      console.log('No changes to yarn upgrade')
      return
    }

    await git.push()
    const prParams = {
      owner: options.username,
      repo: options.reponame,
      title: '',
      head: git.prBranch,
      base: options.runningBranch,
      body: prBody
    }
    await pr.create(github, prParams)
  }
})().catch(() => process.exit(1))
