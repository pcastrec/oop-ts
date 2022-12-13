import { IOrderBehaviour } from "./IOrderBahaviour";

export class DefaultOrder implements IOrderBehaviour {

    Order(data: string[]): string[] {
        return data
    }
    
}