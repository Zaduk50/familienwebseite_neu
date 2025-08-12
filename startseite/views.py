from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse
from django.middleware.csrf import get_token
from django.shortcuts import render
from django.template.defaultfilters import title
from django.template.loader import render_to_string


from .models import Profile, ToDo


def startseite(request):
    profiles = Profile.objects.all()
    return render(request, 'startseite/startseite.html', {'profiles': profiles})

def logout_view(request):
    logout(request)

    ptext = "Hier ist genug Platz für deinen Text …"

    html = render_to_string("startseite/start_infos.html", {
        "user": request.user,
        "ptext": ptext,
        "todos": [],
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
                bg_url = "/static/images/weisse_blume.JPG"

            # Begrüßungstext
            personal_info = getattr(user, "personalinfo", None)
            ptext = personal_info.ptext if personal_info else "Hier ist genug Platz für deinen Text …"

            #ToDOlist
            todos = ToDo.objects.filter(user=user)

            # ✅ NEUEN CSRF-Token generieren
            csrf_token = get_token(request)

            content = render_to_string("startseite/teil_infos.html", {
                "user": user,
                "ptext": ptext,
                "bg_url": bg_url,
                "todos": todos,
                "eingeloggt": True,
                "csrf_token": csrf_token,
            })

            response = HttpResponse(content)
            response.set_cookie("csrftoken", csrf_token)

            # ✅ WICHTIG: Header für JavaScript hinzufügen
            response['X-CSRF-Token'] = csrf_token

            return response

        return HttpResponse("Login fehlgeschlagen", status=401)

        return HttpResponse("Login fehlgeschlagen", status=401)

def add_todo(request):
    if request.method == "POST" and request.user.is_authenticated:
        title = request.POST.get("title")
        description = request.POST.get("description", "")
        todo = ToDo.objects.create(user=request.user, title=title, description=description)
        html = render_to_string("startseite/todo_row.html", {"todo": todo})
        return HttpResponse(html)
    return HttpResponse(status=400)