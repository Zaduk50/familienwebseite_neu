from django.contrib.auth import login, get_user_model
from django.utils.deprecation import MiddlewareMixin

print(">>> AutoLoginGuestMiddleware wird geladen!")

class AutoLoginGuestMiddleware(MiddlewareMixin):
    def process_request(self, request):
        print(">>> AutoLoginGuestMiddleware wird aufgerufen!")
        if not request.user.is_authenticated:
            User = get_user_model()
            try:
                guest_user = User.objects.get(username='Gast')
                login(request, guest_user)
            except User.DoesNotExist:
                pass  # Fallback: Gast existiert nicht
