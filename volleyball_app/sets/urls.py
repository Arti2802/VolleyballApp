from django.urls import path
from .views import SetsList, SetDetail, SetsInMatch

urlpatterns = [
    path('sets/', SetsList.as_view(), name=SetsList.name),
    path('sets/<int:pk>/', SetDetail.as_view(), name=SetDetail.name),
    path('matches/<int:pk>/sets/', SetsInMatch.as_view(), name=SetsInMatch.name)
]