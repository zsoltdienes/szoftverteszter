updateUI();

var currentLocation = 0;
var collectedItems = [];
var music_intro = new Audio('01_opening.mp3');
var music_ingame = new Audio('02_ingame.mp3');
var music_loose = new Audio('03_you_loose.mp3');
var music_win = new Audio('04_you_win.mp3');

var language = window.language || "eng";
var soundEnabled = window.soundEnabled || false;


function updateUI(extraMessage = "") {
  var storyDiv = document.getElementById('story');
  var optionsDiv = document.getElementById('options');
  var image = document.getElementById('image');
  image.style.display = 'inline';

  var textEnglish = {
  welcome: "<strong>KALANDOR.BAT 3: Wacky Cosmos Warrior</strong></br>genre: science fiction space opera</br></br>text: Zsolt Dienes</br>code: Zsolt Dienes, chatGPT</br>gfx: Dall.E 3</br></br><a href=game.html>Return to game selection</a>",
    start: "PLAY THE GAME",
    scene01_chasing: "It’s been three days since you stole a flash drive in a spaceport bar on your employer’s orders, and you have no idea what’s on it, but it must be important—half the galaxy has been chasing you ever since. Your employer is dead, and you’re trying to save your life from an elite squad of bounty hunters—humans, reptilians, and androids—in a creaky little spaceship your grandmother gave you for your birthday. The distance between you and your pursuers is minimal, but the display shows your fuel running critically low, enough for at most half an hour. You must decide what to do.",
    scene02_escape: "Your garbage-can-shaped robot assistant on the passenger seat (sold to you as a sexbot at a market, only to discover later it’s just a translation machine) beeps to warn you that fuel will run out in minutes. Having no desire to suffocate or freeze in the dark of space, you panic and search the navigation panel for escape options, which shows a black hole only a few hundred kilometers away. With no other choice, you steer toward the black hole, and although the fuel runs out before the engines cut off, you’re already caught in its gravity well, causing your ship to keep drifting toward it until the hole swallows the vessel—and you along with it.",
    scene03_shell: "You’re in luck: a gas station floats in space a few light-seconds away, where you dock and quickly refuel your ship. However, the attendant (a toothless old man) informs you that a star war in a faraway galaxy has caused wartime inflation, and fuel prices have skyrocketed. Cursing, you realize you don’t have nearly enough credits to pay his price.",
    scene04_napping: "You can’t handle any more stress, so you shut off the engine and lights and go to sleep, falling asleep almost instantly from exhaustion. Fortunately, your pursuers mistake your ship for space debris and fly right past you.",
    scene05_no_legs: "The attendant finds that price too steep, so although he gladly accepts your offer, before chopping off your left leg at the knee with an axe, he gifts you an Easter Bunny costume. After the amputation, he grabs your leg and runs off to add it to his trophy leg collection. Satisfied, you hop back into your ship in your new costume - having secured fuel and a stylish outfit - yet you must deduct 2 points from your Agility score, since you’ll have only one leg for the rest of the game.",
    scene06_attack: "You throw a swift punch, shattering the attendant’s nose into fragments. Taking advantage of his temporary incapacitation, you step on the gas (or rather gasoline - haha) and speed away.",
    scene07_benzin: "\"What a lucky day this is!\" you exclaim behind your garbage-can-shaped robot assistant - the one marketed as a sexbot but revealed to be a mere translation device. \"We got a free refill, and I don’t see our pursuers anywhere!\" you cheer, thinking with this much fuel you could reach a southern galaxy without extradition treaties. But although you turn your ship south, it keeps heading north. Initially suspecting a navigation glitch, you inspect the panel and realize your ship has been captured by a nearby black hole’s gravity well! You floor the throttle in vain: your vessel - and you - are drawn inexorably toward the black hole.",
    scene08_panic_in_the_dark: "The moment the black hole engulfs the ship, the external force propelling it ceases and it becomes uncontrollable. You must act, or the crash will be inevitable.",
    scene09_useful_things: "While rummaging, you find an empty gas can among the space rations—an item you had completely forgotten about. You quickly descend on a rope to the ship’s fuel tank and pour in the gas, causing it to stabilize its altitude and speed. That was a hot situation, but you reacted with an ice-cold head. You’re one hell of an adventurer!",
    scene11_colon: "You’ve had your headlights on since space is dark, and now you look around to find yourself in a massive cave. The walls are dark rose and smooth, but what shocks you are the shapeless, many-legged creatures crawling all over - beings you can’t tell if they’re friendly or hostile. The navigation system shows only the location name \"Colon\", which tells you little.",
    scene12_diszkusszio: "You safely land your ship, but as you step outside, a foul odor like feces assaults your nostrils. Grimacing, you address one of the creatures, who surprisingly responds intelligibly and reveals he is a Clostridium bacterium, though he can’t offer much useful information having spent his entire life here. He explains his role is to break down fibers, but that aggressive, predatory kin lurk nearby, so you’d better leave. Before you go, however, he gifts you a fishing rod. \"Perhaps you’ll find it useful!\" the odd, kind creature adds, and you bid each other farewell.",
    scene13_gaster: "After a short journey the cave changes (the navigation panel name becomes \"Gaster\"), its color shifting to a reddish Bordeaux and a slimy coating covering the once-smooth surface. You detect no signs of life, possibly due to the greenish-yellow bubbling liquid pooling on the floor - obviously not water. But as you scan the scene, you spot an object floating on the surface. You can’t identify it exactly since most of the roughly human-head–sized object remains submerged.",
    scene15_megafon: "Suddenly you remember the fishing rod gifted by the bacterium and decide to snag the shiny object from the strange liquid. You stop your ship so it hovers, then extend the hook attached to the fishing line out the door. After a brief struggle you manage to pull up the sticky object - it\'s a loudspeaker, aka a megaphone! You wipe the yellow-green goo off by hand, burning your fingers instantly, but you resolve not to let anything ruin your mood.",
    scene16_pharynx: "Soon the passage changes again to a lighter pink (the panel name becomes \"Pharynx\"). More intriguingly, since the black hole swallowed you, the tunnel branches for the first time, and you must decide whether to navigate into the lower, larger, darker cavern or choose the upper, smaller, brighter continuation.",
    scene18_orr: "You can\’t recall the last time you saw natural daylight, but now it signals the two exits from the cave. The adjacent large openings and the dense bacteria-laden hairs remind you of something. Asking the robot to translate the navigation text (\"Cavum Nasi\") confirms you’re inside a giant creature’s nostril! Horrified, you realize what the black hole was, but there’s no time to dwell - you must quickly choose which nostril to exit.",
    scene19_takony: "You steer your ship into the left nostril, where a massive green snot glob blocks most of the exit. Test your luck! If you feel unlucky, you’ll crash into the snot, get stuck, and suffocate in the filth. But if you’re lucky, you’ll perform the maneuver successfully and avoid the deadly trap!",
    scene20_freedom: "After exiting the nostril, you slow your ship to survey your surroundings. You’re in a room that looks completely ordinary (TV, PlayStation, Lego figures) - except EVERYTHING is HUGE. The nostril belongs to a large, slightly overweight, gray-bearded man sprawled on his couch, staring tiredly at some crappy Asian Netflix show while clutching a beer can. Decide what to do!",
    scene21_the_room: "You carefully pilot your ship around the room but find no exit: all windows and doors are closed, and judging by the smell of beer and farts, the occupant rarely ventilates. After half an hour of futile flying, you change course toward the figure on the couch.",
    scene23_landing_on_god_b: "You land on the old coot’s stomach, then exit your craft. You switch on the recently acquired megaphone and hail him loudly - and thanks to the loudspeaker, he hears you. The old man declares he is God, creator of the universe, and your eyes light up: if anyone can help you, it’s him - assuming he wants to… Did you get a bunny costume during your adventure?",
    scene25_nyul: "Thanks to your costume, God believes you’re the Easter Bunny - and everyone knows God doesn’t mess with the Easter Bunny. Seizing the opportunity, you may ask God for one (and only one) thing… but what will it be?",
    
    scene01_opt1: "You continue moving forward, hoping to shake off your pursuers.",  
    scene01_opt2: "You urgently search for a gas station.",  
    scene01_opt3: "You stop your spaceship and decide to go to sleep instead.",  
    scene02_opt1: "And then darkness consumes you...",  
    scene03_opt1: "In exchange for fuel, you offer one of your legs.",  
    scene03_opt2: "You attack the gas station attendant!",  
    scene04_opt1: "You keep moving forward, come what may.",  
    scene04_opt2: "You search for a gas station.",  
    scene05_opt1: "You take off in your spaceship.",  
    scene06_opt1: "You take off in your spaceship.",  
    scene07_opt1: "And then darkness consumes you...",  
    scene08_opt1: "You look around the storage area behind the cockpit, hoping to find something useful.",  
    scene08_opt2: "You grab a parachute and throw yourself out of the spaceship.",  
    scene09_opt1: "You take a closer look at where you have landed.",  
    scene11_opt1: "You land and strike up a conversation with the \"residents\" of the area.",  
    scene11_opt2: "You don’t take any risks and continue down the passage.",  
    scene12_opt1: "You return to your spaceship.",  
    scene13_opt1: "You land with your spaceship and retrieve the object.",  
    scene13_opt2: "You use the fishing rod you received from the bacterium.",  
    scene13_opt3: "You ignore the object and move on instead.",  
    scene15_opt1: "You set off cheerfully with your new acquisition in your possession.",  
    scene16_opt1: "You choose the lower, darker tunnel.",  
    scene16_opt2: "You choose the upper, lighter tunnel.",  
    scene18_opt1: "You fly out through the left nostril.",  
    scene18_opt2: "You fly out through the right nostril.",  
    scene19_opt1: "If you survived, push this button.",  
    scene20_opt1: "You try to escape the house.",  
    scene20_opt2: "You perform a landing on the guy’s stomach.",  
    scene20_opt3: "You perform a landing on the guy’s stomach.",  
    scene21_opt1: "You land on the bearded guy’s stomach.",  
    scene21_opt2: "You land on the bearded guy’s stomach.",  
    scene23_opt1: "No.",  
    scene23_opt2: "Yes.",  
    scene25_opt1: "\"Please help me get home!\"",  
    scene25_opt2: "\"Die!\""     
  };

  var textHungarian = {
    welcome: "<strong>KALANDOR.BAT 3: Kelekótya Kozmoszharcos</strong></br>műfaj: tudományos-fantasztikus űropera</br></br>szöveg: Dienes Zsolt</br>kód: Dienes Zsolt, chatGPT</br>grafika: Dall.E 3</br></br><a href=game.html>Vissza a játékválasztóhoz</a>",
    start: "JÁTÉK ELKEZDÉSE",
    scene01_chasing: "Három napja annak, hogy egy űrkikötő kocsmájában a megbízód utasítására elloptál egy pendrájvot, melynek tartalmáról fogalmad sincs, de fontos lehet, hiszen azóta a fél galaxis téged üldöz. A megbízód azóta halott, te pedig emberekből, reptiliánokból és androidokból álló elit fejvadász csapattal a nyomodban próbálod menteni az életedet egy rozoga kis űrhajón, amit még a nagymamádtól kaptál születésnapodra. A távolság közted és az üldözőid között minimális, viszont a kijelző szerint vészesen fogy a benzined, a tartályban legfeljebb fél órára elegendő az üzemanyag. Döntened kell, mit teszel.",
    scene02_escape: "Az anyósülésen ülő, kuka alakú robot segéded (amit szexrobotként adtak el neked egy piacon, de később kiderült, hogy szimpla tolmácsgép) pittyegéssel jelzi, hogy perceken belül teljesen elfogy az üzemanyag. Mivel semmi kedved sem megfulladni, sem jéggé fagyni a sötét űrben, pánikolva próbálsz menekülési lehetőséget keresni a navigációs panelen, amely szerint egy fekete lyuk van tőled csupán párszáz kilométerre. Mivel más választásod nincs, a fekete lyuk felé navigálod a hajódat, és bár a benzin nem tart ki addig, mire az úrhajód leáll, már bekerülsz a különös anomália vonzásterébe, így a járműd tovább kúszik a lyuk felé, ami hamarosan magába szippantja az űrhajót, veled együtt.",
    scene03_shell: "Szerencséd van, pár csillagsarokra tőled lebeg az űrben egy benzinkút, ahol leparkolsz és gyorsan feltankolod az űrhajódat. A benzinkutas (egy fogatlan, idős bácsi) azonban közli, hogy egy messzi-messzi galaxisban dúló csillagháború miatt háborús infláció van, és jelentősen megugrottak a benzinárak. Szitkozódva állapítod meg, hogy nincs nálad annyi pénz, amennyit a benzinkutas kér tőled.",
    scene04_napping: "Nem bírod ezt a sok stresszt, ezért inkább lekapcsolod a motort valamint a világítást, és nyugovóra térsz, az elmúlt napok izgalmainak hatására pedig szinte azonnal elalszol. Szerencsére az üldözőid űrhulladéknak nézik az űrhajódat és téged kikerülve tovább haladnak..",
    scene05_no_legs: "A benzinkutas ezt túl nagy árnak érzi, ezért bár örömmel rábólint az ajánlatodra, mielőtt egy baltával térdből lecsapja a bal lábadat, megajándékoz egy húsvéti nyúl jelmezzel. Az amputációt követően a férfi felkapja a lábadat, majd vidáman elrohan, hogy új szerzeményével kibővítse a vitrinjében tárolt láb-gyűjteményét. Elégedetten ugrálsz vissza vadiúj jelmezedben az  űrhajódba, hiszen nem csak benzint szereztél, de ez a jelmez is oltári menő - viszont 2 pontot vonj le az Ügyesség pontjaidból, mivel a játék hátralévő részében már csak egy lábad lesz.",
    scene06_attack: "Egy gyors mozdulattal meglendíted az öklödet, szilánkosra törve a benzinkutas fickó orrát. Kihasználod, hogy az öreg egy időre mozgás- és harcképtelenné vált, és olajra (pontosabban benzinre, hahaha) lépsz.",
    scene07_benzin: "\“Milyen szerencsés nap ez!\” - vágod hátba az anyósülésen ülő, kuka formájú robot segédedet, amit szexrobotként adtak el neked egy piacon, később azonban kiderült, hogy egy szimpla tolmácsgép. “Sikerült ingyen tankolni, ráadásul az üldözőinket se látom sehol!” - ujjongsz tovább, hiszen ennyi üzemanyaggal már a déli galaxisok egyikébe is eljutsz, ahol nincs kiadatási egyezmény.  Csakhogy hiába irányítod dél felé az űrhajód orrát, a gép továbbra is észak felé halad. Először valamilyen navigációs meghibásodásra gyanakszol, ám alaposabban megnézve a navigációs panelen rájössz, hogy az űrhajód belesodródott egy közeli fekete lyuk vonzáskörzetébe! Próbálsz teljes gázra kapcsolni, hasztalanul: járműved - veled együtt - megállíthatatlanul kúszik tovább a fekete lyuk felé.",
    scene08_panic_in_the_dark: "Abban a pillanatban, ahogy a fekete lyuk magába szippantja a hajót, a járművelt mozgató külső erő megszűnik, és az irányíthatatlanná válik. Valamit tenned kell, különben a becsapódás elkerülhetetlen lesz.",
    scene09_useful_things: "Keresgélés közben találsz egy üres benzineskannát a babkonzervek között, amelynek a létezéséről már teljesen megfeledkeztél. Gyorsan leereszkedsz egy kötélen az űrhajó benzintartályához, és beleöntöd az üzemanyagot, mire a hajó ismét beáll stabil magasságba és sebességbe. Ez meleg helyzet volt, te azonban jéghideg fejjel reagáltál rá. Átkozottul jó kalandor vagy!",
    scene11_colon: "A fényszóród eddig is fel volt kapcsolva, hiszen a világűrben is elég sötét van, és most, ahogy szétnézel, döbbenten tapasztalod, hogy egy hatalmas barlangban vagy. A barlang fala sötét rózsaszínű, felülete sima, de ami igazán megdöbbent, hogy mindenféle alaktalan, sok lábú szörnyeteg mászkál rajta, melyekről nem tudod eldönteni, hogy barátságosak, vagy ellenségesek volnának. A navigációs rendszer semmi egyebet nem jelez, csupán a hely nevét - \"Colon\" - ez viszont nem sokat mond neked.",
    scene12_diszkusszio: "Biztonságban leteszed az űrhajódat, ám amikor kilépsz, hirtelen kellemetlen, fekáliához hasonló szag csapja meg az orrodat. Fintorogva szólítod meg az egyik lényt, aki a legnagyobb megdöbbenésedre értelmesen válaszol, és közli, hogy ő egy clostridium baktérium, de túl sok hasznos információval nem tud szolgálni, mivel az egész életét itt töltötte. Elmeséli, hogy az ő feladata a rostok lebontása, de vannak agresszív, támadó rokonai is, ráadásul épp a közelben ólálkodnak, úgyhogy jobban teszed, ha elhúzod a csíkot. Távozásod előtt azonban még megajándékoz egy horgászbottal. \"Talán még hasznát veszed!\" - teszi hozzá a kedves, fura lény, majd búcsút intetek egymásnak.",
    scene13_gaster: "Rövid utazást követően a barlang némileg megváltozik (ahogy a navigációs panelen lévő név is: \"Gaster\"), a színe vöröses bordóra vált, illetve a korábban sima felületet valamilyen nyálka fedi be. Életjeleket sem tapasztalsz már, aminek köze lehet ahhoz a zöldes-sárgás, bugyogó folyadéknak, ami a barlang alján tóként terül el (de jól láthatóan nem víz az). Ám ahogy a tájat fürkészed, észreveszel egy tárgyat a gyanús folyadék felszínén úszkálni. Pontosan nem tudod megállapítani, mi az, mivel a körülbelül emberfej nagyságú tárgy nagy része a felszín alatt van.",
    scene15_megafon: "Hirtelen eszedbe jut, hogy a baktériumtól kapott horgászbottal megpróbálhatnád valhogy kihalászni a fényes tárgyat a furcsa folyadékból. Hajódat megállítod hát, s míg az egy helyben lebeg, kiveted az ajtón a horgászzsinór végére erősített kampót. Rövid bénázást követően sikerül kihalásznod és felhúznod a trutyiba ragadt tárgyat, ami egy hangosbeszélő, más néven megafon! Kézzel törölgeted le róla a sárgászöld folyadékot, ami szinte azonnal lemarja két ujjadat, de te elhatározod, hogy semminek nem engeded meg, hogy elrontsa a jókedvedet.",
    scene16_pharynx: "Hamarosan a járat újra megváltozik, méghozzá világosabb rózsaszínre (a navigációs panelen lévő név \"Pharynx\"-re vált). Ennél azonban sokkal érdekesebb, hogy mióta a fekete lyuk beszippantott, először ágazik el a járat, és hamarosan döntened kell, hogy a lenti, nagyobb, és láthatóan sötétebb barlangba navigálod az űrhajót, vagy a felette lévő, kisebb, valamint világosabb folytatását választod a barlangnak.",
    scene18_orr: "Már nem is tudod mióta nem láttál természetes, nappali fényt, most azonban pontosan az jelzi számodra a barlangból kivezető két kiutat. A két, egymás mellett elhelyezkedő jókora lyuk, valamint a hatalmas, baktériumok által gazdagon lakott szőrszálak valamire nagyon is emlékeztetnek téged. Miután megkéred a tolmácsrobotot, hogy fordítsa le a navigációs panelen olvasható szöveget (\"Cavum Nasi\"), sejtésed beigazolódik: egy hatalmas lény orrában vagy! Elborzadva realizálod, hogy mi is az a fekete lyuk, amin nemrég berepültél, de nincs időd ezen szörnyülködni, ugyanis gyorsan el kell döntened, melyik orrlyukon távozol.",
    scene19_takony: "A bal orrlyukba navigálod az űrhajód, ahol egy hatalmas, zöld színű takonygolyó zárja el a kijárat jelentős részét. Tedd próbára a szerencsédet! Ha úgy érzed, hogy nincs szerencséd, akkor egyenesen belekormányozod a hajódat a takonyba, amelybe bele is ragadsz és rövidesen belefulladsz a fikába. Azonban ha szerencséd van, sikeres manővert hajtasz végre, és kikerülöd a halálos csapdát!",
    scene20_freedom: "Miután kirepültél az orrlyukon, lelassítod az űrhajódat, hogy alaposan szemügyre vedd a helyzetedet. Egy szobában vagy, amely egy teljesen átlagos szobára hasonlít (tévével, Playstation játékkonzollal, lego figurákkal), leszámítva azt, hogy itt minden HATALMAS. Az orr, amelyből távoztál, egy nagydarab, enyhén túlsúlyos, ősz szakállú fickóhoz tartozik, aki a foteljében ücsörögve, láthatóan kissé bágyadt tekintettel bámul valamilyen szar ázsiai Netflixes sorozatot, a kezében pedig egy sörösdobozt szorongat. Döntsd el, mihez kezdesz!",
    scene21_the_room: "Óvatosan körberepülöd a szobát, de sehol nem találsz kijáratot: az összes ablak és ajtó zárva van, a helyiségben terjengő sör- és fingszagból ítélve pedig nem nagyon szokott szellőztetni a szoba lakója. Fél órányi hasztalan röpködés után meggondolod magad, és a fotelben döglő alak irányába kormányzod a hajód orrát.",
    scene23_landing_on_god_b: "Leszállsz az öreg muksó hasán, majd kiszállsz a járműből. Bekapcsolod a nemrég talált megafont és hangosan köszöntöd a férfit, aki - hála a hangosbemondónak - meghallja üdvözlésedet. Az öreg közli veled, hogy ő Isten, a világmindenség teremtője, mire felcsillan a szemed, hiszen ha valaki, akkor ez az alak fog tudni segíteni neked. Feltéve persze, hogy akar... Kalandozásod során hozzájutottál egy nyúl jelmezhez?",
    scene25_nyul: "A jelmezednek köszönhetően Isten azt hiszi, hogy te vagy a húsvéti nyúl, márpedig köztudott, hogy Isten nem szívesen húzna ujjat a húsvéti nyúllal. Kihasználva a szerencsés helyzetedet, egy (de csakis egy) dolgot kérhetsz az Istentől... de vajon mi volna az?",

    scene01_opt1: "Tovább haladsz, abban reménykedve, hogy lerázod üldözőidet.",
    scene01_opt2: "Sürgősen keresel egy benzinkutat.",
    scene01_opt3: "Leállítod az űrhajódat és elmész inkább aludni.",
    scene02_opt1: "És ekkor elnyel a sötétség... ",
    scene03_opt1: "A benzinért cserébe felajánlod az egyik lábadat.",
    scene03_opt2: "Megtámadod a benzinkutast!",
    scene04_opt1: "Tovább haladsz, lesz ami lesz.",
    scene04_opt2: "Keresel egy benzinkutat.",
    scene05_opt1: "Felszállsz az űrhajóddal.",
    scene06_opt1: "Felszállsz az űrhajóddal.",
    scene07_opt1: "És ekkor elnyel a sötétség...",
    scene08_opt1: "Szétnézel a pilótafülke mögötti raktárban, hátha találsz valami hasznos holmit.",
    scene08_opt2: "Felkapsz egy ejtőernyőt és kiveted magad az űrhajóból.",
    scene09_opt1: "Szétnézel alaposabban, hová kerültél.",
    scene11_opt1: "Leszállsz és beszédbe elegyedsz a vidék \"lakóival.\"",
    scene11_opt2: "Nem kockáztatsz, és inkább tovább haladsz a járatban.",
    scene12_opt1: "Visszatérsz az űrhajódra.",
    scene13_opt1: "Leszállsz az űrhajóddal, és megszerzed a tárgyat.",
    scene13_opt2: "Használod a baktériumtól kapott horgászbotot.",
    scene13_opt3: "Nem foglalkozol a tárggyal, inkább tovább haladsz.",
    scene15_opt1: "Vidáman indulsz tovább új szerzeményeddel a birtokodban.",
    scene16_opt1: "A lenti, sötétebb alagutat választod.",
    scene16_opt2: "A fenti, világosabb alagutat választod.",
    scene18_opt1: "A bal orrlyukon keresztül repülsz ki.",
    scene18_opt2: "A jobb orrlyukon keresztül repülsz ki.",
    scene19_opt1: "Ha túlélted, nyomd meg ezt a gombot.",
    scene20_opt1: "Megpróbálsz elmenekülni a házból.",
    scene20_opt2: "Landolást hajtasz végre a fickó hasán.",
    scene20_opt3: "Landolást hajtasz végre a fickó hasán.",
    scene21_opt1: "Landolsz a szakállas fickó hasán.",
    scene21_opt2: "Landolsz a szakállas fickó hasán.",
    scene23_opt1: "Nem.",
    scene23_opt2: "Igen.",
    scene25_opt1: "\"Kérlek, segíts hazajutni!\"",
    scene25_opt2: "\"Fordulj fel!\"" 
  };

  var text = (language === "eng") ? textEnglish : textHungarian;

  switch (currentLocation) {
    case 0:
      if (soundEnabled) {
        music_intro.play();
      }
      storyDiv.innerHTML = "<p>" + text.welcome + "</p>";
      optionsDiv.innerHTML = "<button onclick='goToLocation(1)'>" + text.start + "</button>";
      image.src = "start3.jpg";
      break;

    case 1:
      if (soundEnabled) {  
        music_intro.pause();
        music_ingame.play();
      }
      storyDiv.innerHTML = "<p>" + text.scene01_chasing + "</p>";
      optionsDiv.innerHTML = "<button onclick='goToLocation(2)'>" + text.scene01_opt1 + "</button>" +
                              "<button onclick='goToLocation(3)'>" + text.scene01_opt2 + "</button>" +
                              "<button onclick='goToLocation(4)'>" + text.scene01_opt3 + "</button>";
      image.src = "scene01_chasing.jpg";
      break;

    case 2:
      storyDiv.innerHTML = "<p>" + text.scene02_escape + "</p>";
      optionsDiv.innerHTML = "<button onclick='goToLocation(8)'>" + text.scene02_opt1 + "</button>";
      image.src = "scene02_escape.jpg";
      break;

    case 3:
      storyDiv.innerHTML = "<p>" + text.scene03_shell + "</p>";
      optionsDiv.innerHTML = "<button onclick='goToLocation(5)'>" + text.scene03_opt1 + "</button>" +
                              "<button onclick='goToLocation(6)'>" + text.scene03_opt2 + "</button>";
      image.src = "scene03_shell.jpg";
      break;

    case 4:
      storyDiv.innerHTML = "<p>" + text.scene04_napping + "</p>";
      optionsDiv.innerHTML = "<button onclick='goToLocation(2)'>" + text.scene04_opt1 + "</button>" +
                              "<button onclick='goToLocation(3)'>" + text.scene04_opt2 + "</button>";
      image.src = "scene04_napping.jpg";
      break;

    case 5:
      storyDiv.innerHTML = "<p>" + text.scene05_no_legs + "</p>";
      optionsDiv.innerHTML = "<button onclick='goToLocation(7)'>" + text.scene05_opt1 + "</button>";
      image.src = "scene05_no_legs.jpg";
      break;

    case 6:
      storyDiv.innerHTML = "<p>" + text.scene06_attack + "</p>";
      optionsDiv.innerHTML = "<button onclick='goToLocation(7)'>" + text.scene06_opt1 + "</button>";
      image.src = "scene06_attack.jpg";
      break;

    case 7:
      storyDiv.innerHTML = "<p>" + text.scene07_benzin + "</p>";
      optionsDiv.innerHTML = "<button onclick='goToLocation(11)'>" + text.scene07_opt1 + "</button>";
      image.src = "scene07_benzin.jpg";
      break;

      case 8:
        storyDiv.innerHTML = "<p>" + text.scene08_panic_in_the_dark + "</p>";
        optionsDiv.innerHTML = "<button onclick='goToLocation(9)'>" + text.scene08_opt1 + "</button>" +
                                "<button onclick='endGame(\"scene10_ejtoernyo\")'>" + text.scene08_opt2 + "</button>";
        image.src = "scene08_panic_in_the_dark.jpg";
        break;

    case 9:
      storyDiv.innerHTML = "<p>" + text.scene09_useful_things + "</p>";
      optionsDiv.innerHTML = "<button onclick='goToLocation(11)'>" + text.scene09_opt1 + "</button>";
      image.src = "scene09_useful_things.jpg";
      break;

    case 11:
      storyDiv.innerHTML = "<p>" + text.scene11_colon + "</p>";
      optionsDiv.innerHTML = "<button onclick='goToLocation(12)'>" + text.scene11_opt1 + "</button>" +
                              "<button onclick='goToLocation(13)'>" + text.scene11_opt2 + "</button>";
      image.src = "scene11_colon.jpg";
      break;

    case 12:
      storyDiv.innerHTML = "<p>" + text.scene12_diszkusszio + "</p>";
      optionsDiv.innerHTML = "<button onclick='goToLocation(13)'>" + text.scene12_opt1 + "</button>";
      image.src = "scene12_diszkusszio.jpg";
      break;

    case 13:
      storyDiv.innerHTML = "<p>" + text.scene13_gaster + "</p>";

      optionsDiv.innerHTML = '';

      if (collectedItems.includes("horgaszbot")) {
        optionsDiv.innerHTML += "<button onclick='goToLocation(15)'>" + text.scene13_opt2 + "</button>";
      }

      optionsDiv.innerHTML += "<button onclick='endGame(\"scene14_acid_death\")'>" + text.scene13_opt1 + "</button>" +
        "<button onclick='goToLocation(16)'>" + text.scene13_opt3 + "</button>";
      image.src = "scene13_gaster.jpg";
      break;

    case 15:
      storyDiv.innerHTML = "<p>" + text.scene15_megafon + "</p>";
      optionsDiv.innerHTML = "<button onclick='goToLocation(16)'>" + text.scene15_opt1 + "</button>";
      image.src = "scene15_megafon.jpg";
      break;

    case 16:
      optionsDiv.innerHTML = '';
      storyDiv.innerHTML = "<p>" + text.scene16_pharynx + "</p>";
      optionsDiv.innerHTML = "<button onclick='endGame(\"scene17_szaj\")'>" + text.scene16_opt1 + "</button>" +
        "<button onclick='goToLocation(18)'>" + text.scene16_opt2 + "</button>";
      image.src = "scene16_pharynx.jpg";
      break;

    case 18:
      storyDiv.innerHTML = "<p>" + text.scene18_orr + "</p>";
      optionsDiv.innerHTML = "<button onclick='goToLocation(19)'>" + text.scene18_opt1 + "</button>" +
        "<button onclick='goToLocation(20)'>" + text.scene18_opt2 + "</button>";
      image.src = "scene18_orr.jpg";
      break;

    case 19:
      storyDiv.innerHTML = "<p>" + text.scene19_takony + "</p>";
      optionsDiv.innerHTML = "<button onclick='goToLocation(20)'>" + text.scene19_opt1 + "</button>";
      image.src = "scene19_takony.jpg";
      break;

    case 20:
      storyDiv.innerHTML = "<p>" + text.scene20_freedom + "</p>";

     optionsDiv.innerHTML = "<button onclick='goToLocation(21)'>" + text.scene20_opt1 + "</button>";

      if (!collectedItems.includes("megafon")) {
        optionsDiv.innerHTML += "<button onclick='endGame(\"scene22_landing_on_god_a\")'>" + text.scene20_opt2 + "</button>";
      }
      if (collectedItems.includes("megafon")) {
        optionsDiv.innerHTML += "<button onclick='goToLocation(23)'>" + text.scene20_opt3 + "</button>";
      }

      image.src = "scene20_freedom.jpg";
      break;

    case 21:
      storyDiv.innerHTML = "<p>" + text.scene21_the_room + "</p>";

      optionsDiv.innerHTML = '';

      if (!collectedItems.includes("megafon")) {
        optionsDiv.innerHTML += "<button onclick='endGame(\"scene22_landing_on_god_a\")'>" + text.scene21_opt1 + "</button>";
      }
      if (collectedItems.includes("megafon")) {
        optionsDiv.innerHTML += "<button onclick='goToLocation(23)'>" + text.scene21_opt2 + "</button>";
      }

      image.src = "scene21_the_room.jpg";
      break;

    case 23:
      storyDiv.innerHTML = "<p>" + text.scene23_landing_on_god_b + "</p>";

      optionsDiv.innerHTML = '';

      if (!collectedItems.includes("nyul_jelmez")) {
        optionsDiv.innerHTML += "<button onclick='endGame(\"scene24_no_nyul\")'>" + text.scene23_opt1 + "</button>";
      }
      if (collectedItems.includes("nyul_jelmez")) {
        optionsDiv.innerHTML += "<button onclick='goToLocation(25)'>" + text.scene23_opt2 + "</button>";
      }

      image.src = "scene23_landing_on_god_b.jpg";
      break;

    case 25:
      storyDiv.innerHTML = "<p>" + text.scene25_nyul + "</p>";
      optionsDiv.innerHTML = "<button onclick='endGame(\"victory1\")'>" + text.scene25_opt1 + "</button>" +
                              "<button onclick='endGame(\"victory2\")'>" + text.scene25_opt2 + "</button>";
      image.src = "scene25_nyul.jpg";
      break;


    default:
      break;
  }


}

