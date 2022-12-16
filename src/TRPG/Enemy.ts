import { Character } from "./Character";

export class Enemy extends Character {

    private playerXP: number;

    constructor(name: string, playerXP: number) {
        super(
            name,
            Math.floor(Math.random() * playerXP / 3 + 5),
            Math.floor(Math.random() * (playerXP / 4 + 2) + 1)
        );
        this.playerXP = playerXP;
    }

    public attack(): number {
        return Math.floor(Math.random() * (this.playerXP / 4 + 1) + this.xp / 4 + 3);
    }

    public defend(): number {
        return Math.floor(Math.random() * (this.playerXP / 4 + 1) + this.xp / 4 + 3);
    }

}
