from django.urls import path
from .views import TeamsList, TeamDetail

urlpatterns = [
    path('teams/', TeamsList.as_view(), name=TeamsList.name),
    path('teams/<int:pk>/', TeamDetail.as_view(), name=TeamDetail.name),
]