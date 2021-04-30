var express = require("express")
var app = express()
var session = require('express-session')
const PORT = process.env.PORT || 3000;
var path = require("path")
var bodyParser = require("body-parser");

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

global.users = []
var used = []
var game = 0
global.startingInter = []
var temp = []
var tempPionki = []
var los
var pionki = [
    { kolor: "red", id: "1", pozycjaTrasy: -1 },
    { kolor: "red", id: "2", pozycjaTrasy: -1 },
    { kolor: "red", id: "3", pozycjaTrasy: -1 },
    { kolor: "red", id: "4", pozycjaTrasy: -1 },
    { kolor: "blue", id: "5", pozycjaTrasy: -1 },
    { kolor: "blue", id: "6", pozycjaTrasy: -1 },
    { kolor: "blue", id: "7", pozycjaTrasy: -1 },
    { kolor: "blue", id: "8", pozycjaTrasy: -1 },
    { kolor: "green", id: "9", pozycjaTrasy: -1 },
    { kolor: "green", id: "10", pozycjaTrasy: -1 },
    { kolor: "green", id: "11", pozycjaTrasy: -1 },
    { kolor: "green", id: "12", pozycjaTrasy: -1 },
    { kolor: "yellow", id: "13", pozycjaTrasy: -1 },
    { kolor: "yellow", id: "14", pozycjaTrasy: -1 },
    { kolor: "yellow", id: "15", pozycjaTrasy: -1 },
    { kolor: "yellow", id: "16", pozycjaTrasy: -1 },
]
var plansza = {
    p1Baza: [
        { lp: 0, ileP: 1, idP: [1] },
        { lp: 1, ileP: 1, idP: [2] },
        { lp: 11, ileP: 1, idP: [3] },
        { lp: 12, ileP: 1, idP: [4] },
    ],
    p2Baza: [
        { lp: 9, ileP: 1, idP: [5] },
        { lp: 10, ileP: 1, idP: [6] },
        { lp: 20, ileP: 1, idP: [7] },
        { lp: 21, ileP: 1, idP: [8] },
    ],
    p3Baza: [
        { lp: 108, ileP: 1, idP: [9] },
        { lp: 109, ileP: 1, idP: [10] },
        { lp: 119, ileP: 1, idP: [11] },
        { lp: 120, ileP: 1, idP: [12] },
    ],
    p4Baza: [
        { lp: 99, ileP: 1, idP: [13] },
        { lp: 100, ileP: 1, idP: [14] },
        { lp: 110, ileP: 1, idP: [15] },
        { lp: 111, ileP: 1, idP: [16] },
    ],
    p1Domek: [
        { lp: 56, ileP: 0, idP: [] },
        { lp: 57, ileP: 0, idP: [] },
        { lp: 58, ileP: 0, idP: [] },
        { lp: 59, ileP: 0, idP: [] },
    ],
    p2Domek: [
        { lp: 16, ileP: 0, idP: [] },
        { lp: 27, ileP: 0, idP: [] },
        { lp: 38, ileP: 0, idP: [] },
        { lp: 49, ileP: 0, idP: [] },
    ],
    p3Domek: [
        { lp: 61, ileP: 0, idP: [] },
        { lp: 62, ileP: 0, idP: [] },
        { lp: 63, ileP: 0, idP: [] },
        { lp: 64, ileP: 0, idP: [] },
    ],
    p4Domek: [
        { lp: 71, ileP: 0, idP: [] },
        { lp: 82, ileP: 0, idP: [] },
        { lp: 93, ileP: 0, idP: [] },
        { lp: 104, ileP: 0, idP: [] },
    ],
    trasa: [
        { lp: 44, ileP: 0, idP: [] },
        { lp: 45, ileP: 0, idP: [] },
        { lp: 46, ileP: 0, idP: [] },
        { lp: 47, ileP: 0, idP: [] },
        { lp: 48, ileP: 0, idP: [] },
        { lp: 37, ileP: 0, idP: [] },
        { lp: 26, ileP: 0, idP: [] },
        { lp: 15, ileP: 0, idP: [] },
        { lp: 4, ileP: 0, idP: [] },
        { lp: 5, ileP: 0, idP: [] },
        { lp: 6, ileP: 0, idP: [] },
        { lp: 17, ileP: 0, idP: [] },
        { lp: 28, ileP: 0, idP: [] },
        { lp: 39, ileP: 0, idP: [] },
        { lp: 50, ileP: 0, idP: [] },
        { lp: 51, ileP: 0, idP: [] },
        { lp: 52, ileP: 0, idP: [] },
        { lp: 53, ileP: 0, idP: [] },
        { lp: 54, ileP: 0, idP: [] },
        { lp: 65, ileP: 0, idP: [] },
        { lp: 76, ileP: 0, idP: [] },
        { lp: 75, ileP: 0, idP: [] },
        { lp: 74, ileP: 0, idP: [] },
        { lp: 73, ileP: 0, idP: [] },
        { lp: 72, ileP: 0, idP: [] },
        { lp: 83, ileP: 0, idP: [] },
        { lp: 94, ileP: 0, idP: [] },
        { lp: 105, ileP: 0, idP: [] },
        { lp: 116, ileP: 0, idP: [] },
        { lp: 115, ileP: 0, idP: [] },
        { lp: 114, ileP: 0, idP: [] },
        { lp: 103, ileP: 0, idP: [] },
        { lp: 92, ileP: 0, idP: [] },
        { lp: 81, ileP: 0, idP: [] },
        { lp: 70, ileP: 0, idP: [] },
        { lp: 69, ileP: 0, idP: [] },
        { lp: 68, ileP: 0, idP: [] },
        { lp: 67, ileP: 0, idP: [] },
        { lp: 77, ileP: 0, idP: [] },
        { lp: 55, ileP: 0, idP: [] },
    ]
}

