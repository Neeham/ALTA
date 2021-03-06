from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from user_account.permissions import IsInventoryManager, IsSystemAdmin

from .serializers import AuditSerializer
from .models import Audit


class AuditViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Audits to be created.
    """

    queryset = Audit.objects.all()
    serializer_class = AuditSerializer
    permission_classes = [IsAuthenticated, IsInventoryManager | IsSystemAdmin]
    http_method_names = ['post']
