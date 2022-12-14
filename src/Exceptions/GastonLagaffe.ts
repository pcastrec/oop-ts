import { Bof, Menfin } from "./Exceptions";

export class GastonLagaffe {

    public trierCourrier(nbCourrier: number) {
        console.log(`Quoi, ${nbCourrier} lettre(s) à trier ?`)
        try {
            console.log("Ok ok, je vais m'y mettre");
            if (nbCourrier > 2) {
                throw new Error("Beaucoup trop de lettres...")
            }
            console.log("Ouf, j'ai fini.");
        } catch (e: any) {
            console.log(`M'enfin ! ${e.message}`);
        }
        console.log("Après tout ce travail, une sieste s'impose.");
    }

    public faireSignerContrats() {
        try {
            console.log("Encore ces contrats ? OK, je les imprime...");
            this.imprimerContrats();
            console.log("A présent une petite signature...");
            this.ajouterSignature();
            console.log("Fantasio, les contrats sont signés !");
        } catch (e: any) {
            console.log("M'enfin ! " + e.message);
        }
    }

    public ajouterSignature() {
        console.log("Signez ici, M'sieur Demesmaeker.");
    }

    public imprimerContrats() {
        console.log("D'abord, mettre en route l'imprimante.");
        this.allumerImprimante();
        console.log("Voilà, c'est fait !");
    }

    public allumerImprimante() {
        console.log("Voyons comment allumer cette machine...");
        throw new Error("Mais qui a démonté tout l'intérieur ?");
    }

    public repondreAuTelephone(appelant: string) {
        if (appelant == "Mr. Boulier") {
            throw new Menfin("Je finis un puzzle.");
        } else if (appelant == "Prunelle") {
            throw new Bof("Pas le temps, je suis dé-bor-dé !");
        } else {
            console.log("Allô, ici Gaston, j'écoute...");
        }
    }

    public static gererAppel(gaston: GastonLagaffe, appelant: string) {
        console.log("Gaston, " + appelant + " au téléphone !");
        try {
            gaston.repondreAuTelephone(appelant);
        } catch (e: any) {
            // Gestion par instanceof
            // if (e instanceof Bof) {
            //     console.log("Ca sonne toujours... vous dormez ou quoi ?");
            //     console.log(e.message);
            // } else if (e instanceof Menfin) {
            //     console.log("Pas de réponse... Et pourquoi ?");
            //     console.log(e.message);
            // }

            // Gestion par constructor
            switch (e.constructor) {
                case Bof:
                    console.log("Ca sonne toujours... vous dormez ou quoi ?");
                    console.log(e.message);
                    break;
                case Menfin:
                    console.log("Pas de réponse... Et pourquoi ?");
                    console.log(e.message);
                default:
                    break;
            }
        }
    }
}