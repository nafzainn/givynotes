// Fungsi untuk menampilkan catatan dari localStorage dan memperbarui total catatan
function displayNotes() {
    const notes = JSON.parse(localStorage.getItem('notesList')) || [];
    const notesDisplay = document.getElementById('notesDisplay');
    const totalNotes = document.getElementById('totalNotes');

    // Tampilkan jumlah total catatan
    totalNotes.textContent = `Total: ${notes.length}`;

    notesDisplay.innerHTML = ""; // Kosongkan daftar catatan

    // Tambahkan setiap catatan ke daftar
    notes.forEach((note, index) => {
        const li = document.createElement('li');
        li.textContent = note;

        // Buat tombol hapus dengan teks
        const deleteBtn = document.createElement('button-delete');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteNote(index);

        // Tambahkan tombol hapus ke item daftar
        li.appendChild(deleteBtn);
        notesDisplay.appendChild(li);
    });
}

// Fungsi untuk menyimpan catatan ke localStorage
function saveNote() {
    const noteInput = document.getElementById('noteInput').value;
    if (noteInput.trim() === "") {
        swal("Peringatan", "Catatan tidak boleh kosong!", "warning");
        return;
    }

    const notes = JSON.parse(localStorage.getItem('notesList')) || [];
    notes.push(noteInput); // Tambahkan catatan baru ke array
    localStorage.setItem('notesList', JSON.stringify(notes));
    document.getElementById('noteInput').value = ""; // Kosongkan input
    displayNotes(); // Perbarui tampilan catatan
}

// Fungsi untuk menghapus catatan berdasarkan indeks
function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem('notesList')) || [];
    notes.splice(index, 1); // Hapus catatan di posisi indeks
    localStorage.setItem('notesList', JSON.stringify(notes));
    displayNotes(); // Perbarui tampilan catatan
}

// Fungsi konfirmasi penghapusan semua catatan
function confirmClearNotes() {
    const notes = JSON.parse(localStorage.getItem('notesList')) || [];
    if (notes.length === 0) {
        // Jika tidak ada catatan, tampilkan pesan
        swal("Info", "Tidak ada catatan yang dapat dihapus!", "info");
        return;
    }

    // Jika ada catatan, tampilkan konfirmasi hapus
    swal({
        title: "Anda Yakin?",
        text: "Semua catatan akan dihapus!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#e74c3c",
        confirmButtonText: "Ya, Hapus!",
        cancelButtonText: "Batal"
    }, function() {
        clearNotes();
    });
}

// Fungsi untuk menghapus semua catatan dari localStorage
function clearNotes() {
    localStorage.removeItem('notesList');
    displayNotes();
    swal("Sukses!", "Semua catatan berhasil dihapus!", "success");
}

// Memuat dan menampilkan catatan saat halaman pertama kali dimuat
document.addEventListener('DOMContentLoaded', displayNotes);
