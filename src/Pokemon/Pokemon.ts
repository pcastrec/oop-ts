export class Pokemon {
    // - = private / + = public / # = protected
    private index: number
    private _name: string
    private types: string[] = []

    constructor(i: number, n: string) {
        this.index = i
        this._name = n
    }

    // Getter name
    public get name(): string { return this._name }

    // Setter name
    public set name(n: string) {
        this._name = n
    }
}