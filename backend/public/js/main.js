$(document).ready(function() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
    }

    $('#logout').click(function() {
        localStorage.removeItem('token');
        window.location.href = 'login.html';
    });

    $('#createNote').click(function() {
        const title = $('#title').val();
        const content = $('#content').val();
        const tags = $('#tags').val().split(',');
        const backgroundColor = $('#backgroundColor').val();
        
        $.ajax({
            url: 'http://localhost:5000/api/notes',
            type: 'POST',
            headers: { 'x-auth-token': token },
            contentType: 'application/json',
            data: JSON.stringify({ title, content, tags, backgroundColor }),
            success: function(note) {
                displayNote(note);
            },
            error: function(error) {
                alert('Error creating note');
            }
        });
    });

    function loadNotes() {
        $.ajax({
            url: 'http://localhost:5000/api/notes',
            type: 'GET',
            headers: { 'x-auth-token': token },
            success: function(notes) {
                notes.forEach(note => {
                    displayNote(note);
                });
            },
            error: function(error) {
                alert('Error loading notes');
            }
        });
    }

    function displayNote(note) {
        $('#notes').append(`
            <div class="note" style="background-color: ${note.backgroundColor}">
                <h3>${note.title}</h3>
                <p>${note.content}</p>
                <p>Tags: ${note.tags.join(', ')}</p>
            </div>
        `);
    }

    loadNotes();
});
