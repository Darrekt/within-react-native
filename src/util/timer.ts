import Todo from "../models/Todo";

export function getTimeLeft(todo: Todo) {
  // FIXME: Have a global time setting instead of 25:00
  if (todo?.remaining) {
    return todo.remaining;
  } else if (todo?.finishingTime) {
    console.log(typeof todo.finishingTime, todo.finishingTime);
    const now = new Date();
    return Math.max(
      0,
      Math.floor((todo.finishingTime.valueOf() - now.valueOf()) / 1000)
    );
  } else return 25 * 60;
}

export function printTimeLeft(secondsLeft: number) {
  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft / 60) % 60);
  const seconds = Math.floor(secondsLeft % 60);
  return `${hours ? `${hours}:` : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
}
