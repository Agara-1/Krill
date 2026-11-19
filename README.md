# Hlubina

Denní vědomostní „anti-kvíz“ do prohlížeče. Nevyhrává nejčastější odpověď, ale ta nejvzácnější **platná**.

## Jak se hraje

- Každý den je jeden ponor se 7 kategoriemi, třeba „Evropský stát mimo EU“ nebo „Webový prohlížeč“.
- Na každou kategorii máš 20 sekund. Odpověď píšeš sám, žádné možnosti na výběr.
- Neplatná odpověď kolo neukončí, můžeš zkoušet dál. Kolo uzavře první platná odpověď nebo konec času.
- Hra toleruje diakritiku, velká a malá písmena i drobné překlepy.

## Bodování

| Úlovek | Body | Odpověď |
|---|---|---|
| Plankton | 5–20 | běžná (5 % hráčů a víc) |
| Medúza | 30–60 | méně častá (1,5–5 %) |
| Lampovník | 70–95 | vzácná (0,35–1,5 %) |
| Dumbo | 100 | skoro unikátní (pod 0,35 %) |
| Bez úlovku | 0 | neplatná nebo vypršel čas |

1 bod = 10 m pod hladinou. Maximum je 700 b = −7 000 m.

## Deník ponoru

Po sedmi otázkách se ukáže:
- skóre, hloubka a oceánská zóna (epipelagiál až hadál),
- Gaussova křivka dnešních hráčů s tvou pozicí,
- průřez oceánem se 7 lanky a svítícími tvory v hloubce podle bodů. Po klepnutí uvidíš svou odpověď a nejvzácnější možné odpovědi,
- tlačítko pro zkopírování výsledku a odpočet do dalšího ponoru.

Je tu i tréninkový ponor s náhodnými kategoriemi, který se neukládá.

## Omezení

Hra běží čistě v prohlížeči bez serveru. Podíly odpovědí a rozložení hráčů se proto **simulují**: odpovědi v `data.js` jsou seřazené od nejčastější a podíly se dopočítají Zipfovým rozdělením s denním šumem. Skutečné statistiky by potřebovaly backend, který sbírá odpovědi všech hráčů.

## Soubory

- `index.html`, `style.css`: stránka a retro CRT vzhled
- `app.js`: logika hry, bodování, grafy a deník ponoru
- `data.js`: 21 kategorií s platnými odpověďmi (přidávat se dají snadno)
- `schody/`: předchozí hra Krill Tower (běhání po schodech mrakodrapu)

Spuštění: otevři `index.html` v prohlížeči.
