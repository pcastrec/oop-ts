import { Pokemon } from "./Pokemon";

export class Computer {
    private _pokemons: Pokemon[] = []

    public get pokemons() { return this._pokemons }

    public stocker(pokemon: Pokemon) {
        this._pokemons.push(pokemon)
    }

    public retirer(pokemon: Pokemon): Pokemon | undefined {
        for (const p of this._pokemons) {
            if (p.name === pokemon.name)
                return p
        }
    }

    public relacher(pokemon: Pokemon) {
        this._pokemons = this._pokemons.filter(p => p.name !== pokemon.name)
    }

}