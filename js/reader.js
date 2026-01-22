class Reader {
    constructor(notesContainerId, timestampLabelId) {
        this.notesContainer = document.getElementById(notesContainerId);
        this.timestampLabel = document.getElementById(timestampLabelId);
    }

    renderNotes() {
        this.notesContainer.innerHTML = "";

        const notes = NoteStorage.loadNotes();

        notes.forEach(note => {
            const div = document.createElement("div");
            div.textContent = note.content;
            this.notesContainer.appendChild(div);
        });

        this.updateTimestamp();
    }

    updateTimestamp() {
        const time = new Date().toLocaleTimeString();
        this.timestampLabel.textContent = `${MSG_LAST_RETRIEVED} ${time}`;
    }

    startAutoRefresh(intervalMs) {
        this.renderNotes();
        setInterval(() => this.renderNotes(), intervalMs);
    }
}

// Create a reader object
const reader = new Reader("readerNotes", "lastRetrieved");
reader.startAutoRefresh(2000);
