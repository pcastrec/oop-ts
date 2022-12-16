import prompt from "prompt";
import { Enemy } from "./Enemy";
import { Place } from "./Place";
import { Player } from "./Player";
import { Printer } from "./Printer";

export class GameLogic {

    private player!: Player
    static place: number = 0;

    constructor() {
        prompt.start();
        prompt.message = '>';
    }

    public static initPlaces(): Place[] {

        const places: Place[] = []

        const town: Place = new Place("Town", 0, [
            new Enemy("Rat", 10),
            new Enemy("Little boy", 10)
        ], ["Battle", "Shop", "Chest"]);

        const forest: Place = new Place("Forest", 1, [
            new Enemy("Wolf", 20),
            new Enemy("WereWolf", 50)
        ], ["Rest", "Shop", "Battle", "Battle"]);

        const castle: Place = new Place("Castle", 2, [
            new Enemy("Swordman", 30),
            new Enemy("Spearman", 30),
            new Enemy("Mimic", 70)
        ], ["Battle", "Battle", "Rest"]);

        const throne: Place = new Place("Throne", 3, [
            new Enemy("EVIL EMPEROR", 300)
        ], ["Battle"]);

        places.push(town);
        places.push(forest);
        places.push(castle);
        places.push(throne);
        return places;
    }

    public async start() {
        let nameSet: boolean = false
        do {
            console.log("What's your name adventurer ?")
            try {
                const { name } = await prompt.get(['name'])
                console.log(`Your name is ${name}.\nIs that correct?`)
                console.log('(1) Yes!')
                console.log("(2) No! I want to change my name")
                const { choice } = await prompt.get(['choice'])
                if (Number(choice) === 1) {
                    this.player = new Player(String(name))
                    await this.player.chooseTraits()
                    nameSet = true
                }
            } catch (e) {
                console.log(e)
                process.exit(0)
            }
        } while (!nameSet)

        await this.gameLoop()
    }

    public async gameLoop() {
        while (this.player.isAlive) {
            Printer.menu(GameLogic.initPlaces()[GameLogic.place].name);
            try {
                const input = await GameLogic.readInt(3);
                switch (input) {
                    case 1:
                        await this.continueJourney();
                        break;
                    case 2:
                        console.clear()
                        this.player.getInformation();
                        await GameLogic.toContinue();
                        break;
                    default:
                        this.player.setAlive(false);
                        break;
                }
            } catch (e) {
                console.log('ERROR', e)
            }
        }
    }

    public static async readInt(userChoice: number): Promise<number> {
        let input: number;

        do {
            try {
                const { choice } = await prompt.get(['choice'])
                input = Number(choice)
            } catch (e) {
                input = -1;
                console.log("Please select a choice !");
            }
        } while (input < 1 || input > userChoice);
        return input;
    }

    public static async toContinue() {
        console.log("\nEnter anything to continue ...");
        await prompt.get(['continue'])
    }

    public async continueJourney() {
        await this.checkAct();
        if (GameLogic.place != 3) {
            await GameLogic.initPlaces()[GameLogic.place].randomEncounter(this.player);
        }
    }

    public async checkAct() {
        if (this.player.xp >= 10 && GameLogic.place === 0) {
            GameLogic.place = 1;
            console.log("SECOND OUTRO");
            await this.player.chooseTraits();
            console.log("SECOND ACT INTRO");
        } else if (this.player.xp >= 50 && GameLogic.place === 1) {
            GameLogic.place = 2;
            console.log("SECOND ACT OUTRO");
            await this.player.chooseTraits();
            console.log("THIRD ACT INTRO");
        } else if (this.player.xp >= 100 && GameLogic.place === 2) {
            GameLogic.place = 3;
            console.log("THIRD ACT OUTRO");
            await this.player.chooseTraits();
            console.log("FOURTH ACT INTRO");
            await this.finalBattle();
        }
    }

    public static async shop(player: Player) {
        console.clear()
        Printer.heading('You meet a mysterious stranger.\nHe offers you something')
        const price: number = Math.floor(Math.random() * 10 + player.pots * 3) + 10  + player.pots
        console.log(`- Magic Potion: ${price} gold`)
        Printer.separator(20)
        console.log(`Do you want to buy one?\n(1) Yes !\n(2) No thanks.`)
        const input = await GameLogic.readInt(2)
        if(input === 1) {
            console.clear()
            if(player.gold >= price) {
                Printer.heading(`You bought a magical potion for ${price} gold`)
                player.pots++
                player.gold -= price
            } else {
                Printer.heading("You don't have enough gold to buy this ...")
            }
        }
        await this.toContinue()
    }

    public async finalBattle() {
        await GameLogic.initPlaces()[GameLogic.place].randomBattle(this.player);
        console.log("THIS IS THE END");
        process.exit(0)
    }
}