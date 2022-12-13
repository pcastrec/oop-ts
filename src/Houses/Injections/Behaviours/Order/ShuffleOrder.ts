import { IOrderBehaviour } from "./IOrderBahaviour";

export class ShuffleOrder implements IOrderBehaviour {
    
    Order(data: string[]): string[] {
        return data.sort(() => Math.random() - 0.5)
    }
    
}