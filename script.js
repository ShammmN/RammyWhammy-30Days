let currentDay = 1;
let timeOfDay = 0; // 0: Morning, 1: Afternoon, 2: Evening
let spirit = 50;
const times = ["Morning", "Afternoon", "Evening"];

const locations = {
    house: { 
        bg: "https://i.pinimg.com/1200x/45/8a/c0/458ac0146d7f8f502432ebd8a2b5203c.jpg",
        story: ["Quiet house... should I study or sleep?", "Kitchen prep is starting!", "Maghrib is almost here."]
    },
    mosque: {
        bg: "https://i.pinimg.com/736x/10/23/db/1023dbabf8efd1d838455991909ec75c.jpg",
        story: ["Early morning peace.", "Afternoon lecture is starting.", "Taraweeh prep!"]
    },
    // ... add other BGs for school, mall, etc.
};

function goTo(locKey) {
    const loc = locations[locKey];
    let text = loc.story[timeOfDay];
    let choices = [
        { text: "Do it with excellence (Ihsan)", change: +10, next: "You feel accomplished." },
        { text: "Just get through it", change: -5, next: "You're tired, but it's done." }
    ];

    // THE "INTERESTING" LOGIC: EVERY 3 DAYS
    if (currentDay % 3 === 0 && timeOfDay === 1) {
        text = `🌟 SPECIAL EVENT: It's Day ${currentDay}! `;
        if (currentDay === 3) text += "There's a massive Charity Bazaar at the Mosque today!";
        if (currentDay === 6) text += "The weather is beautiful; everyone is heading to the park.";
        if (currentDay === 9) text += "It's the first big family Iftar. The house is chaotic!";
        
        choices = [
            { text: "Go all out!", change: +20, next: "What a memorable day!" },
            { text: "Keep it lowkey", change: +5, next: "You saved your energy." }
        ];
    }

    render(loc.bg, text, choices);
}

function render(bg, text, choices) {
    document.getElementById('scene-bg').style.backgroundImage = `url(${bg})`;
    document.getElementById('sarah-sprite').style.display = 'block';
    document.getElementById('dialogue-container').style.display = 'block';
    document.getElementById('map-ui').style.display = 'none';
    document.getElementById('dialogue-text').innerText = text;
    
    // Update Stats
    document.getElementById('day-display').innerText = `Day ${currentDay}`;
    document.getElementById('time-display').innerText = times[timeOfDay];
    document.getElementById('spirit-display').innerText = `Spirit: ${spirit}%`;

    const cb = document.getElementById('choices-box');
    cb.innerHTML = '';
    choices.forEach(c => {
        const b = document.createElement('button');
        b.className = 'choice-btn';
        b.innerText = c.text;
        b.onclick = () => {
            spirit += c.change;
            advance(c.next);
        };
        cb.appendChild(b);
    });
}

function advance(msg) {
    document.getElementById('dialogue-text').innerText = msg;
    const cb = document.getElementById('choices-box');
    cb.innerHTML = '';
    const b = document.createElement('button');
    b.className = 'choice-btn';
    b.innerText = "Continue...";
    b.onclick = () => {
        if (timeOfDay < 2) {
            timeOfDay++;
            resetMap();
        } else {
            showIftar();
        }
    };
    cb.appendChild(b);
}

function showIftar() {
    document.getElementById('iftar-overlay').style.display = 'flex';
}

function nextDay() {
    currentDay++;
    timeOfDay = 0;
    document.getElementById('iftar-overlay').style.display = 'none';
    resetMap();
}

function resetMap() {
    document.getElementById('sarah-sprite').style.display = 'none';
    document.getElementById('map-ui').style.display = 'grid';
    document.getElementById('dialogue-container').style.display = 'none';
}
