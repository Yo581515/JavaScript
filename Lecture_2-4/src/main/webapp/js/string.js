"use strict";

function demo0() {
    const farge = "rød";
    const annenfarge = String("grønn");
    const nyfarge = new String("blå");

    console.log(`Primitiv streng har type ${typeof farge}`);
    console.log(`Streng med String uten new har type ${typeof annenfarge}`);
    console.log(`Streng med "new String" har type ${typeof nyfarge}`);
}

function demo1() {
    const farge = "rød";
    const nyfarge = new String("rød");

    if (farge == nyfarge) {
        console.log("Operator ==: Likhet hvis samme verdi mellom primitiv streng og String objekt");
    }
}

function demo2() {
    const farge = "rød";
    const nyfarge = new String("rød");

    if (farge === nyfarge) {
    } else {
        console.log("Operator ===: Ulikhet, også om samme verdi mellom primitiv streng og String objekt");
    }
}

function demo3() {
    const farger = "       rød  blå      ";
    console.log(`Uten trim      - Fargen er: '${farger}'`);
    console.log(`Med trim       - fargen er: '${farger.trim()}'`);
    console.log(`Med trimStart  - fargen er: '${farger.trimStart()}'`);
    console.log(`Med trimEnd    - fargen er: '${farger.trimEnd()}'`);
}

function demo4() {
    const start = "Hei alle i faget";
    const end = "DAT108";
    const message = start.concat(" '",end,"'");
    console.log(message);
}

function demo5() {
    const start = "Hei alle i faget";
    const end = "DAT108";
    const message = `${start} '${end}'`;
    console.log(message);
}

function demo6() {
    const bilnummre = "SP12345TS97143EB76554";
    const nummer = "TS97143";

    if (bilnummre.includes(nummer)) {
        console.log(`Bilnummre inneholder ${nummer}`);
    }
}

function demo7() {
    const bilnummre = "SP12345TS97143EB76554";
    const nummer = "TS97143";
    const index = bilnummre.indexOf(nummer);

    if (index == -1) {
        console.log(`Bilnummer ${nummer} finnes ikke i teksten`);
    } else {
        console.log(`Bilnummer ${nummer} finnes i posisjon ${index} i teksten`);
    }
}

function demo8() {
    const bilnummre = "SP12345TS97143EB76554";
    const nummer = bilnummre.slice(0,7);
    const rest = bilnummre.slice(7);
    const siste = bilnummre.slice(-7);

    console.log(`Første bilnummer er ${nummer}`);
    console.log(`Resten av teksten: ${rest}`);
    console.log(`Siste bilnummer er ${siste}`);
}

function demo9() {
    const elbilRegExp =  /\bE[A-Z]\d{5}\b/g;
    const bilnummre = "SP12345 TS97143 EB76554 EL12121 AC453 EV65656";
    const result = bilnummre.match(elbilRegExp);

    result.forEach(nummer => {console.log(`Elbil ${nummer}`)});
}

function demo10() {
    const elbilRegExp =  /\b(E[A-Z])(\d{5})\b/g;
    const bilnummre = "SP12345 TS97143 EB76554 EL12121 AC453 EV65656";
    /*
     * matchAll kom med ECMAScript 2020
     */
    const iterator = bilnummre.matchAll(elbilRegExp);
    let funn = iterator.next();

    while (! funn.done) {
        const [bilnummer,tegn,nummer] = funn.value;
        console.log(`Bil ${bilnummer} med bokstaver ${tegn} har nummer ${nummer}`);
        funn = iterator.next();
    }
}

// https://www.regular-expressions.info/unicode.html
function demo11() {
    const emojiRegExp =  /\p{Emoji}+/gu;
    const tekst = "Hei dere 😂☝. Idag er det ☔ vær. Vi ses imorgen ☝";
    const result = tekst.match(emojiRegExp);

    result.forEach(data => {console.log(`Fant: ${data}`)});
}

function demo12() {
    const person = "Ola Nordmann";
    const enavnReg = /\s\p{Letter}+$/u;

    const skjult = person.replace(enavnReg," NN");
    console.log(skjult);
}

function demo13() {
    const person = "Ola Nordmann";

    const skjult = person.replace("Nordmann","NN");
    console.log(skjult);
}

function demo14() {
    const person = "Ola Nordmann";
    const delnavnRegExp =  /(\p{Letter}+)\s+(\p{Letter}+)/ug;

    const navn = person.replaceAll(delnavnRegExp,"$2; $1");
    console.log(navn);
}

function demo15() {
    const person = "Olaa Nordmaann";

    const navn = person.replaceAll("aa","å");
    console.log(navn);
}

const demomanager = {
    init(demoHandler) {
        this.demoHandler = demoHandler;
        this.viewcode = this.viewcode.bind(this);

        /**
        * Legger til lytter for hendelse 'click' på alle HTML BUTTON elementer.
        * Ved 'click' på en HTML BUTTON kjøres flere metoder:
        * 1. console.clear som tømmer konsollet
        * 3. En metode gitt av elementet sitt attributt 'data-demo'.
        * 2. Objektet sin metode 'viewcode' som viser kilden for metoden i punktet over.
        * Verdien til 'data-demo' er 'demo0' for første BUTTON, 'demo1' for neste osv.
        */

        const buttons = this.demoHandler.getElementsByTagName("button");
        Array.from(buttons).forEach(
            (button) => {
                const methodName = button.getAttribute("data-demo");
                if (window[methodName] === undefined) return;
                const method = window[methodName];
                if (typeof method !== "function") return;
                button.addEventListener('click', console.clear, true);
                button.addEventListener('click', this.viewcode, true);
                button.addEventListener("click", method);
            }
        )
    },

    viewcode(event) {
        const viewElm = this.demoHandler.querySelector("pre[data-viewelm]");
        const methodName = event.target.getAttribute("data-demo");
        if (window[methodName] === undefined) return;

        const functext = window[methodName].toString();
        viewElm.textContent = functext;
        viewElm.classList.add("demo");
    }
}

function init() {
    const rootDemoHandler = document.getElementById("demoHandler");
    demomanager.init(rootDemoHandler);
}
document.addEventListener('DOMContentLoaded', init);
