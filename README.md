# Within

## About the app

Modern smart devices offer too many distractions for us to remain productive for extended periods. Within is a suite of well-being apps that helps users focus and remain productive. The apps in this family aim to remove the aspects of popular apps which tether themselves into your lifestyle with attention-grabbing "hooks".

The detrimental effects of social media and gaming apps on mental health and self-esteem are well known. The Social Dilemma on Netflix also serves as an adequate digest of the issue. However, the effects of such apps on attention and productivity are not as well-researched. For those interested in reading more, have a look at these resources:

- [Hooked by Nir Eyal](https://www.amazon.co.uk/Hooked-How-Build-Habit-Forming-Products/dp/B00HZOBOUO/ref=sr_1_1?adgrpid=54037409435&dchild=1&gclid=Cj0KCQjw5auGBhDEARIsAFyNm9E4n4qyIkApBRehhLcNnxiFWQnnJD3ueIBBKH7LjBRvsnV6p6F_zCMaAsIPEALw_wcB&hvadid=259043076936&hvdev=c&hvlocphy=9072504&hvnetw=g&hvqmt=e&hvrand=13303443007801974394&hvtargid=kwd-299801729894&hydadcr=18461_1817222&keywords=hooked+nir+eyal&qid=1623964716&s=books&sr=1-1)
- [Attention Enhancing Technology: A New Dimension in the Design of Effective Wellbeing Apps](https://ieeexplore.ieee.org/abstract/document/9392016)

## Currently offered

- React Native implementations for iOS and Android.

## Contributing

### Basic workflow

1. Fork and clone the repository.
2. Request firebase config files from the current maintainers.
3. Develop a feature on an appropriately named branch, and make a pull request to the `development-staging` branch.
4. Your pull request will be merged in after code review, subject to all tests passing.

All automations are currently implemented through Github actions. Android and iOS binaries are built on every push, and the test suite is run. Whenever a change to `main` is effected, a release is built and uploaded as a build artefact for testers to download. Once we hit the App stores, this action will be edited to use the App store push APIs.

### Guidelines

- Do follow appropriate file and variable naming conventions.
- Use an auto-formatter often and fix linter errors to the best of your ability.
- Many things are currently untested, try to break this convention and develop in a test-driven manner, especially where stateful changes are involved.

### Future work

- Margins are all hardcoded, need to use [responsive library](https://github.com/marudy/react-native-responsive-screen#example)
- Remove password-based sign-ins
  - Email link
  - Providers (Google, Facebook, Apple, etc)
- Prod notifications when they leave the app
- Add snapshot testing
- Browser extension
  - Block blacklisted sites during interval
- Release on iOS and Android Play stores
  - Privacy policy
  - Store page listing
  - Assets (Hire a designer)

### Todos and bugs

- Password reset
- Loading spinner and initial state instead of onboarding
- Alert for asking permissions, pre-empt the user that the app needs to restart
- Filters should be per-session
- Todo completion should be per-session so multiple devices dont give it more laps
- Dropdown deadlines with todos (RNE accordion)

### Miscellaneous proposed features

- Fitting to individual users maximum attention
- Breaking down large tasks (by time) into smaller periods
  - Teach them to chop projects up into subtasks
- Measurement? Is the user over/underestimating?
  - How many tasks do you successfully set and complete?
- Build in feedback to test for
  - Usability
  - Retention
  - Efficacy
- Goal and progress visualised right away
- Consistent and timed reinforcement
- "Source" Trigger
- Success-built progression to task and goal completion
