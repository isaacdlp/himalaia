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

        var msgSending = 'Enviando el mensaje. Un momento';
        var msgSuccess = 'Mensaje enviado. Responderemos en breve';
        var msgFailure = 'Mensaje no enviado. Por favor reinténtelo';
        var msgError = 'Oops! Hubo un error y no se pudo enviar su mensaje'

        msgSending = form.attr("msg-sending");
        msgSuccess = form.attr("msg-success");
        msgFailure = form.attr("msg-failure");
        msgError = form.attr("msg-error");

        form_msg('bg-warn', msgSending);
        // Submit the form using AJAX.
        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formData
        })
        .done(function(response) {
            if (response.status == "success") {
                // Make sure that the formMessages div has the 'success' class.
                form_msg('bg-success', msgSuccess);
            } else {
                // Make sure that the formMessages div has the 'success' class.
                form_msg('bg-danger', msgFailure);
            }

            // Clear the form.
            $('#name, #email, #message').val('');
        })
        .fail(function(data) {
            // Make sure that the formMessages div has the 'error' class.
            form_msg('bg-danger', msgError);
        });

    });

});