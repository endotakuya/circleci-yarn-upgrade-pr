import { Pr } from "./pr"
import { Git } from "./git"
import { Github } from "./github"
import * as yarn from "./yarn";

(async function() {
  const username = process.env.CIRCLE_PROJECT_USERNAME
  const reponame = process.env.CIRCLE_PROJECT_REPONAME
  const email = process.env.GITHUB_USER_EMAIL
  const runningBranch = process.env.CIRCLE_BRANCH
  const githubAccessToken = process.env.GITHUB_ACCESS_TOKEN

  const pr = new Pr()
  if (!pr.isTargetBranch(runningBranch)) {
    return
  }

  const git = new Git(username, reponame, email)
  const github = new Github(githubAccessToken)
  await git.init(github.accessToken)
  const compare = await yarn.outdated()
  if (!compare) {
    return
  }
  
  await yarn.upgrade()
  if (await pr.isUpdatedYarnLock()) {
    const prBody: string = pr.tempBody(yarn.compareToMarkdown(compare))
    if (!prBody) {
      return
    }

    await git.push()
    const prParams = {
      owner: username,
      repo: reponame,
      title: "",
      head: git.prBranch,
      base: runningBranch,
      body: prBody
    }
    await pr.create(github, prParams)
  }
  
}())
