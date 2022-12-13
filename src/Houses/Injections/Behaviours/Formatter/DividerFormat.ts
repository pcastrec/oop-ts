import { IFormatterBehaviour } from "./IFormatterBehaviour";

export class DividerFormat implements IFormatterBehaviour {

    Format(data: string[]): string[] {
        return data.filter((p, i) => i % 2 === 1)
    }

}