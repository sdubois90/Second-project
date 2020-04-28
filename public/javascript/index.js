// window.addEventListener("load", function () {
//     var soundOnButton = document.querySelectorAll("a");
//     soundOnButton.forEach(element => {
//         element.onclick = function () {
//             element.style.backgroundColor = "red"
//         }
//     })
// });

// import { Howl, Howler } from 'howler';

window.addEventListener("load", function () {
    const { Howl, Howler } = require('howler');
    const soundOnButton = document.querySelector('a')

    soundOnButton.onclick = function () {
        var soundButton = new Howl({
            src: ['../sounds/clicksound.mp3'],
            volume: 5,
        });
        soundButton.play();
    };
});