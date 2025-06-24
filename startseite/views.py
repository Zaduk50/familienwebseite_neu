from django.shortcuts import render
from .models import Profile

def startseite(request):
    tristan_profile = Profile.objects.get(user__username='Tristan')
    return render(request, 'startseite/startseite.html', {'tristan': tristan_profile})

def familienbereich(request):
    return render(request, 'startseite/familienbereich.html')
