function profile_selected(event, username, imageUrl) {
    const platzhalter = document.getElementById("profilbild-anzeige");
    const großesBild = document.getElementById("großes-profilbild");
    const bilder = document.querySelectorAll(".profilbild");

    // Bild setzen
    großesBild.src = imageUrl;

    // Alle anderen Bilder ausblenden
    bilder.forEach(b => b.classList.add("hidden"));

    // Platzhalter anzeigen
    platzhalter.classList.remove("hidden");

    console.log("Profil ausgewählt:", username);
}