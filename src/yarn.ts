import { json } from '@octokit/rest'
import * as path from 'path'
import run from './run'

export async function upgrade() {
  await run('yarn upgrade')
}

export async function outdated(): Promise<any> {
  const rawData = await run(
    'yarn outdated --json | jq -r \'select(.type == "table")\''
  )
  return JSON.parse(rawData)
}

export function compareToMarkdown(compare: json): string {
  let compareBody: string = ''
  compare.data.body.forEach(pkg => {
    if (pkg[1] === pkg[2]) {
      return
    }
    const pkgUrl: string = pkg[5]
    const compareVersion: string = `v${pkg[1]}...v${pkg[2]}`
    let compareLink: string = ''
    if (pkgUrl.includes('github.com')) {
      const baseUrl: string = pkgUrl.replace('#readme', '')
      const compareUrl = `${baseUrl}/compare/${compareVersion}`
      compareLink = `[\`${compareVersion}\`](${compareUrl})`
    } else {
      compareLink = `\`${compareVersion}\``
    }
    compareBody += `- [ ] [${pkg[0]}](${pkgUrl}) ${compareLink}\n`
  })
  return compareBody
}
