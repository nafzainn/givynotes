<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Catatan Publik</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h2>Catatan Publik</h2>
        <div id="notesList">
            <h3>
                Daftar Catatan:
                <span id="totalNotes">Total: 0</span>
            </h3>
            <ul id="notesDisplay"></ul>
        </div>

        <input type="text" id="noteInput" placeholder="Tulis catatan di sini...">
        <button onclick="saveNote()">Simpan Catatan</button>
        <button onclick="confirmClearNotes()">Hapus Semua Catatan</button>
    </div>

    <script src="script.js"></script>
</body>
</html>
