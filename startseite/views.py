from django.shortcuts import render
from .models import Profile

def startseite(request):
    profiles = Profile.objects.all()
    print(profiles)
    return render(request, 'startseite/startseite.html', {'profiles': profiles})

def familienbereich(request):
    return render(request, 'startseite/familienbereich.html')