function scrollToTop() {
  window.scrollTo({
  top: 100,
  //behavior: 'smooth' // Animált görgetés, ha a böngésző támogatja
  });
  window.scroll(0, 100);
}


function goToLocation(location) {
  currentLocation = location;

  if (location === 5) {
    collectedItems.push('nyul_jelmez');
  }
  else if (location === 12) {
    collectedItems.push('horgaszbot');
  } 
  else if (location === 15) {
    collectedItems.push('megafon');
  }

  updateUI();
  scrollToTop ();
}

function endGame(result) {
  var storyDiv = document.getElementById('story');
  var optionsDiv = document.getElementById('options');

  var textEnglish = {
    win1: "\"Nothing could be more natural,\" says God, who gently grabs you and places you in his anus, sending you back to your own world through the butt portal. Unfortunately, your ship is left behind, so you must hitchhike home, but luckily a ship called Nostromo happens by, with seven very kind passengers (and a giant Easter egg) on board who won’t let you wander space. But what was on the pendrive that made you run... well, that's another story.</br><strong>Congratulations, you’ve completed the game with the positive ending. Long live the Wacky Cosmos Warrior! Hip-hip-hooray!!!</strong> <br/><br/><a href=index.html>Start again from the beginning.</a>",
    win2: "At the sound of your unexpected request, God drops his beer, clutches his heart, and collapses onto the shitty IKEA carpet. In that moment, the entire world - including every galaxy and every parallel (or perpendicular) universe - goes dark, the oceans turn to rivers of blood, and swarms of locusts fill the air (your pendrive - the one that forced you to flee - is devoured by one of these locusts as well). \"Gott ist tot! Gott bleibt tot! Und wir haben ihn getötet!\" you scream madly as all life perishes.</br><strong>Congratulations, you’ve completed the game with the negative ending! Long live the Wacky Cosmos Warrior! Hip-hip-hooray!!!</strong> <br/><br/><a href=index.html>Start again from the beginning.</a>",
    scene10_ejtoernyo: "With a heroic gesture you hurl yourself out of the falling ship, but in an unfortunate twist, the parachute cord wraps around your neck, causing you to suffocate. Your body plummets and shatters to dust on impact, then is engulfed by flames from the nearby exploding ship. By the time the fire dies, you look worse for wear. </br><strong>Your adventure ends here, sadly.</strong></br><a href=index.html>Try again!</a>",
    scene14_acid_death: "When you land your ship, the acid immediately begins to corrode it. Realizing this, you attempt to lift off, but before you can, a beautiful female singing drifts in from outside, prompting you to open the door. As you do, the acid floods in - yet before it can strip the last of your flesh, you revel in those final seconds at the exquisite song reminiscent of Ariana Grande. </br><strong>The acid sirens have played a cruel trick on you, and your adventure ends here.</strong></br><a href=index.html>Try again!</a>",
    scene17_szaj: "The new section of the cave visibly widens, and as a foul breath hits your nostrils, you realize this place (the navigation panel reads \"Cavum Oris\") feels eerily familiar. Not because you’ve been here, but because the massive tongue, gums, and teeth strongly remind you of something. You confirm your suspicion by asking your translation device to translate \"Cavum Oris\": you’re inside a giant creature’s mouth, and as that realization hits, you smash head-on into one of its slightly yellowed canines, the impact tearing your body apart. <strong>Your adventure ends here, sadly.</strong></br><a href=index.html>Try again!</a>",
    scene22_landing_on_god_a: "You land on the old coot’s stomach, then exit and shout at him, wildly flailing your arms. Unfortunately, he doesn’t hear you, and when he finally notices you, he mistakes you for a bug and squashes you with his thumb. <strong>Your adventure ends here, just yards from your goal.</strong> <a href=index.html>Try again!</a>",
    scene24_no_nyul: "\"Why would I help a little prick like you?\" God retorts arrogantly, then explains his leopard gecko recently died, so he could use a new pet. He grabs you, smashes your megaphone to pieces (so you can’t shout), and throws you into a reptile terrarium. You’re doomed to spend the rest of your life as God’s new pet. </br><strong>Your adventure ends here, sadly.</strong></br><a href=index.html>Try again!</a>"
  };

  var textHungarian = {
    win1: "\"Mi sem természetesebb\" - mondja Isten, aki óvatosan megragad, majd az ánuszába helyez, mire te a seggportálon keresztül visszajutsz a saját világodba. Sajnos az űrhajód ott maradt, ezért hazafelé stoppolnod kell, de szerencsére épp arra jár egy Nostromo nevű űrhajó, hét igazán kedves utassal (és egy nagy húsvéti tojással) a fedélzeten, akik nem hagyják, hogy az űrben bolyongj. De hogy mi van a pendrive-on, ami miatt menekülnöd kellett... nos, az már egy másik történet.</br><strong>Gratulálok, végigvitted a játékot, méghozzá a pozitív befejezéssel. Éljen soká a Kelekótya Kozmoszharcos! Hip-hip-hurrá!!!</strong><br/><br/><a href=index.html>Játék újrakezdése.</a>",
    win2: "Isten a váratlan kérésed hatására elejti a kezében lévő sört, a szívéhez kap, majd elterül a szar ikeás szőnyegen. Ebben a pillanatban az egész világ, beleértve annak minden galaxisát és párhuzamos (vagy derékszögben álló) univerzumát elsötétül, a tengerek helyén mindenhol vér kezd el hömpötyögni, a levegőt pedig sáskarajok lepik el (a pendrive-odat, ami miatt menekülnöd kellett is egy ilyen sáska zabálja fel). \"Gott ist tot! Gott bleibt tot! Und wir haben ihn getötet!\" - üvöltöd eszelősen, miközben minden élet elpusztul a világon. </br><strong>Gratulálok, végigvitted a játékot, a negatív befejezéssel! Éljen soká Kelekótya Kozmoszharcos! Hip-hip-hurrá!</strong> <br/><br/><a href=index.html>Játék újrakezdése.</a>",
    scene10_ejtoernyo: "Egy hősies mozdulattal kiveted magad a zuhanó űrhajóból, ám egy balszerencsés véletlen miatt a nyakadra tekeredik az ejtőernyő zsinórja, ezért  megfulladsz, majd a tetemed lezuhan, a csontjaid porrá törnek, majd a közelben felrobbanó űrhajó lángjai tovább terjednek feléd, és felgyulladsz. Mire kialszik a tűz, már nem nézel ki jól. </br><strong>Kalandod itt sajnos véget ért.</strong></br><a href=index.html>Próbáld újra!</a>",
    scene14_acid_death: "Ahogy az űrhajóddal leszállsz, a sav egyből elkezdi szétégetni a jármút. Ezt realizálva megpróbálkod felemelni az űrhajót, ám mielőtt ezt megtennéd, odakintről jövő gyönyörű női ének üti meg a füledet, ami arra késztet, hogy nyisd ki az űrhajód ajtaját. Amint ezt megteszed, azonnal ellepi az űrhajódat a sav, ám még mielőtt rólad is lemarná az összes húst, az utolsó másodperceidben is az Ariana Grande hangjára emlékeztető csodaszép énekben gyönyörködsz. </br><strong>A savszirének gonosz tréfát űztek veled, így kalandod itt most véget ér.</strong></br><a href=index.html>Próbáld újra!</a>",
    scene17_szaj: "A barlangrendszer új része láthatóan szélesebbre tágul, és miközben förtelmes szájszag csapja meg az orrodat észreveszed, hogy ez a hely (a navigációs rendszer szerint: \"Cavum Oris\") meglehetősen ismerős a számodra. Na nem azért, mert már jártál volna itt korábban, csak hát a hatalmas nyelv, íny és fogak erősen emlékeztetnek valamire. Sejtésedet a tolmácsgéped igazolja vissza, miután megkéred, hogy fordítsa le a navigációs rendszer szövegét. Igen, egy hatalmas lény szájában vagy, és amint világossá válik, hogy mi is az a fekete lyuk, amin berepültél, valósággal elborzadsz, ám ebben a pillanatban frontálisan ütközöl a zárt száj egyik (kissé elsárgult) szemfogával, a robbanás pedig darabokra szaggatja a tested. </br><strong>Kalandod itt sajnos véget ért.</strong></br><a href=index.html>Próbáld újra!</a>",
    scene22_landing_on_god_a: "Leszállsz az öreg muksó hasán, majd kiszállsz a járműből, és elkezdesz kiabálni felé, miközben mindkét kezeddel vadul kalimpálsz. Sajnos azonban a férfi nem hall meg téged, és amikor észrevesz, poloskának néz, így mielőtt bármit tehetnél, kilapít a hüvelykujjával. </br><strong>Kalandod itt sajnos véget ért, pedig már oly közel voltál a célhoz.</strong></br><a href=index.html>Próbáld újra!</a>",
    scene24_no_nyul: "\"Mégis miért segítenék egy ilyen kis pöcsnek?\" - veti oda neked pökhendi módon Isten, majd közli, hogy nemrég kimúlt a leopárdgekkója, ezért jól jönne neki egy másik hobbiállat. Elveszi, majd darabokra töri a megafonodat (hogy ne tudj hangoskodni), majd behajít egy hüllőknek kialakított terráriumba. Életed hátralévő részét Isten új háziállataként vagy kénytelen leélni. </br><strong>Kalandod itt sajnos véget ért.</strong></br><a href=index.html>Próbáld újra!</a>"
  };

  var text = (language === "eng") ? textEnglish : textHungarian;

  if (result === "victory1") {
    if (soundEnabled) {
      music_ingame.pause();
      music_win.play();
    }
    storyDiv.innerHTML = "<p>" + text.win1 + "</p>";
    image.src = "win3a.jpg";
   } else if (result === "victory2") {
    if (soundEnabled) {
      music_ingame.pause();
      music_win.play();
    }
    storyDiv.innerHTML = "<p>" + text.win2 + "</p>";
    image.src = "win3b.jpg";
   }
   else {
    if (soundEnabled) {
      music_ingame.pause();
      music_loose.play();
    }
    storyDiv.innerHTML = "<p>" + text[result] + "</p>";
    image.src = "death3.jpg";
  }

  optionsDiv.innerHTML = "";
  scrollToTop ();
}



