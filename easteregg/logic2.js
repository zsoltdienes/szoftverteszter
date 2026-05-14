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
    welcome: "<strong>KALANDOR.BAT 2: Wasteland Chronicles</strong></br>genre: post-apocalyptic action</br></br>text: Zsolt Dienes</br>code: Zsolt Dienes, chatGPT</br>gfx: Dall.E 2</br></br><a href=game.html>Return to game selection</a>",
    start: "PLAY THE GAME",
    scene01_junkyard: "You wake up in a junkyard after the apocalypse. The heat is unbearable, and continuous exposure to radiation has caused mutations in your body (e.g., three legs). Machine vultures circle above your head. It takes hours before you can remember what happened: you were peacefully driving your Dodge Interceptor with a green license plate when a barbarian named Powerslave Warlord and his biker gang attacked. They took your car, nearly beat you to death, and left your seemingly lifeless body here in the junkyard. \"Damn them,\" you conclude, and start pondering about what to do next.",
    scene02_ruins: "Various concrete pieces protrude from the sand dunes, toppled traffic light poles, and charred metal and human skeletons reveal fragments of a bygone civilization. However, while browsing, you unexpectedly hear a peculiar sound resembling munching.",
    scene03_desert: "You have no idea how long you've been dragging yourself through the desert; seconds feel like minutes. You breathe a sigh of relief as the image of a camp starts to emerge in the distance. But as you get closer, you notice two presumably armed mercenaries guarding the entrance.",
    scene04_wastedump: "Underneath rust-eaten metal debris, you find a bag of chips and a dead armadillo. You are consuming the creature with joy, gaining two points of health! (?) Unfortunately, the chips are onion-flavored, so you carefully put them in your bag to avoid bad breath.",
    scene05_eddie_appears: "The sound comes from one of the metal trash containers, and its owner is a shaggy-haired, constantly snarling creature feasting on radioactive rats gathered from the surroundings. The scruffy-looking man introduces himself as Eddie and complains about the monotonous and vitamin-deficient diet.",
    scene06_flatrobbing: "You search a few relatively well-kept houses, but nomadic hordes have already looted everything nearby. However, in the energy-efficient refrigerator of a cannibal family – next to some gnawed bones – you find a used but well-preserved severed human finger. You put it in your nose and leave the building.",
    scene07_eddie_farewell: "Eddie tosses aside the half-chewed rat carcass and greedily starts devouring the onion-flavored chips. After finishing, he vomits the whole thing, then retrieves a small-sized mathematician from the vomit, offering it to you as a gesture of gratitude. The tiny professor seems dissatisfied with his situation, but you nonchalantly slip him into your bag and bid farewell to the characterful undead.",
    scene09_camp_entrance: "At the entrance of the camp, two figures dressed in studded leather stand guard. The tall, muscular one is Trooper, and the short, stout guy goes by the name Wrathchild (probably adopted names). They eye you suspiciously, the tension in the air is palpable, and the electric current gives you a slight jolt - deduct 1 hit from your HP! You have to do something, but what?",
    scene10_cabletv: "\"Lies!\" - Trooper shouts. \"Powerslave Warlord hasn't paid for cable tv in months because on HBO Max they only put something decent once every quarter, and on Netflix, you drown in a sea of crap!\" Wrathchild nods in agreement but adds that Disney Plus has some really good animation movies.",
    scene12_pass: "You tell the mercenaries that you really need to pee, and they understandingly let you into the camp. Inside, there is a hustle and bustle, with dozens of ragged people living their pathetic lives around you. To the west, a massive dome-shaped, grid-covered building rises, known as the 'Thunderdome.' To the east lies a sturdy bunker.",
    scene13_dome: "The Thunderdome resembles a gigantic cage. A local tells you they usually host battles here for the entertainment of Powerslave Warlord. Tonight, however, a Tina Turner tribute band will be giving a concert. But you didn't come for entertainment, so you steal a studded handle hunting knife (left behind in a previous battle), then move on.",
    scene14_fortress: "The bunker is a not-too-large but solid concrete building. At its base, you spot your beloved Dodge Interceptor, which was forcibly taken from you. There's no one around, so you might be able to escape in unnoticed. But is that what you desire most right now?",
    scene16_revenge: "Fueled by revenge, you approach the entrance of Powerslave Warlord's bunker. As you inspect it more closely, you anxiously recognize dual protection: a biometric fingerprint reader and a password encoded with a complex mathematical procedure.",
    scene17_access_denied: "Unfortunately, you couldn't bypass Powerslave's security system, and since the alarm goes off, you decide it's best not to try any further.",
    scene18_access_granted: "You first try to fool the biometric scanner by using the finger you pulled from your nose, and it instantly gives in as soon as you touch the severed body part. The password is tougher, but the mathematician you fished out from Eddie's vomit, now residing in your bag, cracks the code in a matter of seconds. Out of gratitude, you offer him freedom, but then you change your mind, thinking you might sell him on EBay, and you slide him back into your bag.",
    scene19_nest: "Powerslave Warlord is genuinely surprised as you bypass his security system and abruptly intrude. \"I remember you...\" he hisses, then continues: \"we left you to rot in the junkyard.\" You inform him that they did a half-assed job, and now you're here to finish it. Threateningly, you move towards the barbarian chieftain. Powerslave screams and, with fiery rage in his eyes, charges towards you. What do you do?",
    
    scene01_opt1: "You look around among the ruins of the nearby city.",
    scene01_opt2: "You head towards the desert.",
    scene01_opt3: "You rummage through the trash for a bit.",
    scene02_opt1: "You investigate the source of the sound.",
    scene02_opt2: "You would rather loot a few nearby houses.",
    scene03_opt1: "You approach the guards and resort to trickery.",
    scene03_opt2: "You wait until night, hoping the guards will go to sleep.",
    scene04_opt1: "You explore among the ruins of the city.",
    scene04_opt2: "You head towards the desert.",
    scene05_opt1: "You gift the bag of onion-flavored chips to Eddie.",
    scene05_opt2: "You say goodbye to the young man and decide to go loot houses instead.",
    scene05_opt3: "You opt to head towards the desert.",
    scene06_opt1: "You head towards the desert.",
    scene07_opt1: "You go loot houses.",
    scene07_opt2: "You leave the city behind and head towards the desert.",
    scene09_opt1: "You lie, claiming to be a cable TV repairman here to fix the boss's TV.",
    scene09_opt2: "You attack the guards.",
    scene09_opt3: "You ask the guards to let you in.",
    scene10_opt1: "You attack the guards.",
    scene10_opt2: "You ask the guards to let you in.",
    scene12_opt1: "You head west.",
    scene12_opt2: "You head east.",
    scene13_opt1: "You inspect the bunker.",
    scene14_opt1: "You jump into the car and speed away immediately.",
    scene14_opt2: "Damn it, you seek revenge on the camp leader first.",
    scene16_opt1: "You crack the code.",
    scene16_opt2: "You try to hack the code.",
    scene16_opt3: "You abandon the whole thing and decide to get out of there.",
    scene17_opt1: "Lacking a better option, you jump into the car and disappear from here.",
    scene18_opt1: "You enter the bunker.",
    scene19_opt1: "You engage your opponent bare-handed.",
    scene19_opt2: "You pull out the studded hunting knife and attempt to gut this overdosed brute."
  };

  var textHungarian = {
    welcome: "<strong>KALANDOR.BAT 2: Holtvidék krónikák</strong></br>műfaj: posztapokaliptikus akció</br></br>szöveg: Dienes Zsolt</br>kód: Dienes Zsolt, chatGPT</br>grafika: Dall.E 2</br></br><a href=game.html>Vissza a játékválasztóhoz</a>",
    start: "JÁTÉK ELKEZDÉSE",
    scene01_junkyard: "Egy roncstelepen ébredsz a világégés után. A hőség elviselhetetlen, a radioaktív sugárzás folyamatos mutációkat okoz a szervezetedben (pl. három láb). A fejed felett gépkeselyűk köröznek. Órák telnek el, mire vissza tudsz emlékezni, mi történt veled: épp békésen autózgattál a zöld rendszámú Dodge Interceptor autóddal, amikor egy Powerslave Hadúr nevű barbár a motoros banditáival megtámadott. Az autódat elvették, téged pedig kis híján halálra vertek, halottnak hitt testedtől pedig itt, a szeméttelepen szabadultak meg. A kurva anyjukat, állapítod meg, majd morfondírozni kezdesz, hogy mitévő légy.",
    scene02_ruins: "A homokdűnéből kiemelkedő kisebb-nagyobb betondarabok, kidőlt közlekedési lámpaoszlopok, valamint elszenesedett fém- és emberi csontvázak egy letűnt civilizáció emlékfoszlányait tárják eléd. Nézelődés közben azonban váratlanul egy különös hangra leszel figyelmes, ami leginkább a csámcsogásra hasonlít.",
    scene03_desert: "Fogalmad sincs mióta vonszolod magad a sivatagban, az eltelt másodpercek szinte perceknek tűnnek. Végtelenül megkönnyebbülsz, amikor egy tábor képe kezd el kirajzolódni a távolban. Ám ahogy közelebb érsz észreveszed, hogy két, minden bizonnyal felfegyverzett zsoldos őrzi a bejáratot.",
    scene04_wastedump: "A rozsda által kikezdett fém hulladékok alatt találsz egy zacskó csipszet és egy döglött tatut. Utóbbit jóízűen elfogyasztod - növeld az életerődet két ponttal! (?) A csipsz sajnos hagymás, ami elrontaná a lehelletedet, ezért azt óvatosan a táskádba helyezed.",
    scene05_eddie_appears: "Az egyik fém konténerből jön a hang, melynek tulajdonosa egy bozontos hajú, folyamatosan vicsorgó, csont és bőr kreatúra, aki épp a környékről összeszedett radioaktív patkányokból falatozik. Az elhanyagolt külsejű férfi Eddie néven mutatkozik be és arról panaszkodik, hogy már nagyon unja ezt az egyoldalú és vitaminszegény táplálkozást.",
    scene06_flatrobbing: "Átvizsgálsz pár, viszonylag jobb állapotban lévő lakóházat, de már mindent leraboltak a közelben portyázó nomád hordák. Azonban egy kannibál család energiatakarékos hűtőszekrényében - néhány lerágott csont mellett - egy használt, de jó állapotú levágott emberi ujjra bukkansz, amit az orrodba dugsz, és elhagyod az épületet.",
    scene07_eddie_farewell: "Eddie félredobja a félig megcsócsált patkánytetemet, és vadul habzsolni kezdi a hagymás csipszet. Miután végez vele, kihányja az egészet, majd a hányásból kipiszkál egy kis mértű matematikust, akit átnyújt neked, hálája jeléül. A kis méretű professzor láthatóan elégedetlen a helyzetével, de te ezzel mit sem törődve a táskádba csúsztatod őt, majd elköszönsz a karakteres arcú élőhalottól.",
    scene09_camp_entrance: "A tábor bejáratánál két szögecses bőrökbe öltözött alak ácsorog. A magas, kigyúrt tag Trooper, az alacsony köpcös fickó Wrathchild névre hallgat (valószínűleg ezek felvett művésznevek). Meglehetősen bizalmatlanul méregetnek, jól tapintható a feszültség a levegőben, picit meg is ráz az áram - vonj le 1 életerőpontot! Valamit tenned kell, de mit?",
    scene10_cabletv: "\"Hazugság!\" - üvölti Trooper. \"Powerslave Hadúr már hónapok óta nem fizeti a kábeltévét, mivel az HBO Max-ra negyedévente tesznek fel valami értelmeset, a Netflixen meg belefullad az ember a fostengerbe!\" Wratchild helyeslően bólogat, de azért hozzáteszi, hogy a Disney pluszon nagyon jó mesék vannak.",
    scene12_pass: "Elmondod a zsoldosoknak, hogy nagyon kell pisilned, mire ők megértően beengednek a táborba. Odabent elég nagy a nyüzsgés, körülötted több tucat rongyokba öltözött ember éli szánalmas kis életét. Tőled nyugatra egy hatalmas, kupola formájú, rácsos épület magasodik, az úgynevezett \"mennydörgés dómja\". Keletre egy masszív szerkezetű bunker terül el.",
    scene13_dome: "A mennydörgés dómja leginkább egy hatalmas kalitkára emlékeztet. Az egyik helybéli elmeséli, hog itt általában viadalokat rendeznek Powerslave Hadúr szórakoztatására, ma este azonban egy Tina Turner tribute zenekar fog koncertet adni. Te azonban nem szórakozni jöttél, úgyhogy elcsensz egy szögecses markolatú vadászkést (ez még egy korábbi viadal során felejtődött itt), majd továbbállsz.",
    scene14_fortress: "A bunker egy nem túl nagy alapterületű, de masszív betonépület, melynek tövében megpillantod gyönyörű kicsikédet, akit erőszakkal vettek el tőled: a Dodge Interceptorodat. A közelében nem látsz senkit, így meglehet, észrevétlenül megpattanhatsz. De vajon ez az, amire most a legjobban vágysz?",
    scene16_revenge: "Bosszútól fűtve közelíted meg Powerslave Hadúr bunkerének bejáratát. Ahogy jobban szétnézel aggódva ismered fel, hogy kettős védelem zárja le az ajtót: egy biometrikus ujjlenyomatolvasó, valamint egy bonyolult matematikai eljárással kódolt jelszó.",
    scene17_access_denied: "Sajnos nem sikerült kijátszanod Powerslave biztonsági rendszerét, és mivel a riasztó is megszólal, jobbnak látod, ha nem próbálkozol tovább.",
    scene18_access_granted: "Elsőként az orrodból kihúzott ujjal próbálod meg a biometrikus leolvasót becsapni, amely azonnal megadja magát, ahogy hozzáérinted a levágott testrészt. A jelszó már keményebb dió, de az Eddie hányásából kihalászott, azóta a táskádban raboskodó matematikus néhány másodperc alatt feltöri a kódot. Hálából felajánlod, hogy szabadon távozhat, de aztán meggondolod magad, és arra gondolva, hogy inkább felteszed majd a Jófogásra, visszacsúsztatod a táskádba.",
    scene19_nest: "Powerslave Hadúrt őszintén meglepi, hogy a biztonsági rendszerét kijátszva hirtelen betoppansz. \"Rád emlékszem...\" - sziszegi, majd folytatja: \"téged ott hagytunk a szeméttelepen megrohadni.\" Közlöd vele, hogy félmunkát végeztek, és ezt most te fogod befejezni, majd fenyegetően megindulsz a barbár törzsfőnök felé. Powerslave felüvölt, majd lángoló dühvel a tekintetében szintén elkezd feléd rohanni. Mit teszel?",

    scene01_opt1: "Szétnézel a közeli város romjai között.",
    scene01_opt2: "Elindulsz a sivatag irányába.",
    scene01_opt3: "Kotorászol egy kicsit a szemétben.",
    scene02_opt1: "Felkutatod a hang forrását.",
    scene02_opt2: "Inkább kifosztanál pár közeli lakást.",
    scene03_opt1: "Odamész az őrökhöz és cselhez folyamodsz.",
    scene03_opt2: "Megvárod az éjjelt, hátha elmennek az őrök aludni.",
    scene04_opt1: "Szétnézel a város romjai között.",
    scene04_opt2: "Elindulsz a sivatag irányába.",
    scene05_opt1: "Eddie-nek ajándékozod a zacskó hagymás csipszet.",
    scene05_opt2: "Elköszönsz a fiatalembertől és inkább elmész lakásokat fosztogatni.",
    scene05_opt3: "Inkább a sivatag felé veszed az irányt.",
    scene06_opt1: "A sivatag felé veszed az irányt.",
    scene07_opt1: "Elmész lakásokat fosztogatni.",
    scene07_opt2: "Itt hagyod a várost és a sivatag felé veszed az irányt.",
    scene09_opt1: "Azt hazudod, hogy kábeltévé szerelő vagy, és jöttél megjavítani a főnök tévéjét.",
    scene09_opt2: "Megtámadod az őröket.",
    scene09_opt3: "Megkéred az őröket, hogy engedjenek be.",
    scene10_opt1: "Megtámadod az őröket.",
    scene10_opt2: "Megkéred az őröket, hogy engedjenek be.",
    scene12_opt1: "Nyugat felé mész.",
    scene12_opt2: "Kelet felé mész.",
    scene13_opt1: "Megnézed a bunkert.",
    scene14_opt1: "Bevágod magad az autóba, és azonnal elhúzol innen.",
    scene14_opt2: "Lófaszt, előbb bosszút állsz a tábor vezetőjén.",
    scene16_opt1: "Feltöröd a kódot.",
    scene16_opt2: "Megpróbálod feltörni a kódot.",
    scene16_opt3: "Hagyod a francba az egészet, és inkább elhúzol innen.",
    scene17_opt1: "Jobb híján az autóba vágod magad, és eltűnsz innen.",
    scene18_opt1: "Belépsz a bunkerbe.",
    scene19_opt1: "Puszta kézzel esel neki az ellenfelednek.",
    scene19_opt2: "Előveszed a szögecses vadászkést, és azzal próbálod felkoncolni ezt a túlszteroidozott ficsúrt."
  };

  var text = (language === "eng") ? textEnglish : textHungarian;

  switch (currentLocation) {
    case 0:
      if (soundEnabled) {
        music_intro.play();
      }
      storyDiv.innerHTML = "<p>" + text.welcome + "</p>";
      optionsDiv.innerHTML = "<button onclick='goToLocation(1)'>" + text.start + "</button>";
      image.src = "start2.jpg";
      break;

    case 1:
      if (soundEnabled) {  
        music_intro.pause();
        music_ingame.play();
      }
      storyDiv.innerHTML = "<p>" + text.scene01_junkyard + "</p>";
      optionsDiv.innerHTML = "<button onclick='goToLocation(2)'>" + text.scene01_opt1 + "</button>" +
                              "<button onclick='goToLocation(3)'>" + text.scene01_opt2 + "</button>" +
                              "<button onclick='goToLocation(4)'>" + text.scene01_opt3 + "</button>";
      image.src = "scene01_junkyard.jpg";
      break;

    case 2:
      storyDiv.innerHTML = "<p>" + text.scene02_ruins + "</p>";
      optionsDiv.innerHTML = "<button onclick='goToLocation(5)'>" + text.scene02_opt1 + "</button>" +
                              "<button onclick='goToLocation(6)'>" + text.scene02_opt2 + "</button>";
      image.src = "scene02_ruins.jpg";
      break;

    case 3:
      storyDiv.innerHTML = "<p>" + text.scene03_desert + "</p>";
      optionsDiv.innerHTML = "<button onclick='goToLocation(9)'>" + text.scene03_opt1 + "</button>" +
                              "<button onclick='endGame(\"scene08_at_night\")'>" + text.scene03_opt2 + "</button>";
      image.src = "scene03_desert.jpg";
      break;

    case 4:
      storyDiv.innerHTML = "<p>" + text.scene04_wastedump + "</p>";
      optionsDiv.innerHTML = "<button onclick='goToLocation(2)'>" + text.scene04_opt1 + "</button>" +
                              "<button onclick='goToLocation(3)'>" + text.scene04_opt2 + "</button>";
      image.src = "scene04_wastedump.jpg";
      break;

    case 5:
      storyDiv.innerHTML = "<p>" + text.scene05_eddie_appears + "</p>";

      optionsDiv.innerHTML = '';

      if (collectedItems.includes("onion_chips")) {
        optionsDiv.innerHTML += "<button onclick='goToLocation(7)'>" + text.scene05_opt1 + "</button>";
      }
      optionsDiv.innerHTML += "<button onclick='goToLocation(6)'>" + text.scene05_opt2 + "</button>" +
                              "<button onclick='goToLocation(3)'>" + text.scene05_opt3 + "</button>";
      image.src = "scene05_eddie_appears.jpg";
      break;

    case 6:
      storyDiv.innerHTML = "<p>" + text.scene06_flatrobbing + "</p>";
      optionsDiv.innerHTML = "<button onclick='goToLocation(3)'>" + text.scene06_opt1 + "</button>";
      image.src = "scene06_flatrobbing.jpg";
      break;

    case 7:
      storyDiv.innerHTML = "<p>" + text.scene07_eddie_farewell + "</p>";
      optionsDiv.innerHTML = "<button onclick='goToLocation(6)'>" + text.scene07_opt1 + "</button>" +
                              "<button onclick='goToLocation(3)'>" + text.scene07_opt2 + "</button>";
      break;

    case 9:
      storyDiv.innerHTML = "<p>" + text.scene09_camp_entrance + "</p>";
      optionsDiv.innerHTML = "<button onclick='goToLocation(10)'>" + text.scene09_opt1 + "</button>" +
                              "<button onclick='endGame(\"scene11_attack\")'>" + text.scene09_opt2 + "</button>" +
                              "<button onclick='goToLocation(12)'>" + text.scene09_opt3 + "</button>";
      image.src = "scene09_camp_entrance.jpg";
      break;

    case 10:
      storyDiv.innerHTML = "<p>" + text.scene10_cabletv + "</p>";
      optionsDiv.innerHTML = "<button onclick='endGame(\"scene11_attack\")'>" + text.scene10_opt1 + "</button>" +
                              "<button onclick='goToLocation(12)'>" + text.scene10_opt2 + "</button>";
      break;

    case 12:
      storyDiv.innerHTML = "<p>" + text.scene12_pass + "</p>";
      optionsDiv.innerHTML = "<button onclick='goToLocation(13)'>" + text.scene12_opt1 + "</button>" +
                              "<button onclick='goToLocation(14)'>" + text.scene12_opt2 + "</button>";
      image.src = "scene12_pass.jpg";
      break;

    case 13:
      storyDiv.innerHTML = "<p>" + text.scene13_dome + "</p>";
      optionsDiv.innerHTML = "<button onclick='goToLocation(14)'>" + text.scene13_opt1 + "</button>";
      image.src = "scene13_dome.jpg";
      break;

    case 14:
      storyDiv.innerHTML = "<p>" + text.scene14_fortress + "</p>";
      optionsDiv.innerHTML = "<button onclick='endGame(\"scene15_escape\")'>" + text.scene14_opt1 + "</button>" +
                              "<button onclick='goToLocation(16)'>" + text.scene14_opt2 + "</button>";
      image.src = "scene14_fortress.jpg";
      break;

    case 16:
      optionsDiv.innerHTML = '';
      storyDiv.innerHTML = "<p>" + text.scene16_revenge + "</p>";

      if (collectedItems.includes("scientist") && collectedItems.includes("finger")) {
        optionsDiv.innerHTML += "<button onclick='goToLocation(18)'>" + text.scene16_opt1 + "</button>";
      }

      if (!collectedItems.includes("scientist") || !collectedItems.includes("finger")) {
        optionsDiv.innerHTML += "<button onclick='goToLocation(17)'>" + text.scene16_opt2 + "</button>";
      }

      optionsDiv.innerHTML += "<button onclick='endGame(\"scene15_escape\")'>" + text.scene16_opt3 + "</button>";
      image.src = "scene16_revenge.jpg";
      break;

    case 17:
      storyDiv.innerHTML = "<p>" + text.scene17_access_denied + "</p>";
      optionsDiv.innerHTML = "<button onclick='endGame(\"scene15_escape\")'>" + text.scene17_opt1 + "</button>";
      break;

    case 18:
      storyDiv.innerHTML = "<p>" + text.scene18_access_granted + "</p>";
      optionsDiv.innerHTML = "<button onclick='goToLocation(19)'>" + text.scene18_opt1 + "</button>";
      image.src = "scene18_access_granted.jpg";
      break;

    case 19:
      optionsDiv.innerHTML = '';
      storyDiv.innerHTML = "<p>" + text.scene19_nest + "</p>";
      optionsDiv.innerHTML = "<button onclick='endGame(\"victory\")'>" + text.scene19_opt1 + "</button>";

      if (collectedItems.includes("hunter_knife")) {
        optionsDiv.innerHTML += "<button onclick='endGame(\"scene21_loose\")'>" + text.scene19_opt2 + "</button>";
      }
      image.src = "scene19_nest.jpg";
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

  if (location === 4) {
    collectedItems.push('onion_chips');
  }
  else if (location === 6) {
    collectedItems.push('finger');
  } 
  else if (location === 7) {
    collectedItems.push('scientist');
  }
  else if (location === 13) {
    collectedItems.push('hunter_knife');
  }

  updateUI();
  scrollToTop ();
}

