export abstract class Character {

    private name: string;
    private maxHp: number;
    private hp: number;
    protected xp: number;
    private isAlive: boolean = true;

    constructor(name: string, maxHp: number, xp: number) {
        this.name = name;
        this.maxHp = maxHp;
        this.xp = xp;
        this.hp = maxHp;
    }

    public setAlive(alive: boolean) {
        this.isAlive = alive
    }

    public abstract attack(): number;
    public abstract defend(): number;

    public receive(damage: number): number {
        if (damage < 0) {
            damage = 0;
        }
        this.hp -= damage; // < 0 ? 0 : damage;
        if (this.hp <= 0) {
            this.setAlive(false);
        }
        return damage;
    };
}