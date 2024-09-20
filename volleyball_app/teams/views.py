from django.shortcuts import render
from rest_framework import generics
from rest_framework.pagination import PageNumberPagination

from .models import Team
from .serializers import TeamSerializer


# Create your views here.

class TeamsList(generics.ListCreateAPIView):
    name = 'teams-list'
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    ordering = ['country']

    class TeamPagination(PageNumberPagination):
        page_size = 10

    pagination_class = TeamPagination


class TeamDetail(generics.RetrieveUpdateDestroyAPIView):
    name = 'team-detail'
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
