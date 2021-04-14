async function wrapAsync(dispatch: Function) {
  dispatch();
}

export default wrapAsync;
