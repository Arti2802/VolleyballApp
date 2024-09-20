from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Rank
from .serializers import RankSerializer

from matches.models import Match

import numpy as np


# Create your views here.

class Ranking(generics.ListCreateAPIView):
    name = 'ranking'
    queryset = Rank.objects.all()
    serializer_class = RankSerializer
    ordering = ['position']


class UpdatePoints(APIView):
    name = 'update-points'

    def put(self, request, pk):
        rank = Rank.objects.get(team=pk)
        weightes = np.array([2, 1, -0.5, -1])

        matches1 = Match.objects.filter(team1=pk)
        matches2 = Match.objects.filter(team2=pk)
        #matches_total = len(matches1) + len(matches2)
        wons1 = len([match for match in matches1 if match.sets1 >=3 and match.sets2 < 2])
        wons2 = len([match for match in matches2 if match.sets2 >=3 and match.sets1 < 2])
        wons_total = wons1 + wons2
        wons_tb1 = len([match for match in matches1 if match.sets1 == 3 and match.sets2 == 2])
        wons_tb2 = len([match for match in matches2 if match.sets1 == 2 and match.sets2 == 3])
        wons_tb_total = wons_tb1 + wons_tb2
        losts1 = len([match for match in matches1 if match.sets2 >=3 and match.sets1 < 2])
        losts2 = len([match for match in matches2 if match.sets1 >=3 and match.sets2 < 2])
        losts_total = losts1 + losts2
        losts_tb1 = len([match for match in matches1 if match.sets1 == 2 and match.sets2 == 3])
        losts_tb2 = len([match for match in matches2 if match.sets1 == 3 and match.sets2 == 2])
        losts_tb_total = losts_tb1 + losts_tb2

        results = np.array([wons_total, wons_tb_total, losts_total, losts_tb_total])
        points = np.dot(results, weightes)

        rank.points = points
        rank.save()

        return Response({'Udało się zaktualizować punkty'}, 200)


class UpdateRanking(APIView):
    name = 'update-ranking'

    def put(self, request):
        ranks = Rank.objects.all().order_by('-points')
        n = 1
        for rank in ranks:
            rank.position = n
            rank.save()
            n += 1

        return Response({'Udało się zaktualizować ranking'}, 200)