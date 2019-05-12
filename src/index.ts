import { Pr } from "./pr"
import { Git } from "./git"
import { Github } from "./github"

(function() {
  const githubAccessToken = process.env.GITHUB_ACCESS_TOKEN

  const pr = new Pr()
  if (!pr.isTargetBranch("master")) {
    return
  }

  const github = new Github(githubAccessToken)
  // github.test()

  const git = new Git(
    "endotakuya",
    "circleci-yarn-upgrade-pr",
    "endo.takuya.0701@gmail.com"
  )
  git.init(github.accessToken)
}())
