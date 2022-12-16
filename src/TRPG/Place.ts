import { Enemy } from "./Enemy";
import { GameLogic } from "./GameLogic";
import { Player } from "./Player";
import { Printer } from "./Printer";

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
        Printer.heading("You encountered an " + e.name + ". You'll have to fight it!");
        await GameLogic.toContinue();
        
        while (player.isAlive) {
            console.clear()
            Printer.heading(e.name + "\nHP: " + e.hp + "/" + e.maxHp);
            Printer.heading(player.name + "\nHP: " + player.hp + "/" + player.maxHp);
            console.log("Choose an action");
            Printer.separator(20);
            console.log("(1) Fight\n(2) Use Potion\n(3) Run Away");

            const input: number = await GameLogic.readInt(3);
            if (input == 1) {
                console.clear()
                Printer.heading("BATTLE");

                const playerDamage: number = player.attack() - e.defend();
                const enemyDamage: number = e.attack() - player.defend();
                
                console.log("You dealt " + e.receive(playerDamage) + " damage to the " + e.name + ".");
                //e.receive(playerDamage);
                Printer.separator(15);

                console.log("The " + e.name + " dealt " + (enemyDamage < 0 ? 0 : enemyDamage) + " damage to you.");
                player.receive(enemyDamage);
                await GameLogic.toContinue();
                if (!e.isAlive) {
                    console.clear()
                    Printer.heading("You defeated the " + e.name + "!");
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
                    await GameLogic.toContinue();
                    break;
                }
            } else if(input === 2) {
                console.clear()
                if(player.pots > 0 && player.hp < player.maxHp) {
                    Printer.heading(`Do you want to drink a potion ? (${player.pots} left)`)
                    console.log("(1) Yes!\n(2) No, maybe later.")
                    const input = await GameLogic.readInt(2)
                    if(input === 1) {
                        player.hp = player.maxHp
                        console.clear()
                        player.pots--
                        Printer.heading(`You drank a magic potion. It restored your health. (${player.pots} left)`)
                    }
                } else {
                    Printer.heading("You don't have any potions or you're at full health.")
                    await GameLogic.toContinue()
                }
            } else {
                console.clear()
                if (this.index != 4) {
                    if (Math.random() * 10 + 1 <= 3.5) {
                        Printer.heading("You ran away from the " + e.name + "!");
                        await GameLogic.toContinue();
                        break;
                    } else {
                        Printer.heading("You didn't managed to escape.");
                        const damage: number = e.attack();
                        console.log("You took " + (damage < 0 ? 0 : damage) + " damage!");
                        player.receive(damage);
                        await GameLogic.toContinue();
                    }
                } else {
                    Printer.heading("YOU CANNOT ESCAPE THE EVIL EMPEROR !!");
                    const damage: number = e.attack();
                    console.log("You took " + (damage < 0 ? 0 : damage) + " damage!");
                    player.receive(damage);
                    await GameLogic.toContinue();
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
                await player.rest();
                break;
            case "Chest":
                const gold: number = Math.floor(Math.random() * (5 - 1 + 1) + 1);
                console.log("You found a chest, you got " + gold + "!");
                player.gold += gold;
                await GameLogic.toContinue()
                break;
            default:
                await GameLogic.shop(player);
                break;
        }
    }
}