$(document).ready(function() {
    $('#login').click(function() {
        const email = $('#email').val();
        const password = $('#password').val();

        $.ajax({
            url: 'http://localhost:5000/api/auth/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ email, password }),
            success: function(response) {
                localStorage.setItem('token', response.token);
                window.location.href = 'index.html';
            },
            error: function(error) {
                alert('Login failed');
            }
        });
    });
});
