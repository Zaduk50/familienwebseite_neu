from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.template.loader import render_to_string

from .models import Profile

def startseite(request):
    profiles = Profile.objects.all()
    print(profiles)
    return render(request, 'startseite/startseite.html', {'profiles': profiles})

def logout_view(request):
    logout(request)
    html = render_to_string("startseite/start_infos.html", {
        "user": request.user
    })
    return HttpResponse(html)

def benutzer_login(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        user = authenticate(request, username=username, password=password)

        if user:
            login(request, user)

            # Hintergrundbild (optional)
            profile = getattr(user, "profile", None)
            if profile and profile.background:
                bg_url = profile.background.url
            else:
                bg_url = "/static/images/Wohnzimmer.jpg"

            # Begrüßungstext
            personal_info = getattr(user, "personalinfo", None)
            ptext = personal_info.ptext if personal_info else "Hier ist genug Platz für deinen Text …"

            # ✅ ERFOLGREICHER LOGIN: Template mit Auth-Status generieren
            content = render_to_string("startseite/teil_infos.html", {
                "user": user,
                "ptext": ptext,
                "bg_url": bg_url,
                "eingeloggt": True,
            })

            return HttpResponse(content)

        # ❌ LOGIN FEHLGESCHLAGEN
        return HttpResponse("Login fehlgeschlagen", status=401)
