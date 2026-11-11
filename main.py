"""

Das Spiel TicTacToe (ohne MiniMax-Algorithmus)

Taste A: Standard-Start: Spieler

Taste A+B: Start Computer

Taste A: Feldauswahl

Taste B: Feld besetzen

In Kürze: http://www.prof-horst-guenther.de/calliope

"""
# Das Spiel TicTacToe
# 
# Standard: Spieler startet. (O)
# 
# Taste A+B: Calli startet   (X)
# 
# Taste A: Zelle auswählen
# 
# Taste B: Zelle setzen
# 
# (näheres demnächst bei http://www.prof-horst-guenther.de/Calliope)
# 
# Spiel kann mit und ohne OLED-Display gespielt werden.
def zeigeLED(nr: number):
    ToKoord(nr)
    basic.pause(500)
    if Punkt == "X":
        led.plot_brightness(sp_LED, zl_LED, 30)
    else:
        if Punkt == "O":
            led.plot_brightness(sp_LED, zl_LED, 255)
def Zufall():
    global akt
    akt = randint(0, 8)
    while B(akt) != 0:
        akt = randint(0, 8)
    Buche(akt)
    zeigeZelle(akt)
    basic.pause(1000)
def zeigeFeld():
    Werte(3)
    Strich(4)
    Werte(5)
    Strich(6)
    Werte(7)
def blocke(nr2: number):
    global i1
    for sp in range(3):
        i1 = Loesungen[nr2][sp]
        if B(i1) == 0:
            Buche(i1)
            zeigeZelle(i1)
            break
def ToKoord2(nr3: number):
    global zl_SCR, zl_LED, sp_LED, sp_SCR
    zl_SCR = zl_SCR + 3
    zl_LED = zl_LED + 1
    sp_LED = nr3 % 3
    sp_SCR = sp_LED * 2
    sp_SCR = sp_SCR + 5
    sp_LED = sp_LED + 1
def E(i: number):
    return Ecken[i]
def ToKoord(nr4: number):
    global zl_LED, zl_SCR, sp_LED, sp_SCR
    zl_LED = Math.floor(nr4 / 3)
    zl_SCR = zl_LED * 2
    zl_SCR = zl_SCR + 3
    zl_LED = zl_LED + 1
    sp_LED = nr4 % 3
    sp_SCR = sp_LED * 2
    sp_SCR = sp_SCR + 5
    sp_LED = sp_LED + 1
def Buche(nr5: number):
    global Fertig
    if B(nr5) != 0:
        music.play(music.tone_playable(262, music.beat(BeatFraction.WHOLE)),
            music.PlaybackMode.UNTIL_DONE)
        basic.pause(100)
        music.play(music.tone_playable(262, music.beat(BeatFraction.WHOLE)),
            music.PlaybackMode.UNTIL_DONE)
        basic.pause(100)
    else:
        Board[nr5] = 1
        Fertig = True
def zeigeZelle(nr6: number):
    global Punkt
    if nr6 >= 0:
        ToKoord(nr6)
        if B(nr6) < 0:
            Punkt = "O"
        else:
            if B(nr6) == 0:
                Punkt = " "
            else:
                if B(nr6) == 1:
                    Punkt = "X"
                else:
                    Punkt = "O"
        basic.pause(500)
        WriteAt(zl_SCR, sp_SCR, Punkt)
        zeigeLED(nr6)
def setzeAufFreieEcke():
    global e2
    for l in range(4):
        e2 = E(l)
        if B(e2) == 0:
            Buche(e2)
            zeigeZelle(e2)
            return True
    return False

def on_button_a():
    global Punkt, blinke, akt
    if Ende:
        Brumme()
    else:
        Punkt = "O"
        WriteAt(0, 0, "Taste A wählt  ")
        WriteAt(1, 0, "Taste B setzt  ")
        if akt >= 0:
            loescheLED(akt)
            Board[akt] = 0
            WriteAt(zl_SCR, sp_SCR, " ")
        blinke = True
        akt += 1
        akt = akt % 9
        while B(akt) > 0:
            akt += 1
            akt = akt % 9
        Board[akt] = -1
        zeigeZelle(akt)
input.on_button_event(Button.A, input.button_event_click(), on_button_a)

def Brumme():
    music.play(music.tone_playable(131, music.beat(BeatFraction.WHOLE)),
        music.PlaybackMode.UNTIL_DONE)
def leere(zl: number):
    oledssd1306.set_text_xy(zl, 0)
    oledssd1306.clear_range(16)
def succ(wert: number):
    return wert + 1
def blockieren():
    for bl in range(8):
        if summe(bl) == 2:
            blocke(bl)
            return bl
    return -1
