export default abstract class Repository<T> {
    abstract readItems = async () => {};
    abstract writeItems = async () => {};
    abstract addItem = (item: T) => {};
    abstract deleteItem = (item: T) => {};
    abstract updateItem = (item: T) => {};
}