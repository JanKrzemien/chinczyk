'use strict'

export default class Gra {
    room = []
    playable = []
    timer = ""
    czas = 20
    plansza
    pionki
    async changeStatus() {
        let response = await fetch("/start", {
            method: "post",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            body: JSON.stringify(this.room)
        })
        let result = await response.json()
        this.room = result.room
        this.playable = result.room.filter(x => x.status == "P" || x.status == "C")
        if (result.aktualny.status == "C") {
            document.getElementById("rzucaj").style.display = "block"
        } else {
            document.getElementById("rzucaj").style.display = "none"
        }
    }
    async zmianaGrajacego() {
        let response = await fetch("/grajacy", {
            method: "post",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            body: JSON.stringify(this.room)
        })
        let result = await response.json()
        this.room = result.room
        console.log("zmieniłem użytkownika")
        this.playable = result.room.filter(x => x.status == "P" || x.status == "C")
        if (result.aktualny.status == "C") {
            document.getElementById("rzucaj").style.display = "block"
        } else {
            document.getElementById("rzucaj").style.display = "none"
        }
    }
    async rzut() {
        let response = await fetch("/rzut", {
            method: "post",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            body: JSON.stringify(this.room)
        })
        let result = await response.json()
        this.room = result.room
        this.playable = result.room.filter(x => x.status == "C" || x.status == "P")
        this.plansza = result.plansza
        this.pionki = result.pionki
        document.getElementById("kostka").style.display = "block"
        document.getElementById("kostka").src = "./gfx/" + this.room[0].los + ".png"
        document.getElementById("rzucaj").style.display = "none"
        let utterance = new SpeechSynthesisUtterance(result.room[0].los);
        utterance.lang = "pl-PL"
        utterance.volume = 10
        window.speechSynthesis.speak(utterance);
        if (result.aktualny.status == "C") {
            let gracz = this.playable.filter(x => x.status == "C")[0]
            let pola = document.querySelectorAll(".pole")
            if (this.room[0].los == 6 || this.room[0].los == 1) {
                switch (gracz.color) {
                    case 0:
                        if (result.plansza.p1Baza.filter(x => x.ileP == 1)[0] != undefined) {
                            result.plansza.p1Baza.filter(x => x.ileP == 1).forEach((element, index) => {
                                pola[this.plansza.p1Baza[index].lp].style.background = "coral"
                                this.pionki.filter(x => x.id == this.plansza.p1Baza[index].idP[0])[0].kolor = "coral"
                            });
                        }
                        if (result.plansza.trasa.filter(x => x.kolorP == "red" && x.ileP > 0)[0] != undefined) {
                            result.plansza.trasa.filter(x => x.kolorP == "red" && x.ileP > 0).forEach((element, index) => {
                            });
                        }
                        if (result.plansza.p1Domek.filter(x => x.ileP == 1)[0] != undefined) {
                            result.plansza.p1Domek.filter(x => x.ileP == 1).forEach((element, index) => {
                                this.plansza.p1Domek[index].kolorP = "coral"
                            });
                        }
                        break;
                    case 1:
                        if (result.plansza.p2Baza.filter(x => x.ileP == 1)[0] != undefined) {
                            result.plansza.p2Baza.filter(x => x.ileP == 1).forEach((element, index) => {
                                pola[this.plansza.p2Baza[index].lp].style.background = "coral"
                                this.pionki.filter(x => x.id == this.plansza.p2Baza[index].idP[0])[0].kolor = "coral"
                            });
                        }
                        if (result.plansza.trasa.filter(x => x.kolorP == "blue" && x.ileP > 0)[0] != undefined) {
                            result.plansza.trasa.filter(x => x.kolorP == "blue" && x.ileP > 0).forEach((element, index) => {
                            });
                        }
                        if (result.plansza.p2Domek.filter(x => x.ileP == 1)[0] != undefined) {
                            result.plansza.p2Domek.filter(x => x.ileP == 1).forEach((element, index) => {
                            });
                        }
                        break;
                    case 2:
                        if (result.plansza.p3Baza.filter(x => x.ileP == 1)[0] != undefined) {
                            result.plansza.p3Baza.filter(x => x.ileP == 1).forEach((element, index) => {
                                pola[this.plansza.p3Baza[index].lp].style.background = "coral"
                                this.pionki.filter(x => x.id == this.plansza.p3Baza[index].idP[0])[0].kolor = "coral"
                            });
                        }
                        if (result.plansza.trasa.filter(x => x.kolorP == "green" && x.ileP > 0)[0] != undefined) {
                            result.plansza.trasa.filter(x => x.kolorP == "green" && x.ileP > 0).forEach((element, index) => {
                            });
                        }
                        if (result.plansza.p3Domek.filter(x => x.ileP == 1)[0] != undefined) {
                            result.plansza.p3Domek.filter(x => x.ileP == 1).forEach((element, index) => {
                                this.plansza.p3Domek[index].kolorP = "coral"
                            });
                        }
                        break;

                    case 3:
                        if (result.plansza.p4Baza.filter(x => x.ileP == 1)[0] != undefined) {
                            result.plansza.p4Baza.filter(x => x.ileP == 1).forEach((element, index) => {
                                pola[this.plansza.p4Baza[index].lp].style.background = "coral"
                                this.pionki.filter(x => x.id == this.plansza.p4Baza[index].idP[0])[0].kolor = "coral"
                            });
                        }
                        if (result.plansza.trasa.filter(x => x.kolorP == "yellow" && x.ileP > 0)[0] != undefined) {
                            result.plansza.trasa.filter(x => x.kolorP == "yellow" && x.ileP > 0).forEach((element, index) => {
                            });
                        }
                        if (result.plansza.p4Domek.filter(x => x.ileP == 1)[0] != undefined) {
                            result.plansza.p4Domek.filter(x => x.ileP == 1).forEach((element, index) => {
                            });
                        }
                        break;
                }

            } else {
                switch (gracz.color) {
                    case 0:
                        if (result.plansza.trasa.filter(x => x.kolorP == "red" && x.ileP > 0)[0] != undefined) {
                            result.plansza.trasa.filter(x => x.kolorP == "red" && x.ileP > 0).forEach((element, index) => {
                            });
                        }
                        if (result.plansza.p1Domek.filter(x => x.ileP == 1)[0] != undefined) {
                            result.plansza.p1Domek.filter(x => x.ileP == 1).forEach((element, index) => {
                            });
                        }
                        break;
                    case 1:
                        if (result.plansza.trasa.filter(x => x.kolorP == "blue" && x.ileP > 0)[0] != undefined) {
                            result.plansza.trasa.filter(x => x.kolorP == "blue" && x.ileP > 0).forEach((element, index) => {
                            });
                        }
                        if (result.plansza.p2Domek.filter(x => x.ileP == 1)[0] != undefined) {
                            result.plansza.p2Domek.filter(x => x.ileP == 1).forEach((element, index) => {
                            });
                        }
                        break;
                    case 2:
                        if (result.plansza.trasa.filter(x => x.kolorP == "green" && x.ileP > 0)[0] != undefined) {
                            result.plansza.trasa.filter(x => x.kolorP == "green" && x.ileP > 0).forEach((element, index) => {
                            });
                        }
                        if (result.plansza.p3Domek.filter(x => x.ileP == 1)[0] != undefined) {
                            result.plansza.p3Domek.filter(x => x.ileP == 1).forEach((element, index) => {
                            });
                        }
                        break;

                    case 3:
                        if (result.plansza.trasa.filter(x => x.kolorP == "yellow" && x.ileP > 0)[0] != undefined) {
                            result.plansza.trasa.filter(x => x.kolorP == "yellow" && x.ileP > 0).forEach((element, index) => {
                            });
                        }
                        if (result.plansza.p4Domek.filter(x => x.ileP == 1)[0] != undefined) {
                            result.plansza.p4Domek.filter(x => x.ileP == 1).forEach((element, index) => {
                            });
                        }
                        break;
                }
            }
            response = await fetch("/temp", {
                method: "post",
                headers: { "Content-Type": "application/json;charset=utf-8" },
                body: JSON.stringify({ plansza: this.plansza, pionki: this.pionki })
            })
            //podświetlenie pionków które mogą się ruszać, hovery i onclicki
        }
    }
    async decyzja() {
        // ruszono się pionkiem

        // fetch na serwer z ruchem i aktualizacją planszy

        this.checkIfWin()
    }
    async checkIfWin() {
        // fetch sprawdzający czy któryś domek jest pełen czyli dany gracz wygrał

        //if result true wygrana else zmiana gracza
        this.zmianaGrajacego()
    }
    constructor(room) {
        this.room = room
        this.playable = room.filter(x => x.status == "P")
        this.changeStatus()
    }
}