// Fungsi untuk menampilkan catatan
function displayNotes() {
    fetch('/notes')
        .then(response => response.json())
        .then(data => {
            const notesDisplay = document.getElementById('notesDisplay');
            const totalNotes = document.getElementById('totalNotes');

            totalNotes.textContent = `Total: ${data.length}`;
            notesDisplay.innerHTML = ""; // Kosongkan daftar catatan

            // Tambahkan setiap catatan ke daftar
            data.forEach((note, index) => {
                const li = document.createElement('li');
                li.textContent = note.content;

                // Buat tombol hapus
                const deleteBtn = document.createElement('button');
                deleteBtn.classList.add('delete-btn');
                deleteBtn.textContent = "Delete";
                deleteBtn.onclick = () => deleteNote(note._id);

                // Tambahkan tombol hapus ke item daftar
                li.appendChild(deleteBtn);
                notesDisplay.appendChild(li);
            });
        });
}

// Fungsi untuk menyimpan catatan ke server
function saveNote() {
    const noteInput = document.getElementById('noteInput').value;
    if (noteInput.trim() === "") {
        alert("Catatan tidak boleh kosong!");
        return;
    }

    fetch('/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: noteInput })
    })
    .then(response => response.json())
    .then(() => {
        document.getElementById('noteInput').value = ""; // Kosongkan input
        displayNotes(); // Perbarui tampilan catatan
    });
}

// Fungsi untuk menghapus catatan
function deleteNote(id) {
    fetch(`/notes/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        displayNotes(); // Perbarui tampilan catatan
    });
}

// Fungsi untuk menghapus semua catatan
function confirmClearNotes() {
    if (confirm("Anda yakin ingin menghapus semua catatan?")) {
        fetch('/notes', {
            method: 'DELETE'
        })
        .then(() => displayNotes()); // Perbarui tampilan catatan
    }
}

// Memuat dan menampilkan catatan saat halaman pertama kali dimuat
document.addEventListener('DOMContentLoaded', displayNotes);
