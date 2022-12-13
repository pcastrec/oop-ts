import { House } from "./House";

export class RandomHouse extends House {

    // Redefinie la fonction parts
    public parts(int: number): string[] {
        const arr = []
        for (let i = 0; i < int; i++) {
            arr.push(this.data[i])
        }
        arr.sort(() => Math.random() - 0.5)
        return arr
    }
}