from django.shortcuts import render
from rest_framework import generics

from .models import Competiton
from .serializers import CompetitionSerializer


# Create your views here.

class CompetitionsList(generics.ListCreateAPIView):
    name = 'competitions-list'
    queryset = Competiton.objects.all()
    serializer_class = CompetitionSerializer
    ordering = ['-date_start']


class CompetitionDetail(generics.RetrieveUpdateDestroyAPIView):
    name = 'competition-detail'
    queryset = Competiton.objects.all()
    serializer_class = CompetitionSerializer