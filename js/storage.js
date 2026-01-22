class NoteStorage {
    static NOTES_KEY = "lab1_notes";
    static TIME_KEY = "lab1_last_saved";

    // For the writer to build the notes array
    static saveNotes(noteArray) {
        const json = JSON.stringify(noteArray);
        localStorage.setItem(NoteStorage.NOTES_KEY, json);

        const time = new Date().toLocaleTimeString();
        localStorage.setItem(NoteStorage.TIME_KEY, time);
        return time;
    }

    // For the reader to retrieve the array of notes
    static loadNotes() {
        const json = localStorage.getItem(NoteStorage.NOTES_KEY);
        if (!json) {
            return [];
        }
        return JSON.parse(json);
    }

    static getLastSavedTime() {
        return localStorage.getItem(NoteStorage.TIME_KEY);
    }
}
