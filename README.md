# Krill Tower 🏢

Pixelová arkádová hra do prohlížeče: vybíháš po schodech nekonečného mrakodrapu co nejvýš.

## Jak se hraje

- Schody se klikatí doleva a doprava. Každým klepnutím uděláš jeden krok.
- **Doleva:** klepni na levou polovinu obrazovky, nebo stiskni `←` / `A`.
- **Doprava:** klepni na pravou polovinu obrazovky, nebo stiskni `→` / `D`.
- Nahoře ti ubývá **čas**. Každý správný krok ho trochu doplní, mince ho doplní víc.
- Čím jsi výš, tím rychleji čas ubývá.
- Když šlápneš špatně nebo ti dojde čas, spadneš.
- Každých 10 schodů je jedno **patro**. Obloha se mění s výškou: den → západ slunce → noc → vesmír.
- `M` (nebo ikonka reproduktoru) vypne nebo zapne zvuk. Rekord a mince se ukládají v prohlížeči.

## Spuštění

Hra je čisté HTML5 + JavaScript bez závislostí. Stačí otevřít `index.html` v prohlížeči, nebo spustit:

```bash
python3 -m http.server 8000
# pak otevři http://localhost:8000
```

Na hosting (třeba GitHub Pages) stačí nahrát `index.html` a `game.js`.

## Soubory

- `index.html`: stránka s plátnem
- `game.js`: celá hra (pixelový font, sprity, generování schodů, zvuky přes WebAudio)
