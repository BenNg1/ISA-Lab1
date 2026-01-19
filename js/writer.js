class Writer {
    constructor(containerId, addButtonId, timestampLabelId) {
        this.notesContainer = document.getElementById(containerId);
        this.addNoteButton = document.getElementById(addButtonId);
        this.lastSavedLabel = document.getElementById(timestampLabelId);

        this.notes = [];

        this.addNoteButton.addEventListener("click", () => {
            this.addNote(Date.now(), "");
        });

        this.loadExistingNotes();

        // Autosave every 2 seconds
        setInterval(() => this.persistNotes(), 2000);
    }

    addNote(id, content) {
        const note = new Note(id, content, this.notesContainer, (id) => this.removeNote(id));
        this.notes.push(note);
        note.render();
    }

    removeNote(id) {
        this.notes = this.notes.filter(note => note.id !== id);
        this.persistNotes();
    }

    persistNotes() {
        const data = this.notes.map(note => note.toJSON());
        const time = NoteStorage.saveNotes(data);
        this.lastSavedLabel.textContent = `${MSG_LAST_SAVED} ${time}`;
    }

    loadExistingNotes() {
        const storedNotes = NoteStorage.loadNotes();
        storedNotes.forEach(n => this.addNote(n.id, n.content));

        const time = NoteStorage.getLastSavedTime();
        if (time) {
            this.lastSavedLabel.textContent = `${MSG_LAST_SAVED} ${time}`;
        }
    }
}

// Instantiate the Writer page
const writer = new Writer("notesContainer", "addNoteBtn", "lastSaved");
