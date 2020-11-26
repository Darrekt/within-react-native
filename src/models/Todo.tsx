export default interface Todo {
    id: string,
    name: string,
    due: Date,
    notes: string,
    disableNotifications: boolean,
    isRunning: boolean,
}