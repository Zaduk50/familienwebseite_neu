function profile_selected(element, username, imageUrl) {
    const alleBilder = document.querySelectorAll(".profilbild");
    const platzhalter = document.getElementById("profilbild-anzeige");
    const grossesBild = document.getElementById("zentriertes-profilbild");
    const platzhalterText =document.getElementById("platzhalter-txt");

    // username im Platzhalter anzeigen
    platzhalterText.textContent = username;

    // Alle Profilbilder ausblenden
    alleBilder.forEach(div => {
        div.classList.remove("opacity-100", "scale-100");
        div.classList.add("opacity-0", "scale-0");
    });

    // Bild setzen
    grossesBild.src = imageUrl;

    // Platzhalter sichtbar machen (mit Tailwind-Animationen)
    platzhalter.classList.remove("opacity-0", "scale-0");
    platzhalter.classList.add("opacity-100", "scale-100");
}

function reset_layout() {
    const alleBilder = document.querySelectorAll(".profilbild");
    const platzhalter = document.getElementById("profilbild-anzeige");
    const grossesBild = document.getElementById("zentriertes-profilbild");

    platzhalter.classList.remove("opacity-100", "scale-100");
    platzhalter.classList.add("opacity-0", "scale-0");

    // Alle Profilbilder einblenden
    alleBilder.forEach(div => {
        div.classList.remove("opacity-0", "scale-0");
        div.classList.add("opacity-100", "scale-100");
    });
}

function open_login() {
    const login_form = document.getElementById("login");

    login_form.classList.remove("scale-0", "left-full", );
    login_form.classList.add("scale-100", "-translate-x-1/2", "left-1/2");
}

function hide_login() {
    const login_form = document.getElementById("login");
    const loginbutton = document.getElementById("loginbutton");
    const xbutton = document.getElementById("xbutton");
    const authcheck = document.getElementById("authcheck");


    const button_hide = [loginbutton, xbutton]

    if (authcheck?.dataset.authenticated === "true") {
        button_hide.forEach(button => {
            if (button) {
                button.classList.remove("scale-100");
                button.classList.add("scale-0");
            }
        });
    }

    login_form.classList.remove("scale-100", "-translate-x-1/2", "left-1/2");
    login_form.classList.add("scale-0", "left-full", );
}

function logout() {
    const xbutton = document.getElementById("xbutton");
    const loginbutton = document.getElementById("loginbutton");

    reset_layout()
    closeaApps()

    const button_hide = [loginbutton, xbutton]

    button_hide.forEach(button => {
        if (button) {
            button.classList.remove("scale-0");
            button.classList.add("scale-100");
        }
    })
}

// Nach erfolgreichem Login CSRF-Token im Logout-Form aktualisieren
document.addEventListener('htmx:afterRequest', function(event) {
    // Nur bei erfolgreichem Login (200) und wenn es der Login-Request war
    if (event.detail.xhr.status === 200) {
        // CSRF-Token aus Cookie oder Response-Header lesen
        let newCsrfToken = event.detail.xhr.getResponseHeader('X-CSRF-Token');

        if (!newCsrfToken) {
            // Fallback: Aus Cookie lesen
            newCsrfToken = getCookie('csrftoken');
        }

        if (newCsrfToken) {
            // Alle CSRF-Token Inputs aktualisieren
            document.querySelectorAll('input[name="csrfmiddlewaretoken"]').forEach(input => {
                input.value = newCsrfToken;
            });

            console.log('CSRF-Token aktualisiert:', newCsrfToken);
        }
    }
});

// Cookie lesen Hilfsfunktion
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// Für alle HTMX-Requests CSRF-Token aus Cookie setzen
document.addEventListener('htmx:configRequest', function(event) {
    const token = getCookie('csrftoken');
    if (token) {
        event.detail.headers['X-CSRFToken'] = token;
    }
});

function toggleTodoApp() {
    const wrapper = document.getElementById("todo-wrapper");

    if (wrapper.classList.contains("max-h-0")) {
        wrapper.classList.remove("max-h-0", "overflow-hidden");
        wrapper.classList.add("max-h-[40rem]", "overflow-auto");
    } else {
        wrapper.classList.remove("max-h-[40rem]", "overflow-auto");
        wrapper.classList.add("max-h-0", "overflow-hidden");
    }
}

function openDetails() {
    const details = document.getElementById("details");
    const xdetails = document.getElementById("xdetails");

    if (details.classList.contains("scale-0")) {
        details.classList.remove("scale-0", "opacity-0");
        details.classList.add("scale-100", "opacity-100");
        xdetails.classList.remove("scale-0");
        xdetails.classList.add("scale-100");
    }
}

function closeDetails() {
    const details = document.getElementById("details");
    const xdetails = document.getElementById("xdetails");

    if (details.classList.contains("scale-100")){
        details.classList.remove("scale-100", "opacity-100");
        details.classList.add("scale-0", "opacity-0");
        xdetails.classList.remove("scale-100");
        xdetails.classList.add("scale-0");
    }
}

function showDetails(element) {
    const description = element.getAttribute("data-description");
    const detailsText = document.getElementById("details-text");

    detailsText.innerText = description;

    openDetails();
}

function closeaApps() {
    closeDetails()
}

function toggleStrike(checkbox){
    const id = checkbox.id.replace("todo-", "label-");
    const label = document.getElementById(id);

    if (checkbox.checked) {
        label.classList.add("line-through", "text-gray-500");
    } else {
        label.classList.remove("line-through", "text-gray-500");
    }
}