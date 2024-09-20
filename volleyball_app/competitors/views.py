from django.shortcuts import render
from rest_framework import generics

from .models import Competitor
from .serializers import CompetitorSerializer


# Create your views here.

class CompetitorsList(generics.ListCreateAPIView):
    name = 'competitors-list'
    queryset = Competitor.objects.all()
    serializer_class = CompetitorSerializer


class CompetitorDetail(generics.RetrieveUpdateDestroyAPIView):
    name = 'competition-detail'
    queryset = Competitor.objects.all()
    serializer_class = CompetitorSerializer