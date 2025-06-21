from django.shortcuts import render

def startseite(request):
    return render(request, 'startseite/startseite.html')