app.get('/', function (req, res) {
    if (req.session.page_views == undefined) {
        res.sendFile(path.join(__dirname + "/static/logowanie.html"))
    } else {
        res.sendFile(path.join(__dirname + "/static/index.html"))
    }
});
app.post('/', function (req, res) {
    if (global.users.filter(elem => elem.nick == req.body.login).length == 0) {
        req.session.page_views = 1
        let kolor = Math.floor(Math.random() * 4)
        used = []
        for (let i = (global.users.length - (global.users.length % 4)); i < global.users.length; i++) {
            used.push(global.users[i].color)
        }
        while (used.filter(x => x == kolor).length != 0) {
            kolor = Math.floor(Math.random() * 4)
        }

        global.users.push({ id: req.sessionID, nick: req.body.login, color: kolor, status: "N", room: Math.floor(global.users.length / 4), game: 0, odliczanie: 10, ruch: 0 })
        res.redirect("/")
    } else {
        res.send("ten nick jest zajęty")
    }
})
app.post("/load", function (req, res) {
    res.send(JSON.stringify({ aktualny: global.users.filter(x => x.id == req.sessionID)[0], users: global.users, room: global.users.filter(x => x.id == req.sessionID)[0].room, plansza: plansza, temp: temp, pionki: pionki, tempPionki: tempPionki }))
})
app.post("/checkForNewUsers", function (req, res) {
    setTimeout(function () {
        res.send(JSON.stringify({ aktualny: global.users.filter(x => x.id == req.sessionID)[0], users: global.users, room: global.users.filter(x => x.id == req.sessionID)[0].room, plansza: plansza, odliczanie: global.users.filter(x => x.id == req.sessionID)[0].odliczanie, temp: temp, pionki: pionki, tempPionki: tempPionki }))
    }, 1000 - new Date().getMilliseconds())
})
app.get("/wantToPlay", function (req, res) {
    let user = global.users.filter(x => x.id == req.sessionID)[0]
    if (user.status == "N" && game == 0) {
        global.users.filter(x => x.id == req.sessionID)[0].status = "W"
        res.send(JSON.stringify({
            theChosen: user,
            room: global.users.filter(x => x.room == user.room),
        }))
    } else if (user.status == "N" && game == 1) {
        global.users.filter(x => x.id == req.sessionID)[0].status = "S"
        global.users.filter(x => x.id == req.sessionID)[0].game = 1
        res.send(JSON.stringify({
            theChosen: user,
            room: global.users.filter(x => x.room == user.room),
        }))
    } else {
        global.users.filter(x => x.id == req.sessionID)[0].status = "N"
        res.send(JSON.stringify({
            theChosen: user,
            room: global.users.filter(x => x.room == user.room),
        }))
    }
})
app.post("/startGame", function (req, res) {
    if (global.users.filter(x => x.room == req.body[0].room && x.status == "S")[0] != undefined) {
        global.users.filter(x => x.room == req.body[0].room).forEach(x => {
            if (x.status == "W") x.status = "S"
            if (x.status == "S" && x.game == 0) x.game = 1
        })
    } else {
        global.users.filter(x => x.room == req.body[0].room).forEach(x => {
            if (x.status == "W") x.status = "S"
            if (x.status == "S" && x.game == 0) x.game = 1
        })
        global.startingInter.push({ interval: new Inter(req.body[0].room), room: req.body[0].room })
    }
})
app.post("/stopStarting", function (req, res) {
    global.users.filter(x => x.room == req.body[0].room).forEach(x => {
        if (x.status == "S") x.status = "W"
        if (x.status == "W" && x.game == 1) x.game = 0
        x.odliczanie = 10
    })
    global.startingInter.filter(x => x.room == req.body[0].room)[0].interval.clear()
})
app.post("/start", function (req, res) {
    global.users.filter(x => x.room == req.body[0].room).forEach(x => {
        x.game = 3
        x.odliczanie = 20
    })
    if (global.startingInter.filter(x => x.room == req.body[0].room)[0] == undefined) {
        global.startingInter.push({ interval: new Tura(req.body[0].room), room: req.body[0].room })
    }
    global.users.filter(x => x.room == req.body[0].room).forEach(x => {
        if (x.status == "C") x.status = "P"
    })
    let ruch = global.users.filter(x => x.room == req.body[0].room)[0].ruch
    global.users.filter(x => x.room == req.body[0].room).filter(x => x.status == "P")[ruch].status = "C"

    res.send(JSON.stringify({ room: global.users.filter(x => x.room == req.body[0].room), theChosen: global.users.filter(x => x.room == req.body[0].room).filter(x => x.status == "P")[0], aktualny: global.users.filter(x => x.room == req.body[0].room).filter(x => x.id == req.sessionID)[0] }))
})
app.post("/grajacy", function (req, res) {
    let playable = req.body.filter(x => x.status == "P")
    global.users.filter(x => x.room == req.body[0].room).forEach(x => {
        if (x.ruch == playable.length - 1) {
            x.ruch = 0
        } else {
            x.ruch++
        }
    })
    global.users.filter(x => x.room == req.body[0].room).forEach(x => {
        if (x.status == "C") x.status = "P"
    })
    let ruch = global.users.filter(x => x.room == req.body[0].room)[0].ruch
    global.users.filter(x => x.room == req.body[0].room).filter(x => x.status == "P")[ruch].status = "C"
    res.send(JSON.stringify({ room: global.users.filter(x => x.room == req.body[0].room), aktualny: global.users.filter(x => x.room == req.body[0].room).filter(x => x.id == req.sessionID)[0] }))
})
app.post("/rzut", function (req, res) {
    los = Math.floor(Math.random() * 6) + 1
    global.users.filter(x => x.room == req.body[0].room).forEach(e => { e.los = los })
    res.send(JSON.stringify({ plansza: plansza, room: global.users.filter(x => x.room == req.body[0].room), aktualny: global.users.filter(x => x.id == req.sessionID)[0], pionki: pionki }))
})
app.post("/temp", function (req, res) {
    temp = req.body.plansza
    tempPionki = req.body.pionki
})

