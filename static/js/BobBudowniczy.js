'use strict'
import Gra from "./Gra.js"
export default class BobBudowniczy {
    update = setInterval(this.checkForNewUsers, 1000)
    game = ""
    plansza = ""
    constructor() {
        document.body.onload = async function () {
            let colors = [
                "red",
                "blue",
                "green",
                "yellow"
            ]
            let response = await fetch("/load", {
                method: "post"
            })
            let result = await response.json()
            let room = result.users.filter(x => x.room == result.room)

            if (room.filter(x => x.game == 2)[0] == undefined) {
                if (room.filter(x => x.game == 0).length == 4 && (document.getElementById("status").innerText != "czekam na graczy" || document.getElementById("status").innerText != "chce już grać")) {
                    document.getElementById("status").innerText = "chce już grać"
                }
                if (room.filter(x => x.game == 1)[0] != undefined) {
                    document.getElementById("status").innerText = "gramy za " + result.odliczanie
                }
                for (let i = 0; i < 4; i++) {
                    if (room[i] != undefined) {
                        document.getElementById("p" + (i + 1) + "Nick").innerText = room[i].nick
                        document.getElementById("p" + (i + 1)).style.backgroundColor = colors[room[i].color]
                        if (room[i].status == "W" || room[i].status == "S" || room[i].status == "P" || room[i].status == "C") {
                            document.getElementById("p" + (i + 1)).classList.add("ready")
                        } else {
                            document.getElementById("p" + (i + 1)).classList.remove("ready")
                        }
                    }
                }
            } else {
                document.getElementById("cosiek").style.display = "none"
            }

            if (result.aktualny.game == 3) {
                document.getElementById("kostka").style.display = "block"
                document.getElementById("kostka").src = "/gfx/" + room[0].los + ".png"
                document.getElementById("cosiek").style.display = "none"
            }

            if (result.aktualny.status == "C" && result.temp.length == 0) {
                console.log("rzucaj powinno się wyświetlić")
                document.getElementById("rzucaj").style.display = "block"
            } else {
                document.getElementById("rzucaj").style.display = "none"
            }

            let x = 0
            let y = 0
            for (let i = 0; i < 11; i++) {
                for (let j = 0; j < 11; j++) {
                    let kostka = document.createElement("div")
                    kostka.classList.add("pole")
                    kostka.style.left = x + "%"
                    kostka.style.top = y + "%"
                    x += (100 / 11)
                    document.getElementById("siatka").appendChild(kostka)
                }
                x = 0
                y += (100 / 11)
            }

            let pola = document.querySelectorAll(".pole")

            if (result.aktualny.status == "C" && result.temp.length != 0) {
                for (const [key, value] of Object.entries(result.temp)) {
                    for (const index in value) {
                        switch (key) {
                            case "p1Baza":
                                if (result.temp.p1Baza[index].ileP == 1) {
                                    pola[result.temp.p1Baza[index].lp].id = result.temp.p1Baza[index].idP[0]
                                    pola[result.temp.p1Baza[index].lp].style.background = result.tempPionki.filter(x => x.id == result.temp.p1Baza[index].idP[0])[0].kolor
                                }
                                break;
                            case "p2Baza":
                                if (result.temp.p2Baza[index].ileP == 1) {
                                    pola[result.temp.p2Baza[index].lp].id = result.temp.p2Baza[index].idP[0]
                                    pola[result.temp.p2Baza[index].lp].style.background = result.tempPionki.filter(x => x.id == result.temp.p2Baza[index].idP[0])[0].kolor
                                }
                                break;
                            case "p3Baza":
                                if (result.temp.p3Baza[index].ileP == 1) {
                                    pola[result.temp.p3Baza[index].lp].id = result.temp.p3Baza[index].idP[0]
                                    pola[result.temp.p3Baza[index].lp].style.background = result.tempPionki.filter(x => x.id == result.temp.p3Baza[index].idP[0])[0].kolor
                                }
                                break;
                            case "p4Baza":
                                if (result.temp.p4Baza[index].ileP == 1) {
                                    pola[result.temp.p4Baza[index].lp].id = result.temp.p4Baza[index].idP[0]
                                    pola[result.temp.p4Baza[index].lp].style.background = result.tempPionki.filter(x => x.id == result.temp.p4Baza[index].idP[0])[0].kolor
                                }
                                break;

                            case "p1Domek":
                                if (result.temp.p1Domek[index].ileP == 1) {
                                    pola[result.temp.p1Domek[index].lp].id = result.temp.p1Domek[index].idP[0]
                                    pola[result.temp.p1Domek[index].lp].style.background = result.tempPionki.filter(x => x.id == result.temp.p1Domek[index].idP[0])[0].kolor
                                }
                                break;
                            case "p2Domek":
                                if (result.temp.p2Domek[index].ileP == 1) {
                                    pola[result.temp.p2Domek[index].lp].id = result.temp.p2Domek[index].idP[0]
                                    pola[result.temp.p2Domek[index].lp].style.background = result.tempPionki.filter(x => x.id == result.temp.p2Domek[index].idP[0])[0].kolor
                                }
                                break;
                            case "p3Domek":
                                if (result.temp.p3Domek[index].ileP == 1) {
                                    pola[result.temp.p3Domek[index].lp].id = result.temp.p3Domek[index].idP[0]
                                    pola[result.temp.p3Domek[index].lp].style.background = result.tempPionki.filter(x => x.id == result.temp.p3Domek[index].idP[0])[0].kolor
                                }
                                break;
                            case "p4Domek":
                                if (result.temp.p4Domek[index].ileP == 1) {
                                    pola[result.temp.p4Domek[index].lp].id = result.temp.p4Domek[index].idP[0]
                                    pola[result.temp.p4Domek[index].lp].style.background = result.tempPionki.filter(x => x.id == result.temp.p4Domek[index].idP[0])[0].kolor
                                }
                                break;
                            case "trasa":
                                if (result.temp.trasa[index].ileP == 1) {
                                    pola[result.temp.trasa[index].lp].id = result.temp.trasa[index].idP[0]
                                    pola[result.temp.trasa[index].lp].style.background = result.tempPionki.filter(x => x.id == result.temp.trasa[index].idP[0])[0].kolor
                                }
                                if (result.temp.trasa[index].ileP > 1) {
                                    pola[result.temp.p1Baza[index].lp].id = result.temp.p1Baza[index].idP.split(",")
                                    pola[result.temp.trasa[index].lp].style.background = result.tempPionki.filter(x => x.id == result.temp.trasa[index].idP[0])[0].kolor
                                    pola[result.temp.trasa[index].lp].innerText = result.temp.trasa[index].ilePd
                                }
                                break;
                        }
                    }
                }
            } else {
                for (const [key, value] of Object.entries(result.plansza)) {
                    for (const index in value) {
                        switch (key) {
                            case "p1Baza":
                                if (result.plansza.p1Baza[index].ileP == 1) {
                                    pola[result.plansza.p1Baza[index].lp].id = result.plansza.p1Baza[index].idP[0]
                                    pola[result.plansza.p1Baza[index].lp].style.background = result.pionki.filter(x => x.id == result.plansza.p1Baza[index].idP[0])[0].kolor
                                }
                                break;
                            case "p2Baza":
                                if (result.plansza.p2Baza[index].ileP == 1) {
                                    pola[result.plansza.p2Baza[index].lp].id = result.plansza.p2Baza[index].idP[0]
                                    pola[result.plansza.p2Baza[index].lp].style.background = result.pionki.filter(x => x.id == result.plansza.p2Baza[index].idP[0])[0].kolor
                                }
                                break;
                            case "p3Baza":
                                if (result.plansza.p3Baza[index].ileP == 1) {
                                    pola[result.plansza.p3Baza[index].lp].id = result.plansza.p3Baza[index].idP[0]
                                    pola[result.plansza.p3Baza[index].lp].style.background = result.pionki.filter(x => x.id == result.plansza.p3Baza[index].idP[0])[0].kolor
                                }
                                break;
                            case "p4Baza":
                                if (result.plansza.p4Baza[index].ileP == 1) {
                                    pola[result.plansza.p4Baza[index].lp].id = result.plansza.p4Baza[index].idP[0]
                                    pola[result.plansza.p4Baza[index].lp].style.background = result.pionki.filter(x => x.id == result.plansza.p4Baza[index].idP[0])[0].kolor
                                }
                                break;

                            case "p1Domek":
                                if (result.plansza.p1Domek[index].ileP == 1) {
                                    pola[result.plansza.p1Domek[index].lp].id = result.plansza.p1Domek[index].idP[0]
                                    pola[result.plansza.p1Domek[index].lp].style.background = result.pionki.filter(x => x.id == result.plansza.p1Domek[index].idP[0])[0].kolor
                                }
                                break;
                            case "p2Domek":
                                if (result.plansza.p2Domek[index].ileP == 1) {
                                    pola[result.plansza.p2Domek[index].lp].id = result.plansza.p2Domek[index].idP[0]
                                    pola[result.plansza.p2Domek[index].lp].style.background = result.pionki.filter(x => x.id == result.plansza.p2Domek[index].idP[0])[0].kolor
                                }
                                break;
                            case "p3Domek":
                                if (result.plansza.p3Domek[index].ileP == 1) {
                                    pola[result.plansza.p3Domek[index].lp].id = result.plansza.p3Domek[index].idP[0]
                                    pola[result.plansza.p3Domek[index].lp].style.background = result.pionki.filter(x => x.id == result.plansza.p3Domek[index].idP[0])[0].kolor
                                }
                                break;
                            case "p4Domek":
                                if (result.plansza.p4Domek[index].ileP == 1) {
                                    pola[result.plansza.p4Domek[index].lp].id = result.plansza.p4Domek[index].idP[0]
                                    pola[result.plansza.p4Domek[index].lp].style.background = result.pionki.filter(x => x.id == result.plansza.p4Domek[index].idP[0])[0].kolor
                                }
                                break;
                            case "trasa":
                                if (result.plansza.trasa[index].ileP == 1) {
                                    pola[result.plansza.trasa[index].lp].id = result.plansza.trasa[index].idP[0]
                                    pola[result.plansza.trasa[index].lp].style.background = result.pionki.filter(x => x.id == result.plansza.trasa[index].idP[0])[0].kolor
                                }
                                if (result.plansza.trasa[index].ileP > 1) {
                                    pola[result.plansza.p1Baza[index].lp].id = result.plansza.p1Baza[index].idP.split(",")
                                    pola[result.plansza.trasa[index].lp].style.background = result.pionki.filter(x => x.id == result.plansza.trasa[index].idP[0])[0].kolor
                                    pola[result.plansza.trasa[index].lp].innerText = result.plansza.trasa[index].ilePd
                                }
                                break;
                        }
                    }
                }
            }
        }
    }
    async checkForNewUsers() {
        let colors = [
            "red",
            "blue",
            "green",
            "yellow"
        ]
        let response = await fetch("/checkForNewUsers", {
            method: "post"
        })
        let result = await response.json()
        let room = result.users.filter(x => x.room == result.room)

        if (room.filter(x => x.game == 2)[0] == undefined) {
            if (room.filter(x => x.game == 0).length == 4 && (document.getElementById("status").innerText != "czekam na graczy" || document.getElementById("status").innerText != "chce już grać")) {
                document.getElementById("status").innerText = "chce już grać"
            }
            if (room.filter(x => x.game == 1)[0] != undefined) {
                document.getElementById("status").innerText = "gramy za " + result.odliczanie
            }
            for (let i = 0; i < 4; i++) {
                if (room[i] != undefined) {
                    document.getElementById("p" + (i + 1) + "Nick").innerText = room[i].nick
                    document.getElementById("p" + (i + 1)).style.backgroundColor = colors[room[i].color]
                    if (room[i].status == "W" || room[i].status == "S" || room[i].status == "P" || room[i].status == "C") {
                        document.getElementById("p" + (i + 1)).classList.add("ready")
                    } else {
                        document.getElementById("p" + (i + 1)).classList.remove("ready")
                    }
                }
            }
        } else {
            document.getElementById("cosiek").style.display = "none"
            this.game = new Gra(room)
        }

        if (room.filter(x => x.game == 3)[0] != undefined) {
            this.game.room = room
            this.game.playable = room.filter(x => x.status == "P" || x.status == "C")
            for (let i = 1; i < 5; i++) {
                document.querySelector("#odliczanie" + i).style.display = "none"
            }
            document.querySelector("#odliczanie" + (parseInt(this.game.playable[0].ruch) + 1)).style.display = "block"
            document.querySelector("#odliczanie" + (parseInt(this.game.playable[0].ruch) + 1) + " #ileZostalo").innerText = this.game.playable[0].odliczanie
        }

        if (result.aktualny.game == 3) {
            document.getElementById("kostka").style.display = "block"
            document.getElementById("kostka").src = "/gfx/" + room[0].los + ".png"
            document.getElementById("cosiek").style.display = "none"
        }
        if (result.aktualny.status == "C" && result.temp.length == 0) {
            console.log("rzucaj powinno się wyświetlić")
            document.getElementById("rzucaj").style.display = "block"
        } else {
            document.getElementById("rzucaj").style.display = "none"
        }

        document.getElementById("siatka").innerHTML = ""

        let x = 0
        let y = 0
        for (let i = 0; i < 11; i++) {
            for (let j = 0; j < 11; j++) {
                let kostka = document.createElement("div")
                kostka.classList.add("pole")
                kostka.style.left = x + "%"
                kostka.style.top = y + "%"
                x += (100 / 11)
                document.getElementById("siatka").appendChild(kostka)
            }
            x = 0
            y += (100 / 11)
        }

        let pola = document.querySelectorAll(".pole")

        if (result.aktualny.status == "C" && result.temp.length != 0) {
            for (const [key, value] of Object.entries(result.temp)) {
                for (const index in value) {
                    switch (key) {
                        case "p1Baza":
                            if (result.temp.p1Baza[index].ileP == 1) {
                                pola[result.temp.p1Baza[index].lp].id = result.temp.p1Baza[index].idP[0]
                                pola[result.temp.p1Baza[index].lp].style.background = result.tempPionki.filter(x => x.id == result.temp.p1Baza[index].idP[0])[0].kolor
                            }
                            break;
                        case "p2Baza":
                            if (result.temp.p2Baza[index].ileP == 1) {
                                pola[result.temp.p2Baza[index].lp].id = result.temp.p2Baza[index].idP[0]
                                pola[result.temp.p2Baza[index].lp].style.background = result.tempPionki.filter(x => x.id == result.temp.p2Baza[index].idP[0])[0].kolor
                            }
                            break;
                        case "p3Baza":
                            if (result.temp.p3Baza[index].ileP == 1) {
                                pola[result.temp.p3Baza[index].lp].id = result.temp.p3Baza[index].idP[0]
                                pola[result.temp.p3Baza[index].lp].style.background = result.tempPionki.filter(x => x.id == result.temp.p3Baza[index].idP[0])[0].kolor
                            }
                            break;
                        case "p4Baza":
                            if (result.temp.p4Baza[index].ileP == 1) {
                                pola[result.temp.p4Baza[index].lp].id = result.temp.p4Baza[index].idP[0]
                                pola[result.temp.p4Baza[index].lp].style.background = result.tempPionki.filter(x => x.id == result.temp.p4Baza[index].idP[0])[0].kolor
                            }
                            break;

                        case "p1Domek":
                            if (result.temp.p1Domek[index].ileP == 1) {
                                pola[result.temp.p1Domek[index].lp].id = result.temp.p1Domek[index].idP[0]
                                pola[result.temp.p1Domek[index].lp].style.background = result.tempPionki.filter(x => x.id == result.temp.p1Domek[index].idP[0])[0].kolor
                            }
                            break;
                        case "p2Domek":
                            if (result.temp.p2Domek[index].ileP == 1) {
                                pola[result.temp.p2Domek[index].lp].id = result.temp.p2Domek[index].idP[0]
                                pola[result.temp.p2Domek[index].lp].style.background = result.tempPionki.filter(x => x.id == result.temp.p2Domek[index].idP[0])[0].kolor
                            }
                            break;
                        case "p3Domek":
                            if (result.temp.p3Domek[index].ileP == 1) {
                                pola[result.temp.p3Domek[index].lp].id = result.temp.p3Domek[index].idP[0]
                                pola[result.temp.p3Domek[index].lp].style.background = result.tempPionki.filter(x => x.id == result.temp.p3Domek[index].idP[0])[0].kolor
                            }
                            break;
                        case "p4Domek":
                            if (result.temp.p4Domek[index].ileP == 1) {
                                pola[result.temp.p4Domek[index].lp].id = result.temp.p4Domek[index].idP[0]
                                pola[result.temp.p4Domek[index].lp].style.background = result.tempPionki.filter(x => x.id == result.temp.p4Domek[index].idP[0])[0].kolor
                            }
                            break;
                        case "trasa":
                            if (result.temp.trasa[index].ileP == 1) {
                                pola[result.temp.trasa[index].lp].id = result.temp.trasa[index].idP[0]
                                pola[result.temp.trasa[index].lp].style.background = result.tempPionki.filter(x => x.id == result.temp.trasa[index].idP[0])[0].kolor
                            }
                            if (result.temp.trasa[index].ileP > 1) {
                                pola[result.temp.p1Baza[index].lp].id = result.temp.p1Baza[index].idP.split(",")
                                pola[result.temp.trasa[index].lp].style.background = result.tempPionki.filter(x => x.id == result.temp.trasa[index].idP[0])[0].kolor
                                pola[result.temp.trasa[index].lp].innerText = result.temp.trasa[index].ilePd
                            }
                            break;
                    }
                }
            }
        } else {
            for (const [key, value] of Object.entries(result.plansza)) {
                for (const index in value) {
                    switch (key) {
                        case "p1Baza":
                            if (result.plansza.p1Baza[index].ileP == 1) {
                                pola[result.plansza.p1Baza[index].lp].id = result.plansza.p1Baza[index].idP[0]
                                pola[result.plansza.p1Baza[index].lp].style.background = result.pionki.filter(x => x.id == result.plansza.p1Baza[index].idP[0])[0].kolor
                            }
                            break;
                        case "p2Baza":
                            if (result.plansza.p2Baza[index].ileP == 1) {
                                pola[result.plansza.p2Baza[index].lp].id = result.plansza.p2Baza[index].idP[0]
                                pola[result.plansza.p2Baza[index].lp].style.background = result.pionki.filter(x => x.id == result.plansza.p2Baza[index].idP[0])[0].kolor
                            }
                            break;
                        case "p3Baza":
                            if (result.plansza.p3Baza[index].ileP == 1) {
                                pola[result.plansza.p3Baza[index].lp].id = result.plansza.p3Baza[index].idP[0]
                                pola[result.plansza.p3Baza[index].lp].style.background = result.pionki.filter(x => x.id == result.plansza.p3Baza[index].idP[0])[0].kolor
                            }
                            break;
                        case "p4Baza":
                            if (result.plansza.p4Baza[index].ileP == 1) {
                                pola[result.plansza.p4Baza[index].lp].id = result.plansza.p4Baza[index].idP[0]
                                pola[result.plansza.p4Baza[index].lp].style.background = result.pionki.filter(x => x.id == result.plansza.p4Baza[index].idP[0])[0].kolor
                            }
                            break;

                        case "p1Domek":
                            if (result.plansza.p1Domek[index].ileP == 1) {
                                pola[result.plansza.p1Domek[index].lp].id = result.plansza.p1Domek[index].idP[0]
                                pola[result.plansza.p1Domek[index].lp].style.background = result.pionki.filter(x => x.id == result.plansza.p1Domek[index].idP[0])[0].kolor
                            }
                            break;
                        case "p2Domek":
                            if (result.plansza.p2Domek[index].ileP == 1) {
                                pola[result.plansza.p2Domek[index].lp].id = result.plansza.p2Domek[index].idP[0]
                                pola[result.plansza.p2Domek[index].lp].style.background = result.pionki.filter(x => x.id == result.plansza.p2Domek[index].idP[0])[0].kolor
                            }
                            break;
                        case "p3Domek":
                            if (result.plansza.p3Domek[index].ileP == 1) {
                                pola[result.plansza.p3Domek[index].lp].id = result.plansza.p3Domek[index].idP[0]
                                pola[result.plansza.p3Domek[index].lp].style.background = result.pionki.filter(x => x.id == result.plansza.p3Domek[index].idP[0])[0].kolor
                            }
                            break;
                        case "p4Domek":
                            if (result.plansza.p4Domek[index].ileP == 1) {
                                pola[result.plansza.p4Domek[index].lp].id = result.plansza.p4Domek[index].idP[0]
                                pola[result.plansza.p4Domek[index].lp].style.background = result.pionki.filter(x => x.id == result.plansza.p4Domek[index].idP[0])[0].kolor
                            }
                            break;
                        case "trasa":
                            if (result.plansza.trasa[index].ileP == 1) {
                                pola[result.plansza.trasa[index].lp].id = result.plansza.trasa[index].idP[0]
                                pola[result.plansza.trasa[index].lp].style.background = result.pionki.filter(x => x.id == result.plansza.trasa[index].idP[0])[0].kolor
                            }
                            if (result.plansza.trasa[index].ileP > 1) {
                                pola[result.plansza.p1Baza[index].lp].id = result.plansza.p1Baza[index].idP.split(",")
                                pola[result.plansza.trasa[index].lp].style.background = result.pionki.filter(x => x.id == result.plansza.trasa[index].idP[0])[0].kolor
                                pola[result.plansza.trasa[index].lp].innerText = result.plansza.trasa[index].ilePd
                            }
                            break;
                    }
                }
            }
        }
    }
}
