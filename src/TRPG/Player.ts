import { Character } from "./Character";

export class Player extends Character {

    private numAtkUpgrades: number
    private numDefUpgrades: number

    private gold: number
    private restLeft: number

    private atkUpgrades: string[] = ["Strength", "Power", "Might", "Godlike"];
    private defUpgrades: string[] = ["Heavy Bones", "Stoneskin", "Scale Armor", "Holy Aura"];

    constructor(name: string) {
        super(name, 100, 0);
        this.numAtkUpgrades = 0;
        this.numDefUpgrades = 0;

        this.gold = 5;
        this.restLeft = 1;
    }

    public attack(): number {
        return (Math.random()
            *
            (this.xp / 4 + this.numAtkUpgrades * 3 + 3) + this.xp
            /
            10 + this.numAtkUpgrades * 2 + this.numDefUpgrades + 1);
    }

    public defend(): number {
        return (Math.random()
            *
            (this.xp / 4 + this.numDefUpgrades * 3 + 3) + this.xp
            /
            10 + this.numDefUpgrades * 2 + this.numAtkUpgrades + 1);
    }

}