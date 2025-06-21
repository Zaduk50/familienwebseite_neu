from django.contrib import admin
from .models import Profile, ToDo, DiaryEntry, SharedList, SharedListItem

admin.site.register(Profile)
admin.site.register(ToDo)
admin.site.register(DiaryEntry)
admin.site.register(SharedList)
admin.site.register(SharedListItem)
