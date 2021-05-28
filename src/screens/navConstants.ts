export type RootStackParamList = {
  [Screens.ViewProject]: { projID: string };
  [Screens.ViewDeadline]: { deadlineID: string };
  [Screens.AddDeadline]: { projID: string };
  [Screens.ViewTodo]: { todoID: string };
};

export enum Screens {
  SignIn = "APP_SIGN_IN",
  SignUp = "APP_SIGN_UP",
  Home = "APP_HOME",
  Settings = "APP_SETTINGS",
  AuthManagement = "APP_AUTH_MGMT",
  ChangeDisplayName = "APP_CHANGE_NAME",
  ChangePassword = "APP_CHANGE_PASSWORD",
  ChangeEmail = "APP_CHANGE_EMAIL",
  ChangeProductivitySettings = "APP_CHANGE_PROD_SETTINGS",
  TodoHome = "TODO_HOME",
  AddProject = "TODO_ADD_PROJECT",
  ViewProject = "TODO_VIEW_PROJECT",
  AddDeadline = "TODO_ADD_DEADLINE",
  ViewDeadline = "TODO_VIEW_DEADLINE",
  AddTodo = "TODO_ADD_TODO",
  ViewTodo = "TODO_VIEW_TODO",
}
