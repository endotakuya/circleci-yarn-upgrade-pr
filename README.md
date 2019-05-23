# circleci-yarn-upgrade-pr
[![npm version](https://badge.fury.io/js/circleci-yarn-upgrade-pr.svg)](https://badge.fury.io/js/circleci-yarn-upgrade-pr)

`circleci-yarn-upgrade-pr` is a cli that automates from yarn upgrade to creation of pull request. Influenced by [circleci-bundle-update-pr](https://github.com/masutaka/circleci-bundle-update-pr).

![yarn_upgrade_at_2019-05-24_00_51_51__09_00_by_endotakuya_·_Pull_Request__294_·_endotakuya_swimming-info](https://user-images.githubusercontent.com/5449002/58274020-e331c180-7dcc-11e9-8281-9950071ecd2b.png)


## Installation

```shell
$ yarn global add circleci-yarn-upgrade-pr
```
## Usage

### Setting GitHub personal access token to CircleCI

1. Go to [your account's settings](https://github.com/settings/tokens) page and generate a personal access token with `repo` scope
2. On CircleCI dashboard, go to your application's `Settings` -> `Environment Variables`
3. Add an environment variable `GITHUB_ACCESS_TOKEN` with your GitHub personal access token

### Configure .circleci/config.yml

```yaml
version: 2.1

executors:
  node_stretch:
    working_directory: ~/circleci-yarn-upgrade-pr
    docker:
      - image: circleci/node:10.15.3-stretch

jobs:
  yarn-upgrade:
    executor: node_stretch
    steps:
    - checkout
    - run:
        name: Install circleci-yarn-upgrade-pr
        command: |
          yarn global add circleci-yarn-upgrade-pr
    - run:
        name: Continuous yarn upgrade
        command: |
          export PATH="$PATH:`yarn global bin`"
          circleci-yarn-upgrade-pr

workflows:
  version: 2
  run-circleci:
    jobs:
      - yarn-upgrade
```

## CLI options

- token reads from options or GITHUB_ACCESS_TOKEN
- username reads from options or CIRCLE_PROJECT_USERNAME
- repository name reads from CIRCLE_PROJECT_REPONAME
- executed job's default branch is master. You can set multiple branches

```shell
$ circleci-yarn-upgrade-pr -h
Usage: circleci-yarn-upgrade-pr [options]

Options:
  -t, --token [token]        set Github access token
  -u, --username [username]  set Github user name
  -b, --branches [branch]    target branches (default: ["master"])
  -v, --version              output the version number
  -h, --help                 output usage information
```

## Contributing
1. Fork this repository
2. Create your feature branch (git checkout -b your-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin your-new-feature)
5. Create a new Pull Request

## License
circleci-yarn-upgrade-pr is released under the [MIT License](https://opensource.org/licenses/MIT).