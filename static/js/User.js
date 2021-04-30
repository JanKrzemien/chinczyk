'use strict'
export default class User {
    constructor() {
        document.getElementById("wannaPlay").addEventListener("input", async function () {
            let check = document.getElementById("wannaPlay").checked
            if (check) {
                let response = await fetch("/wantToPlay", {
                    method: "get",
                })
                let result = await response.json()
                if (result.room.filter(x => x.game == 1)[0] != undefined) {
                    document.getElementById("status").innerText = "gramy za " + result.odliczanie
                } else {
                    document.getElementById("status").innerText = "chce już grać"
                }
                for (let i = 1; i < 5; i++) {
                    if (document.getElementById("p" + i + "Nick").innerText == result.theChosen.nick) {
                        document.getElementById("p" + i).classList.add("ready")
                        if (result.room.filter(x => x.status == "W").length > 1 && this.starting == false) {
                            this.starting = true
                            response = await fetch("/startGame", {
                                method: "post",
                                headers: { "Content-Type": "application/json;charset=utf-8" },
                                body: JSON.stringify(result.room)
                            })
                        }
                    }
                }
            } else {
                document.getElementById("status").innerText = "czekam na graczy"
                let response = await fetch("/wantToPlay", {
                    method: "get",
                })
                let result = await response.json()
                for (let i = 1; i < 5; i++) {
                    if (document.getElementById("p" + i + "Nick").innerText == result.theChosen.nick) {
                        document.getElementById("p" + i).classList.remove("ready")
                    }
                }
                console.log(result.room.filter(x => x.status == "S").length)
                console.log(this.starting)
                if (result.room.filter(x => x.status == "S").length < 2 && this.starting == true) {
                    this.starting = false
                    response = await fetch("/stopStarting", {
                        method: "post",
                        headers: { "Content-Type": "application/json;charset=utf-8" },
                        body: JSON.stringify(result.room)
                    })
                }
            }
        }.bind(this))
    }
    starting = false
}