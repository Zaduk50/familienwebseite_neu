from django.shortcuts import render
from .models import Profile

def startseite(request):
    profiles = Profile.objects.all()
    return render(request, 'startseite/startseite.html')

def familienbereich(request):
    return render(request, 'startseite/familienbereich.html')
