const newNoteBtn = document.querySelector('.js-btn-new-note');
const allNotesBtn = document.querySelector('.js-btn-all-notes');
const archiveBtn = document.querySelector('.btn-archive');

const saveBtn = document.querySelector('.js-btn-save');

newNoteBtn.addEventListener('click', () => {
  renderNoteHTML()
});

const notes = [{
  title: 'Project ideas',
  date: 'Oct 12',
  time: '09:32',
  script: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit doloribus eum doloremque magnam, repellat quos quas nam dignissimos. Rerum vel porro earum dignissimos cumque ratione officiis, ad nihil itaque pariatur.',
  id:'1'
}, {
  title: 'Books to read',
  date: 'Oct 09',
  time: '19:40',
  script: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit doloribus eum doloremque magnam, repellat quos quas nam dignissimos. Rerum vel porro earum dignissimos cumque ratione officiis, ad nihil itaque pariatur.',
  id:'2'
}, {
  title: 'Study React',
  date: 'Sep 25',
  time: '14:05',
  script: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit doloribus eum doloremque magnam, repellat quos quas nam dignissimos. Rerum vel porro earum dignissimos cumque ratione officiis, ad nihil itaque pariatur.',
  id:'3'
}];


function renderNoteHTML() {
  const noteBoxElem = document.querySelector('.js-note-box');
  
  let noteHtml ='';

  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
    noteHtml += `
    <button class="btn-note">
    <h3>${note.title}</h3>
    <p>${note.date} - ${note.time}</p>
    </button>
  `;
  }
  noteBoxElem.innerHTML = noteHtml;
}

saveBtn.addEventListener('click', () => {
  saveNote();
  renderNoteHTML();
})

function saveNote() {
  const noteInputElem = document.querySelector('.js-title-input');
  const noteTextInputElem = document.querySelector('.js-textbox');
  const id = crypto.randomUUID();
  const script = noteTextInputElem.value;
  const title = noteInputElem.value;

  if (notes[notes.length -1].title === title || notes[notes.length -1].script === script) return;
  notes.push({title, script, id});

  addNote();
}

function addNote() {
  
}

