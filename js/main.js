// Speech API
const synth = window.speechSynthesis;

// DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');


//Init the voices Array
let voices = [];

const getVoices = () => {
    voices      = synth.getVoices();
    // Loop through each one
    voices.forEach(voice => {
        // Create Option
        const option = document.createElement('option');
        // Fill option with the Voice/Language
        option.textContent = voice.name + '(' + voice.lang + ')';

        // Set needed option attributes
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);

        voiceSelect.appendChild(option);
        
    });
};

getVoices();
if (synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getVoices;
}

// Speak
const speak = () =>{
    


    // Check if it already speaking!!!
    if(synth.speaking){
        console.error('Already Speaking ...');
        return;
    }

    if(textInput.value !== ''){
        // Add Background Animation   
        body.style.background = '#141414 url(/img/wave.gif)';
        body.style.backgroundRepeat = 'repeat-x';
        body.style.backgroundSize = '100% 100%';

        // Get Speak Text
        const speakText = new SpeechSynthesisUtterance(textInput.value);

        speakText.onend = e => {
            console.error('Done Speaking!');
            body.style.background = '#141414';
        }

        speakText.onerror = e =>{
            console.error('Something went wrong');
        }


        // Selected Voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        // Loop through Voices 
        voices.forEach( voice => {
            if(voice.name === selectedVoice){
                speakText.voice = voice;

            }
        });

        // Set Pitch & Rate
        speakText.rate  = rate.value;
        speakText.pitch = pitch.value;

        // Lunch the Action of SPEAK
        synth.speak(speakText);


    }
};

// EVENT LISTENSERS


// Text Form Submit
textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textInput.blur();
});

//Rate Value Change
rate.addEventListener('change', e => rateValue.textContent = rate.value);

//Pitch Value Change
pitch.addEventListener('change', e => pitchValue.textContent = pitch.value);

//Voice select Change
voiceSelect.addEventListener('change', e => {
    speak();
});