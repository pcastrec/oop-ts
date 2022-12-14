export class Menfin extends Error {

    constructor(message: string) {
        super(`M'enfin ! ${message}`)
    }
}

export class Bof extends Error {
    
    constructor(message: string) {
        super(`Bof ! ${message}`)
    }
}