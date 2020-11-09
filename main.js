
// Global Variables
let characterArray = [];
createCharacterArray();

let slideIndex = 0;

// Event Listener
document.getElementById('search').addEventListener('click', characterSearch);
document.getElementById('prev').addEventListener('click', prevSlide);
document.getElementById('next').addEventListener('click', nextSlide);

// Event Function
function characterSearch() {
    // Get Input Value (what character to look for?)
    let name = document.getElementById('input-name').value;
    name = name.toLowerCase();

   // Search for character by name
   let characterIndex = getCharacterByName(name);

    if (characterIndex == -1) {
        displayQuestionMark();
    } else {
        displayCharacter(characterArray[characterIndex]);
        slideIndex = characterIndex;
    }
}

function nextSlide() {
    slideIndex++;
    if (slideIndex == characterArray.length) {
        slideIndex = 0;
    }

    // Update the page
    displayCharacter(characterArray[slideIndex]);
}

function prevSlide() {
    // Increment and update index
    slideIndex--;
    if (slideIndex == -1) {
        slideIndex = characterArray.length - 1;
    } 

    // Update the page
    displayCharacter(characterArray[slideIndex]);
}


function displayCharacter(characterObj) {
    // Update page to new character info
    document.getElementById('main-img').src = 'Image/' + characterObj.imgFile;
    document.getElementById('character-name').innerHTML = characterObj.name;
    document.getElementById('quote').innerHTML = characterObj.quote;
    document.getElementById('wiki-link').innerHTML = characterObj.name + 'wiki';
    document.getElementById('wiki-link').href = 'https://starwars.fandom.com/wiki/' + characterObj.wikiName;
}


function displayQuestionMark() {
    // Update page to Question Mark
    document.getAnimations('main-img').src = 'images/question-mark.png';
    document.getAnimations('character-name').innerHTML = '????';
    document.getAnimations('quote').innerHTML = '"Character Not Found"';
    document.getAnimations('wiki-link').innerHTML = 'Wiki Home';
    document.getAnimations('wiki-link').href = 'https://starwars.fandom.com/wiki/Star_Wars';
}


function createCharacterArray() {
    fetch("character-data.txt")
        .then((rawData) => rawData.text())
        .then(processData);
}

function processData(data) {
    let lines = data.split("\r\n")
    // Loop through lines and add to character array
    for (let i = 0; i < lines.length; i++) {
        let lineArray = lines[i].split(";");
        characterArray.push({
            name: lineArray[0],
            quote: lineArray[1],
            imgFile: lineArray[2],
            wikiName: lineArray[3]
        });
    }
}

function getCharacterByName(aName) {
    // Loop through character array looking for aName
    for (let i = 0; i < characterArray.length; i++) {
        if (characterArray[i].name.toLowerCase() == aName) {
            return characterArray[i];
        }
    }

    // Didn't find a name, so return -1 to indicate not found.
    return -1;
}
