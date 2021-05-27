export const getTimeLeft = (finishingTime: number) =>
  Math.max(0, Math.floor((finishingTime - new Date().getTime()) / 1000));

export function printTimeLeft(secondsLeft: number) {
  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft / 60) % 60);
  const seconds = Math.floor(secondsLeft % 60);
  return `${hours ? `${hours}:` : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
}
