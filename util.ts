export default class Util {
    public static randomizeArray<T>(array: T[]): T[] {
        const newArray = array.slice(0);
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }
}