"""django_server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from .load_csv_to_db import main

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('user_account.urls')),
    path('', include('organization.urls')),
    path('', include('inventory_item.urls')),
    path('', include('audit_template.urls')),
    path('', include('audit.urls'))
]

# Initialize inventory Items collection
main('', True)
