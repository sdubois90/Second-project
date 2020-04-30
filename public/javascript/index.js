window.addEventListener("load", function () {
    const textNodes = [
        {
            id: 1,
            text: "Hello I am a text"
        },
        {
            id: 2,
            text: "Cool I am second!"
        },
        {
            id: 3,
            text: "Wait for me! I'm third"
        }
    ];

    // BASIC WORKING
    // var speed = 50; /* The speed of the effect in milliseconds */
    // var i = 0;
    
    // function scrollingText() {
 
    //     let texte = textNodes[0].text
    //     if (i < texte.length) {
    //         document.getElementById("textBox").innerHTML += texte.charAt(i);
    //         i++;

    //         setTimeout(scrollingText, speed);

    //     }
    // }
    // scrollingText();

///////// MORE ADVANCE /////////
    

    // maybe put everything inside a setInterval for infinite looping?
    let texte;
    var speed = 50;
    
    function scrollingText() {

        for (let index = 0; index < textNodes[index].text; index++) {
            texte = textNodes[index].text
            let i = 0
                while (i < texte.length) {
                    document.getElementById("textBox").innerHTML += texte.charAt(i);
                    i++;
                    setTimeout(scrollingText, speed);
                }
                document.getElementById("textBox").innerHTML = "";
        }
        setInterval(() => {
            
        }, 500);
    }
    scrollingText();



    // function showTextNode(index) {
    //     // Fait passer d'un node à l'autre à l'aide de textNode.id
    //     let i = 0;
    //     const textNode = textNodes.find(element => element.id === index);
    //     messageContainer.innerText = textNode.text[i];

    //     setTimeout(100, i => {
    //         messageContainer.innerText = textNode.text.charAt[i];
    //         i++
    //     })
    // }

    // showTextNode(1);
});





// function displayText(text) {
//     const displayBox = document.getElementById("textBox")
//     for (let i = 0; i < text.length; i++) {
//         displayBox.append(text[i++])
//     }
// }


// This is a loop over all the "a" elements of layout.hbs
// Will replace it with a sound to clean my code there

// window.addEventListener("load", function () {
//     var soundOnButton = document.querySelectorAll("a");
//     soundOnButton.forEach(element => {
//         element.onclick = function () {
//             element.style.backgroundColor = "red"
//         }
//     })
// });

// ---------------------------------------------------------

// Tring to get the howler work:

// import { Howl, Howler } from 'howler';

// window.addEventListener("load", function () {
//     const { Howl, Howler } = require('howler');
//     const soundOnButton = document.querySelector('a')

//     soundOnButton.onclick = function () {
//         var soundButton = new Howl({
//             src: ['../sounds/clicksound.mp3'],
//             volume: 5,
//         });
//         soundButton.play();
//     };
// });