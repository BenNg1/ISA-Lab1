class Reader {
    constructor(notesContainerId, timestampLabelId) {
        this.notesContainer = document.getElementById(notesContainerId);
        this.timestampLabel = document.getElementById(timestampLabelId);
    }

    renderNotes() {
        this.notesContainer.innerHTML = "";

        const notes = NoteStorage.loadNotes();
        notes.forEach(note => {
            const p = document.createElement("p");
            p.textContent = note.content;
            p.className = "border p-2 mb-2";
            this.notesContainer.appendChild(p);
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

// Instantiate and start the reader
const reader = new Reader("readerNotes", "lastRetrieved");
reader.startAutoRefresh(2000);
