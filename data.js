// Kategorie pro denní ponor.
// Odpovědi jsou seřazené zhruba od nejčastější po nejvzácnější.
// Jednotlivé odpovědi odděluje ";", alternativní zápisy téže odpovědi "|".
// První zápis je ten, který se zobrazí.
window.HLUBINA_CATEGORIES = [
{
  id: 'eu-mimo', q: 'Evropský stát mimo EU', hint: 'Samostatný stát ležící aspoň zčásti v Evropě, který není členem EU.',
  a: `Rusko; Ukrajina; Švýcarsko; Norsko; Velká Británie|Spojené království|UK|Británie|Spojené království Velké Británie a Severního Irska; Srbsko; Island;
  Bělorusko; Albánie; Turecko; Černá Hora; Severní Makedonie|Makedonie; Bosna a Hercegovina|Bosna; Moldavsko; Monako; Lichtenštejnsko; Andorra;
  San Marino; Vatikán|Svatý stolec|Městský stát Vatikán; Kosovo; Gruzie; Kazachstán; Ázerbájdžán; Arménie`
},
{
  id: 'prohlizec', q: 'Webový prohlížeč', hint: 'Program, kterým se prohlíží web. Současný nebo historický.',
  a: `Chrome|Google Chrome; Firefox|Mozilla Firefox|Mozilla; Safari; Edge|Microsoft Edge; Opera; Brave; Internet Explorer|IE|Explorer;
  Seznam prohlížeč|Seznam.cz prohlížeč|Prohlížeč Seznam; Opera GX; Vivaldi; Tor Browser|Tor; DuckDuckGo|DuckDuckGo Browser; Chromium; Samsung Internet;
  Yandex Browser|Yandex|Jandex; Arc|Arc Browser; Netscape|Netscape Navigator; UC Browser; Opera Mini; Maxthon; Waterfox; Pale Moon; LibreWolf; Zen Browser|Zen;
  Floorp; Mullvad Browser; Lynx; Konqueror; GNOME Web|Epiphany; Midori; SeaMonkey; Mosaic|NCSA Mosaic; Ladybird; Falkon; qutebrowser; Kiwi Browser|Kiwi;
  Puffin; Dolphin Browser; Avant Browser; K-Meleon; Links; w3m; Dillo; Amazon Silk|Silk; Sleipnir; Flock; Camino; Mozilla Suite; Lunascape; Min Browser`
},
{
  id: 'farma', q: 'Zvíře na farmě', hint: 'Zvíře, které se chová na statku nebo farmě.',
  a: `kráva; prase|vepř|čuně|prasátko; slepice|kur domácí|slípka; kůň; ovce; koza; kachna; husa; králík; krůta|krocan; osel|oslík; býk; pes; kočka;
  kohout; kuře; tele; ovečka|jehně; beran; perlička; lama; alpaka; buvol; vůl; jalovice; křepelka; hříbě; kůzle; sele; mula; mezek; pštros; holub;
  včela; bažant; emu; jak; nutrie; velbloud; sob; jelen; daněk; kapr; pstruh; šnek|hlemýžď; zebu; morče; kozel; kanec; prasnice; páv`
},
{
  id: 'barva', q: 'Barva', hint: 'Název barvy nebo odstínu.',
  a: `červená; modrá; zelená; žlutá; černá; bílá; oranžová; fialová; růžová; hnědá; šedá|šedivá; tyrkysová; béžová; zlatá; stříbrná; azurová;
  bordó|vínová; tmavomodrá; světlemodrá; khaki; okrová; purpurová; karmínová; indigo; magenta; olivová; limetková; mintová; korálová;
  levandulová; lososová; šarlatová; smaragdová; krémová; slonovinová; rumělková; sépiová; antracitová; terakotová; petrolejová;
  ultramarínová|ultramarín; kobaltová; blankytná; nachová; rezavá; meruňková; pistáciová; cyan; fuchsiová; chartreuse; šafránová; jantarová;
  měděná; bronzová; mahagonová; ebenová; perleťová; lila; vermilion; taupe; pruská modř`
},
{
  id: 'reka', q: 'Řeka v Česku', hint: 'Řeka nebo větší potok protékající územím Česka.',
  a: `Vltava; Labe; Morava; Odra; Ohře; Sázava; Berounka; Jizera; Dyje; Svratka; Lužnice; Otava; Svitava; Bečva; Mže; Opava; Ostravice; Jihlava;
  Radbuza; Úhlava; Malše; Orlice|Divoká Orlice|Tichá Orlice; Chrudimka; Ploučnice; Kamenice; Blanice; Želivka; Oslava; Olše; Úpa; Metuje;
  Cidlina; Moravice; Bílina; Teplá; Střela; Doubrava; Rokytná; Botič; Rokytka; Smědá; Nežárka; Volyňka; Úslava; Klabava; Loděnice; Desná; Haná;
  Mumlava; Kocába; Litava; Svatava; Zdobnice; Bystřice; Lomnice; Lubina; Jičínka; Rožnovská Bečva; Vsetínská Bečva; Mohelka; Javorka`
},
{
  id: 'ovoce', q: 'Ovoce', hint: 'Plod, který se běžně označuje jako ovoce.',
  a: `jablko; banán; hruška; pomeranč; jahoda; třešeň; švestka; hroznové víno|hrozen|hrozny|víno; meruňka; broskev; mandarinka; kiwi; ananas; malina;
  borůvka; citron|citrón; meloun|vodní meloun|cukrový meloun; mango; višeň; rybíz; angrešt; ostružina; grep|grapefruit; nektarinka;
  granátové jablko|granátovník; fík; datle; kokos|kokosový ořech; papája; liči; kdoule; avokádo; limetka; mišpule; physalis|mochyně;
  maracuja|mučenka; pitahaya|dračí ovoce|pitaya; karambola; kumquat; rambutan; mangostan; durian; kaki|tomel; jackfruit|chlebovník;
  guava|kvajáva; pomelo; aronie|černý jeřáb; rakytník; brusinka; klikva; moruše; šípek; trnka; bezinka|bez černý; feijoa; longan; salak; tamarind;
  nešpule japonská|loquat; čerimoja|cherimoya; sapota; noni; jujuba|cicimek`
},
{
  id: 'nastroj', q: 'Hudební nástroj', hint: 'Nástroj, na který se dá hrát.',
  a: `kytara; klavír|piano; housle; bicí|bubny|bicí souprava; flétna; trumpeta|trubka; saxofon|saxík; violoncello|cello; kontrabas; harfa; klarinet;
  akordeon|tahací harmonika|harmonika; varhany; ukulele; baskytara|basa; hoboj; fagot; lesní roh; pozoun|trombon; tuba; xylofon; viola; banjo|bendžo;
  mandolína; triangl; buben; činel|činely; tympány; foukací harmonika|foukačka; syntezátor|synťák; cembalo; zobcová flétna; příčná flétna; dudy;
  cimbál; kastaněty; didgeridoo; sitár; theremin; marimba; vibrafon; okarína; kalimba; cajón|cajon; tamburína; kazoo; lyra; loutna; balalajka;
  šalmaj; gong; zvonkohra; celesta; harmonium; handpan|hang; fujara; koncovka; niněra|kolovrátek; heligonka; dulcimer; erhu; koto; tabla`
},
{
  id: 'mesto', q: 'Město v Česku', hint: 'Obec se statusem města.',
  a: `Praha; Brno; Ostrava; Plzeň; Olomouc; Liberec; České Budějovice|Budějovice|Budějky; Hradec Králové|Hradec; Pardubice; Ústí nad Labem|Ústí;
  Zlín; Jihlava; Karlovy Vary|Vary; Kladno; Opava; Most; Frýdek-Místek|Frýdek Místek|Frýdek; Karviná; Teplice; Děčín; Chomutov; Havířov;
  Prostějov; Přerov; Třebíč; Kolín; Mladá Boleslav|Boleslav; Tábor; Znojmo; Český Krumlov|Krumlov; Kutná Hora; Cheb; Písek; Třinec; Trutnov;
  Příbram; Litoměřice; Jablonec nad Nisou|Jablonec; Šumperk; Uherské Hradiště; Vsetín; Hodonín; Břeclav; Kroměříž; Vyškov; Blansko; Telč;
  Mikulov; Litomyšl; Domažlice; Klatovy; Strakonice; Jindřichův Hradec; Pelhřimov; Rakovník; Beroun; Benešov; Mělník; Náchod; Jičín; Semily;
  Rokycany; Sokolov; Tachov; Louny; Žatec; Kadaň; Nymburk; Poděbrady; Chrudim; Svitavy; Ústí nad Orlicí; Rychnov nad Kněžnou;
  Žďár nad Sázavou; Havlíčkův Brod; Bruntál; Jeseník; Nový Jičín; Kopřivnice; Valašské Meziříčí; Rožnov pod Radhoštěm; Slavkov u Brna;
  Boskovice; Hustopeče; Kyjov; Uherský Brod; Prachatice; Vimperk; Sušice; Horažďovice; Nepomuk; Holešov; Bystřice pod Hostýnem;
  Mariánské Lázně; Františkovy Lázně; Aš; Kraslice; Nové Město na Moravě; Moravská Třebová; Lanškroun; Vrchlabí; Špindlerův Mlýn; Harrachov;
  Hořice; Nová Paka; Turnov; Česká Lípa; Varnsdorf; Rumburk; Frýdlant; Úštěk; Slaný; Kralupy nad Vltavou; Brandýs nad Labem; Říčany; Mnichovice;
  Sedlčany; Votice; Vodňany; Netolice; Trhové Sviny; Slavonice; Dačice; Moravské Budějovice; Velké Meziříčí; Bystřice nad Pernštejnem`
},
{
  id: 'vesmir', q: 'Těleso Sluneční soustavy', hint: 'Planeta, měsíc, trpasličí planeta, planetka nebo kometa.',
  a: `Země; Mars; Slunce; Měsíc; Jupiter; Saturn; Venuše; Merkur; Neptun; Uran; Pluto; Ceres; Titan; Europa; Io; Ganymed; Phobos|Fobos;
  Deimos; Kallisto; Enceladus; Triton; Charon; Halleyova kometa|Halley; Eris; Haumea; Makemake; Vesta; Sedna; Pallas; Juno; Mimas; Tethys; Dione;
  Rhea; Iapetus; Miranda; Titania; Oberon; Ariel; Umbriel; Hyperion; Phoebe; Nereida; Quaoar; Orcus; Gonggong; Arrokoth; Eros; Ida; Hygiea; Psyche;
  Bennu; Ryugu; Apophis; Amalthea; Pan; Atlas; Proteus; Dactyl; Kometa Hale-Bopp|Hale-Bopp; Šumaker-Levy|Shoemaker-Levy 9; Čurjumov-Gerasimenko|67P`
},
{
  id: 'mic', q: 'Sport s míčem', hint: 'Sport, ve kterém se hraje s míčem nebo míčkem.',
  a: `fotbal|kopaná; basketbal|košíková; tenis; volejbal|odbíjená; házená; florbal; golf; baseball|bejzbal; ragby|rugby; americký fotbal;
  stolní tenis|ping pong|pingpong; squash; vodní pólo; kriket; softbal; nohejbal; plážový volejbal|beach volejbal; bowling; kuželky; pétanque|petang;
  kulečník|biliár; snooker; pozemní hokej; lakros; futsal; korfbal; padel; vybíjená; přehazovaná; minigolf; kroket; polo; sepak takraw; teqball;
  netbal; australský fotbal; gaelský fotbal; hurling; pickleball; goalball; kin-ball; pelota|jai alai; footvolley; plážový fotbal|beach soccer;
  bocce; sitting volejbal; lapta; brännboll; bossaball; fistball|faustball; malá kopaná; rugby league|ragbyová liga; underwater rugby|podvodní ragby`
},
{
  id: 'auto', q: 'Značka auta', hint: 'Výrobce osobních aut, současný nebo historický.',
  a: `Škoda; Volkswagen|VW; BMW; Audi; Mercedes|Mercedes-Benz; Toyota; Ford; Hyundai; Kia; Tesla; Peugeot; Renault; Opel; Citroën|Citroen; Fiat;
  Ferrari; Porsche; Lamborghini; Volvo; Honda; Mazda; Nissan; Dacia; Seat; Cupra; Suzuki; Mitsubishi; Subaru; Jeep; Chevrolet; Dodge; Lada; Tatra;
  Jaguar; Land Rover; Mini; Smart; Alfa Romeo; Lancia; Maserati; Bugatti; Bentley; Rolls-Royce; Aston Martin; McLaren; Lexus; Trabant; Wartburg;
  Moskvič; BYD; MG; Polestar; Cadillac; Infiniti; Lincoln; Chrysler; Buick; Saab; Lotus; Pagani; Koenigsegg; Genesis; DS; Rivian; Lucid; Daewoo;
  Rover; Abarth; Alpine; Hummer; Pontiac; Zastava; Yugo; Praga; Aero; Proton; Tata; Mahindra; Geely; Chery; Great Wall; Nio; Xpeng; SsangYong;
  Isuzu; Daihatsu; DeLorean; Spyker; Morgan; Caterham; Velorex; Walter; Laurin & Klement|Laurin a Klement`
},
{
  id: 'more', q: 'Mořský živočich', hint: 'Živočich, který žije v moři.',
  a: `žralok; delfín; velryba; chobotnice; medúza; krab; kosatka; tuleň; mořská hvězda|hvězdice; mořská želva|želva; rejnok; kreveta|krevety; humr;
  mořský koník|mořský koníček; sépie; mrož; lachtan; ježovka|mořský ježek; korál; tuňák; treska; sasanka|mořská sasanka; kril|krill; sleď; sardinka;
  makrela; platýs; murena; úhoř; ďas; plejtvák; vorvaň; narval; běluha; kapustňák; dugong; mečoun; marlín; barakuda; klaun očkatý|klaun|nemo;
  kalmar|oliheň; ústřice; slávka; hřebenatka; mořská okurka|sumýš; nahožábrý plž; krakatice; čtverzubec|ježík; manta; pilonos; plejtvák obrovský;
  žralok velrybí; žralok bílý; vlasatec; hlubinná ryba lampovník|lampovník; ďasovec; nautilus|loděnka; langusta; garnát; mořská lilie|lilijice;
  plž; salpa; měsíčník|mola mola; poutník; trubýš; smrtonoš|kamenná ryba; perutýn; kladivoun|žralok kladivoun; ploskohlavec; tuleň kroužkovaný`
},
{
  id: 'mesto-hl', q: 'Hlavní město státu', hint: 'Současné hlavní město některého nezávislého státu.',
  a: `Praha; Paříž; Londýn; Berlín; Řím; Vídeň; Madrid; Bratislava; Varšava; Budapešť; Washington|Washington D.C.; Moskva; Tokio; Peking|Beijing;
  Atény; Lisabon; Amsterdam; Brusel; Oslo; Stockholm; Kodaň; Helsinky; Dublin; Bern; Kyjev; Bukurešť; Sofie; Bělehrad; Záhřeb; Lublaň; Ottawa;
  Canberra; Dillí|Nové Dillí; Káhira; Ankara; Soul; Bangkok; Buenos Aires; Brasília|Brasilia; Ciudad de México|Mexiko|Mexico City; Lima;
  Santiago de Chile|Santiago; Bogotá; Caracas; Havana; Reykjavík; Tallinn; Riga; Vilnius; Minsk; Kišiněv; Tirana; Podgorica; Sarajevo; Skopje;
  Priština; Valletta; Nikósie; Lucemburk; Monako; Vaduz; Andorra la Vella; San Marino; Vatikán; Tbilisi; Jerevan; Baku; Astana; Taškent; Teherán;
  Bagdád; Damašek; Bejrút; Ammán; Rijád; Abú Zabí; Dauhá; Maskat; Kábul; Islámábád; Káthmándú; Dháka; Hanoj; Manila; Jakarta; Kuala Lumpur;
  Singapur; Tchaj-pej; Ulánbátar; Pchjongjang; Nairobi; Addis Abeba; Pretorie; Abuja; Akkra; Dakar; Rabat; Alžír; Tunis; Tripolis; Chartúm;
  Kampala; Kigali; Luanda; Harare; Lusaka; Antananarivo; Wellington; Quito; Sucre|La Paz; Montevideo; Asunción; Panama; San José; Kingston; Nassau;
  Port-au-Prince; Santo Domingo; Ouagadougou; Bamako; Nuakšott; Thimphu; Malé; Dušanbe; Biškek; Ašchabad; Naypyidaw|Neipyijto; Vientiane; Phnompenh;
  Port Moresby; Suva; Apia; Funafuti; Paramaribo; Georgetown; Belmopan; Tegucigalpa; Managua; San Salvador; Ciudad de Guatemala|Guatemala; Windhoek;
  Gaborone; Maputo; Lilongwe; Dodoma; Mogadišo; Džibuti; Asmara; Niamey; Ndžamena; Bangui; Jaunde; Libreville; Brazzaville; Kinshasa; Malabo`
},
{
  id: 'prvek', q: 'Chemický prvek', hint: 'Prvek z periodické tabulky. Platí i značka.',
  a: `kyslík|O; vodík|H; uhlík|C; dusík|N; železo|Fe; zlato|Au; stříbro|Ag; helium|He; sodík|Na; chlor|Cl; vápník|Ca; měď|Cu; hliník|Al; uran|U;
  draslík|K; olovo|Pb; rtuť|Hg; zinek|Zn; křemík|Si; fosfor|P; síra|S; hořčík|Mg; platina|Pt; neon|Ne; lithium|Li; cín|Sn; titan|Ti; jod|jód|I;
  fluor|F; argon|Ar; nikl|Ni; plutonium|Pu; chrom|Cr; radium|Ra; kobalt|Co; mangan|Mn; wolfram|W; brom|Br; baryum|Ba; berylium|Be; bor|B; xenon|Xe;
  krypton|Kr; radon|Rn; polonium|Po; arsen|As; selen|Se; cesium|Cs; stroncium|Sr; germanium|Ge; gallium|Ga; indium|In; vanad|V; molybden|Mo;
  kadmium|Cd; antimon|Sb; bismut|Bi; iridium|Ir; osmium|Os; palladium|Pd; rhodium|Rh; ruthenium|Ru; thorium|Th; technecium|Tc; neodym|Nd;
  europium|Eu; gadolinium|Gd; skandium|Sc; yttrium|Y; zirkonium|Zr; niob|Nb; tantal|Ta; hafnium|Hf; rhenium|Re; thallium|Tl; tellur|Te; rubidium|Rb;
  lanthan|La; cer|Ce; praseodym|Pr; promethium|Pm; samarium|Sm; terbium|Tb; dysprosium|Dy; holmium|Ho; erbium|Er; thulium|Tm; ytterbium|Yb;
  lutecium|Lu; astat|At; francium|Fr; aktinium|Ac; protaktinium|Pa; neptunium|Np; americium|Am; curium|Cm; berkelium|Bk; kalifornium|Cf;
  einsteinium|Es; fermium|Fm; mendelevium|Md; nobelium|No; lawrencium|Lr; rutherfordium|Rf; dubnium|Db; seaborgium|Sg; bohrium|Bh; hassium|Hs;
  meitnerium|Mt; darmstadtium|Ds; roentgenium|Rg; kopernicium|Cn; nihonium|Nh; flerovium|Fl; moscovium|Mc; livermorium|Lv; tennessin|Ts; oganesson|Og`
},
{
  id: 'jazyk-prog', q: 'Programovací jazyk', hint: 'Jazyk, ve kterém se píšou programy.',
  a: `Python; JavaScript|JS; Java; C++|cpp; C; C#|C sharp|csharp; PHP; TypeScript|TS; Rust; Go|Golang; Swift; Kotlin; Ruby; SQL; Scratch; Bash; Lua;
  R; MATLAB; Pascal; Assembler|assembly|jazyk symbolických adres; Visual Basic|VB|VBA; Basic; Dart; Scala; Haskell; Perl; Fortran; COBOL; Delphi;
  Objective-C; PowerShell; Elixir; Erlang; Julia; Lisp; Clojure; F#; OCaml; Prolog; Zig; Groovy; Ada; Smalltalk; Scheme; Racket; Elm; Solidity; Logo;
  Nim; Crystal; Haxe; D; APL; Forth; Brainfuck; Gleam; Mojo; ABAP; Tcl; Awk; Raku; Simula; ALGOL; PL/I; CoffeeScript; PureScript; ReScript; Odin;
  Idris; Agda; Coq|Rocq; Befunge; Whitespace; Piet; LOLCODE; Karel`
},
{
  id: 'strom', q: 'Strom', hint: 'Druh nebo rod stromu.',
  a: `dub; buk; bříza; smrk; borovice; jedle; lípa; javor; jasan; modřín; olše; topol; vrba; habr; jabloň; kaštan|jírovec|kaštanovník; jilm; akát|trnovník;
  jeřáb; třešeň; hrušeň; ořešák; tis; cedr; sekvoj|sekvojovec|sekvoje; palma; baobab; eukalyptus; cypřiš; douglaska; platan; magnólie; jinan|ginkgo;
  olivovník|oliva; fíkovník; mahagon; teak; eben|ebenovník; túje|zerav; jalovec; švestka|slivoň; višeň; meruňka; broskvoň; liliovník; katalpa;
  pajasan; zmarlika; kleč; pinie; banyán; araukárie; korkovník|korkový dub; cesmína; morušovník; platan javorolistý; střemcha; muchovník; oskeruše;
  břek; mukyně; tamaryšek; wollemie; dračinec; pyramidální topol; kapok; balza; sangvinovník|dračí krev; borovice osinatá`
},
{
  id: 'zelenina', q: 'Zelenina', hint: 'Plodina, která se v kuchyni bere jako zelenina.',
  a: `mrkev; brambor|brambora|brambory; rajče|rajčata; okurka; paprika; cibule; česnek; zelí; kedluben; brokolice; květák; salát|hlávkový salát;
  ředkvička; celer; petržel; pórek; dýně; cuketa; lilek; hrášek|hrách; fazole; špenát; kukuřice; řepa|červená řepa; chřest; kapusta;
  růžičková kapusta; artyčok; čočka; pastinák; batát|sladké brambory; rukola; polníček; mangold; fenykl; křen; tuřín; okra; topinambur;
  kadeřávek|kale; pak choi|bok choy; čínské zelí|pekingské zelí; ředkev; šalotka; jarní cibulka; cizrna; sója; edamame; chilli|chili|feferonka;
  patizon; černý kořen|hadí mord; vodnice; endivie; čekanka; kořenová petržel; zelená fazolka|fazolky; kerblík; řeřicha; šťovík; kopřiva; yam|jam;
  maniok|kasava; taro; daikon; lotosový kořen; bambusové výhonky; kardy; romanesco; mizuna`
},
{
  id: 'pes', q: 'Psí plemeno', hint: 'Uznávané plemeno psa.',
  a: `labrador|labradorský retrívr; německý ovčák|vlčák; zlatý retrívr|golden retrívr; jezevčík; čivava; francouzský buldoček|buldoček; mops; pudl;
  bígl|beagle; husky|sibiřský husky; dalmatin; border kolie; jack russell teriér|jack russel; yorkšír|jorkšírský teriér|yorkshire teriér; boxer;
  rotvajler; dobrman; německá doga|doga; bernský salašnický pes|bernský salašník; kokršpaněl|kokr; chodský pes; český fousek; pražský krysařík;
  československý vlčák; shih tzu; maltézský psík|maltézák; kavalír king charles španěl|kavalír; west highland white teriér|westík; knírač;
  bulteriér; pitbul|pitbull; americký stafordšírský teriér|amstaf; stafordšírský bulteriér|staford; akita|akita inu; shiba inu|šiba; čau čau|chow chow;
  šarpej; baset; bladhaund|bloodhound|svatohubertský pes; greyhound|anglický chrt; whippet; afgánský chrt; saluki; novofundlanďan; bernardýn|svatobernardýn;
  aljašský malamut|malamut; samojed; špic|německý špic; pomeranian|trpasličí špic; papillon|papiljon; australský ovčák|aussie; kolie; šeltie;
  corgi|velšský corgi; bišonek|bichon frisé; lhasa apso; maďarský ohař|vižla; výmarský ohař; irský setr; anglický setr; irský vlkodav; leonberger;
  mastif; bulmastif; cane corso; argentinská doga|dogo argentino; rhodéský ridgeback; basenji; xoloitzcuintle|mexický naháč; čínský chocholatý pes;
  puli; komondor; kuvasz; briard; beauceron; belgický ovčák|malinois; holandský ovčák; český strakatý pes; český horský pes; kangal; tosa inu;
  lagotto romagnolo; bergamský ovčák; catahoulský leopardí pes; norský lundehund; azawakh; slovenský čuvač; český teriér`
},
{
  id: 'jazyk', q: 'Jazyk, kterým se mluví', hint: 'Přirozený nebo uměle vytvořený jazyk.',
  a: `angličtina; čeština; němčina; francouzština; španělština; italština; ruština; polština; slovenština; čínština|mandarínština; japonština;
  korejština; arabština; portugalština; maďarština; řečtina; turečtina; hindština; nizozemština|holandština; švédština; norština; dánština; finština;
  ukrajinština; chorvatština; srbština; bulharština; rumunština; hebrejština; latina; esperanto; svahilština; vietnamština; thajština; indonéština;
  perština; bengálština; urdština; tamilština; islandština; estonština; lotyština; litevština; slovinština; makedonština; albánština; gruzínština;
  arménština; irština; velština; baskičtina; katalánština; galicijština; lužická srbština|lužičtina; romština; jidiš; maltština; mongolština;
  tagalog|tagalština; amharština; zuluština; kečuánština; navažština; havajština; maorština; klingonština; sanskrt; staroslověnština; kantonština;
  afrikánština; běloruština; kazaština; uzbečtina; jorubština; hauština; malajština; paštština; kurdština; bretonština; korsičtina; rétorománština;
  faerština; grónština; ainština; toki pona; quenijština|quenya; dothračtina`
},
{
  id: 'zima', q: 'Zimní olympijský sport', hint: 'Sport nebo disciplína ze zimních olympijských her.',
  a: `lední hokej|hokej; sjezdové lyžování|lyžování|sjezd; krasobruslení; biatlon; skoky na lyžích|skoky; běh na lyžích|běžky|běžecké lyžování;
  snowboarding|snowboard; rychlobruslení; curling; boby; sáňkování|saně; skeleton; short track; severská kombinace|sdružení;
  akrobatické lyžování|freestyle lyžování; slalom; obří slalom; super-G; skikros; snowboardcross; jízda v boulích|boule; U-rampa|halfpipe;
  slopestyle; big air; skialpinismus; lyžařské akrobatické skoky|akrobatické skoky; týmový sprint; paralelní obří slalom; alpská kombinace; dvojbob; čtyřbob; monobob`
},
{
  id: 'hora', q: 'Hora nebo kopec v Česku', hint: 'Pojmenovaný vrchol na území Česka.',
  a: `Sněžka; Praděd; Lysá hora; Říp; Ještěd; Radhošť; Klínovec; Milešovka; Králický Sněžník; Boubín; Plechý; Kleť; Smrk; Blaník|Velký Blaník;
  Luční hora; Studniční hora; Keprník; Šerák; Velká Deštná; Bezděz; Pancíř; Ostrý; Javořice; Kozákov; Hostýn|Svatý Hostýn; Velká Javořina; Kněhyně;
  Ondřejník; Travný; Vysoká hole; Černá hora; Medvědín; Kotel; Lovoš; Bořeň; Třemšín; Devět skal; Žalý; Trosky; Sedlo; Kraví hora; Děvín; Pálava;
  Petřín; Ralsko; Tlustec; Kamenec; Vysoký Kámen; Svatobor; Jezerní hora; Velký Zvon; Čerchov; Libín; Bobík; Chlum; Hradiště; Lysec;
  Mravenečník; Bouřňák; Loučná; Jelení hora; Komáří vížka; Hvězda; Stožec; Třístoličník; Velký Roudný; Kunětická hora; Zelená hora`
},
];