app.get('/css/style.css', function (req, res) { res.sendFile(path.join(__dirname + "/static/css/style.css")) });
app.get('/js/main.js', function (req, res) { res.sendFile(path.join(__dirname + "/static/js/main.js")) });
app.get('/js/BobBudowniczy.js', function (req, res) { res.sendFile(path.join(__dirname + "/static/js/BobBudowniczy.js")) });
app.get('/js/User.js', function (req, res) { res.sendFile(path.join(__dirname + "/static/js/User.js")) });
app.get('/js/Gra.js', function (req, res) { res.sendFile(path.join(__dirname + "/static/js/Gra.js")) });
app.get('/gfx/board.png', function (req, res) { res.sendFile(path.join(__dirname + "/static/gfx/board.png")) });
app.get('/gfx/1.png', function (req, res) { res.sendFile(path.join(__dirname + "/static/gfx/1.png")) });
app.get('/gfx/2.png', function (req, res) { res.sendFile(path.join(__dirname + "/static/gfx/2.png")) });
app.get('/gfx/3.png', function (req, res) { res.sendFile(path.join(__dirname + "/static/gfx/3.png")) });
app.get('/gfx/4.png', function (req, res) { res.sendFile(path.join(__dirname + "/static/gfx/4.png")) });
app.get('/gfx/5.png', function (req, res) { res.sendFile(path.join(__dirname + "/static/gfx/5.png")) });
app.get('/gfx/6.png', function (req, res) { res.sendFile(path.join(__dirname + "/static/gfx/6.png")) });


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})



