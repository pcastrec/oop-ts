import { Creature } from "./Creature"

export class Pokemon extends Creature {
    // - = private / + = public / # = protected
    private index: number
    private types: string[] = []

    constructor(i: number, n: string) {
        super(n)
        this.index = i
    }

    public get name(): string { return this._name }
}