function endGame(result) {
  var storyDiv = document.getElementById('story');
  var optionsDiv = document.getElementById('options');

  var textEnglish = {
    win: "Your opponent has serious striking power, but his massive muscles slow him down enough for you to easily dodge his attacks. However, you are quick, but as weak as a piece of crap. Realizing the absurdity of the situation, you both eventually give up the fight. \"This was a really great adventure!\" you declare cheerfully, then embrace and kiss each other, and soon you're zooming down the highway in your reclaimed vehicle, seeking more adventures...<br/><br/><a href=index.html>Start again from the beginning.</a>",
    scene08_at_night: "You've been waiting for hours for the camp to be unguarded, but the guards refuse to leave their post. After dark, the camp inhabitants start a loud celebration, attracting a nearby giant sandworm just 2 minutes to midnight. The enormous creature engulfs you, and soon you become a spicy worm shit. Unfortunately!</br><a href=index.html>Try again!</a>",
    scene11_attack: "With a sudden movement, you strike one of the mercenaries with full force, but a nail on his clothes cuts your hand, leading to death by blood poisoning. Legends circulate for a while about the 'clumsy adventurer,' but soon your memory is also eradicated by the merciless hands of oblivion.</br><a href=index.html>Try again!</a>",
    scene15_escape: "You settle into the driver's seat of your car, hit the gas, and break through one of the camp's less fortified walls in a spectacular exit. However, Powerslave's men catch up within minutes, dragging you out of the car. Soon, they defile your car's interior with an unpleasant pine-scented air freshener, and you find yourself back in the nuclear junkyard – this time in pieces.</br><a href=index.html>Try again!</a>",
    scene21_loose: "As you clumsily struggle with pulling out the studded hunting knife, you accidentally slip on a Lego block, causing you to fall face-first. The knife's blade pierces your temple, and your limited brain spills on the floor. The last thing you hear in your life is Powerslave's carefree laughter. You failed, just like a true idiot.</br><a href=index.html>Try again!</a>"
  };

  var textHungarian = {
    win: "Ellenfeled komoly ütőerővel bír, de a hatalmas izma annyira lelassítja, hogy könnyedén kitérsz az ütései elől. Te ugyanakkor gyors vagy, csak hogy gyenge is mint egy darab szar. A helyzet értelmetlenségét  felismerve végül mindketten feladjátok a harcot. \"Ez igazán remek kaland volt!\" - állapítod meg kedélyesen, majd átölelitek és megcsókoljátok egymást, aztán búcsút intesz barátodnak. Néhány perc múlva már az országúton repesztesz visszatulajdonolt járgányoddal, újabb kalandok után kutatva...<br/><br/><a href=index.html>Játék újrakezdése.</a>",
    scene08_at_night: "Órák óta várod, hogy a tábor őrizet nélkül maradjon, ám az őrök nem mozdulnak el az őrhelyükről. Sötétedés után a tábor lakói hangos mulatozásba kezdenek, ami két perccel éjfél előtt odavonz egy közelben portyázó homokférget. A hatalmas állat egy pillanat alatt elnyel, rövidesen pedig fűszeres gilisztaszar lesz belőled. Sajnálatos!</br><a href=index.html>Próbáld újra!</a>",
    scene11_attack: "Egy hirtelen mozdulattal teljes erővel megütöd az egyik zsoldost, ám a fickó ruháján lévő egyik szög felsérti a kezedet, minek következtében vérmérgezésben elhúnysz. Egy ideig még kering néhány legenda rólad, a \"balfasz kalandorról\", rövidesen azonban az emlékedet is elpusztítja az enyészet zord keze.</br><a href=index.html>Próbáld újra!</a>",
    scene15_escape: "Behuppansz az autód űlésére, majd beletaposol a gázba és a tábor egyik kevésbé megerősített falát áttörve angolosan távozol. Powerslave emberei azonban perceken belül utólérnek, és kirángatnak az autóból. Hamarosan egy undorító, fenyő illatú illatosítóval gyalázzák meg az autód utasterét, te pedig ismét a nukleáris roncstelepen találod magad - ezúttal darabokban.</br><a href=index.html>Próbáld újra!</a>",
    scene21_loose: "Miközben a szögecses vadászkés elővételével szerencsétlenkedsz, véletlenül elcsúszol egy Lego kockán, minek következtében pofára esel, a kés pengéje pedig a halántékodba fúródik, kevéske agyvelőd pedig szétfolyik a padlón. Amit életedben utoljára hallasz, az Powerslave önfeledt röhögése. Elbuktál, méghozzá úgy, ahogy csak egy igazi balfasz képes.</br><a href=index.html>Próbáld újra!</a>"
  };

  var text = (language === "eng") ? textEnglish : textHungarian;

  if (result === "victory") {
    if (soundEnabled) {
      music_ingame.pause();
      music_win.play();
    }
    storyDiv.innerHTML = "<p>" + text.win + "</p>";
    image.src = "win2.jpg";
  } else {
    if (soundEnabled) {
      music_ingame.pause();
      music_loose.play();
    }
    storyDiv.innerHTML = "<p>" + text[result] + "</p>";
    image.src = "death2.jpg";
  }

  optionsDiv.innerHTML = "";
  scrollToTop ();
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
