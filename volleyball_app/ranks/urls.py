from django.urls import path
from .views import Ranking, UpdatePoints, UpdateRanking

urlpatterns = [
    path('ranking/', Ranking.as_view(), name=Ranking.name),
    path('update-points/<int:pk>/', UpdatePoints.as_view(), name=UpdatePoints.name),
    path('ranking/update/', UpdateRanking.as_view(), name=UpdateRanking.name),
]