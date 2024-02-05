const projectFolder = '/frontend'

const customAxios = axios.create({
    baseURL: 'https://65be7c1fdcfcce42a6f28d63.mockapi.io',
});


function showSuccess(message) {
    showNotification(message, 'success')
}

function showError(message) {
    showNotification(message, 'error')
}

function showNotification(text, type = 'success') {
    let bgColor = 'green'
    if (type == 'error') {
        bgColor = 'red'
    }
    Toastify({
        text: text,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        backgroundColor: bgColor,
    }).showToast();
}

function redirecTo(link, time = 2000) {
    setTimeout(() => {
        window.location = link
    }, time)
}