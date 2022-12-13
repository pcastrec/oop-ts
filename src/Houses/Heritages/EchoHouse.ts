import { House } from "./House";

export class EchoHouse extends House {

    // Redefinie la fonction parts
    public parts(int: number): string[] {
        const arr = []
        for (let i = 0; i < int; i++) {
            arr.push(this.data[i])
            arr.push(this.data[i])
        }
        return arr
    }
}