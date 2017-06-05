# Change Log

## 1.11.0 (June 05, 2017)

* Bug: Singular for single number months [#16](https://github.com/Sertion/vscode-gitblame/issues/12) (Thanks to [@adambowles](https://github.com/adambowles))
* Fix: Adding additional tests for checking `toDateText`
* Fix: Watching only blamed files

## 1.10.0 (May 21, 2017)

* Feature: Adding support for git submodules [#12](https://github.com/Sertion/vscode-gitblame/issues/12)

## 1.9.0 (May 15, 2017)

* Bug: Fix link in CHANGELOG.md
* Fix: Moved to TypeScript 2.1.5
* Bug: Allow for underscore in tokens
* Fix: Using `async`/`await` where appropriate
* Bug: Allow token functions do declare default values
* Fix: Moving editor and document validation to its on file
* Fix: Moving git repository finding process to its own file
* Feature: Adding a better tool for handling informative errors to the user
* Feature: Listening to file changes in the repository and generates new git blame info if an external tool changes a file

## 1.8.2 (May 14, 2017)

* Bug: Fix incorrect version number in CHANGELOG.md [#13](https://github.com/Sertion/vscode-gitblame/pull/13) (Thanks to [@zackschuster](https://github.com/zackschuster))
* Fix: Removing `typings` directory
* Feature: Now respects `git.path` (Thanks to [@alessioalex](https://github.com/alessioalex)) [#4](https://github.com/Sertion/vscode-gitblame/issues/4)
* Feature: Adding short hash token to `infoMessageFormat` and `statusBarMessageFormat` [#10](https://github.com/Sertion/vscode-gitblame/issues/10)

## 1.8.1 (May 01, 2017)

* Bug: Fix incorrect file name in imports [#9](https://github.com/Sertion/vscode-gitblame/issues/9) (Thanks to [@pftbest](https://github.com/pftbest))

## 1.8.0 (May 01, 2017)

* Feature: Customizable status bar message format [#5](https://github.com/Sertion/vscode-gitblame/issues/5)
* Feature: Customizable `infoMessage` format
* Enhancement: Updating installation instructions

## 1.7.1 (April 30, 2017)

* Enhancement: Use the same cache for `showMessage` and `view.refresh`

## 1.7.0 (April 30, 2017)

* Feature: Adding setting to ignore whitespace changes (`gitblame.ignoreWhitespace`) [#1](https://github.com/Sertion/vscode-gitblame/issues/1)
* Feature: Adding setting to open commit info in online tool (`gitblame.commitUrl`) [#6](https://github.com/Sertion/vscode-gitblame/issues/6)
* Enhancement: Status bar message no longer clickable when there is no commit associated with the current line
* Enhancement: Adding info about configuration in `README.md`
* Bug: Spawn fewer git processes when opening a file [#3](https://github.com/Sertion/vscode-gitblame/issues/3)

## 1.6.2 (April 29, 2017)

* Updating example animation
* Removing backlog from `README.md`, it is now the [`Planned` label in the issue tracker](https://github.com/Sertion/vscode-gitblame/labels/Planned)

## 1.6.1 (April 29, 2017)

* Split change log into its own file as per [suggestion from @daniel-white](https://github.com/waderyan/vscode-gitblame/issues/30)

## 1.6.0 (April 17, 2017)

* More granular time info
* Adding a re-check of blame info on save

## 1.5.0 (April 17, 2017)

* Spring cleaning

## 1.4.0 (April 16, 2017)

* Now respects changes made in the git working tree when blaming
* Updating dependencies
* Updating to new repository

## 1.3.0 (July 21, 2016)

* Merged in [PR](https://github.com/waderyan/vscode-gitblame/pull/12) to make the status bar message interactive (credit to [@j-em](https://github.com/j-em));

## 1.2.0 (July 20, 2016)

* Merged in [PR](https://github.com/waderyan/vscode-gitblame/pull/10) replacing 'Hello World' message with hash and commit message (credit to [@carloscz](https://github.com/carloscz)).

## 1.1.0 (May 20, 2016)

* Reduced text size which was causing the blame info not to show.
* Merged in [PR](https://github.com/waderyan/vscode-gitblame/pull/5) (credit to [@fogzot](https://github.com/fogzot)) that searches for .git in parent dirs.