import { IFormatterBehaviour } from "./IFormatterBehaviour";

export class EchoFormat implements IFormatterBehaviour {
    
    Format(data: string[]): string[] {
        const arr = []
        for (let p of data) {
            arr.push(p)
            arr.push(p)
        }
        return arr
    }

}