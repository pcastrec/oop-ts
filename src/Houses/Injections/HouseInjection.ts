import { DefaultFormat } from "./Behaviours/Formatter/DefaultFormat"
import { IFormatterBehaviour } from "./Behaviours/Formatter/IFormatterBehaviour"
import { DefaultOrder } from "./Behaviours/Order/DefaultOrder"
import { IOrderBehaviour } from "./Behaviours/Order/IOrderBahaviour"

export class HouseInjection {

    private format: IFormatterBehaviour

    constructor(
        order: IOrderBehaviour = new DefaultOrder(),
        format: IFormatterBehaviour = new DefaultFormat()
    ) {
        this.format = format
        this.data = order.Order(this.data)
    }

    protected data: string[] = [
        "the horse and the hound and the horn that belonged to",
        "the farmer sowing his corn that kept",
        "the rooster that crowed in the morn that woke",
        "the priest all shaven and shorn that married",
        "the man all tattered and torn that kissed",
        "the maiden all forlorn that milked",
        "the cow with the crumpled horn that tossed",
        "the dog that worried",
        "the cat that killed",
        "the rat that ate",
        "the malt that lay in",
        "the house that jack built"
    ]

    public recite(): string {
        return this.line(this.data.length)
    }

    // Cet fonction retourne le texte correspondant
    // au morceau de la comptire choisi en commencant par this is
    public line(int: number): string {
        // return `this is ${this.parts(int).join("\n\t")}`
        return 'this is ' + this.parts(int).join('\n\t')
    }

    // Cet fonction renvoie les lignes de 0 a la valeur de int
    public parts(int: number): string[] {
        return this.format.Format(this.data.slice(0, int))
    }
}