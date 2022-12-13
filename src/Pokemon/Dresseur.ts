import { Computer } from "./Computer"
import { Creature } from "./Creature"
import { Pokemon } from "./Pokemon"

export class Dresseur extends Creature {
    private _computer: Computer = new Computer()
    private _pokemons: Pokemon[] = []

    constructor(n: string) { super(n) }

    public get computer() { return this._computer }

    public capturer(pokemon: Pokemon) {
        if (this._pokemons.length >= 6) {
            console.log("Envoie dans l'ordinateur");
            this._computer.stocker(pokemon)
            return
        }
        this._pokemons.push(pokemon)
    }

    public stocker(pokemon: Pokemon) {
        this._computer.stocker(pokemon)
    }

    public relacher(pokemon: Pokemon) {
        this._pokemons = this._pokemons.filter(p => p.name !== pokemon.name)
    }
}