import { exec } from "child_process"

export default function(commnad: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    exec(commnad, { encoding: "utf-8" }, (err, stdout, stderr) => {
      if (stdout.length > 0) {
        console.log(stdout);
      }
      if (stderr.length > 0) {
        console.error(stderr);
      }
      if (err) {
        reject(err);
      } else {
        resolve(stdout);
      }
    })
  })
}
