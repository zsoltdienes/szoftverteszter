updateUI();

var currentLocation = 0;
var collectedItems = [];
var music_intro = new Audio('01_opening.mp3');
var music_ingame = new Audio('02_ingame.mp3');
var music_loose = new Audio('03_you_loose.mp3');
var music_win = new Audio('04_you_win.mp3');
var music_wizard = new Audio('05_wizard.mp3');

var language = window.language || "eng";
var soundEnabled = window.soundEnabled || false;


function updateUI(extraMessage = "") {
  var storyDiv = document.getElementById('story');
  var optionsDiv = document.getElementById('options');
  var image = document.getElementById('image');
  image.style.display = 'inline';

  var textEnglish = {
    welcome: "<strong>KALANDOR.BAT 1: Forest of the Dark Souls</strong></br>genre: dark fantasy</br></br>text: chatGPT</br>code: Zsolt Dienes, chatGPT</br>gfx: Dall.E 2</br></br><a href=game.html>Return to game selection</a>",
    start: "PLAY THE GAME",
    adventurer: "Adventurer, the brave explorer, finds himself in a magical forest. Exciting adventure.",
    forest: "The dense forest is full of mysterious creatures. What do you do?",
    house: "By the side of the stream, you see a small house. What do you do?",
    wizard: "In the house, you find a wizard who is muscular. What do you do?",
    dragon: "You continue your journey, but suddenly a huge dragon appears in front of you. What do you do?",
    case1opt1: "Enter the dense forest.",
    case1opt2: "Follow the stream.",
    case1opt3: "Pick flowers in the meadow.",
    case2opt1: "Try to bypass the creatures.",
    case2opt2: "Attack them with a brave move.",
    case3opt1: "Enter the house.",
    case3opt2: "Continue your journey along the stream.",
    case4opt1: "Attack the wizard.",
    case4opt2: "Give a flower to the wizard.",
    case4opt3: "Leave the house and use your new magic on the forest creatures.",
    case5opt1: "Attempt to avoid the dragon.",
    case5opt2: "Attack the dragon."  
  };

  var textHungarian = {
    welcome: "<strong>KALANDOR.BAT 1: A sötét lelkek erdeje</strong></br>műfaj: dark fantasy</br></br>szöveg: chatGPT</br>kód: Dienes Zsolt, chatGPT</br>grafika: Dall.E 2</br></br><a href=game.html>Vissza a játékválasztóhoz</a>",
    start: "JÁTÉK ELKEZDÉSE",
    adventurer: "Kalandor, a bátor felfedező, egy varázslatos erdő közepén találja magát. Izgalmas kaland.",
    forest: "A sűrű erdő tele van rejtélyes lényekkel. Mit teszel?",
    house: "A patak partján egy kis házat látsz. Mit csinálsz?",
    wizard: "A házban találsz egy varázslót, aki izmos. Mit teszel?",
    dragon: "Folytatod az utadat, de hirtelen egy hatalmas sárkány tűnik fel előtted. Mit teszel?",
    case1opt1: "Bemegy a sűrű erdőbe.",
    case1opt2: "Követi a patakot.",
    case1opt3: "Szed virágot a mezőn.",
    case2opt1: "Próbálod megkerülni a lényeket.",
    case2opt2: "Rájuk támadsz egy bátor mozdulattal.",
    case3opt1: "Bemész a házba.",
    case3opt2: "Folytatod az utadat a patak mellett.",
    case4opt1: "Megütöd a varázslót.",
    case4opt2: "Virágot adsz a varázslónak.",
    case4opt3: "Kimész a házból és használod az új varázslatodat az erdő lényein.",
    case5opt1: "Próbálod elkerülni a sárkányt.",
    case5opt2: "Megtámadod a sárkányt."
  };

  var text = (language === "eng") ? textEnglish : textHungarian;

  switch (currentLocation) {
    case 0:
      if (soundEnabled) {
        music_intro.play();
      }
      storyDiv.innerHTML = "<p>" + text.welcome + "</p>";
      optionsDiv.innerHTML = "<button onclick='goToLocation(1)'>" + text.start + "</button>";
      image.src = "start1.jpg";
      break;

    case 1:
      if (soundEnabled) {  
        music_intro.pause();
        music_ingame.play();
      }
      storyDiv.innerHTML = "<p>" + text.adventurer + "</p>";
      optionsDiv.innerHTML = "<button onclick='goToLocation(2)'>" + text.case1opt1 + "</button>" +
                              "<button onclick='goToLocation(3)'>" + text.case1opt2 + "</button>";

      // Felvesz gomb csak akkor jelenik meg, ha még nincs felvéve a virag
      if (!collectedItems.includes("virag")) {
        optionsDiv.innerHTML += "<button onclick='collectItem(\"virag\")'>" + text.case1opt3 + "</button>";
      }

      image.src = "forest.jpg";
      break;

    case 2:
      storyDiv.innerHTML = "<p>" + text.forest + "</p>";
      optionsDiv.innerHTML = "<button onclick='endGame(\"gameover\")'>" + text.case2opt1 + "</button>" +
                              "<button onclick='endGame(\"gameover\")'>" + text.case2opt2 + "</button>";
      image.src = "creatures.jpg";
      break;

    case 3:
      storyDiv.innerHTML = "<p>" + text.house + "</p>";
      optionsDiv.innerHTML = "<button onclick='goToLocation(4)'>" + text.case3opt1 + "</button>" +
                              "<button onclick='goToLocation(5)'>" + text.case3opt2 + "</button>";
      image.src = "hut.jpg";
      break;

    case 4:
      storyDiv.innerHTML = "<p>" + text.wizard + "</p>";
      optionsDiv.innerHTML = "<button onclick='endGame(\"gameover\")'>" + text.case4opt1 + "</button>";
      
      // Használ gomb csak akkor jelenik meg, ha már van virágod és még nem használtad fel
      if (collectedItems.includes("virag") && !collectedItems.includes("viragFelhasznalva")) {
        optionsDiv.innerHTML += "<button onclick='useItem(\"virag\")'>" + text.case4opt2 + "</button>";
      }
      if (extraMessage !== "") {
        storyDiv.innerHTML = "<p>" + extraMessage + "</p>";
      }
      
      image.src = "wizard.jpg";


      if (collectedItems.includes("viragFelhasznalva")) {
        if (soundEnabled) {  
          music_ingame.pause();
          music_wizard.play();
        }
        optionsDiv.innerHTML += "<button onclick='endGame(\"victory\")'>" + text.case4opt3 + "</button>";
        image.src = "transformed_wizard.jpg";
      }

      break;

    case 5:
      storyDiv.innerHTML = "<p>" + text.dragon + "</p>";
      optionsDiv.innerHTML = "<button onclick='endGame(\"gameover\")'>" + text.case5opt1 + "</button>" +
                              "<button onclick='endGame(\"gameover\")'>" + text.case5opt2 + "</button>";
      image.src = "dragon.jpg";
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
    win: "Adventurer uses magic and beat with success the animals of the forest. Congratulations, you win!<br/><a href=index.html>Start again from the beginning.</a>",
    loose: "Adventurer was in unexpected danger and unfortunately lost.</br><a href=index.html>Try again!</a>"
  };

  var textHungarian = {
    win: "Kalandor sikeresen varázslattal legyőzi az erdő lényeit. Gratulálok, nyertél!<br/><a href=index.html>Játék újrakezdése.</a>",
    loose: "Kalandor váratlan veszélybe került és sajnos vesztett.</br><a href=index.html>Próbáld újra!</a>"
  };

  var text = (language === "eng") ? textEnglish : textHungarian;

  if (result === "victory") {
    if (soundEnabled) {
      music_ingame.pause();
      music_wizard.pause();
      music_win.play();
    }
    storyDiv.innerHTML = "<p>" + text.win + "</p>";
    image.src = "win1.jpg";
  } else {
    if (soundEnabled) {
      music_ingame.pause();
      music_wizard.pause();
      music_loose.play();
    }
    storyDiv.innerHTML = "<p>" + text.loose + "</p>";
    image.src = "death1.jpg";
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
