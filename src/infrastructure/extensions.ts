export function StringEnum<T extends string>(i: Array<T>): {[K in T]: K} {
    return i.reduce((item, key) => {
        item[key] = key;
        return item;
    }, Object.create(null));
}
