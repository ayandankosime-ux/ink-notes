const newNoteBtn = document.querySelector('.js-btn-new-note');
const allNotesBtn = document.querySelector('.js-btn-all-notes');
const archiveBtn = document.querySelector('.btn-archive');

newNoteBtn.addEventListener('click', () => {
  renderNoteHTML()
});

const notes = [{
  title: 'Project ideas',
  date: 'Oct 12',
  time: '09:32'
}, {
  title: 'Books to read',
  date: 'Oct 09',
  time: '19:40'
}, {
  title: 'Study React',
  date: 'Sep 25',
  time: '14:05'
}]


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

function addNote() {

}