from django.urls import path
from .views import CompetitorsList, CompetitorDetail

urlpatterns = [
    path('competitors/', CompetitorsList.as_view(), name=CompetitorsList.name),
    path('competitors/<int:pk>/', CompetitorDetail.as_view(), name=CompetitorDetail.name),
]