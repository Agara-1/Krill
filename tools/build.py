import json, os, re, unicodedata, sys
OUT = 'out'
def norm(s):
    s = unicodedata.normalize('NFD', s.lower())
    s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    return re.sub(r'[^a-z0-9+#]', '', s)

NEW = {
 'cz-okres': ('geo', 'Okres v Česku', 'Stačí název okresu, třeba Benešov.'),
 'sk-okres': ('geo', 'Okres na Slovensku', 'Stačí název okresu, třeba Poprad.'),
 'cz-hrad': ('geo', 'Hrad nebo zřícenina v Česku', 'Hrad, hrádek nebo zřícenina hradu.'),
 'cz-zamek': ('geo', 'Zámek v Česku', 'Zámek nebo zámeček na území Česka.'),
 'sk-hrad': ('geo', 'Hrad nebo zámek na Slovensku', 'Slovenský hrad, zřícenina nebo zámek.'),
 'cz-voda': ('geo', 'Rybník, přehrada nebo jezero v Česku', 'Pojmenovaná vodní plocha v Česku.'),
 'pohori': ('geo', 'Pohoří v Česku nebo na Slovensku', 'Hory, vrchoviny i menší pohoří.'),
 'sk-reka': ('geo', 'Řeka na Slovensku', 'Řeka nebo větší potok na Slovensku.'),
 'sk-vrch': ('geo', 'Hora nebo kopec na Slovensku', 'Pojmenovaný vrchol na Slovensku.'),
 'praha': ('geo', 'Část Prahy', 'Pražská čtvrť nebo katastrální území.'),
 'lazne': ('geo', 'Lázně v Česku nebo na Slovensku', 'Lázeňské místo nebo lázně.'),
 'vecernicek-serial': ('meme', 'Večerníček', 'Název seriálu, který běžel jako večerníček.'),
 'serial': ('meme', 'Český nebo slovenský seriál', 'Televizní seriál z Česka nebo Slovenska.'),
 'herec': ('meme', 'Český nebo slovenský herec či herečka', 'Celé jméno, nebo jen příjmení.'),
 'cimrman': ('meme', 'Hra Divadla Járy Cimrmana', 'Název hry ze Žižkovského divadla Járy Cimrmana.'),
 'hokejista': ('meme', 'Český nebo slovenský hokejista', 'Celé jméno, nebo jen příjmení.'),
 'rapper': ('meme', 'Český nebo slovenský rapper', 'Umělecké jméno nebo celé jméno.'),
 'skupina': ('meme', 'Česká nebo slovenská kapela', 'Hudební skupina z Česka nebo Slovenska.'),
}
SEEDS = {
 'herec': 'Libuše Šafránková|Šafránková; Anna Geislerová|Aňa Geislerová|Aňa; Tereza Voříšková|Voříšková; Jiřina Bohdalová|Bohdalová; Iva Janžurová|Janžurová; Dagmar Havlová|Havlová; Simona Stašová|Stašová; Tatiana Vilhelmová|Vilhelmová; Eva Holubová|Holubová; Veronika Freimanová|Freimanová; Zuzana Bydžovská|Bydžovská; Jana Plodková|Plodková; Hana Vagnerová|Vagnerová; Martha Issová; Eliška Balzerová|Balzerová; Jana Brejchová|Brejchová; Vlasta Chramostová|Chramostová; Nataša Gollová|Gollová; Adina Mandlová|Mandlová; Lída Baarová|Baarová; Hana Maciuchová|Maciuchová; Blanka Bohdanová|Bohdanová; Stella Zázvorková|Zázvorková; Marie Rosůlková|Rosůlková; Jiřina Jirásková|Jirásková; Dana Medřická|Medřická; Libuše Švormová|Švormová; Dana Morávková|Morávková; Petra Hřebíčková|Hřebíčková; Vica Kerekes|Kerekes; Zuzana Kronerová|Kronerová; Emília Vášáryová; Magda Vášáryová; Zuzana Fialová|Fialová; Diana Mórová|Mórová; Kristína Svarinská|Svarinská; Zuzana Norisová|Norisová; Petra Polnišová|Polnišová; Lenka Vlasáková|Vlasáková; Klára Issová; Ester Geislerová; Jitka Čvančarová|Čvančarová; Jana Švandová|Švandová; Jana Paulová|Paulová; Veronika Žilková|Žilková; Dana Batulková|Batulková; Ivana Chýlková|Chýlková; Petra Špalková|Špalková; Jana Krausová|Krausová; Vanda Hybnerová|Hybnerová; Alena Mihulová|Mihulová; Ilona Svobodová|Svobodová; Jitka Smutná|Smutná; Tereza Ramba|Ramba; Anna Kameníková|Kameníková; Eliška Křenková|Křenková; Denisa Barešová|Barešová; Tatiana Dyková|Dyková; Jenovéfa Boková|Boková; Jiřina Štěpničková|Štěpničková; Věra Galatíková|Galatíková; Marie Rottrová|Rottrová; Naďa Konvalinková|Konvalinková; Jaroslava Obermaierová|Obermaierová; Jana Hlaváčová|Hlaváčová; Daniela Kolářová|Kolářová; Taťjana Medvecká|Medvecká; Kateřina Brožová|Brožová; Dana Syslová|Syslová; Bára Poláková|Poláková',
 'rapper': 'Rytmus; Separ; Ben Cristovao|Cristovao; Majk Spirit|Spirit; Strapo; Ego; Kali; Gleb; Marpo; Vladimir 518|518; Řezník; Hugo Toxxx|Toxxx; Indy; Orion; Lipo; Smack; Sergei Barracuda|Barracuda; Nik Tendo|Tendo; Yzomandias; Viktor Sheen|Sheen; Calin; Hasan; Pil C|C; Robin Zoot|Zoot; Paulie Garand|Garand; Rest; Idea; Ektor; Dame; Annet X|X; Tafrob; Kato; Fobia Kid|Kid; Dalyb; Majself; Zayo; Rakby; Konex; Gamo; Kenny Rough|Rough; Haki; Sharlota; Renne Dang|Dang; Stein27; Protiva; Jickson; Hard Rico|Rico; Ca$hanova Bulhar|Cashanova Bulhar|Bulhar; Lvcas Dope|Dope; Nobodylisten; Raego; Dorian; Mikee Mike|Mike; Boy Wonder|Wonder; James Cole|Cole; DJ Wich|Wich; LA4; Jimmy Dickson|Dickson; Michajlov; Mladej; Bow Anderson|Anderson',
 'hokejista': 'Jaromír Jágr|Jágr; Dominik Hašek|Hašek; Patrik Eliáš|Eliáš; Milan Hejduk|Hejduk; Tomáš Plekanec|Plekanec; Roman Červenka|Červenka; David Pastrňák|Pastrňák; Jakub Voráček|Voráček; Martin Straka|Straka; Robert Reichel|Reichel; Vladimír Růžička|Růžička; Jiří Šlégr|Šlégr; Petr Nedvěd|Nedvěd; Ivan Hlinka|Hlinka; Jiří Holík|Holík; Václav Nedomanský|Nedomanský; Peter Šťastný; Marián Šťastný; Anton Šťastný; Zdeno Chára|Chára; Marián Gáborík|Gáborík; Žigmund Pálffy|Pálffy; Peter Bondra|Bondra; Miroslav Šatan|Šatan; Marián Hossa|Hossa; Pavol Demitra|Demitra; Ľubomír Višňovský|Višňovský; Tomáš Tatar|Tatar; Juraj Slafkovský|Slafkovský; Šimon Nemec|Nemec; Martin Nečas|Nečas; Dominik Kubalík|Kubalík; Ondřej Palát|Palát; Jakub Vrána|Vrána; Filip Hronek|Hronek; Radko Gudas|Gudas; Tomáš Hertl|Hertl; David Krejčí|Krejčí; Ondřej Kaše|Kaše; Lukáš Dostál|Dostál; Karel Vejmelka|Vejmelka; Ondřej Pavelec|Pavelec; Tomáš Vokoun|Vokoun; Roman Čechmánek|Čechmánek; Milan Michálek|Michálek; Petr Čajánek|Čajánek; Martin Ručinský|Ručinský; Robert Lang|Lang; Jiří Hudler|Hudler; Aleš Hemský|Hemský; Martin Havlát|Havlát; Petr Sýkora|Sýkora; Josef Beránek|Beránek; David Výborný|Výborný; Roman Hamrlík|Hamrlík; Radek Bonk|Bonk; Pavel Patera|Patera; Jiří Dopita|Dopita; Richard Šmehlík|Šmehlík; František Kučera|Kučera; Tomáš Kaberle|Kaberle; Jaroslav Špaček|Špaček; Pavel Kubina|Kubina; Marek Židlický|Židlický; Michal Rozsíval|Rozsíval; Bedřich Ščerban|Ščerban; Jiří Bubla|Bubla; Vladimír Martinec|Martinec; Milan Nový|Nový; Jiří Kochta|Kochta; Jan Suchý|Suchý; Jozef Golonka|Golonka; Vladimír Dzurilla|Dzurilla; Jiří Králík|Králík; Petr Klíma|Klíma; Michal Pivoňka|Pivoňka',
 'praha': 'Smíchov; Žižkov; Vinohrady|Královské Vinohrady; Karlín; Holešovice; Dejvice; Nusle; Vršovice; Libeň; Strašnice; Malá Strana; Staré Město; Nové Město; Josefov; Hradčany; Vyšehrad; Břevnov; Bubeneč; Letná; Střešovice; Podolí; Braník; Modřany; Chodov; Háje; Jižní Město; Stodůlky; Barrandov; Zbraslav; Radotín; Řepy; Ruzyně; Suchdol; Troja; Bohnice; Čimice; Kobylisy; Ďáblice; Letňany; Prosek; Vysočany; Hloubětín; Černý Most; Kyje; Hostivař; Záběhlice; Michle; Krč; Kunratice; Libuš; Písnice; Lhotka; Hodkovičky; Košíře; Motol; Jinonice; Hlubočepy; Zličín; Petrovice; Uhříněves; Běchovice; Horní Počernice; Satalice; Vinoř; Kbely; Čakovice; Dolní Chabry; Lysolaje; Liboc; Veleslavín; Vokovice; Pankrác; Spořilov; Roztyly; Butovice; Velká Chuchle; Malešice; Štěrboholy; Dubeč; Klánovice; Koloděje; Újezd nad Lesy; Kolovraty; Benice; Šeberov; Křeslice; Točná; Cholupice; Komořany; Slivenec; Lochkov; Řeporyje; Třebonice; Sobín; Přední Kopanina; Nebušice; Lahovice; Holyně; Zadní Kopanina; Radlice; Hanspaulka; Bertramka; Opatov; Lužiny; Nové Butovice; Petřiny; Ládví; Střížkov; Kamýk',
 'lazne': 'Karlovy Vary; Mariánské Lázně; Františkovy Lázně; Luhačovice; Teplice; Poděbrady; Piešťany; Jáchymov; Třeboň; Jeseník|Priessnitzovy lázně; Trenčianske Teplice; Rajecké Teplice; Bardejovské Kúpele|Bardejov; Lázně Bělohrad; Lázně Libverda; Lázně Kynžvart; Velké Losiny; Karlova Studánka; Darkov|Lázně Darkov; Klimkovice; Ostrožská Nová Ves; Hodonín|Lázně Hodonín; Teplice nad Bečvou; Velichovky; Janské Lázně; Konstantinovy Lázně; Bludov; Slatinice; Lázně Toušeň; Mšené-lázně; Bechyně; Dubí; Turčianske Teplice; Sliač; Dudince; Bojnice; Smrdáky; Lúčky; Brusno; Číž; Vyšné Ružbachy; Nimnica; Kováčová; Štós; Sklené Teplice; Korytnica; Patince; Bešeňová; Lázně Kundratice; Lipová-lázně; Skalka u Píšťan; Lázně Mšené; Lázně Bohdaneč; Kostelec u Zlína; Vráž; Lázně Letiny',
 'pohori': 'Krkonoše; Šumava; Jeseníky|Hrubý Jeseník; Beskydy|Moravskoslezské Beskydy; Vysoké Tatry|Tatry; Krušné hory; Jizerské hory; Orlické hory; Nízke Tatry|Nízké Tatry; Malá Fatra; Veľká Fatra|Velká Fatra; Brdy; Českomoravská vrchovina|Vysočina; Bílé Karpaty|Biele Karpaty; Javorníky; Chřiby; Malé Karpaty; Slovenský raj; Pieniny; Novohradské hory; Český les; Doupovské hory; Slavkovský les; Lužické hory; České středohoří; Žďárské vrchy; Železné hory; Hostýnské vrchy; Vizovická vrchovina; Pavlovské vrchy|Pálava; Rychlebské hory; Králický Sněžník; Broumovská vrchovina; Ještědský hřbet|Ještědsko-kozákovský hřbet; Blanský les; Drahanská vrchovina; Zábřežská vrchovina; Nízký Jeseník; Ralská pahorkatina; Křivoklátská vrchovina; Vsetínské vrchy; Západné Tatry|Západní Tatry|Roháče; Belianske Tatry|Belianské Tatry; Slovenské rudohorie; Štiavnické vrchy; Kremnické vrchy; Vihorlat|Vihorlatské vrchy; Bukovské vrchy|Poloniny; Strážovské vrchy; Považský Inovec; Tribeč; Vtáčnik; Poľana; Muránska planina; Slanské vrchy; Levočské vrchy; Branisko; Spišská Magura; Chočské vrchy; Kysucké Beskydy; Oravské Beskydy; Žiar; Cerová vrchovina; Krupinská planina; Pohronský Inovec; Volovské vrchy; Stolické vrchy; Revúcka vrchovina; Zemplínske vrchy; Kozie chrbty; Skorušinské vrchy; Oravská Magura; Starohorské vrchy; Krivánska Malá Fatra; Lúčanská Malá Fatra; Slovenský kras; Pilsko; Babia hora',
 'serial': 'Nemocnice na kraji města; Ordinace v růžové zahradě; Ulice; Most!; Pan Tau; Arabela; Žena za pultem; Chalupáři; Okres na severu; Návštěvníci; Bylo nás pět; Krkonošské pohádky; 30 případů majora Zemana|Major Zeman; Taxikář; Comeback; Vyprávěj; Policie Modrava; Přístav; Ohnivý kuře; Doktor z hor; Případy 1. oddělení; Okresní přebor; Svět pod hlavou; Kriminálka Anděl; Četnické humoresky; Hospoda; Nováci; Rodinná pouta; Velmi křehké vztahy; Prima rodinka; Pojišťovna štěstí; Sanitka; Synové a dcery Jakuba skláře; Arabela se vrací; Byl jednou jeden polda; Hříšní lidé města pražského; Malý pitaval z velkého města; Létající Čestmír; Zkáza Dejvického divadla; Pustina; Panelák; Susedia; Profesionáli; Horná Dolná; Chlapci a chlapi; Búrlivé víno; Ordinácia v ružovej záhrade; Oteckovia; Dunaj, k vašim službám; Vinaři; Sestřičky; Specialisté; Zoo; Slunečná; Kukačky; Polda; Modrý kód; Jak se budí princezny?; Dobrá čtvrť; Mise nový domov; Bylo nás pět; Dědictví; Cirkus Humberto; F. L. Věk; My všichni školou povinní; Sanitka 2; Most; Single Lady; Lajna; Kancelář Blaník; Semestr; Mordparta; Labyrint; Božena; Devadesátky; Iveta',
 'skupina': 'Kabát; Lucie; Chinaski; Kryštof; Elán; Tublatanka; Olympic; Mig 21; Divokej Bill; Mňága a Žďorp; Wanastowi Vjecy; Tři sestry; Arakain; Horkýže Slíže; No Name; Desmod; Team; Lunetic; Těžkej Pokondr; Pražský výběr; Žlutý pes; Nightwork; Monkey Business; Mandrage; Slza; Jelen; Buty; Čechomor; Hudba Praha; The Plastic People of the Universe|Plastic People; Visací zámek; Tleskač; Hentai Corporation; Rybičky 48; Vypsaná fiXa; Sto zvířat; Krausberry; Kamelot; Ready Kirken; Kandráčovci; Polemic; IMT Smile; Hex; Gladiator; Peha; Lojzo; Vidiek; Iné Kafe; Komajota; Kontrafakt; Para; Medial Banana; Le Payaco; Kryštof; Support Lesbiens; Mandrage; Pokáč; Kurtizány z 25. avenue; Ewa Farna; Traband; Jananas; Prago Union; Clou; Ohm Square; Botox; J.A.R.; Lucie Bílá',
 'vecernicek-serial': 'Krtek|Krteček|Jak krtek ke kalhotkám přišel; Pat a Mat|...a je to!|A je to; Maxipes Fík; Bob a Bobek|Bob a Bobek, králíci z klobouku; O loupežníku Rumcajsovi|Rumcajs; Mach a Šebestová; Pohádky z mechu a kapradí|Křemílek a Vochomůrka; Rákosníček|Rákosníček a hvězdy; Spejbl a Hurvínek; Ferda Mravenec; Krkonošské pohádky; Jája a Pája; Kocour Mikeš|Mikeš; Příhody včelích medvídků|Včelí medvídci; Broučci; Štaflík a Špagetka; O makové panence a motýlu Emanuelovi|Maková panenka; Bolek a Lolek; Pásli ovce Valaši; Káťa a Škubánek; Říkání o víle Amálce|Víla Amálka; Bubáci a hastrmani|Hastrmani; Pohádky o Ájovi|Ája; O Kanafáskovi|Kanafásek; Fantadroms; Méďové; Dášeňka|Dášeňka čili život štěněte; Matylda; Zahrada; Jen počkej, zajíci!|Jen počkej; Cipísek; Saturnin; Hurvínek a Mánička; Pohádky z Rumcajsova kraje; Chaloupka na vršku; Krysáci; Bob a Bobek na cestách; Pohádky z pařezové chaloupky|Pařezová chaloupka; Žofka; Malý Bobeš; Mikeš; Jak se Franta naučil bát|Franta; Tygr Tygřík; O Rumcajsovi; Kozlík Jůlinka; Strakatá pohádka; Jak šel Malý Muk; Ezop; Krtek a kalhotky; Princové jsou na draka; Poslední tajemství Pražského hradu',
 'cz-hrad': 'Karlštejn; Pražský hrad; Křivoklát; Bouzov; Kokořín; Trosky; Bezděz; Špilberk; Pernštejn; Kost; Točník; Žebrák; Rabí; Helfštýn; Šternberk; Zvíkov; Loket; Hukvaldy; Veveří; Hazmburk; Střekov; Švihov; Rožmberk; Landštejn; Kunětická hora; Buchlov; Sovinec; Vyšehrad; Orlík; Bítov; Cornštejn; Hrad Seeberg|Seeberg',
 'cz-zamek': 'Hluboká|Hluboká nad Vltavou|zámek Hluboká; Lednice; Konopiště; Český Krumlov; Průhonice; Kroměříž; Valtice; Častolovice; Sychrov; Hrádek u Nechanic; Litomyšl; Telč; Jindřichův Hradec; Opočno; Náchod; Ratibořice; Kynžvart|Lázně Kynžvart; Mikulov; Slavkov u Brna|Austerlitz; Vranov nad Dyjí; Lysice; Červená Lhota; Zbiroh; Dobříš; Troja|Trojský zámek; Mělník; Duchcov; Lány; Hrubý Rohozec; Frýdlant; Nové Hrady; Kratochvíle; Buchlovice; Raduň; Hradec nad Moravicí; Kačina; Ploskovice; Benátky nad Jizerou; Žleby',
 'cz-voda': 'Lipno|Vodní nádrž Lipno; Orlík|Vodní nádrž Orlík; Slapy|Vodní nádrž Slapy; Rožmberk|Rybník Rožmberk; Máchovo jezero|Máchák; Nové Mlýny|Vodní nádrž Nové Mlýny; Dalešice; Vranovská přehrada|Vranov; Švihov|Želivka|Vodní nádrž Švihov; Rozkoš; Jordán; Seč; Brněnská přehrada|Brněnka; Hracholusky; Nechranice; Těrlicko; Žermanice; Šance; Kružberk; Slezská Harta; Les Království; Skalka; Černé jezero; Čertovo jezero; Plešné jezero; Velký Tisý; Bezdrev; Svět; Opatovický rybník; Dvořiště; Horusický rybník; Staňkovský rybník; Hostivař|Hostivařská přehrada; Džbán; Šeberák; Medlánky; Mušov; Fláje; Kamýk; Hněvkovice; Římov; Pastviny; Seč; Vír; Bystřička; Harcov; Mšeno; Pilská nádrž',
}
PEOPLE = {'herec', 'hokejista', 'rapper', 'youtuber', 'interpret', 'politik'}
LIMIT = {'herec': 2500, 'hokejista': 2000, 'hora': 1500, 'sk-vrch': 1500, 'cz-voda': 1500, 'serial': 1200, 'interpret': 1500, 'skupina': 1200, 'politik': 600}
BAD = re.compile(r'(Síň slávy|Hradozámecká|[Kk]aple|[Kk]ostel|[Mm]uzeum|[Gg]alerie|[Pp]ivovar|[Zz]ahrada|[Ss]pr[aá]vce|[Ss]ou[čc]ást|^Seznam|^Zoznam|seznam|zoznam|^Dějiny|^Dejiny|^Historie|^Geografie|^Ochrana |^Povodí|Přírodní park|Chráněná krajinná|Národní park|\(rozcestník\)|\(rozlišovacia\)|filmová série|diskografie|^Okresy |^Části )', re.I)

