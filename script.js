let currentDay = 1;
let timeOfDay = 0; // 0:Morning, 1:Afternoon, 2:Evening
let spirit = 50;
const times = ["Morning", "Afternoon", "Evening"];

const locations = {
    house: { bg: "https://i.pinimg.com/1200x/45/8a/c0/458ac0146d7f8f502432ebd8a2b5203c.jpg", story: ["The house is so quiet while everyone is at work or school.", "Mom is starting the Iftar prep. Should I help her?", "The family is gathered around the table. Almost time!"] },
    school: { bg: "https://i.pinimg.com/736x/cb/93/99/cb939970e76bbe356300071a6f4f6117.jpg", story: ["The first bell rings. My stomach is already growling!", "Lunchtime. I'm hiding in the library to avoid the smell of food.", "Finally heading home. My brain feels like mush."] },
    mosque: { bg: "https://i.pinimg.com/736x/10/23/db/1023dbabf8efd1d838455991909ec75c.jpg", story: ["The morning light in the Masjid is so beautiful.", "A peaceful place to read while the world rushes by.", "The community is gathering for evening prayers."] },
    supermarket: { bg: "https://i.pinimg.com/736x/4f/c8/33/4fc833a1610d8d04b1d2c7b755f18c12.jpg", story: ["Grocery run for some fresh fruit.", "Everyone is panic-buying dates! It's a madhouse.", "Grabbing the last bottle of Vimto before the rush."] },
    mall: { bg: "https://i.pinimg.com/736x/76/45/80/76458086d0083f3100d5562d62514e87.jpg", story: ["The mall is empty this early. Perfect for window shopping.", "Checking out the new Eid collections. Everything is so bright!", "Meeting friends for some evening Eid prep."] },
    suhoorfest: { bg: "https://i.pinimg.com/736x/83/75/74/8375748863c3f5f04b3c7e9d6d0e9741.jpg", story: ["Just workers setting up for the big night.", "The stalls are getting ready for the late-night crowd.", "Fairy lights and crowds—Suhoorfest is at its peak!"] }
};

function goTo(locKey) {
    const loc = locations[locKey];
    let text = loc.story[timeOfDay];
    let choices = [{ text: "Push through it", change: 5, next: "You did it! Your discipline is growing." }, { text: "Take it easy", change: 2, next: "Self-care is important too." }];

    // SPECIAL EVENTS EVERY 3 DAYS
    if (currentDay % 3 === 0 && timeOfDay === 1) {
        if (currentDay === 3) { text = "⭐ EVENT: The Mosque Charity Bake Sale is happening! Do you help out?"; }
        if (currentDay === 6) { text = "⭐ EVENT: A sudden rainstorm! All the plans changed. Do you host a game night at home?"; }
        if (currentDay === 9) { text = "⭐ EVENT: You found a stray kitten outside school. Do you take it to the shelter?"; }
        choices = [{ text: "Yes! Let's do it!", change: 15, next: "That was so rewarding!" }, { text: "Maybe next time", change: 0, next: "You decide to rest instead." }];
    }

    render(loc.bg, text, choices);
}

function render(bg, text, choices) {
    document.getElementById('scene-bg').style.backgroundImage = `url(${bg})`;
    document.getElementById('sarah-sprite').style.display = 'block';
    document.getElementById('dialogue-container').style.display = 'block';
    document.getElementById('map-ui').style.display = 'none';
    document.getElementById('dialogue-text').innerText = text;
    document.getElementById('day-display').innerText = `Day ${currentDay}`;
    document.getElementById('time-display').innerText = times[timeOfDay];
    document.getElementById('spirit-display').innerText = `Spirit: ${spirit}%`;

    const cb = document.getElementById('choices-box');
    cb.innerHTML = '';
    choices.forEach(c => {
        const b = document.createElement('button');
        b.className = 'choice-btn';
        b.innerText = c.text;
        b.onclick = () => { spirit += c.change; advance(c.next); };
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
    b.onclick = () => { if (timeOfDay < 2) { timeOfDay++; resetMap(); } else { showIftar(); } };
    cb.appendChild(b);
}

function showIftar() { document.getElementById('iftar-overlay').style.display = 'flex'; }
function nextDay() { currentDay++; timeOfDay = 0; document.getElementById('iftar-overlay').style.display = 'none'; resetMap(); }
function resetMap() { document.getElementById('sarah-sprite').style.display = 'none'; document.getElementById('map-ui').style.display = 'grid'; document.getElementById('dialogue-container').style.display = 'none'; }
