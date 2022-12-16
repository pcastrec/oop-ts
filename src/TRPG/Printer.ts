export class Printer {

    public static separator(n: number) {
        let separator: string = ''
        for (let i = 0; i < n; i++) {
            separator += "-";
        }
        console.log(separator);
    }

    public static heading(title: string) {
        Printer.separator(30);
        console.log(title);
        Printer.separator(30);
    }

    public static menu(where: string) {
        console.clear()
        Printer.heading(where);
        console.log("Choose an action: ");
        Printer.separator(20);
        console.log("(1) Continue on your journey");
        console.log("(2) Character Information");
        console.log("(3) Exit Game");
    }
}