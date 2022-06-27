# Pod install on M1 Macbooks

https://github.com/CocoaPods/CocoaPods/issues/10518

## Setting up a React Native Environment

We would suggest following the instructions on the [react native environment setup](https://reactnative.dev/docs/environment-setup) page which provides two different options to set up the environment. Follow the React Native CLI Quickstart option as this will allow you to work on your project locally and see your changes on a virtual phone on your computer.

## Setting up Firebase

In order to get the app running, the database needs to be set up. If not, you would face an error realted to Firebase which is explained in the Possible Problems and Solutions section.

### Create an account

Create an account from the [Firebase homepage](https://firebase.google.com).

### Set up an app

After you have successfully created your Firebase account you would have the set up the app in Firebase. Go to console at Firebase and create a new project. After you have created a project, you will need to add an app to your project which can be done on the main page of your project. 

Assuming that the app would run on an virtual Android phone, first step is to register the app which will be done by using Android package name. This can be found in `within-react-native/android/app/build.gradle`. It is under `defaultConfig` used along `applicationID`. The package name is `com.mindmymind.within`.

### Connect your development instance to it

After registering the app, the config file needs to be downloaded. Firebase generates the `google-services.json` file which should be added to the project files under `within-react-native/android/app`. Now your development instance is connected to your Firebase.

### Using the Firebase Emulator Suite

## Possible Problems and Solutions

- An error such as `run-android` is undefined when you try `npx react-native run-android` on your terminal in order to start the app means that you are possibly in the wrong folder on the terminal. Therefore, you need to change to the main folder which will be at `../within-react-native`.

From now on it will be assumed that the main folder is opened from the terminal!

- If you face a dependency problem which will look like a very long error on your terminal and can say `unable to resolve dependency tree`, try running `npm install --save --legacy-peer-deps` on your terminal which will tell NPM to ignore peer deps and proceed with the installation. This was changed in later versions of NPM starting from v7. We are changing the setting to be the same from NPM versions 4 to 6.

- As it is explained above your development instance should be connected to Firebase. If you don't do this you will get an error which will tell you to add google services document. This is provided by Firebase after the development instance is connected to Firebase.

- To be able to run the app, installation of babel will be needed. The Error: Unable to resolve module "@babel/runtime..." can be resolved by downloading babel using `npm add @babel/runtime` on the terminal.

- In order to create an account and sign in to the app for the first time, Firebase project configurations should allow for users to be created and sign up for the app database. This can be enabled from Firebase under your projects' authentication segment. You will find an option to allow users to sign up using any service under there.
