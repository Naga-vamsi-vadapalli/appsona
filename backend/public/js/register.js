$(document).ready(function() {
    $('#register').click(function() {
        const username = $('#username').val();
        const email = $('#email').val();
        const password = $('#password').val();

        $.ajax({
            url: 'http://localhost:5000/api/auth/register',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ username, email, password }),
            success: function(response) {
                localStorage.setItem('token', response.token);
                window.location.href = 'index.html';
            },
            error: function(error) {
                alert('Registration failed');
            }
        });
    });
});
