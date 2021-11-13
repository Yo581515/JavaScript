"use strict";

class Person {

    firstname;
    lastname;
    borndate;


    constructor(firstname, lastname) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.borndate = new Date();
    }


    set age(age) {
        let bornyear = this.borndate.getFullYear() - age;
        this.borndate.setYear(bornyear);
    }


    get age() {
        const now = new Date();
        return now.getFullYear() - this.borndate.getFullYear();
    }
}

const p = new Person('Ole', 'Persen');

p.age = 24;         // Kjører Person sin set metode age(22)
console.log(p.firstname); // Kjører Person sin get metode age()
console.log(p.lastname); // Kjører Person sin get metode age()
console.log(p.borndate); // Kjører Person sin get metode age()
console.log(p.age); // Kjører Person sin get metode age()
