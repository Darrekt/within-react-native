# Pre-requisites

Work on this project assumes a baseline level of experience with web development. At minimum, we expect contributors to understand the basics of front-end and back-end, and experience with a front-end declarative framework such as React, Angular, Vue or Flutter. This page outlines some of the less basic aspects of the parts of our stack, for easier onboarding and reference.

## TypeScript

TypeScript is a typed superset of JavaScript, which offers many benefits:

- Static code checking ahead of compile time
- a strict type system and utilities to generate your own types
- A whole suite of useful tooling, including autocomplete and linting

Especially in large production apps, where code takes a long time to build and run, it is a big waste of time for developers to encounter runtime errors late into the build. A strong type system helps to combat this problem by alerting you at compile-time that a given variable or parameter is not of the expected type, which you may then proceed to remedy ahead of your build.

Learning how to use the tooling of a given ecosystem is a fundamental cornerstone of your productivity as a developer. Another reason why TypeScript has gained so much popularity is the tooling which it offers developers. As long as one takes the effort to properly name and type everything, all interfaces will be exposed naturally by the in-editor tooling, which allows for better abstraction and use of code. Instead of having to read code, one should simply be able to use it based on its interface, trusting that as long as the input is well-formed, the code should do what it says it does. See the [example](#example) below.

## [React](https://reactjs.org)

A strong understanding of the React ecosystem is required. In particular, this project employs the use of the additional advanced features:

- [React context](https://reactjs.org/docs/context.html)
- [Higher order components](https://reactjs.org/docs/higher-order-components.html)
- [Custom hooks](https://reactjs.org/docs/hooks-custom.html)

### [React Native](https://reactnative.dev)

A great benefit of React Native is its user-friendliness to people who already know React. Lots of components are available out-of-the-box, and the full documentation will be a very useful point of reference.

## Redux

### A note on TypeScript usage with Redux

In the context of a Redux app, which works off of a global store which is just a complex JavaScript `Object`, it is therefore important to specify and adhere to the shape of the store, as well as to have well-defined types and values for all of its attributes such that it will not take a form that is not expected by the app and cause unexpected errors.

### Usage of functional syntaxes

Functional programming motivates the use of immutable data structures which transform from value to value, instead of mutating the original value in memory of the original. If you have read the Redux docs, you should already understand the benefits of using such a paradigm in state management.

In the context of this app, you will see many functional syntaxes in use. As such, it is important to have a basic understanding of the following concepts:

- The benefits of immutable data
- Declarative vs. Imperative syntax
- Declarative and functional List operations supported by JavaScript
- Object operators and utilities in JavaScript
- Higher order functions

### Example

Take for example, this small snippet of code in `selectors.ts`:

```TypeScript
export const findDeadline =
  (deadlineID: string | undefined) => (state: RootState) =>
    deadlineID
      ? state.projects
          .find((proj) => proj.deadlines.some((ddl) => ddl.id === deadlineID))
          ?.deadlines.find((ddl) => ddl.id === deadlineID)
      : undefined;
```

Here, we define a function which is helpfully named `findDeadline`. We expect this to fetch a given deadline from our state object.
The function definition shows that this is a higher-order function which first takes a `deadlineID` which may be of the union type `string | undefined`. It returns a function which takes a single argument, `state` (of type `RootState`), which then performs the following:

- If deadlineID is not falsy:
  - Search for a project in `state.projects` using the `find` array method.
    - The `find` method traverses the list of projects, tests each element with a lambda which returns a boolean predicate and returns the first value which returns `true`, therefore we must define a search predicate.
    - In this case, we wish the predicate to return `true` for the project containing a deadline which matches the `deadlineID`
    - Since `state.projects.deadlines` is itself a list, we must use the `some` method to search the deadline list for the matching entity.
- Otherwise, if the `deadlineID` is falsy, we may simple return an `undefined` value.

While such syntax takes an initial adjustment, one can see that it is declarative, which is to say that we are "telling" the language what we wish to do, instead of imperatively specifying the exact method of list traversal (making an iterator, or increasing indices manually).

Such syntaxes leave optimisation in the hands of the open source developers who develop the language, and result in more readable code while not re-inventing the wheel.

Furthermore, mousing over `findDeadline` in another file displays the following in your editor:

![image](/doc/img/in_editor_prototype.png)

Anyone else writing code can simply use your code with much greater confidence, as long as they adhere to the desired input and output shapes.

## Data Model

TBC

### Redux Implementation

TBC

### [Firebase](https://firebase.google.com/docs)

TBC

## Deployment and CI with [Github Actions](https://docs.github.com/en/actions)

TBC