import { Character } from "./Character";
import { GameLogic } from "./GameLogic";
import { Printer } from "./Printer";

export class Player extends Character {

    private numAtkUpgrades: number
    private numDefUpgrades: number

    public gold: number
    public pots: number
    public restLeft: number

    private atkUpgrades: string[] = ["Strength", "Power", "Might", "Godlike"];
    private defUpgrades: string[] = ["Heavy Bones", "Stoneskin", "Scale Armor", "Holy Aura"];

    constructor(name: string) {
        super(name, 100, 0);
        this.numAtkUpgrades = 0;
        this.numDefUpgrades = 0;

        this.gold = 5;
        this.pots = 1;
        this.restLeft = 1;
    }

    public async chooseTraits() {
        console.clear()
        Printer.heading("Choose a trait");
        console.log(`(1) ${this.atkUpgrades[this.numAtkUpgrades]}`)
        console.log(`(2) ${this.defUpgrades[this.numDefUpgrades]}`)
        const choice: number = await GameLogic.readInt(2);
        console.clear()
        if (choice === 1) {
            Printer.heading("You choose " + this.atkUpgrades[this.numAtkUpgrades] + "!");
            this.numAtkUpgrades++;
        } else {
            Printer.heading("You choose " + this.defUpgrades[this.numDefUpgrades] + "!");
            this.numDefUpgrades++;
        }
    }

    public getInformation() {
        Printer.heading("CHARACTER INFO");
        console.log(this.name + "\tHP: " + this.hp + "/" + this.maxHp);
        Printer.separator(20);
        console.log("XP: " + this.xp + "\tGold: " + this.gold);
        Printer.separator(20);
        console.log("# of Rests: " + this.restLeft + "\n# of Potions: " + this.pots);
        Printer.separator(20);

        if (this.numAtkUpgrades > 0) {
            console.log("Offensive trait: " + this.atkUpgrades[this.numAtkUpgrades - 1]);
        }
        if (this.numDefUpgrades > 0) {
            console.log("Defensive trait: " + this.defUpgrades[this.numDefUpgrades - 1]);
        }
    }

    public setAlive(isAlive: boolean) {
        super.setAlive(isAlive);
        if (!this.isAlive) {
            console.clear()
            Printer.heading("You died ...");
            Printer.heading("You earned " + this.xp + " XP on your journey. Try to earn more next time.");
        }
    }

    public async rest() {
        console.clear()
        if (this.restLeft >= 1) {
            Printer.heading("Do you want to take a  rest? (" + this.restLeft + " rest(s) left).");
            console.log("(1) Yes\n(2) No, not now.");

            const input: number = await GameLogic.readInt(2);
            if (input == 1) {
                console.clear()
                if (this.hp < this.maxHp) {
                    const hpRestored: number = Math.floor(Math.random() * (this.xp / 4 + 1) + 10);
                    this.hp += hpRestored;
                    if (this.hp > this.maxHp)
                        this.hp = this.maxHp;
                    console.log("You took a rest and restored up to " + hpRestored + " health.");
                    console.log("You're now at " + this.hp + "/" + this.maxHp + " health.");
                    this.restLeft--;
                } else {
                    console.log("You're at full health. You don't need to rest now!");
                }
                await GameLogic.toContinue();
            }
        }
    }

    public attack(): number {
        return Math.floor(Math.random()
            *
            (this.xp / 4 + this.numAtkUpgrades * 3 + 3) + this.xp
            /
            10 + this.numAtkUpgrades * 2 + this.numDefUpgrades + 1);
    }

    public defend(): number {
        return Math.floor(Math.random()
            *
            (this.xp / 4 + this.numDefUpgrades * 3 + 3) + this.xp
            /
            10 + this.numDefUpgrades * 2 + this.numAtkUpgrades + 1);
    }

}