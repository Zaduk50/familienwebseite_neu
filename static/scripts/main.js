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

function close_login() {
    const login_form = document.getElementById("login");

    login_form.classList.remove("scale-100", "-translate-x-1/2", "left-1/2");
    login_form.classList.add("scale-0", "left-full", );
}