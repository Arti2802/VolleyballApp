from django.urls import path
from .views import MatchesList, MatchPost, MatchDetail, MatchesInCompetition, MatchesForTeam, MatchesResults

urlpatterns = [
    path('matches/', MatchesList.as_view(), name=MatchesList.name),
    path('matches/add/', MatchPost.as_view(), name=MatchPost.name),
    path('matches/<int:pk>/', MatchDetail.as_view(), name=MatchDetail.name),
    path('competitions/<int:pk>/matches/', MatchesInCompetition.as_view(),
         name=MatchesInCompetition.name),
    path('teams/<int:pk>/matches/', MatchesForTeam.as_view(), name=MatchesForTeam.name),
    path('competitions/<int:pk>/results/', MatchesResults.as_view(), name=MatchesResults.name),
]