def ComputerHatBegonnen():
    if Zug == 1:
        if hatGesetzt == MITTE:
            setzeAufEckeGegenueber()
        else:
            if hatGesetzt == ECKE:
                setzeAufFreieEcke()
            else:
                setzeAufFreieEcke()
    else:
        pass

def on_button_ab():
    global ComputerStartete, Zug, hatGesetzt, e, Ecke1
    leere(0)
    WriteAt(0, 0, "Taste A wählt")
    leere(1)
    if Zug == 0:
        ComputerStartete = True
        Zug = 1
        hatGesetzt = ECKE
        e = 0
        Ecke1 = Ecken[e]
        Buche(Ecke1)
        zeigeZelle(Ecke1)
    else:
        Brumme()
input.on_button_event(Button.AB, input.button_event_click(), on_button_ab)

def Strich(Zeile: number):
    WriteAt(Zeile, 5, "-")
    WriteAt(Zeile, 6, "+")
    WriteAt(Zeile, 7, "-")
    WriteAt(Zeile, 8, "+")
    WriteAt(Zeile, 9, "-")
def B(j: number):
    return Board[j]
def findeLetzteEcke():
    global letzteEcke, i03, o, akt
    letzteEcke = -1
    i03 = 0
    for k in range(4):
        if B(E(k)) != 0:
            i03 += 1
    if i03 == 3:
        m = 0
        for n in range(4):
            if B(E(n)) == 0:
                o = E(n)
        akt = E(m)
        Buche(akt)
        zeigeZelle(akt)
    else:
        pass

def on_button_b():
    global blinke, hatGesetzt, Fertig, bl22, akt, Zug
    leere(1)
    if akt < 0 or Ende:
        Brumme()
    else:
        blinke = False
        Board[akt] = 4
        zeigeZelle(akt)
        if GameOver():
            while True:
                pass
        if akt % 2 == 1:
            hatGesetzt = RAND
        else:
            if akt == 4:
                hatGesetzt = MITTE
            else:
                hatGesetzt = ECKE
        Fertig = False
        if ComputerStartete:
            ComputerHatBegonnen()
        else:
            SpielerHatBegonnen()
        if not (Fertig):
            bl22 = SucheGabel()
            if bl22 >= 0:
                Buche(bl22)
                zeigeZelle(bl22)
            else:
                if blockieren() < 0:
                    if not (Fertig):
                        if not (Angriff()):
                            Zufall()
        if GameOver():
            while True:
                blinke_Sieger()
        akt = -1
        Zug += 1
input.on_button_event(Button.B, input.button_event_click(), on_button_b)

def blinke_Sieger():
    global i1
    if Punkt != " ":
        for i0 in range(3):
            i1 = Loesungen[bl32][i0]
            ToKoord(i1)
            WriteAt(zl_SCR, sp_SCR, Punkt)
            if Punkt == "X":
                led.plot_brightness(sp_LED, zl_LED, 30)
            else:
                led.plot_brightness(sp_LED, zl_LED, 255)
        basic.pause(500)
        for i02 in range(3):
            i1 = Loesungen[bl32][i02]
            ToKoord(i1)
            WriteAt(zl_SCR, sp_SCR, " ")
            led.unplot(sp_LED, zl_LED)
        basic.pause(100)
def init():
    global Loesungen, Nachbarn3, Ecken3
    Loesungen = [[0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]]
    Nachbarn3 = [1, 3, 4, 1, 4, 5, 3, 4, 7, 7, 4, 5]
    Ecken3 = [2, 8, 6, 0, 6, 8, 0, 2, 8, 6, 0, 2]
def Angriff():
    global i1
    for bl2 in range(8):
        if summe(bl2) == 8:
            for sp2 in range(3):
                i1 = Loesungen[bl2][sp2]
                if B(i1) == 0:
                    Buche(i1)
                    zeigeZelle(i1)
                    return True
    return False
def Begruessung():
    WriteAt(3, 2, "Tic")
    basic.pause(500)
    WriteAt(3, 7, "Tac")
    basic.pause(500)
    WriteAt(3, 12, "Toe")
    basic.pause(2000)
    oledssd1306.clear_display()
def Werte(Zeile2: number):
    WriteAt(Zeile2, 6, "|")
    WriteAt(Zeile2, 8, "|")
def SpielerHatBegonnen():
    global Fertig
    if Zug == 0:
        if hatGesetzt == MITTE:
            setzeAufErsteEcke()
        else:
            if hatGesetzt == ECKE:
                setzeAufMitte()
            else:
                setzeAufMitte()
        Fertig = True
    else:
        pass
def prev(wert2: number):
    return wert2 - 1
