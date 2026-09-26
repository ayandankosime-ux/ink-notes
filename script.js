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
    "id": "6",
    "title": "Gift Ideas for Mom",
    "date": "Oct 16",
    "time": "21:10",
    "category": "Personal",
    "script": "Mom's birthday is coming up next month. She mentioned last week that her current gardening gloves are completely worn through, so maybe a high-quality leather pair? Pair it with that specific indoor bonsai kit she was looking at on Amazon. If that falls through, Sarah suggested getting her a gift card to her favorite spa downtown.",
    "lastEdited": "21:18",
    "characters": "327",
    "tag": "ideas"
  },
  {
    "id": "7",
    "title": "Project Brainstorming",
    "date": "Oct 17",
    "time": "11:05",
    "category": "Work",
    "script": "Random thought for the Q4 marketing campaign: instead of doing the usual email blast, we should build a short interactive quiz for users to find their design style. It drives way better engagement. Need to pitch this to David on Monday. Rough outline: 5 questions max, simple animations, leads directly to our curated product collections.",
    "lastEdited": "11:42",
    "characters": "334",
    "tag": "work"
  },
  {
    "id": "8",
    "title": "Gym Routine Changes",
    "date": "Oct 18",
    "time": "06:40",
    "category": "Health",
    "script": "Switching things up because my shoulders have been feeling super tight lately. Going to drop the heavy overhead presses for a couple of weeks and focus purely on mobility and incline dumbbell work instead. Remember to do at least 10 minutes of dynamic stretching before lifting, no skipping it just because I'm running late in the mornings.",
    "lastEdited": "06:45",
    "characters": "334",
    "tag": "personal"
  },
];

document.querySelector('.js-work-tag').addEventListener('click', () => {
  filterNotes('work');
});

document.querySelector('.js-personal-tag').addEventListener('click', () => {
  filterNotes('personal');
});

document.querySelector('.js-ideas-tag').addEventListener('click', () => {
  filterNotes('ideas');
});

let isTagSelected = true;

isTagSelected ? filterNotes() : renderNotes();

function filterNotes(tag) {

  const filteredNotes = notes.filter(note => note.tag === `${tag}`);

  let noteHtml ='';

  for (let i = 0; i < filteredNotes.length; i++) {
    const note = filteredNotes[i];
      noteHtml += `
      <button class="btn-note border-${note.tag}" onclick="selectedNote(${i})">
      <h3>${note.title || 'Untitled Note'}</h3>
      <p>${note.date} - ${note.time}</p>
      </button>
    `;
  }
  
  noteBoxElem.innerHTML = noteHtml;
}

function renderNotes() {
  
  let noteHtml ='';

  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
      noteHtml += `
      <button class="btn-note border-${note.tag}" onclick="selectedNote(${i})">
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

function saveNote() {
  const script = noteTextInputElem.value;
  const title = noteInputElem.value;
  const date = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit'});
  const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  const characters = noteTextInputElem.value.length;
  if (!title && !script) return;

  const isNewNote = currentNote === null;

  const tag = document.querySelector('.js-btn-tag').value;

  if (!isNewNote) {
    notes[currentNote].title = title;
    notes[currentNote].script = script;
    notes[currentNote].date = date;
    notes[currentNote].time = time;
    notes[currentNote].characters = notes[currentNote].script.length;
    notes[currentNote].tag = tag;
    tag ? notes[currentNote].tag = tag : notes[currentNote].tag = 'personal';
    const [ editedNote ] = notes.splice(currentNote, 1);
    notes.unshift(editedNote);

  } else {
    const id = crypto.randomUUID();
    notes.unshift({title, script, id, time, date, characters, tag});
    
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

  noteInfo.innerHTML = `Created ${notes[currentNote].date} - ${notes[currentNote].characters} characters - Last edited ${notes[currentNote].time} <span class="tag tag-${notes[currentNote].tag}">#${notes[currentNote].tag}</span>`;
}

function selectedNote(chosenNote) {
  currentNote = chosenNote;

  noteInputElem.value = notes[currentNote].title;
  noteTextInputElem.value = notes[currentNote].script;
  renderNoteInfo(currentNote);
}