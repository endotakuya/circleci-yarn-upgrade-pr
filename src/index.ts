import { exec } from "child_process"
import * as moment from "moment"

function run(commnad: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    exec(commnad, 
      { encoding: "utf-8" },
      (err, stdout, stderr) => {
        if (stdout.length > 0) {
          console.log(stdout);
        }
        if (stderr.length > 0) {
          console.error(stderr.length);
        }
        if (err) {
          reject(err);
        } else {
          resolve(stdout);
        }
      })
  })
}

function createBranch() {
  const branchPrefix: string = "yarn-upgrade-"
  const branch: string = branchPrefix + moment().format('YYYYMMDDHHmmss')
  console.log(branch)
}

async function main() {
  await run('pwd')
  createBranch()
}

main()
