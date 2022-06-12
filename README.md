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
2. Refer to the documentation to get orientated with the codebase.
3. Request firebase config files from the current maintainers.
4. Develop a feature on an appropriately named branch, and make a pull request to the `development-staging` branch.
5. Your pull request will be merged in after code review, subject to all tests passing.

All automations are currently implemented through Github actions. Android and iOS binaries are built on every push, and the test suite is run. Whenever a change to `main` is effected, a release is built and uploaded as a build artefact for testers to download. Once we hit the App stores, this action will be edited to use the App store push APIs.

### Guidelines

- Do follow appropriate file and variable naming conventions.
- Use an auto-formatter often and fix linter errors to the best of your ability.
- Many things are currently untested, try to break this convention and develop in a test-driven manner, especially where stateful changes are involved.
