// ============================
// Sociology Exam Trainer
// flashcards.js
// ============================

const flashcards = [

{
    front: "Vad är habitus?",
    back: "Bourdieus begrepp för de dispositioner och vanor som formar hur vi tänker, känner och agerar."
},

{
    front: "Vad är kulturellt kapital?",
    back: "Kunskaper, utbildning, språk och kulturella erfarenheter som ger sociala fördelar."
},

{
    front: "Vad är socialt kapital?",
    back: "Relationer och nätverk som kan ge möjligheter och resurser."
},

{
    front: "Vad menar Goffman med Front Stage?",
    back: "Den offentliga scen där vi försöker ge ett visst intryck inför andra."
},

{
    front: "Vad menar Goffman med Back Stage?",
    back: "Den privata plats där individen kan slappna av från sin sociala roll."
},

{
    front: "Vad innebär impression management?",
    back: "Att människor försöker styra hur andra uppfattar dem."
},

{
    front: "Vad innebär emotionellt arbete?",
    back: "Att reglera sina känslor som en del av sitt arbete (Hochschild)."
},

{
    front: "Vad är Panoptikon?",
    back: "Foucaults exempel på hur övervakning leder till självdisciplin."
},

{
    front: "Hur ser Foucault på makt?",
    back: "Makt finns överallt i relationer och påverkar människors beteenden."
},

{
    front: "Vad innebär struktureringsteorin?",
    back: "Giddens menar att människor formar samhället samtidigt som samhället formar människorna."
},

{
    front: "Vad är en social konstruktion?",
    back: "Något vars betydelse skapas genom sociala processer och gemensamma föreställningar."
},

{
    front: "Vad kännetecknar strukturfunktionalism?",
    back: "Parsons menar att samhällets olika delar samverkar för att skapa stabilitet."
},

{
    front: "Vad är symbolisk interaktionism?",
    back: "Ett perspektiv som fokuserar på hur människor skapar mening genom social interaktion."
},

{
    front: "Vad är symboliskt kapital?",
    back: "Status, prestige och erkännande som ger inflytande."
},

{
    front: "Vad är ekonomiskt kapital?",
    back: "Pengar, egendom och materiella resurser."
}

];

// ============================
// Flashcard Logic
// ============================

let flashcardIndex = 0;
let showingBack = false;

function loadFlashcard() {

    const card = document.getElementById("flashcard");

    if (!card) return;

    showingBack = false;

    card.innerHTML =
        `<div class="front">${flashcards[flashcardIndex].front}</div>`;
}

function flipFlashcard() {

    const card = document.getElementById("flashcard");

    if (!card) return;

    if (showingBack) {

        card.innerHTML =
            `<div class="front">${flashcards[flashcardIndex].front}</div>`;

        showingBack = false;

    } else {

        card.innerHTML =
            `<div class="back">${flashcards[flashcardIndex].back}</div>`;

        showingBack = true;
    }
}

function nextFlashcard() {

    flashcardIndex++;

    if (flashcardIndex >= flashcards.length) {

        flashcardIndex = 0;

    }

    loadFlashcard();
}

document.addEventListener("DOMContentLoaded", () => {

    loadFlashcard();

    const card = document.getElementById("flashcard");

    if (card) {

        card.addEventListener("click", flipFlashcard);

    }

    const nextBtn = document.getElementById("nextFlashcard");

    if (nextBtn) {

        nextBtn.addEventListener("click", nextFlashcard);

    }

});
