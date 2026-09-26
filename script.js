const newNoteBtn = document.querySelector('.js-btn-new-note');
const allNotesBtn = document.querySelector('.js-btn-all-notes');
const archiveBtn = document.querySelector('.btn-archive');
const noteBoxElem = document.querySelector('.js-note-box');
const saveBtn = document.querySelector('.js-btn-save');
const deleteBtn = document.querySelector('.js-btn-delete');
const noteInputElem = document.querySelector('.js-title-input');
const noteTextInputElem = document.querySelector('.js-textbox');
const noteInfo = document.querySelector('.js-note-info-text');

let currentNote = null;


const savedData = localStorage.getItem('userData');
const notes = savedData ? JSON.parse(savedData) : [
  {
    "id": "4",
    "title": "Grocery & Meal Prep",
    "date": "Oct 15",
    "time": "08:15",
    "category": "Daily",
    "script": "Need to grab groceries for the week after work. Making that lemon herb chicken and roasted veggies for meal prep. Don't forget: chicken breasts, broccoli, sweet potatoes, lemons, and Greek yogurt for breakfast. Also need extra olive oil since we ran out last night. Oh, and pick up some of those coffee pods if they are on sale.",
    "lastEdited": "08:22",
    "characters": "321"
  },
  {
    "id": "5",
    "title": "Car Sounds / Mechanic",
    "date": "Oct 15",
    "time": "14:30",
    "category": "Errands",
    "script": "The front passenger side started making this weird clicking sound when I turn the steering wheel all the way to the left, especially at low speeds like in parking lots. Need to call the mechanic tomorrow morning to get it looked at before the weekend trip. Hope it's just a loose plastic shield and not the CV joint again.",
    "lastEdited": "14:35",
    "characters": "323"
  },
  {
    "id": "6",
    "title": "Gift Ideas for Mom",
    "date": "Oct 16",
    "time": "21:10",
    "category": "Personal",
    "script": "Mom's birthday is coming up next month. She mentioned last week that her current gardening gloves are completely worn through, so maybe a high-quality leather pair? Pair it with that specific indoor bonsai kit she was looking at on Amazon. If that falls through, Sarah suggested getting her a gift card to her favorite spa downtown.",
    "lastEdited": "21:18",
    "characters": "327"
  },
  {
    "id": "7",
    "title": "Project Brainstorming",
    "date": "Oct 17",
    "time": "11:05",
    "category": "Work",
    "script": "Random thought for the Q4 marketing campaign: instead of doing the usual email blast, we should build a short interactive quiz for users to find their design style. It drives way better engagement. Need to pitch this to David on Monday. Rough outline: 5 questions max, simple animations, leads directly to our curated product collections.",
    "lastEdited": "11:42",
    "characters": "334"
  },
  {
    "id": "8",
    "title": "Gym Routine Changes",
    "date": "Oct 18",
    "time": "06:40",
    "category": "Health",
    "script": "Switching things up because my shoulders have been feeling super tight lately. Going to drop the heavy overhead presses for a couple of weeks and focus purely on mobility and incline dumbbell work instead. Remember to do at least 10 minutes of dynamic stretching before lifting, no skipping it just because I'm running late in the mornings.",
    "lastEdited": "06:45",
    "characters": "334"
  },
  {
    "id": "9",
    "title": "Packing List (Weekend)",
    "date": "Oct 19",
    "time": "19:50",
    "category": "Travel",
    "script": "Quick list for the cabin trip so I don't leave anything behind: hiking boots, thick wool socks, raincoat (check the weather app Friday morning), portable power bank, chargers, switch, toiletries, and that warm flannel jacket. Need to grab the board games from the closet too—Catan and Secret Hitler are a must for rainy nights.",
    "lastEdited": "20:05",
    "characters": "325"
  },
  {
    "id": "10",
    "title": "Landlord Call Notes",
    "date": "Oct 20",
    "time": "10:15",
    "category": "Finance",
    "script": "Spoke with Mark about renewing the lease. He said rent is going up by 3% starting in December, which honestly isn't as bad as I thought it would be. He's going to send over the updated digital contract by Thursday. I need to make sure he includes the clause about fixing the hallway radiator before winter starts though.",
    "lastEdited": "10:22",
    "characters": "315"
  }
];

renderNotes();

function renderNotes() {

  
  let noteHtml ='';

  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
      noteHtml += `
      <button class="btn-note" onclick="selectedNote(${i})">
      <h3>${note.title || 'Untitled Note'}</h3>
      <p>${note.date} - ${note.time}</p>
      </button>
    `;

    
  }

  
  noteBoxElem.innerHTML = noteHtml;
}

newNoteBtn.addEventListener('click', () => {
  saveNote();
});

saveBtn.addEventListener('click', () => {
  saveNote();
})

function clearNoteInput() {
  noteInputElem.value = '';
  noteTextInputElem.value = '';
  currentNote = null;
  noteInfo.innerHTML = '';
}

function saveNote() {
  const script = noteTextInputElem.value;
  const title = noteInputElem.value;
  const date = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit'});
  const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  const characters = noteTextInputElem.value.length;
  if (!title && !script) return;

  const isNewNote = currentNote === null;

  if (!isNewNote) {
    notes[currentNote].title = title;
    notes[currentNote].script = script;
    notes[currentNote].date = date;
    notes[currentNote].time = time;
    notes[currentNote].characters = notes[currentNote].script.length;
    const [ editedNote ] = notes.splice(currentNote, 1);
    notes.unshift(editedNote);

  } else {
    const id = crypto.randomUUID();
    notes.unshift({title, script, id, time, date, characters});
    
  }

  localStorage.setItem('userData', JSON.stringify(notes));
  currentNote = null;
  clearNoteInput();
  renderNotes();
  renderNoteInfo();

  if (isNewNote) {
    noteBoxElem.scrollTop = 0;
  }
}

deleteBtn.addEventListener('click', () => {
  deleteNote();
});

function deleteNote() {
  if (currentNote !== null) {
    notes.splice(currentNote, 1);
    localStorage.setItem('userData', JSON.stringify(notes));
    clearNoteInput();
    renderNotes();
  }

  saveNote();
}

function renderNoteInfo(index) {
  if (!noteInputElem.value && !noteTextInputElem.value) return;

  noteInfo.innerHTML = `Created ${notes[currentNote].date} - ${notes[currentNote].characters} characters - Last edited ${notes[currentNote].time}`;
}

function selectedNote(chosenNote) {
  currentNote = chosenNote;

  noteInputElem.value = notes[currentNote].title;
  noteTextInputElem.value = notes[currentNote].script;
  renderNoteInfo(currentNote);
}

