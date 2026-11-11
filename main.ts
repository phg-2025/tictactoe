/**
 * // Das Spiel TicTacToe (ohne MiniMax-Algorithmus)
 * 
 * //
 * 
 * //
 * 
 * // Standard: Spieler startet. (O)
 * 
 * //
 * 
 * // Taste A+B: Calli startet   (X)
 * 
 * //
 * 
 * // Taste A: Zelle auswählen
 * 
 * //
 * 
 * // Taste B: Zelle setzen
 * 
 * //
 * 
 * // (näheres demnächst bei http://www.prof-horst-guenther.de/Calliope)
 * 
 * //
 * 
 * // Spiel kann mit und ohne OLED-Display gespielt werden.
 */
function zeigeLED (nr: number) {
    ToKoord(nr)
    basic.pause(500)
    if (Punkt == "X") {
        led.plotBrightness(sp_LED, zl_LED, 30)
    } else {
        if (Punkt == "O") {
            led.plotBrightness(sp_LED, zl_LED, 255)
        }
    }
}
function Zufall () {
    akt = randint(0, 8)
    while (B(akt) != 0) {
        akt = randint(0, 8)
    }
    Buche(akt)
    zeigeZelle(akt)
    basic.pause(1000)
}
function zeigeFeld () {
    Werte(3)
    Strich(4)
    Werte(5)
    Strich(6)
    Werte(7)
}
function blocke (nr: number) {
    for (let sp = 0; sp <= 2; sp++) {
        i1 = Loesungen[nr][sp]
        if (B(i1) == 0) {
            Buche(i1)
            zeigeZelle(i1)
            break;
        }
    }
}
function ToKoord2 (nr: number) {
    zl_SCR = zl_SCR + 3
    zl_LED = zl_LED + 1
    sp_LED = nr % 3
    sp_SCR = sp_LED * 2
    sp_SCR = sp_SCR + 5
    sp_LED = sp_LED + 1
}
function E (i: number) {
    return Ecken[i]
}
function ToKoord (nr: number) {
    zl_LED = Math.floor(nr / 3)
    zl_SCR = zl_LED * 2
    zl_SCR = zl_SCR + 3
    zl_LED = zl_LED + 1
    sp_LED = nr % 3
    sp_SCR = sp_LED * 2
    sp_SCR = sp_SCR + 5
    sp_LED = sp_LED + 1
}
function Buche (nr: number) {
    if (B(nr) != 0) {
        music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
        basic.pause(100)
        music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
        basic.pause(100)
    } else {
        Board[nr] = 1
        Fertig = true
    }
}
function zeigeZelle (nr: number) {
    if (nr >= 0) {
        ToKoord(nr)
        if (B(nr) < 0) {
            Punkt = "O"
        } else {
            if (B(nr) == 0) {
                Punkt = " "
            } else {
                if (B(nr) == 1) {
                    Punkt = "X"
                } else {
                    Punkt = "O"
                }
            }
        }
        basic.pause(500)
        WriteAt(zl_SCR, sp_SCR, Punkt)
        zeigeLED(nr)
    }
}
function setzeAufFreieEcke () {
    for (let l = 0; l <= 3; l++) {
        e2 = E(l)
        if (B(e2) == 0) {
            Buche(e2)
            zeigeZelle(e2)
            return true
        }
    }
    return false
}
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    if (Ende) {
        Brumme()
    } else {
        Punkt = "O"
        WriteAt(0, 0, "Taste A wählt   ")
        WriteAt(1, 0, "Taste B setzt   ")
        if (akt >= 0) {
            loescheLED(akt)
            Board[akt] = 0
            WriteAt(zl_SCR, sp_SCR, " ")
        }
        blinke = true
        akt += 1
        akt = akt % 9
        while (B(akt) > 0) {
            akt += 1
            akt = akt % 9
        }
        Board[akt] = -1
        zeigeZelle(akt)
    }
})
function Brumme () {
    music.play(music.tonePlayable(131, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
}
function leere (zl: number) {
    oledssd1306.setTextXY(zl, 0)
    oledssd1306.clearRange(16)
}
function succ (wert: number) {
    return wert + 1
}
function blockieren () {
    for (let bl = 0; bl <= 7; bl++) {
        if (summe(bl) == 2) {
            blocke(bl)
            return bl
        }
    }
    return -1
}
function ComputerHatBegonnen () {
    if (Zug == 1) {
        if (hatGesetzt == MITTE) {
            setzeAufEckeGegenueber()
        } else {
            if (hatGesetzt == ECKE) {
                setzeAufFreieEcke()
            } else {
                setzeAufFreieEcke()
            }
        }
    } else {
    	
    }
}
input.onButtonEvent(Button.AB, input.buttonEventClick(), function () {
    leere(0)
    WriteAt(0, 0, "Taste A wählt")
    leere(1)
    if (Zug == 0) {
        ComputerStartete = true
        Zug = 1
        hatGesetzt = ECKE
        e = 0
        Ecke1 = Ecken[e]
        Buche(Ecke1)
        zeigeZelle(Ecke1)
    } else {
        Brumme()
    }
})
function Strich (Zeile: number) {
    WriteAt(Zeile, 5, "-")
    WriteAt(Zeile, 6, "+")
    WriteAt(Zeile, 7, "-")
    WriteAt(Zeile, 8, "+")
    WriteAt(Zeile, 9, "-")
}
function B (i: number) {
    return Board[i]
}
function findeLetzteEcke () {
    letzteEcke = -1
    i03 = 0
    for (let i = 0; i <= 3; i++) {
        if (B(E(i)) != 0) {
            i03 += 1
        }
    }
    if (i03 == 3) {
        let j = 0
        for (let k = 0; k <= 3; k++) {
            if (B(E(k)) == 0) {
                n = E(k)
            }
        }
        akt = E(j)
        Buche(akt)
        zeigeZelle(akt)
    } else {
    	
    }
}
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    leere(1)
    if (akt < 0 || Ende) {
        Brumme()
    } else {
        blinke = false
        Board[akt] = 4
        zeigeZelle(akt)
        if (GameOver()) {
            while (true) {
            	
            }
        }
        if (akt % 2 == 1) {
            hatGesetzt = RAND
        } else {
            if (akt == 4) {
                hatGesetzt = MITTE
            } else {
                hatGesetzt = ECKE
            }
        }
        Fertig = false
        if (ComputerStartete) {
            ComputerHatBegonnen()
        } else {
            SpielerHatBegonnen()
        }
        if (!(Fertig)) {
            bl22 = SucheGabel()
            if (bl22 >= 0) {
                Buche(bl22)
                zeigeZelle(bl22)
            } else {
                if (blockieren() < 0) {
                    if (!(Fertig)) {
                        if (!(Angriff())) {
                            Zufall()
                        }
                    }
                }
            }
        }
        if (GameOver()) {
            while (true) {
                blinke_Sieger()
            }
        }
        akt = -1
        Zug += 1
    }
})
function blinke_Sieger () {
    if (Punkt != " ") {
        for (let i0 = 0; i0 <= 2; i0++) {
            i1 = Loesungen[bl32][i0]
            ToKoord(i1)
            WriteAt(zl_SCR, sp_SCR, Punkt)
            if (Punkt == "X") {
                led.plotBrightness(sp_LED, zl_LED, 30)
            } else {
                led.plotBrightness(sp_LED, zl_LED, 255)
            }
        }
        basic.pause(500)
        for (let i02 = 0; i02 <= 2; i02++) {
            i1 = Loesungen[bl32][i02]
            ToKoord(i1)
            WriteAt(zl_SCR, sp_SCR, " ")
            led.unplot(sp_LED, zl_LED)
        }
        basic.pause(100)
    }
}
function init () {
    Loesungen = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
    ]
    Nachbarn3 = [
    1,
    3,
    4,
    1,
    4,
    5,
    3,
    4,
    7,
    7,
    4,
    5
    ]
    Ecken3 = [
    2,
    8,
    6,
    0,
    6,
    8,
    0,
    2,
    8,
    6,
    0,
    2
    ]
}
function Angriff () {
    for (let bl2 = 0; bl2 <= 7; bl2++) {
        if (summe(bl2) == 8) {
            for (let sp2 = 0; sp2 <= 2; sp2++) {
                i1 = Loesungen[bl2][sp2]
                if (B(i1) == 0) {
                    Buche(i1)
                    zeigeZelle(i1)
                    return true
                }
            }
        }
    }
    return false
}
function Begruessung () {
    WriteAt(3, 2, "Tic")
    basic.pause(500)
    WriteAt(3, 7, "Tac")
    basic.pause(500)
    WriteAt(3, 12, "Toe")
    basic.pause(2000)
    oledssd1306.clearDisplay()
}
function Werte (Zeile: number) {
    WriteAt(Zeile, 6, "|")
    WriteAt(Zeile, 8, "|")
}
function SpielerHatBegonnen () {
    if (Zug == 0) {
        if (hatGesetzt == MITTE) {
            setzeAufErsteEcke()
        } else {
            if (hatGesetzt == ECKE) {
                setzeAufMitte()
            } else {
                setzeAufMitte()
            }
        }
        Fertig = true
    } else {
    	
    }
}
function prev (wert: number) {
    return wert - 1
}
function setzeAufMitte () {
    akt = 4
    Buche(akt)
    zeigeZelle(akt)
    zeigeZelle(akt)
}
function GameOver () {
    for (let bl3 = 0; bl3 <= 7; bl3++) {
        if (summe(bl3) == 3) {
            WriteAt(0, 0, "Calli hat     ")
            WriteAt(1, 0, "gewonnen")
            basic.setLedColors(0x000000, 0x000000, 0xff0000, 20)
            music.play(music.builtinPlayableSoundEffect(soundExpression.sad), music.PlaybackMode.UntilDone)
            bl32 = bl3
            akt = -1
            Ende = true
            return true
        }
        if (summe(bl3) == 12) {
            WriteAt(0, 0, "Du hast       ")
            WriteAt(1, 0, "gewonnen")
            basic.setLedColors(0x000000, 0x00ff00, 0x000000, 20)
            music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Wedding), music.PlaybackMode.UntilDone)
            bl32 = bl3
            akt = -1
            Ende = true
            return true
        }
    }
    if (Board.indexOf(0) == -1) {
        WriteAt(7, 0, "Unentschieden  ")
        basic.setLedColors(0xffffff, 0x000000, 0x000000, 20)
        music.play(music.builtinPlayableSoundEffect(soundExpression.slide), music.PlaybackMode.UntilDone)
        bl32 = -1
        Ende = true
        return true
    }
    return false
}
function setzeAufErsteEcke () {
    akt = 8
    Buche(akt)
    zeigeZelle(akt)
    zeigeZelle(akt)
}
function setzeAufEckeGegenueber () {
    akt = Diagonal[Ecke1]
    Buche(akt)
    zeigeZelle(akt)
}
function WriteAt (Zeile: number, Spalte: number, Text: string) {
    oledssd1306.setTextXY(Zeile, Spalte)
    oledssd1306.writeString(Text)
}
function summe (zl: number) {
    sum = 0
    for (let sp4 = 0; sp4 <= 2; sp4++) {
        i1 = Loesungen[zl][sp4]
        sum = sum + B(i1)
    }
    return sum
}
function SucheGabel () {
    for (let e_1 = 0; e_1 <= 3; e_1++) {
        gefunden = 0
        e0 = Ecken[e_1]
        // Ecke ist leer (Kandidat). Suche  mit X belegte Ecke
        if (B(e0) == 0) {
            for (let e_2 = 0; e_2 <= 2; e_2++) {
                e_i = e_1 * 3
                e_i = e_i + e_2
                // Board-Position der mit X belegten Ecke
                e_x = Ecken3[e_i]
                if (B(e_x) == 1) {
                    n_x = Nachbarn3[e_i]
                    if (B(n_x) == 0) {
                        gefunden += 1
                    }
                }
            }
            if (gefunden >= 2) {
                return e0
            }
        }
    }
    return -1
}
function loescheLED (nr: number) {
    ToKoord(nr)
    led.unplot(sp_LED, zl_LED)
}
let n_x = 0
let e_x = 0
let e_i = 0
let e0 = 0
let gefunden = 0
let sum = 0
let Ecken3: number[] = []
let Nachbarn3: number[] = []
let bl32 = 0
let bl22 = 0
let n = 0
let i03 = 0
let letzteEcke = 0
let Ecke1 = 0
let e = 0
let hatGesetzt = 0
let blinke = false
let e2 = 0
let Fertig = false
let sp_SCR = 0
let zl_SCR = 0
let Loesungen: number[][] = []
let i1 = 0
let Punkt = ""
let RAND = 0
let MITTE = 0
let ECKE = 0
let Diagonal: number[] = []
let Ecken: number[] = []
let Board: number[] = []
let akt = 0
let sp_LED = 0
let zl_LED = 0
let Zug = 0
let Ende = false
let ComputerStartete = false
let e_22 = 0
let e_12 = 0
ComputerStartete = false
Ende = false
Zug = 0
zl_LED = 0
sp_LED = 0
oledssd1306.initDisplay()
Begruessung()
zeigeFeld()
akt = -1
Board = [0]
for (let Index22 = 0; Index22 <= 7; Index22++) {
    Board.push(0)
}
Ecken = [
0,
2,
6,
8
]
Diagonal = [
8,
-1,
6,
-1,
-1,
-1,
2,
-1,
0
]
ECKE = 1
MITTE = 2
RAND = 3
WriteAt(0, 0, "A+B: Start Calli")
WriteAt(1, 0, "A:   Du startest")
init()
basic.forever(function () {
    if (blinke) {
        led.plotBrightness(sp_LED, zl_LED, 255)
        WriteAt(zl_SCR, sp_SCR, "O")
        basic.pause(400)
        led.unplot(sp_LED, zl_LED)
        WriteAt(zl_SCR, sp_SCR, " ")
        basic.pause(100)
    }
})