function collectItem(itemName) {
collectedItems.push(itemName);
updateUI();

var textEnglish = {
  text1: "You have picked up the beautiful flower. Now what do you do?"
};

var textHungarian = {
  text1: "Felvetted a gyönyörűszép virágot. Most mit csinálsz?"
};

var text = (language === "eng") ? textEnglish : textHungarian;

// Az új üzenet a játékosnak
var storyDiv = document.getElementById('story');
storyDiv.innerHTML = "<p>" + text.text1 + "</p>";

}


function useItem(itemName) {

var textEnglish = {
  text1: "The wizard who is a colorful queer rejoices at the flower. In gratitude, it bestows a mass-destructive spell with a friendly wink. He touches your ass. What do you do?"
};

var textHungarian = {
  text1: "A varázsló színes csodabogár örül a virágnak tehát. Hálából ad tömegpusztító varázslatot kedves kacsintással. Feneked megfog. Cselekedsz."
};

var text = (language === "eng") ? textEnglish : textHungarian;

if (itemName === "virag") {
  collectedItems.push("viragFelhasznalva");
  // Itt megadhatod, hogy a virág hogyan befolyásolja a történéseket
  // Esetlegesen változtathatsz helyszínt is goToLocation függvény segítségével
  // goToLocation(újHelyszín);
}
updateUI(text.text1); // Még mindig frissítsd az UI-t, hogy a változások láthatók legyenek
}


function setLanguage(selectedLanguage) {
language = selectedLanguage;
updateUI();

}  

function toggleSound() {
var checkbox = document.getElementById('hangCheckbox');
soundEnabled = checkbox.checked;
}


function chooseLanguage() {
var storyDiv = document.getElementById('story');
var optionsDiv = document.getElementById('options');
var image = document.getElementById('image');
document.body.classList.add('body_extend');

//storyDiv.innerHTML = "<p>Settings / Beállítás:</p>";
storyDiv.innerHTML = "</br>Music / Zene:</br>" +
                        "<input type=\"checkbox\" id=\"hangCheckbox\" onchange=\"toggleSound()\"</br></br></br> Language / Nyelv:" +
                        "<button onclick='setLanguage(\"eng\")'>English</button>" +
                        "<button onclick='setLanguage(\"hun\")'>Magyar</button>"
image.style.display = 'none';

}
