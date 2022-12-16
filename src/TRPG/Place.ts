import { Enemy } from "./Enemy";
import { GameLogic } from "./GameLogic";
import { Player } from "./Player";

export class Place {
    public name: string;
    private index: number;
    private bestiaires: Enemy[];
    private encounters: string[];

    constructor(name: string, index: number, bestiaires: Enemy[], rencontres: string[]) {
        this.name = name;
        this.index = index;
        this.bestiaires = bestiaires;
        this.encounters = rencontres;
    }

    public async randomBattle(player: Player) {
        const e: Enemy = this.bestiaires[Math.floor(Math.random() * this.bestiaires.length)];
        console.clear()
        GameLogic.printHeading("You encountered an " + e.name + ". You'll have to fight it!");
        GameLogic.toContinue();
        
        while (player.isAlive) {
            console.clear()
            GameLogic.printHeading(e.name + "\nHP: " + e.hp + "/" + e.maxHp);
            GameLogic.printHeading(player.name + "\nHP: " + player.hp + "/" + player.maxHp);
            console.log("Choose an action");
            GameLogic.printSeparator(20);
            console.log("(1) Fight\n(2) Run Away");

            const input: number = await GameLogic.readInt("-> ", 2);
            if (input == 1) {
                console.clear()
                GameLogic.printHeading("BATTLE");

                const playerDamage: number = player.attack() - e.defend();
                const enemyDamage: number = e.attack() - player.defend();
                
                console.log("You dealt " + e.receive(playerDamage) + " damage to the " + e.name + ".");
                //e.receive(playerDamage);
                GameLogic.printSeparator(15);

                console.log("The " + e.name + " dealt " + (enemyDamage < 0 ? 0 : enemyDamage) + " damage to you.");
                player.receive(enemyDamage);
                GameLogic.toContinue();
                if (!e.isAlive) {
                    console.clear()
                    GameLogic.printHeading("You defeated the " + e.name + "!");
                    player.xp += e.xp;
                    console.log("You earned " + e.xp + " XP!");
                    const rest: boolean = (Math.random() * 5 + 1 <= 2.25);
                    const gold: number = Math.floor(Math.random() * e.xp);
                    if(rest) {
                        player.restLeft++;
                        console.log("You earned an additional rest!");
                    }
                    if(gold > 0) {
                        player.gold += gold;
                        console.log("You collect " + gold + " gold from the " + e.name + "'s corpse!");
                    }
                    GameLogic.toContinue();
                    break;
                }
            } else {
                console.clear()
                if (this.index != 4) {
                    if (Math.random() * 10 + 1 <= 3.5) {
                        GameLogic.printHeading("You ran away from the " + e.name + "!");
                        GameLogic.toContinue();
                        break;
                    } else {
                        GameLogic.printHeading("You didn't managed to escape.");
                        const damage: number = e.attack();
                        console.log("You took " + (damage < 0 ? 0 : damage) + " damage!");
                        player.receive(damage);
                        GameLogic.toContinue();
                    }
                } else {
                    GameLogic.printHeading("YOU CANNOT ESCAPE THE EVIL EMPEROR !!");
                    const damage: number = e.attack();
                    console.log("You took " + (damage < 0 ? 0 : damage) + " damage!");
                    player.receive(damage);
                    GameLogic.toContinue();
                }
            }
        }
    }

    public async randomEncounter(player: Player) {
        const encounter: number = Math.floor(Math.random() * this.encounters.length);
        switch (this.encounters[encounter]) {
            case "Battle":
                await this.randomBattle(player);
                break;
            case "Rest":
                console.log('Rest')
                // player.rest();
                break;
            case "Chest":
                console.log('Chest')
                const gold: number = Math.floor(Math.random() * (5 - 1 + 1) + 1);
                console.log("You found a chest, you got " + gold + "!");
                player.gold += gold;
                break;
            default:
                console.log('Shop')
                // GameLogic.shop();
                break;
        }
    }

}
