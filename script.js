const newNoteBtn = document.querySelector('.js-btn-new-note');
const allNotesBtn = document.querySelector('.js-btn-all-notes');
const archiveBtn = document.querySelector('.btn-archive');
const noteBoxElem = document.querySelector('.js-note-box');
const saveBtn = document.querySelector('.js-btn-save');
const deleteBtn = document.querySelector('.js-btn-delete');
const noteInputElem = document.querySelector('.js-title-input');
const noteTextInputElem = document.querySelector('.js-textbox');

let currentNote = null;


const notes = [{
  title: 'Project ideas',
  date: 'Oct 12',
  time: '09:32',
  script: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit doloribus eum doloremque magnam, repellat quos quas nam dignissimos. Rerum vel porro earum dignissimos cumque ratione officiis, ad nihil itaque pariatur.',
  id:'1'
}];

renderNotes();

function renderNotes() {
  let noteHtml ='';

  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
      noteHtml += `
      <button class="btn-note" onclick="selectedNote(${i})">
      <h3>${note.title}</h3>
      <p>${note.date} - ${note.time}</p>
      </button>
    `;
  }
  noteBoxElem.innerHTML = '';
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
}

function saveNote() {
  const script = noteTextInputElem.value;
  const title = noteInputElem.value;

  if (!title && !script) return;

  if (currentNote !== null) {
    notes[currentNote].title = title;
    notes[currentNote].script = script;

  } else {
    const id = crypto.randomUUID();
    notes.push({title, script, id});

  }

  currentNote = null;
  clearNoteInput();
  renderNotes();
}

deleteBtn.addEventListener('click', () => {
  deleteNote();
});

function deleteNote() {
  if (currentNote !== null) {
    notes.splice(currentNote, 1);
    currentNote = null;
    
    clearNoteInput();
    renderNotes();
  }

  saveNote();
}

function selectedNote(chosenNote) {
  currentNote = chosenNote;

  noteInputElem.value = notes[currentNote].title;
  noteTextInputElem.value = notes[currentNote].script;
}