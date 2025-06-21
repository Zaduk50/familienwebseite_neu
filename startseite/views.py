from django.shortcuts import render

def startseite(request):
    return render(request, 'startseite/startseite.html')

def familienbereich(request):
    return render(request, 'startseite/familienbereich.html')