def setzeAufMitte():
    global akt
    akt = 4
    Buche(akt)
    zeigeZelle(akt)
    zeigeZelle(akt)
def GameOver():
    global bl32, akt, Ende
    for bl3 in range(8):
        if summe(bl3) == 3:
            WriteAt(0, 0, "Calli hat     ")
            WriteAt(1, 0, "gewonnen")
            basic.set_led_colors(0x000000, 0x000000, 0xff0000, 20)
            music.play(music.builtin_playable_sound_effect(soundExpression.sad),
                music.PlaybackMode.UNTIL_DONE)
            bl32 = bl3
            akt = -1
            Ende = True
            return True
        if summe(bl3) == 12:
            WriteAt(0, 0, "Du hast       ")
            WriteAt(1, 0, "gewonnen")
            basic.set_led_colors(0x000000, 0x00ff00, 0x000000, 20)
            music._play_default_background(music.built_in_playable_melody(Melodies.WEDDING),
                music.PlaybackMode.UNTIL_DONE)
            bl32 = bl3
            akt = -1
            Ende = True
            return True
    if Board.index_of(0) == -1:
        WriteAt(7, 0, "Unentschieden  ")
        basic.set_led_colors(0xffffff, 0x000000, 0x000000, 20)
        music.play(music.builtin_playable_sound_effect(soundExpression.slide),
            music.PlaybackMode.UNTIL_DONE)
        bl32 = -1
        Ende = True
        return True
    return False
def setzeAufErsteEcke():
    global akt
    akt = 8
    Buche(akt)
    zeigeZelle(akt)
    zeigeZelle(akt)
def setzeAufEckeGegenueber():
    global akt
    akt = Diagonal[Ecke1]
    Buche(akt)
    zeigeZelle(akt)
def WriteAt(Zeile3: number, Spalte: number, Text: str):
    oledssd1306.set_text_xy(Zeile3, Spalte)
    oledssd1306.write_string(Text)
def summe(zl2: number):
    global sum2, i1
    sum2 = 0
    for sp4 in range(3):
        i1 = Loesungen[zl2][sp4]
        sum2 = sum2 + B(i1)
    return sum2
def SucheGabel():
    global gefunden, e0, e_i, e_x, n_x
    for e_1 in range(4):
        gefunden = 0
        e0 = Ecken[e_1]
        # Ecke ist leer (Kandidat). Suche  mit X belegte Ecke
        if B(e0) == 0:
            for e_2 in range(3):
                e_i = e_1 * 3
                e_i = e_i + e_2
                # Board-Position der mit X belegten Ecke
                e_x = Ecken3[e_i]
                if B(e_x) == 1:
                    n_x = Nachbarn3[e_i]
                    if B(n_x) == 0:
                        gefunden += 1
            if gefunden >= 2:
                return e0
    return -1
def loescheLED(nr7: number):
    ToKoord(nr7)
    led.unplot(sp_LED, zl_LED)
n_x = 0
e_x = 0
e_i = 0
e0 = 0
gefunden = 0
sum2 = 0
Ecken3: List[number] = []
Nachbarn3: List[number] = []
bl32 = 0
bl22 = 0
o = 0
i03 = 0
letzteEcke = 0
Ecke1 = 0
e = 0
hatGesetzt = 0
blinke = False
e2 = 0
Fertig = False
sp_SCR = 0
zl_SCR = 0
Loesungen: List[List[number]] = []
i1 = 0
Punkt = ""
RAND = 0
MITTE = 0
ECKE = 0
Diagonal: List[number] = []
Ecken: List[number] = []
Board: List[number] = []
akt = 0
sp_LED = 0
zl_LED = 0
Zug = 0
Ende = False
ComputerStartete = False
e_22 = 0
e_12 = 0
ComputerStartete = False
Ende = False
Zug = 0
zl_LED = 0
sp_LED = 0
oledssd1306.init_display()
Begruessung()
zeigeFeld()
akt = -1
Board = [0]
for Index22 in range(8):
    Board.append(0)
Ecken = [0, 2, 6, 8]
Diagonal = [8, -1, 6, -1, -1, -1, 2, -1, 0]
ECKE = 1
MITTE = 2
RAND = 3
WriteAt(0, 0, "A+B: Start Calli")
WriteAt(1, 0, "A: Du startest")
init()

def on_forever():
    if blinke:
        led.plot_brightness(sp_LED, zl_LED, 255)
        WriteAt(zl_SCR, sp_SCR, "O")
        basic.pause(400)
        led.unplot(sp_LED, zl_LED)
        WriteAt(zl_SCR, sp_SCR, " ")
        basic.pause(100)
basic.forever(on_forever)
