function profile_selected(element, username, imageUrl) {
    const alleBilder = document.querySelectorAll(".profilbild");
    const platzhalter = document.getElementById("profilbild-anzeige");
    const großesBild = document.getElementById("großes-profilbild");

    // Alle Profilbilder ausblenden
    alleBilder.forEach(div => {
        div.classList.add("hidden");
    });

    // Bild setzen
    großesBild.src = imageUrl;

    // Platzhalter sichtbar machen (mit Tailwind-Animationen)
    platzhalter.classList.remove("hidden", "opacity-0", "scale-90", "invisible");
    platzhalter.classList.add("opacity-100", "scale-100");
}

function hide_profile() {
    const platzhalter = document.getElementById("profilbild-anzeige");
    const alleBilder = document.querySelectorAll(".profilbild");

    platzhalter.classList.remove("opacity-100", "scale-100");
    platzhalter.classList.add("opacity-0", "scale-90");

    setTimeout(() => {
        platzhalter.classList.add("hidden");
        alleBilder.forEach(div => div.classList.remove("hidden"));
    }, 300);
}

// Später kannst du z.B. hide_profile() aufrufen beim Klick auf "Einloggen"
