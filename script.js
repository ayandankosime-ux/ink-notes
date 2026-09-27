const newNoteBtn = document.querySelector('.js-btn-new-note');

const archiveBtn = document.querySelector('.btn-archive');
const noteBoxElem = document.querySelector('.js-note-box');
const saveBtn = document.querySelector('.js-btn-save');
const deleteBtn = document.querySelector('.js-btn-delete');
const noteInputElem = document.querySelector('.js-title-input');
const noteTextInputElem = document.querySelector('.js-textbox');
const noteInfo = document.querySelector('.js-note-info-text');

let currentNote = null;

newNoteBtn.addEventListener('click', () => {
  clearNoteInput();
})

const savedData = localStorage.getItem('userData');
const notes = savedData ? JSON.parse(savedData) : [
  { 
    id: 1,
    title: "Gift Ideas for Mom", 
    date: "Oct 16", 
    time: "21:10", 
    category: "Personal", 
    script: "Mom's birthday is coming up next month. She mentioned last week that her current gardening gloves are completely worn through, so maybe a high-quality leather pair? Pair it with that specific indoor bonsai kit she was looking at on Amazon. If that falls through, Sarah suggested getting her a gift card to her favorite spa downtown.", 
    lastEdited: "21:18", 
    characters: 327, 
    tag: "ideas" 
  },
  { 
    id: 2,
    title: "Project Brainstorming", 
    date: "Oct 17", 
    time: "11:05", 
    category: "Work", 
    script: "Random thought for the Q4 marketing campaign: instead of doing the usual email blast, we should build a short interactive quiz for users to find their design style. It drives way better engagement. Need to pitch this to David on Monday. Rough outline: 5 questions max, simple animations, leads directly to our curated product collections.", 
    lastEdited: "11:42", 
    characters: 334, 
    tag: "work" 
  },
  { 
    id: 3,
    title: "Gym Routine Changes", 
    date: "Oct 18", 
    time: "06:40", 
    category: "Health", 
    script: "Switching things up because my shoulders have been feeling super tight lately. Going to drop the heavy overhead presses for a couple of weeks and focus purely on mobility and incline dumbbell work instead. Remember to do at least 10 minutes of dynamic stretching before lifting, no skipping it just because I'm running late in the mornings.", 
    lastEdited: "06:45", 
    characters: 334, 
    tag: "personal" 
  },
  { 
    id: 4,
    title: "Weekly Grocery List", 
    date: "Oct 19", 
    time: "17:20", 
    category: "Personal", 
    script: "Need to stock up on essentials for the week ahead. Grab almond milk, cold brew concentrate, avocados, chicken breasts, and a large bag of spinach for smoothies. Check if we need more olive oil or Himalayan pink salt before heading to the checkout lane. Don't forget the biodegradable trash bags this time.", 
    lastEdited: "17:35", 
    characters: 297, 
    tag: "personal" 
  },
  { 
    id: 5,
    title: "Book Recommendations", 
    date: "Oct 20", 
    time: "14:15", 
    category: "Leisure", 
    script: "Mark highly recommended reading 'Tomorrow, and Tomorrow, and Tomorrow' for the narrative structure. Also need to finish 'Atomic Habits' before the month ends to stay on track with my routine goals. Check local library app tonight to see if either audio book version is available for immediate download.", 
    lastEdited: "14:22", 
    characters: 301, 
    tag: "personal" 
  },
  { 
    id: 6,
    title: "Code Bug Investigation", 
    date: "Oct 21", 
    time: "09:30", 
    category: "Work", 
    script: "The authentication token seems to expire prematurely on mobile Safari browsers. Users are getting booted to the login screen mid-session. Need to inspect the cookie storage configurations and verify if the SameSite attribute is causing hidden drops. Set up a debugging session with the backend team at 2 PM.", 
    lastEdited: "10:12", 
    characters: 317, 
    tag: "work" 
  },
  { 
    id: 7,
    title: "Car Maintenance Reminder", 
    date: "Oct 22", 
    time: "08:00", 
    category: "Personal", 
    script: "The dashboard oil change light just popped on. Mileage is hovering right around 45,000. Call the local dealership or the reliable mechanic down the street to book a standard synthetic oil swap and a quick tire rotation for Friday morning. Hopefully, they can squeeze me in early so I don't miss any work meetings.", 
    lastEdited: "08:15", 
    characters: 323, 
    tag: "personal" 
  }
];


