import prompt from "prompt";
import { Character } from "./Character";
import { GameLogic } from "./GameLogic";

export class Player extends Character {

    private numAtkUpgrades: number
    private numDefUpgrades: number

    public gold: number
    public restLeft: number

    private atkUpgrades: string[] = ["Strength", "Power", "Might", "Godlike"];
    private defUpgrades: string[] = ["Heavy Bones", "Stoneskin", "Scale Armor", "Holy Aura"];

    constructor(name: string) {
        super(name, 100, 0);
        this.numAtkUpgrades = 0;
        this.numDefUpgrades = 0;

        this.gold = 5;
        this.restLeft = 1;
    }

    public async chooseTraits() {
        // GameLogic.clearConsole();
        console.log("Choose a trait")
        // GameLogic.printHeading("Choose a trait");
        // console.log("(1) " + atkUpgrades[numAtkUpgrades]);
        // console.log("(2) " + defUpgrades[numDefUpgrades]);
        console.log(`(1) ${this.atkUpgrades[this.numAtkUpgrades]}`)
        console.log(`(2) ${this.defUpgrades[this.numDefUpgrades]}`)
        // int input = GameLogic.readInt("-> ", 2);
        const { choice } = await prompt.get(['choice'])
        // GameLogic.clearConsole();
        if (Number(choice) === 1) {
            // GameLogic.printHeading("You choose " + atkUpgrades[numAtkUpgrades] + "!");
            console.log(`You choose ${this.atkUpgrades[this.numAtkUpgrades]} !`)
            this.numAtkUpgrades++;
        } else {
            // GameLogic.printHeading("You choose " + defUpgrades[numDefUpgrades] + "!");
            console.log(`You choose ${this.defUpgrades[this.numDefUpgrades]} !`)
            this.numDefUpgrades++;
        }
    }

    public getInformation() {
        GameLogic.printHeading("CHARACTER INFO");
        console.log(this.name + "\tHP: " + this.hp + "/" + this.maxHp);
        GameLogic.printSeparator(20);
        console.log("XP: " + this.xp + "\tGold: " + this.gold);
        GameLogic.printSeparator(20);
        console.log("# of Rests: " + this.restLeft);
        GameLogic.printSeparator(20);
    
        if (this.numAtkUpgrades > 0) {
            console.log("Offensive trait: " + this.atkUpgrades[this.numAtkUpgrades - 1]);
        }
        if (this.numDefUpgrades > 0) {
            console.log("Defensive trait: " + this.defUpgrades[this.numDefUpgrades - 1]);
        }
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