def clean(cid, title):
    name = re.sub(r'\s*\([^)]*\)\s*$', '', title).strip()
    aliases = [name]
    if cid in ('cz-okres', 'sk-okres'):
        m = re.match(r'^Okres (.+)$', name)
        if m: aliases = [m.group(1), name]
        elif title.endswith('(okres)'): aliases = [name, 'Okres ' + name]
        else: return None
    if cid == 'praha':
        name = re.sub(r'^Praha-', '', name)
        aliases = [name, title]
    return aliases

def main():
    old = {}
    # stávající položky kvůli duplicitám
    import subprocess
    js = subprocess.run(['node', '-e', '''global.window={HLUBINA_CATEGORIES:[]};require("../data.js");require("../packs.js");
      console.log(JSON.stringify(window.HLUBINA_CATEGORIES.map(c=>({id:c.id,a:c.a}))))'''], capture_output=True, text=True).stdout
    countries = set()
    for c in json.loads(js):
        old[c['id']] = set(norm(p) for e in c['a'].split(';') for p in e.split('|'))
        if c['id'] in ('afrika', 'asie', 'jamerika', 'eu-mimo'): countries |= old[c['id']]
    countries |= {norm(x) for x in ['Dánsko', 'Německo', 'Rakousko', 'Polsko', 'Maďarsko', 'Francie', 'Itálie', 'Španělsko', 'Nizozemsko', 'Belgie', 'Švédsko', 'Finsko', 'Spojené státy americké', 'Kanada', 'Slovensko', 'Česko', 'Česká republika', 'Slovenská republika', 'Morava', 'Čechy', 'Slezsko', 'Evropská unie']}
    CITY_BAD = re.compile(r'(Síň slávy|Hradozámecká|[Kk]aple|[Kk]ostel|[Mm]uzeum|[Gg]alerie|[Pp]ivovar|[Zz]ahrada|[Ss]pr[aá]vce|[Ss]ou[čc]ást|kraj|Okres|okres|obec|Obec|Město|Mesto|město|mesto|Městys|Statutární|Vývoj|Územ|Seznam|Zoznam|Správní|Samospráv|NUTS|Kraj)')
    extend, create = {}, []
    for fn in sorted(os.listdir(OUT)):
        cid = fn[:-5]
        data = json.load(open(os.path.join(OUT, fn)))
        merged = {}
        for key, v in data.items():
            lang, title = key.split('|', 1)
            if BAD.search(title): continue
            if cid in ('mesto', 'sk-mesto') and (CITY_BAD.search(title) or norm(re.sub(r'\s*\(.*\)$', '', title)) in countries): continue
            al = clean(cid, title)
            if not al: continue
            k = norm(al[0])
            if len(k) < 2: continue
            if k in merged:
                merged[k]['v'] += v
                for a in al:
                    if a not in merged[k]['al']: merged[k]['al'].append(a)
            else:
                merged[k] = {'al': al, 'v': v}
        items = sorted(merged.values(), key=lambda x: -x['v'])[:LIMIT.get(cid, 3000)]
        if cid in ('praha', 'lazne'): items = []
        if cid == 'pohori':
            items = [it for it in items if re.search(r'(hory|vrchovina|pahorkatina|vrchy|hornatina|Tatry|Fatra|Beskyd|Karpaty|planina|hřbet|chrbt|rudohor|Inovec|Magura|les$|Les$|Krkonoše|Šumava|Jeseník|středohoří)', it['al'][0])]
        if cid in ('reka', 'sk-reka'):
            ok = lambda n: all(w[0].isupper() or w in ('nad', 'pod', 'u', 'potok', 'voda', 'Potok') or w.isdigit() for w in n.split()) and len(n.split()) <= 3
            items = [it for it in items if ok(it['al'][0])]
        if cid in PEOPLE:
            # příjmení jako alias, pokud je v kategorii jednoznačné
            sur = {}
            for it in items:
                parts = it['al'][0].split()
                if 2 <= len(parts) <= 3 and all(p[:1].isupper() for p in parts): sur.setdefault(norm(parts[-1]), []).append(it)
            for k, lst in sur.items():
                if len(lst) == 1 and len(k) >= 4: lst[0]['al'].append(lst[0]['al'][0].split()[-1])
        seen = set(old.get(cid, set()))
        rows = []
        if cid in SEEDS:
            seed = [[p.strip() for p in e.split('|')] for e in SEEDS[cid].split(';')]
            idx = {norm(a): it for it in items for a in it['al']}
            for al in seed:
                hit = next((idx[norm(a)] for a in al if norm(a) in idx), None)
                if hit:
                    al = al + [a for a in hit['al'] if a not in al]
                    hit['used'] = True
                al = [a for a in al if norm(a) not in seen]
                if not al: continue
                seen.update(norm(a) for a in al)
                rows.append('|'.join(al))
        for it in items:
            keys = [norm(a) for a in it['al']]
            if keys[0] in seen: continue
            al = [a for a in it['al'] if norm(a) not in seen]
            if not al: continue
            seen.update(norm(a) for a in al)
            rows.append('|'.join(a.replace(';', ',').replace('|', '/') for a in al))
        if cid in NEW:
            pack, q, hint = NEW[cid]
            create.append({'id': cid, 'pack': pack, 'q': q, 'hint': hint, 'a': '; '.join(rows)})
        else:
            extend[cid] = '; '.join(rows)
        print(cid, len(items), 'new rows', len(rows), file=sys.stderr)
    with open('../wiki-data.js', 'w') as f:
        f.write('// Doplněno automaticky z české a slovenské Wikipedie (kategorie a seznamy článků).\n')
        f.write('// Pořadí odpovědí odpovídá návštěvnosti článků za posledních 60 dní: čím známější, tím častější odpověď.\n')
        f.write('(() => {\nconst EXTEND = ' + json.dumps(extend, ensure_ascii=False, indent=0) + ';\n')
        f.write('const CREATE = ' + json.dumps(create, ensure_ascii=False, indent=0) + ';\n')
        f.write('''const cats = window.HLUBINA_CATEGORIES;
for (const [id, extra] of Object.entries(EXTEND)) {
  const c = cats.find(x => x.id === id);
  if (c && extra) c.a += '; ' + extra;
}
for (const c of CREATE) if (c.a) cats.push(c);
})();
''')
main()
