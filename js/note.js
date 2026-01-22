class Note {
    constructor(id, content, container, removeCallback) {
        this.id = id;
        this.container = container;
        this.removeCallback = removeCallback;

        this.textarea = document.createElement("textarea");
        this.textarea.value = content;

        this.removeButton = document.createElement("button");
        this.removeButton.textContent = MSG_REMOVE_NOTE;

        this.removeButton.addEventListener("click", () => {
            this.remove();
        });
    }

    render() {
        this.container.appendChild(this.textarea);
        this.container.appendChild(this.removeButton);
    }

    toJSON() {
        return {
            id: this.id,
            content: this.textarea.value
        };
    }

    remove() {
        this.textarea.remove();
        this.removeButton.remove();
        this.removeCallback(this.id);
    }
}