class Inter {
    room = -1
    inter = ""
    constructor(room) {
        this.room = room
        this.inter = setInterval(function () {
            global.users.filter(x => x.room == this.room).forEach(x => x.odliczanie--)
            if (global.users.filter(x => x.room == this.room)[0].odliczanie == 0) {
                global.users.filter(x => x.room == this.room).forEach(x => {
                    x.game = 2
                    if (x.status == "S") x.status = "P"
                    x.odliczanie = 10
                })
                this.clear()
                // Faktyczny start gry
            }
        }.bind(this), 1000)
    }
    clear() {
        clearInterval(this.inter)
        global.startingInter = global.startingInter.filter(x => x.room != this.room)
    }
}
class Tura {
    room = -1
    playable = []
    inter = ""
    constructor(room) {
        this.room = room
        this.playable = global.users.filter(x => x.room == this.room && x.status == "P")
        global.users.filter(x => x.room == this.room).forEach(x => {
            x.odliczanie = 20
        })
        this.inter = setInterval(function () {
            global.users.filter(x => x.room == this.room).forEach(x => x.odliczanie--)
            if (global.users.filter(x => x.room == this.room)[0].odliczanie == 0) {
                global.users.filter(x => x.room == this.room).forEach(x => {
                    x.odliczanie = 20
                })
                temp = []
                global.users.filter(x => x.room == this.room).forEach(x => {
                    if (x.ruch == this.playable.length - 1) {
                        x.ruch = 0
                    } else {
                        x.ruch++
                    }
                })
                global.users.filter(x => x.room == this.room).forEach(x => {
                    if (x.status == "C") x.status = "P"
                })
                let ruch = global.users.filter(x => x.room == this.room)[0].ruch
                global.users.filter(x => x.room == this.room).filter(x => x.status == "P")[ruch].status = "C"
            }
        }.bind(this), 1000)
    }
    clear() {
        clearInterval(this.inter)
        global.startingInter = global.startingInter.filter(x => x.room != this.room)
    }
}