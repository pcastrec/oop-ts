import prompt from "prompt";
import { Enemy } from "./Enemy";
import { Place } from "./Place";
import { Player } from "./Player";

export class GameLogic {

    private player!: Player
    private isRunning: boolean = false
    static place: number = 0;

    constructor() {
        prompt.start();
    }

    public static initPlaces(): Place[] {

        const places: Place[] = []

        const town: Place = new Place("Town", 0, [
            new Enemy("Rat", 10),
            new Enemy("Little boy", 10)
        ], ["Battle", "Chest"]);

        const forest: Place = new Place("Forest", 1, [
            new Enemy("Wolf", 20),
            new Enemy("WereWolf", 50)
        ], ["Rest", "Battle", "Battle"]);

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

        this.isRunning = true
        await this.gameLoop()
    }

    public async gameLoop() {
        while (this.isRunning) {
            this.printMenu();
            try {
                const input = await GameLogic.readInt("-> ", 3);
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
                        this.isRunning = false;
                        break;
                }
            } catch (e) {
                console.log('ERROR', e)
            }
        }
    }

    public static printSeparator(n: number) {
        let separator: string = ''
        for (let i = 0; i < n; i++) {
            separator += "-";
        }
        console.log(separator);
    }

    public static printHeading(title: string) {
        GameLogic.printSeparator(30);
        console.log(title);
        GameLogic.printSeparator(30);
    }

    public printMenu() {
        // console.clear()
        GameLogic.printHeading(GameLogic.initPlaces()[GameLogic.place].name);
        console.log("Choose an action: ");
        GameLogic.printSeparator(20);
        console.log("(1) Continue on your journey");
        console.log("(2) Character Information");
        console.log("(3) Exit Game");
    }

    public static async readInt(q: string, userChoice: number): Promise<number> {
        let input: number;

        do {
            console.log(q);
            try {
                // input = Integer.parseInt(scan.next());
                const { i } = await prompt.get(['i'])
                input = Number(i)
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
            console.log(GameLogic.initPlaces()[GameLogic.place])
            GameLogic.initPlaces()[GameLogic.place].randomEncounter(this.player);
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
            // finalBattle();
        }
    }
}