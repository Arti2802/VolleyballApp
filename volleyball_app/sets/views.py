from django.shortcuts import render
from rest_framework import generics

from .models import Set
from .serializers import SetSerializer


# Create your views here.

class SetsList(generics.ListCreateAPIView):
    name = 'sets-list'
    queryset = Set.objects.all()
    serializer_class = SetSerializer
    ordering_fields = ['count']


class SetDetail(generics.RetrieveUpdateDestroyAPIView):
    name = 'set-detail'
    queryset = Set.objects.all()
    serializer_class = SetSerializer


class SetsInMatch(generics.ListCreateAPIView):
    name = 'sets-in-match'
    serializer_class = SetSerializer
    ordering = ['count']
    ordering_fields = ['count']

    def get_queryset(self):
        pk = self.kwargs['pk']
        return Set.objects.filter(match=pk)
