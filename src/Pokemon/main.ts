import { Dresseur } from "./Dresseur"
import { Pokemon } from "./Pokemon"

const pikachu = new Pokemon(25, "Pikachu")
const miaous = new Pokemon(52, "Miaous")
const bulbi = new Pokemon(1, "Bulbizarre")
const sala = new Pokemon(7, "Salameche")
const tortue = new Pokemon(4, "Tortue")
const renard = new Pokemon(11, "Renard")
const kiwi = new Pokemon(45, "Kiwi")

const sacha = new Dresseur("Sacha")

sacha.capturer(pikachu)
sacha.capturer(miaous)
sacha.stocker(bulbi)
sacha.stocker(sala)
sacha.capturer(tortue)
sacha.capturer(kiwi)

sacha.capturer(renard)

sacha.computer.relacher(bulbi)

console.log('Sacha', sacha.computer.pokemons)