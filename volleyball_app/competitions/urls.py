from django.urls import path
from .views import CompetitionsList, CompetitionDetail

urlpatterns = [
    path('competitions/', CompetitionsList.as_view(), name=CompetitionsList.name),
    path('competitions/<int:pk>/', CompetitionDetail.as_view(), name=CompetitionDetail.name),
]