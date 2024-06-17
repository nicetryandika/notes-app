import { defineStore } from "pinia";

function dateNow () {
    const years = new Date().getFullYear()
    const month = (new Date().getMonth() + 1).toString().padStart(2, '0') // Bulan dimulai dari 0
    const day = new Date().getDate().toString().padStart(2, '0') // Gunakan getDate()
    return `${years}-${month}-${day}`
}

export const useUserStore = defineStore('user', {
    state: () => ({
        userNotes: [
            { id: 1, name: 'fikri', catatan: 'Hari ini saya makan', tanggal: dateNow()},
            { id: 2, name: 'Asep', catatan: 'Hari ini saya tidur', tanggal: dateNow()}
        ]
    }),
    actions: {
        addUserNote({ nama, catatan, tanggal }) {
            const id = this.userNotes.length + 1; // Pastikan ini menghasilkan id unik
            this.userNotes.push({ id, name: nama, catatan, tanggal });
        },
        removeUserNote(id) {
            this.userNotes = this.userNotes.filter(note => note.id !== id);
        },
        editUserNote(id, { nama, catatan, tanggal }) {
            const index = this.userNotes.findIndex(note => note.id === id);
            if (index !== -1) {
                this.userNotes[index] = { ...this.userNotes[index], name: nama, catatan, catatan, tanggal: tanggal || this.userNotes[index].tanggal };
            }
        }
    }
})
