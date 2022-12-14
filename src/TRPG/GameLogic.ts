import prompt from "prompt";

export class GameLogic {

    private isRunning: boolean = false

    constructor() {
        prompt.start();
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
                const { res } = await prompt.get(['res'])
                if (res === "1") nameSet = true
            } catch (e) {
                console.log(e)
            }
        } while (!nameSet)

        console.log('Game Start')
        // Je lance la gameLoop
    }
}