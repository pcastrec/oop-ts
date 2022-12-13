import { IFormatterBehaviour } from "./IFormatterBehaviour";

export class DefaultFormat implements IFormatterBehaviour {
    
    Format(data: string[]): string[] {
        return data
    }

}