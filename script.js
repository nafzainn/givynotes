// Import Firebase libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Konfigurasi Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBjGL7hkiXUGvCVBPfXQ8hL-YUykxcJdJQ",
    authDomain: "publicnote-b4d49.firebaseapp.com",
    projectId: "publicnote-b4d49",
    storageBucket: "publicnote-b4d49.appspot.com",
    messagingSenderId: "113443073524",
    appId: "1:113443073524:web:a579f7e2c18c0764df9da1",
    measurementId: "G-R21M95RRY7"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fungsi untuk menampilkan catatan dari Firestore dan memperbarui total catatan
function displayNotes() {
    const notesDisplay = document.getElementById('notesDisplay');
    const totalNotes = document.getElementById('totalNotes');

    notesDisplay.innerHTML = ""; // Kosongkan daftar catatan

    db.collection("notes").get().then((querySnapshot) => {
        const notes = [];
        querySnapshot.forEach((doc) => {
            const li = document.createElement('li');
            li.textContent = doc.data().note;
            notes.push(doc.id); // Menyimpan ID dokumen

            // Buat tombol hapus
            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-btn');
            deleteBtn.textContent = "Hapus";
            deleteBtn.onclick = () => deleteNote(doc.id); // Gunakan ID dokumen untuk menghapus

            // Tambahkan tombol hapus ke item daftar
            li.appendChild(deleteBtn);
            notesDisplay.appendChild(li);
        });

        // Tampilkan jumlah total catatan
        totalNotes.textContent = `Total: ${notes.length}`;
    });
}

// Fungsi untuk menyimpan catatan ke Firestore
function saveNote() {
    const noteInput = document.getElementById('noteInput').value;
    if (noteInput.trim() === "") {
        swal("Peringatan", "Catatan tidak boleh kosong!", "warning");
        return;
    }

    // Menyimpan catatan ke Firestore
    db.collection("notes").add({
        note: noteInput
    })
    .then(() => {
        document.getElementById('noteInput').value = ""; // Kosongkan input
        displayNotes(); // Perbarui tampilan catatan
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}

// Fungsi untuk menghapus catatan berdasarkan ID dokumen
function deleteNote(id) {
    db.collection("notes").doc(id).delete().then(() => {
        displayNotes(); // Perbarui tampilan catatan
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}

// Fungsi konfirmasi penghapusan semua catatan
function confirmClearNotes() {
    db.collection("notes").get().then((querySnapshot) => {
        if (querySnapshot.empty) {
            swal("Info", "Tidak ada catatan yang dapat dihapus!", "info");
            return;
        }

        swal({
            title: "Anda Yakin?",
            text: "Semua catatan akan dihapus!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#e74c3c",
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal"
        }).then((willDelete) => {
            if (willDelete) {
                clearNotes();
            }
        });
    });
}

// Fungsi untuk menghapus semua catatan dari Firestore
function clearNotes() {
    const notes = db.collection("notes");

    notes.get().then((querySnapshot) => {
        const batch = db.batch();
        querySnapshot.forEach((doc) => {
            batch.delete(doc.ref);
        });
        return batch.commit();
    }).then(() => {
        displayNotes(); // Perbarui tampilan catatan
        swal("Sukses!", "Semua catatan berhasil dihapus!", "success");
    }).catch((error) => {
        console.error("Error clearing notes: ", error);
    });
}

// Memuat dan menampilkan catatan saat halaman pertama kali dimuat
document.addEventListener('DOMContentLoaded', displayNotes);