renderNotes( notes );

function filterNotes(tag) {
  const filteredNotes = notes.filter(note => note.tag === `${tag}`);
  renderNotes(filteredNotes);
}

const searchInput = document.querySelector('.js-search-input');

searchInput.addEventListener('input', (event) => {
  const searchTerm = searchInput.value.toLowerCase().trim();

  const newNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(searchTerm) || note.script.toLowerCase().includes(searchTerm);
  });

  renderNotes(newNotes);
});

function renderNotes( array ) {
  let noteHtml ='';

  

  for (let i = 0; i < array.length; i++) {
    const note = array[i];
    const globalIndex = notes.indexOf(note);
      noteHtml += `
      <button class="btn-note border-${note.tag}" onclick="selectedNote(${globalIndex})">
      <h3>${note.title || 'Untitled Note'}</h3>
      <p>${note.date} - ${note.time}</p>
      </button>
    `;
  }
  
  noteBoxElem.innerHTML = noteHtml;
}

saveBtn.addEventListener('click', () => {
  saveNote();
})

function clearNoteInput() {
  noteInputElem.value = '';
  noteTextInputElem.value = '';
  currentNote = null;
  noteInfo.innerHTML = '';
}

const tag = document.querySelector('.js-btn-tag'); 


tag.addEventListener('change', (event) => {
  const chosenTag = event.target.value;
  console.log(chosenTag);
  
  if (currentNote !== null) {
    notes[currentNote].tag = chosenTag;
    localStorage.setItem('userData', JSON.stringify(notes));
    renderNotes(notes);
  }
});

function saveNote() {
  const script = noteTextInputElem.value;
  const title = noteInputElem.value;
  
  const chosenTag = document.querySelector('.js-btn-tag').value; 

  const date = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit'});
  const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  const characters = script.length;
  
  if (!title && !script) return;

  const isNewNote = currentNote === null;

  if (!isNewNote) {
    notes[currentNote].title = title;
    notes[currentNote].script = script;
    notes[currentNote].date = date;
    notes[currentNote].time = time;
    notes[currentNote].tag = chosenTag; 
    notes[currentNote].characters = characters;
    
    const [ editedNote ] = notes.splice(currentNote, 1);
    notes.unshift(editedNote);
  } else {
    const id = crypto.randomUUID();
    notes.unshift({title, script, time, date, characters, tag: chosenTag}); 
  }

  localStorage.setItem('userData', JSON.stringify(notes));
  
  currentNote = null;
  clearNoteInput();
  renderNotes( notes );
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
    renderNotes(notes);
  }
}

function renderNoteInfo(index) {
  if (!noteInputElem.value && !noteTextInputElem.value) return;

  noteInfo.innerHTML = `Created ${notes[currentNote].date} - ${notes[currentNote].characters} characters - Last edited ${notes[currentNote].time} <span class="tag tag-${notes[currentNote].tag}">#${notes[currentNote].tag}</span>`;
}

function selectedNote(chosenNote) {
  currentNote = chosenNote;

  noteInputElem.value = notes[currentNote].title;
  noteTextInputElem.value = notes[currentNote].script;
  renderNoteInfo(currentNote);
}



document.querySelector('.js-all-tag').addEventListener('click', () => {
renderNotes( notes );
});

document.querySelector('.js-work-tag').addEventListener('click', () => {
  filterNotes('work');
});

document.querySelector('.js-personal-tag').addEventListener('click', () => {
  filterNotes('personal');
});

document.querySelector('.js-ideas-tag').addEventListener('click', () => {
  filterNotes('ideas');
});