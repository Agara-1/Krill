// Kategorie pro karty Zeměpis a Memes CZ/SK.
// Formát je stejný jako v data.js; "pack" určuje, do které karty kategorie patří.
window.HLUBINA_CATEGORIES.push(
// ---------- ZEMĚPIS ----------
{
  id: 'afrika', pack: 'geo', q: 'Stát v Africe', hint: 'Nezávislý africký stát.',
  a: `Egypt; Jihoafrická republika|JAR|Jižní Afrika; Keňa; Maroko; Nigérie; Etiopie; Tunisko; Alžírsko; Madagaskar; Ghana; Tanzanie;
  Demokratická republika Kongo|DR Kongo|Kongo-Kinshasa|Zair; Kongo|Konžská republika|Kongo-Brazzaville; Libye; Súdán; Somálsko; Uganda; Rwanda;
  Senegal; Mali; Kamerun; Angola; Namibie; Zimbabwe; Zambie; Mosambik; Botswana; Niger; Čad; Pobřeží slonoviny|Côte d'Ivoire; Jižní Súdán;
  Burundi; Malawi; Gabon; Burkina Faso; Libérie; Sierra Leone; Guinea; Mauritánie; Eritrea; Togo; Benin; Gambie; Středoafrická republika;
  Rovníková Guinea; Guinea-Bissau; Džibutsko|Džibuti; Lesotho; Eswatini|Svazijsko; Kapverdy; Mauricius; Seychely; Komory;
  Svatý Tomáš a Princův ostrov`
},
{
  id: 'asie', pack: 'geo', q: 'Stát v Asii', hint: 'Stát, který leží celý nebo zčásti v Asii.',
  a: `Čína; Japonsko; Indie; Jižní Korea|Korea; Thajsko; Vietnam; Severní Korea|KLDR; Indonésie; Filipíny; Mongolsko; Pákistán; Írán; Irák;
  Izrael; Turecko; Saúdská Arábie; Spojené arabské emiráty|SAE|Emiráty; Rusko; Afghánistán; Nepál; Kazachstán; Singapur; Malajsie; Srí Lanka;
  Bangladéš; Kambodža; Laos; Myanmar|Barma; Tchaj-wan; Katar; Kuvajt; Jordánsko; Sýrie; Libanon; Jemen; Omán; Bahrajn; Bhútán; Maledivy;
  Gruzie; Arménie; Ázerbájdžán; Uzbekistán; Turkmenistán; Tádžikistán; Kyrgyzstán; Kypr; Brunej; Východní Timor|Timor; Palestina`
},
{
  id: 'jamerika', pack: 'geo', q: 'Stát nebo území v Jižní Americe', hint: 'Jihoamerický stát nebo zámořské území.',
  a: `Brazílie; Argentina; Chile; Peru; Kolumbie; Venezuela; Ekvádor; Bolívie; Uruguay; Paraguay; Guyana; Surinam;
  Francouzská Guyana; Falklandy|Falklandské ostrovy|Malvíny`
},
{
  id: 'ostrov', pack: 'geo', q: 'Ostrov', hint: 'Jeden konkrétní ostrov, ne celé souostroví.',
  a: `Island; Grónsko; Madagaskar; Sicílie; Kréta; Bali; Kuba; Mallorca|Malorka; Sardinie; Korsika; Kypr; Malta; Tasmánie; Srí Lanka;
  Irsko; Velká Británie; Rhodos; Korfu; Tenerife; Ibiza; Zakynthos; Santorini|Théra; Kos; Madeira; Jamajka; Borneo; Sumatra; Jáva; Honšú;
  Hokkaidó; Kjúšú; Šikoku; Gran Canaria; Lanzarote; Fuerteventura; Hispaniola|Haiti; Portoriko; Tchaj-wan; Nová Guinea; Rujána; Krk; Hvar;
  Brač; Capri; Elba; Gotland; Bornholm; Velikonoční ostrov|Rapa Nui; Zanzibar; Mauricius; Réunion; Tahiti; Bora Bora; Phuket; Lombok;
  Komodo; Sokotra|Socotra; Svatá Helena; Baffinův ostrov; Sulawesi|Celebes; Luzon; Mindanao; Hainan; Sachalin; Newfoundland;
  Vancouverův ostrov|Vancouver Island; Long Island; Manhattan; Alcatraz; Kampa; Štvanice; Střelecký ostrov; Trinidad; Barbados; Ko Samui;
  Severní ostrov; Jižní ostrov; Lesbos; Naxos; Mykonos; Cres; Lošinj; Pag; Usedom; Sylt; Helgoland; Jersey; Guernsey; Man|Ostrov Man;
  Skye; Anglesey; Wight|Isle of Wight; Tristan da Cunha; Ascension|Nanebevstoupení; Pitcairn; Spitsbergen|Špicberk; Wrangelův ostrov`
},
{
  id: 'hora-svet', pack: 'geo', q: 'Hora mimo Česko', hint: 'Pojmenovaný vrchol nebo sopka kdekoli na světě kromě Česka.',
  a: `Mount Everest|Everest|Čomolungma; Mont Blanc; Kilimandžáro; K2; Matterhorn; Fudži|Fudžisan; Elbrus; Aconcagua; Gerlachovský štít|Gerlach;
  Kriváň; Rysy; Etna; Vesuv; Olymp; Denali|Mount McKinley|McKinley; Lomnický štít; Großglockner|Grossglockner; Zugspitze; Triglav;
  Kangčendženga; Lhoce; Makalu; Čo Oju; Annapurna; Nanga Parbat; Dhaulágirí; Manáslu; Šiša Pangma; Gašerbrum; Broad Peak; Ama Dablam;
  Mount Vinson|Vinson; Puncak Jaya|Carstenszova pyramida; Kosciuszko|Mount Kosciuszko; Ararat; Kailás; Mount Rainier; Mount St. Helens;
  Mount Kenya|Keňa (hora); Chimborazo; Cotopaxi; Popocatépetl; Mauna Kea; Mauna Loa; Ben Nevis; Snowdon; Musala; Aneto; Teide; Eiger; Jungfrau;
  Mönch; Monte Rosa; Gran Paradiso; Ortler; Dachstein; Stromboli; Hekla; Erebus; Stolová hora; Sinaj|Džebel Músá; Kazbek; Pik Lenina; Ďumbier;
  Chopok; Kráľova hoľa; Babia hora; Sněžka (polská strana)|Śnieżka; Ojos del Salado; Huascarán; Illimani; Fitz Roy; Cerro Torre; Toubkal;
  Mount Cook|Aoraki; Krakatoa; Pinatubo; Tambora; Merapi; Eyjafjallajökull; Vatnajökull; Säntis; Pilatus; Watzmann; Feldberg; Brocken; Hoverla`
},
{
  id: 'more-svet', pack: 'geo', q: 'Moře nebo oceán', hint: 'Pojmenované moře nebo oceán.',
  a: `Středozemní moře|Středozemní; Tichý oceán|Pacifik|Tichý; Atlantský oceán|Atlantik|Atlantský; Černé moře|Černé; Jaderské moře|Jadran|Jaderské;
  Baltské moře|Balt|Baltské; Severní moře|Severní; Rudé moře|Rudé; Indický oceán|Indický; Severní ledový oceán|Severní ledový; Karibské moře|Karibik|Karibské;
  Egejské moře|Egejské; Mrtvé moře|Mrtvé; Kaspické moře|Kaspické; Jižní oceán; Japonské moře; Jihočínské moře; Arabské moře; Tyrhénské moře;
  Jónské moře; Ligurské moře; Marmarské moře; Azovské moře; Bílé moře; Barentsovo moře; Žluté moře; Východočínské moře; Beringovo moře;
  Ochotské moře; Sargasové moře; Korálové moře; Tasmanovo moře; Norské moře; Grónské moře; Irské moře; Keltské moře; Karské moře; Moře Laptěvů;
  Východosibiřské moře; Čukotské moře; Weddellovo moře; Rossovo moře; Andamanské moře; Filipínské moře; Javské moře; Celebeské moře; Bandské moře;
  Arafurské moře; Timorské moře; Labradorské moře; Alboránské moře; Baleárské moře; Krétské moře; Levantské moře; Wattové moře; Aralské moře;
  Sulawesiské moře; Bismarckovo moře; Šalamounovo moře; Amundsenovo moře; Beaufortovo moře; Baffinovo moře; Lincolnovo moře`
},
{
  id: 'reka-svet', pack: 'geo', q: 'Řeka mimo Česko', hint: 'Řeka, která neprotéká Českem.',
  a: `Nil; Amazonka; Dunaj; Mississippi; Temže; Rýn; Volha; Seina; Jang-c'-ťiang|Jangtze|Dlouhá řeka; Ganga|Ganges; Váh; Mekong; Kongo; Tibera|Tiber;
  Visla; Dněpr; Hron; Pád; Loira; Missouri; Niger; Zambezi; Eufrat; Tigris; Jordán; Žlutá řeka|Chuang-che; Indus; Ob; Jenisej; Lena; Amur;
  Don; Ural; Orinoko; Paraná; Rio Grande; Colorado; Yukon; Svatý Vavřinec; Mackenzie; Murray; Rhona|Rhône; Garonna; Ebro; Tajo|Tejo; Douro;
  Inn; Dráva; Sáva; Mohan; Neckar; Mosela; Tisa; Prut; Dněstr; Daugava; Něva; Kama; Oka; Ohio; Brahmaputra; Irrawaddy; Čao Phraya; Okavango;
  Limpopo; Oranžská řeka|Orange; Senegal; Volta; Syrdarja; Amudarja; Hornád; Ipeľ; Nitra; Poprad; Bodrog; Ondava; Laborec; Torysa; Slaná;
  Salzach; Isar; Lech; Weser; Spréva; Havola; Mur; Aare; Arno; Adiža; Shannon; Severn; Tyne; Hudson; Potomac; Snake River; Columbia`
},
{
  id: 'sk-mesto', pack: 'geo', q: 'Město na Slovensku', hint: 'Slovenská obec se statusem města.',
  a: `Bratislava; Košice; Žilina; Nitra; Banská Bystrica; Prešov; Trnava; Trenčín; Poprad; Martin; Zvolen; Piešťany; Komárno; Liptovský Mikuláš;
  Bardejov; Levoča; Banská Štiavnica; Kežmarok; Ružomberok; Prievidza; Michalovce; Nové Zámky; Spišská Nová Ves; Levice; Humenné; Lučenec;
  Topoľčany; Trebišov; Čadca; Považská Bystrica; Dubnica nad Váhom; Rimavská Sobota; Partizánske; Šaľa; Dunajská Streda; Vranov nad Topľou;
  Brezno; Senica; Hlohovec; Snina; Rožňava; Dolný Kubín; Skalica; Kremnica; Bojnice; Stará Ľubovňa; Detva; Myjava; Pezinok; Senec; Malacky;
  Stupava; Sereď; Galanta; Štúrovo; Svidník; Stropkov; Medzilaborce; Sabinov; Svit; Vysoké Tatry; Tvrdošín; Námestovo; Bytča; Rajecké Teplice;
  Turčianske Teplice; Handlová; Nová Baňa; Žiar nad Hronom; Krupina; Veľký Krtíš; Fiľakovo; Tornaľa; Revúca; Gelnica; Sobrance;
  Kráľovský Chlmec; Veľké Kapušany; Modra; Svätý Jur; Holíč; Šamorín; Kolárovo; Hurbanovo; Želiezovce; Šurany; Vráble; Zlaté Moravce;
  Bánovce nad Bebravou; Nové Mesto nad Váhom; Stará Turá; Púchov; Ilava; Nemšová; Trenčianske Teplice; Kysucké Nové Mesto; Turzovka;
  Krásno nad Kysucou; Trstená; Liptovský Hrádok; Spišská Belá; Podolínec; Spišské Podhradie; Giraltovce; Lipany; Dobšiná; Jelšava`
},

// ---------- MEMES CZ/SK ----------
{
  id: 'vecernicek', pack: 'meme', q: 'Postava z večerníčku nebo seriálu pro děti', hint: 'Česká nebo slovenská animovaná či dětská postava.',
  a: `Krteček|Krtek; Pat; Mat; Rumcajs; Maxipes Fík|Fík; Bob; Bobek; Mach; Šebestová; Křemílek; Vochomůrka; Rákosníček; Hurvínek; Spejbl;
  Manka; Cipísek; Ferda Mravenec|Ferda; Ája; Mánička; Žeryk; Brouk Pytlík|Pytlík; Krakonoš; Trautenberk; Anče; Kuba; Jonatán|sluchátko;
  Rumburak; Arabela; Pan Tau; Maťko; Kubko; Majka z Gurunu|Majka; Fantomas; Bolek; Lolek; Méďa Béďa|Béďa; Kocour Mikeš|Mikeš; Pepík Hampejz;
  Bořek stavitel; Bubáci; Hastrmani; Štaflík; Špagetka; Jája; Pája; Makový mužíček; Maková panenka; motýl Emanuel|Emanuel; Mazánek;
  Malý Muk; pan Popel; Kosí bratři; Vodník Česílko|Česílko; Fanda; Lucinka; Mates; Bombík; Hajný; Pohádkový dědeček; Dášeňka;
  Rozárka; Rabínek; Robot Emil; Tygr Tygřík; Křeček Kryštof; Rybka Golda; Červíček Pepík`
},
{
  id: 'film', pack: 'meme', q: 'Česká nebo slovenská filmová klasika s hláškami', hint: 'Celovečerní film, ze kterého lidi citují hlášky.',
  a: `Pelíšky; Slunce, seno, jahody|Slunce seno jahody; Marečku, podejte mi pero!|Marečku podejte mi pero; Jáchyme, hoď ho do stroje!|Jáchyme hoď ho do stroje;
  Vesničko má středisková; Kulový blesk; Černí baroni; Pupendo; Samotáři; Kolja; Účastníci zájezdu; Básníci|Jak básníci přicházejí o iluze;
  Obecná škola; Šakalí léta; Na samotě u lesa; Postřižiny; Ostře sledované vlaky; Limonádový Joe; S tebou mě baví svět; Ecce homo Homolka|Homolka;
  Vrchní, prchni!|Vrchní prchni; Dědictví aneb Kurvahošigutntag|Dědictví; Kameňák; Snowboarďáci; Rafťáci; Musíme si pomáhat; Vratné lahve;
  Tmavomodrý svět; Román pro ženy; Pelíšky 2; Slunce, seno a pár facek|Slunce seno a pár facek; Slunce, seno, erotika|Slunce seno erotika;
  Copak je to za vojáka; Tankový prapor; Ať žijí duchové!|Ať žijí duchové; Jak dostat tatínka do polepšovny; Saturnin; Lotrando a Zubejda;
  Hoří, má panenko|Hoří má panenko; Lásky jedné plavovlásky; Starci na chmelu; Světáci; Dobrý voják Švejk|Švejk; Císařův pekař – Pekařův císař|Císařův pekař;
  Adéla ještě nevečeřela; Kdo chce zabít Jessii?; Jára Cimrman ležící, spící|Jára Cimrman ležící spící; Akumulátor 1; Knoflíkáři; Divoké včely;
  Pekař z Kostelní; Sám vojak; Pacho, hybský zbojník|Pacho hybský zbojník; Obchod na korze; Na koho to slovo padne; Kandidát; Rukojemník;
  Ženy v pokušení; Okresní přebor; Bastardi; Gympl; Ulovit miliardáře; Pupendo 2; Kurz negativního myšlení`
},
{
  id: 'pohadka', pack: 'meme', q: 'Česká nebo slovenská filmová pohádka', hint: 'Hraná pohádka, třeba z vánoční televize.',
  a: `Tři oříšky pro Popelku|Popelka; S čerty nejsou žerty; Princezna ze mlejna; Pyšná princezna; Byl jednou jeden král; Anděl Páně;
  Šíleně smutná princezna; Tři veteráni; Hrátky s čertem; Princ Bajaja; Obušku, z pytle ven!|Obušku z pytle ven; Zlatovláska; Čertova nevěsta;
  Dařbuján a Pandrhola; Nesmrtelná teta; Peklo s princeznou; Jak se budí princezny; Za humny je drak; Malá mořská víla; Perinbaba;
  Soľ nad zlato|Sůl nad zlato; Kráľ Drozdia brada|Král Drozdí brada; Sedem jednou ranou; Princezna se zlatou hvězdou;
  O princezně Jasněnce a létajícím ševci; Honza málem králem; Jak vytrhnout velrybě stoličku; Hrnečku, vař!|Hrnečku vař; Čertí brko;
  Anděl Páně 2; Tři bratři; Zakleté pírko; Princezna a půl království; Korunní princ; Křišťálek meč; Lotrando a Zubejda; Krakonoš a lyžníci;
  Císař a tambor; O Šípkové Růžence; Nejkrásnější hádanka; Kouzla králů; Tajemství staré bambitky; Šťastný smolař;
  Pták Ohnivák; Popolvár najväčší na svete|Popolvár; Mahuliena, zlatá panna|Mahuliena; Plavčík a Vratko; Rozprávka o Šuhajovi; Zlatá réva`
},
{
  id: 'dobrota', pack: 'meme', q: 'Kultovní česká nebo slovenská dobrota či nápoj', hint: 'Jídlo, sladkost, značka nebo nápoj, který zná každý.',
  a: `Kofola; svíčková; Tatranka; Horalka; Becherovka; Margot; řízek; knedlo vepřo zelo|vepřo knedlo zelo; smažák|smažený sýr; guláš; utopenec;
  bryndzové halušky|halušky; Pilsner Urquell|Plzeň; Kozel; Fidorka; Lentilky; Studentská pečeť; Hašlerky; Deli; Bebe; Fernet; Slivovice;
  Borovička; Zlatý Bažant; Budvar; Rajec; Mattoni; Vinea; Semtex; Pikao; Granko; Májka; Lipo; Brumík; Pražská šunka; tvarůžky|olomoucké tvarůžky;
  Karlovarské oplatky|oplatky; Pardubický perník|perník; Hořické trubičky|trubičky; trdelník; nakládaný hermelín|hermelín; bramboráky|bramborák;
  langoš; párek v rohlíku; chlebíček; koláče; buchty; kremrole; věneček; laskonky; špekáčky; tlačenka; zelňačka; kulajda; kapr; vánočka;
  bramborový salát; Kofola citrus; Vitacit; Tuzemák|tuzemský rum; Vaječný koňak; Rum Božkov|Božkov; Orion; Kávenky; Zlaté oplatky;
  Chips Bohemia|Bohemia; Brambůrky; Tyčinky; Rybí salát; Lázeňské oplatky; kofolový sirup; Pribináček; Lučina; Kostka; Sedlčanský hermelín`
},
{
  id: 'sk-slovo', pack: 'meme', q: 'Slovenské slovo, kterému Čech hned nerozumí', hint: 'Slovenské slovo, které se od češtiny výrazně liší.',
  a: `ceruzka; okuliare; zemiak|zemiaky; paradajka; uhorka; čučoriedka; raňajky; vankúš; chladnička; šálka; nohavice; topánky; hádam;
  dievča; veverička; korytnačka; motýľ; šmykľavka; pivnica; cintorín; ponáhľať sa|ponáhľať; ľúbiť; štvrtok; ihrisko; kefa; obrus; lyžička;
  cestovina|cestoviny; tekvica; žehlička; vysávač; práčka; záclona; tanier; nožnice; hrebeň; izba; chrbát; plece; členok; peňaženka; škatuľa;
  šiltovka; oblok; hrnček; mravec; žubrienka; hojdačka; lopta; bábika; zajtra; sviatok; pieseň; kvet; jaternica; pirohy; ďatelina`
},
{
  id: 'politik', pack: 'meme', q: 'Český nebo slovenský politik, se kterým kolují memy', hint: 'Současný nebo bývalý politik z Česka či Slovenska.',
  a: `Andrej Babiš|Babiš; Miloš Zeman|Zeman; Robert Fico|Fico; Igor Matovič|Matovič; Tomio Okamura|Okamura; Václav Klaus|Klaus; Petr Fiala|Fiala;
  Vladimír Mečiar|Mečiar; Jiří Paroubek|Paroubek; Mirek Topolánek|Topolánek; Václav Havel|Havel; Petr Pavel|Pavel; Zuzana Čaputová|Čaputová;
  Peter Pellegrini|Pellegrini; Richard Sulík|Sulík; Marian Kotleba|Kotleba; Boris Kollár|Kollár; Ľuboš Blaha|Blaha; David Rath|Rath;
  Stanislav Gross|Gross; Jiří Čunek|Čunek; Ivan Bartoš|Bartoš; Vít Rakušan|Rakušan; Markéta Pekarová Adamová|Pekarová; Karel Schwarzenberg|Schwarzenberg;
  Jan Hamáček|Hamáček; Andrej Danko|Danko; Mikuláš Dzurinda|Dzurinda; Ivan Gašparovič|Gašparovič; Eduard Heger|Heger; Lubomír Zaorálek|Zaorálek;
  Vojtěch Filip|Filip; Jaroslav Foldyna|Foldyna; Klára Dostálová|Dostálová; Alena Schillerová|Schillerová; Adam Vojtěch; Roman Prymula|Prymula;
  Lubomír Volný|Volný; Jana Maláčová|Maláčová; Bohuslav Sobotka|Sobotka; Vladimír Špidla|Špidla; Petr Nečas|Nečas; Jiří Rusnok|Rusnok;
  Ján Slota|Slota; Rudolf Schuster|Schuster; Michal Kováč|Kováč; Iveta Radičová|Radičová; Milan Uhrík|Uhrík; Rudolf Huliak|Huliak; Michal Šimečka|Šimečka`
},
{
  id: 'youtuber', pack: 'meme', q: 'Český nebo slovenský youtuber či streamer', hint: 'Tvůrce známý z YouTube, Twitche nebo TikToku.',
  a: `Kovy; Jirka Král; GoGo; Gejmr; Restt; PedrosGame|Pedro; Duklock; Agraelus; MenT; Herdyn; Baxtrix; Wedry; Fattypillow; Shopaholic Nicol;
  Vidrail; Kazma; Expl0ited; Datel; Stejk; Freescoot; Teri Blitzen; Marek Valášek; Selassie; Sterakdary; Opat; Erik Meldik; Spajkk; Lukefry;
  Miro Jaroš; Johny Machette; Petr Mára; Jakub Enžl`
},
{
  id: 'interpret', pack: 'meme', q: 'Český nebo slovenský zpěvák či kapela', hint: 'Interpret, kterého znají aspoň rodiče.',
  a: `Karel Gott|Gott; Michal David; Ivan Mládek|Mládek; Kabát; Lucie; Chinaski; Kryštof; Elán; Richard Müller; Ewa Farna; Helena Vondráčková;
  Lucie Bílá; Těžkej Pokondr; Horkýže Slíže; Tublatanka; Olympic; Mig 21; Divokej Bill; Ben Cristovao; Rytmus; Majk Spirit; Calin; Viktor Sheen;
  Yzomandias; Separ; Kontrafakt; Marek Ztracený; Lunetic; Peter Nagy; Miro Žbirka|Meky Žbirka|Meky; Hana Zagorová; Waldemar Matuška;
  Jaromír Nohavica|Nohavica; Karel Kryl|Kryl; Iveta Bartošová; Daniel Landa|Landa; Pavel Bobek; Václav Neckář; Marta Kubišová; Hana Hegerová;
  Jiří Korn; Leoš Mareš; Tři sestry; Wanastowi Vjecy; Mňága a Žďorp; Arakain; Kristína; Zuzana Smatanová; Desmod; No Name; Team; Polemic;
  IMT Smile; Pražský výběr; Žlutý pes; Nightwork; Monkey Business; Mirai; Slza; Kali; Ektor; Paulie Garand; Řezník; Ondřej Ruml; Jelen;
  Pokáč; Vladimír Mišík; Mandrage; Xindl X; Tomáš Klus|Klus; Pavol Habera|Habera; Jana Kirschner; Katarína Knechtová; Adam Ďurica;
  Celeste Buckingham; Majself; Dara Rolins; Vašo Patejdl; Karol Duchoň; Marika Gombitová; Peter Lipa`
},
// ---------- Ručně sestavené kategorie (Česko a Slovensko) ----------
{
  id: 'kraj', pack: 'geo', q: 'Kraj v Česku nebo na Slovensku', hint: 'Vyšší územní celek: český kraj nebo slovenský kraj.',
  a: `Jihomoravský kraj|Jihomoravský|Jižní Morava; Středočeský kraj|Středočeský; Moravskoslezský kraj|Moravskoslezský; Hlavní město Praha|Praha;
  Jihočeský kraj|Jihočeský; Plzeňský kraj|Plzeňský; Olomoucký kraj|Olomoucký; Ústecký kraj|Ústecký; Liberecký kraj|Liberecký;
  Královéhradecký kraj|Královéhradecký; Pardubický kraj|Pardubický; Zlínský kraj|Zlínský; Karlovarský kraj|Karlovarský;
  Kraj Vysočina|Vysočina; Bratislavský kraj|Bratislavský; Košický kraj|Košický; Žilinský kraj|Žilinský; Prešovský kraj|Prešovský;
  Banskobystrický kraj|Banskobystrický; Nitriansky kraj|Nitriansky|Nitranský kraj; Trnavský kraj|Trnavský; Trenčiansky kraj|Trenčiansky|Trenčínský kraj`
},
{
  id: 'unesco', pack: 'geo', q: 'Památka UNESCO v Česku nebo na Slovensku', hint: 'Místo zapsané na Seznam světového dědictví UNESCO.',
  a: `Historické centrum Prahy|Praha|Pražský hrad; Český Krumlov; Kutná Hora|chrám svaté Barbory|Sedlec; Lednicko-valtický areál|Lednice|Valtice;
  Telč; Vila Tugendhat|Tugendhat; Litomyšl|zámek Litomyšl; Kroměříž|Zahrady a zámek v Kroměříži; Holašovice; Třebíč|bazilika svatého Prokopa|židovská čtvrť v Třebíči;
  Zelená hora|poutní kostel svatého Jana Nepomuckého; Sloup Nejsvětější Trojice v Olomouci|Sloup Nejsvětější Trojice|Olomouc;
  Krušnohorský hornický region|Krušnohoří; Kladruby nad Labem|hřebčín Kladruby; Žatec|krajina žateckého chmele; Karlovy Vary|Mariánské Lázně|Františkovy Lázně|Velké lázně Evropy;
  Bukové pralesy|Jizerskohorské bučiny; Banská Štiavnica; Levoča|Spišský hrad|Spišská Kapitula|Žehra; Vlkolínec; Bardejov; Dobšinská ľadová jaskyňa|Jaskyne Slovenského krasu|Domica;
  Drevené kostolíky|dřevěné kostely slovenských Karpat; Limes Romanus|Dunajský limes|Iža|Rusovce; Karpatské bukové pralesy|Poloniny; Žatecký chmel`
},
{
  id: 'postava', pack: 'meme', q: 'Postava z kultovního českého filmu nebo seriálu', hint: 'Jméno nebo přezdívka postavy, kterou zná celá republika.',
  a: `Švejk|Josef Švejk|dobrý voják Švejk; Jára Cimrman|Cimrman; Rumburak; Arabela; Saxana; Pan Tau; Limonádový Joe; major Zeman|Zeman;
  Hliník|Rudolf Hliník; Kefalín; major Terazky|Terazky; Homolka; Saturnin; Hogo Fogo; Tornádo Lou; Otík|Otík Rákosník; Pávek|Karel Pávek;
  Turek; doktor Skružný|Skružný; Kraus; Šebek; Josef Tkaloun|Tkaloun; Igor Hnízdo|Hnízdo; Škopková; Adam Bernau|Bernau; doktor Sova|Sova;
  doktor Štrosmajer|Štrosmajer; Blažej; Anna Holubová; Evžen Huml|Huml; Štěpán Šafránek|Šafránek; Kendy; doktor Nadrchal|Nadrchal;
  Bedřich Mára|Mára; Alois Fábera|Fábera; Danny Smiřický|Smiřický; Pepik Hnátek|Hnátek; Petr Majer; Fantomas; Majka z Gurunu|Majka;
  František Koudelka|Koudelka; Krakonoš; Trautenberk; Kuba; Anče; Rumcajs; Manka; Popelka; Bajaja; Honza; Ježibaba; Lucifer; Belzebub;
  Petronela; Ruprecht; pan Tau; Malý Bobeš|Bobeš; Hurvínek; Spejbl; Mach; Šebestová; Jonatán; Mrázik`
},
{
  id: 'sk-hrad', pack: 'geo', q: 'Hrad nebo zámek na Slovensku', hint: 'Slovenský hrad, zřícenina, zámek nebo kaštieľ.',
  a: `Bratislavský hrad|Bratislavský; Spišský hrad|Spiš; Oravský hrad|Orava; Bojnický zámok|Bojnice|Bojnický zámek; Trenčiansky hrad|Trenčínský hrad|Trenčín;
  Devín|hrad Devín; Čachtický hrad|Čachtice; Strečno; Beckov; Zvolenský zámok|Zvolen; Krásna Hôrka; Červený Kameň; Betliar; Smolenický zámok|Smolenice;
  Kežmarský hrad|Kežmarok; Ľubovniansky hrad|Stará Ľubovňa; Šarišský hrad; Likava; Lietava; Budatín|Budatínsky hrad; Starý hrad; Uhrovec;
  Topoľčiansky hrad; Topoľčianky|zámok Topoľčianky; Branč; Plavecký hrad; Modrý Kameň; Fiľakovský hrad|Fiľakovo; Divín; Šomoška; Muránsky hrad|Muráň;
  Sitno; Pustý hrad; Revište; Ostrý Kameň; Pajštún; Dobrá Voda; Hrušovský hrad|Hrušov; Gýmeš; Oponický hrad|Oponice; Turniansky hrad|Turňa;
  Slanský hrad; Zborov|Makovica; Kapušiansky hrad; Brekov; Vinné|Viniansky hrad; Sklabiňa; Blatnický hrad|Blatnica; Zniev; Lednica; Vršatec;
  Košecký hrad; Tematín; Hričov; Súľov; Holíčsky zámok|Holíč; Hlohovecký zámok; Antol|Svätý Anton|kaštieľ Svätý Anton; Budmerice; Dolná Krupá;
  Rusovce|Rusovský kaštieľ; Markušovce; Strážky; Hrad Jasov|Jasov; Čičva; Kamenica; Šášov; Liptovský hrad; Liptovský Hrádok; Banská Štiavnica|Starý zámok|Nový zámok;
  Kremnický hrad|Kremnica; Ľupčiansky hrad|Slovenská Ľupča; Komárňanská pevnosť|Komárno; Leopoldov; Vígľaš|Vígľašský zámok; Halič|zámok Halič;
  Fričovce; Bytčiansky zámok|Bytča; Galanta; Rákociho kaštieľ|Borša; Diviaky; Pezinský zámok|Pezinok; Stupava; Malacky; Moravany nad Váhom`
}
);
