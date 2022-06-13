# Pod install on M1 Macbooks

https://github.com/CocoaPods/CocoaPods/issues/10518

## Setting up a React Native Environment

## Setting up Firebase

### Create an account

### Set up an app

### Connect your development instance to it

### Using the Firebase Emulator Suite

## Possible Problems and Solutions

- An error such as `run-android` is undefined when you try `npx react-native run-android` on your terminal in order to start the app means that you are possibly in the wrong folder on the terminal. Therefore, you need to change to the main folder which will be at `../within-react-native`.

From now on it will be assumed that the main folder is opened from the terminal!

- If you face a dependency problem which will look like a very long error on your terminal and can say `unable to resolve dependency tree`, try running `npm install --save --legacy-peer-deps` on your terminal which will tell NPM to ignore peer deps and proceed with the installation. This was changed in later versions of NPM starting from v7. We are changing the setting to be the same from NPM versions 4 to 6.

- As it is explained above your development instance should be connected to Firebase. If you don't do this you will get an error which will tell you to add google services document. This is provided by Firebase after the development instance is connected to Firebase.

- To be able to run the app, installation of babel will be needed. The Error: Unable to resolve module "@babel/runtime..." can be resolved by downloading babel using `npm add @babel/runtime` on the terminal.

- In order to create an account and sign in to the app for the first time, Firebase project configurations should allow for users to be created and sign up for the app database. This can be enabled from Firebase under your projects' authentication segment. You will find an option to allow users to sign up using any service under there.
