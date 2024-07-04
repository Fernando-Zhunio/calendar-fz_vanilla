export class Providers {

}

export class Container<T, Keys extends string = never> {
    private store: Record<Keys, T> = {} as Record<Keys, T>

    get(key: Keys): T {
        return this.store[key];
    }

    set<const K extends string>(key: K, val: T): Container<T, Keys | K> {
        (this.store as Record<Keys | K, T>) [key] = val;

        return this as Container<T, Keys | K>
    }

    getAll(): Record<Keys, T> {
        return this.store
    }
}