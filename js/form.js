function form_msg(status, message) {
    var formMessages = $('#form-messages');
    $(formMessages).css('display', 'block');
    $(formMessages).removeClass('bg-danger');
    $(formMessages).removeClass('bg-warn');
    $(formMessages).removeClass('bg-success');
    $(formMessages).addClass(status);
    $(formMessages).text(message);
}

$(function() {

    // Get the form.
    var form = $('#ajax-contact');

    // Set up an event listener for the contact form.
    $(form).submit(function(e) {
        // Stop the browser from submitting the form.
        e.preventDefault();

        // Serialize the form data.
        var formData = $(form).serialize();

        form_msg('bg-warn', 'Enviando el mensaje. Un momento');
        // Submit the form using AJAX.
        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formData
        })
        .done(function(response) {
            if (response.status == "success") {
                // Make sure that the formMessages div has the 'success' class.
                form_msg('bg-success', 'Mensaje enviado. Responderemos en breve');
            } else {
                // Make sure that the formMessages div has the 'success' class.
                form_msg('bg-danger', 'Mensaje no enviado. Por favor reinténtelo');
            }

            // Clear the form.
            $('#name, #email, #message').val('');
        })
        .fail(function(data) {
            // Make sure that the formMessages div has the 'error' class.
            form_msg('bg-danger', 'Oops! Hubo un error y no se pudo enviar su mensaje');
        });

    });

});