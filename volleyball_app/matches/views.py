from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Match
from .serializers import MatchSerializer, MatchPostSerializer


# Create your views here.

class MatchesList(generics.ListCreateAPIView):
    name = 'matches-list'
    queryset = Match.objects.all()
    serializer_class = MatchSerializer
    ordering = ['-date']


class MatchPost(generics.ListCreateAPIView):
    name = 'add-match'
    queryset = Match.objects.all()
    serializer_class = MatchPostSerializer

class MatchDetail(generics.RetrieveUpdateDestroyAPIView):
    name = 'match-detail'
    queryset = Match.objects.all()
    serializer_class = MatchSerializer
    ordering = ['-date']


class MatchesInCompetition(generics.ListCreateAPIView):
    name = 'matches-in-competition'
    serializer_class = MatchSerializer

    def get_queryset(self):
        pk = self.kwargs['pk']
        return Match.objects.filter(competition=pk)


class MatchesForTeam(generics.ListCreateAPIView):
    name = 'matches-for-team'
    serializer_class = MatchSerializer
    ordering = ['-date']
    filterset_fields = ['competition']

    def get_queryset(self):
        pk = self.kwargs['pk']
        return Match.objects.filter(team1=pk) | Match.objects.filter(team2=pk)


class MatchesResults(APIView):
    name = 'matches-results'

    def get(self, request, pk):
        matches = Match.objects.filter(competition=pk)
        teams = [match.team1 for match in matches]
        teams = teams + [match.team2 for match in matches]
        teams = set(teams)
        data = []
        for team in teams:
            team_pk = team.id
            matches1 = Match.objects.filter(competition=pk, team1=team_pk)
            matches2 = Match.objects.filter(competition=pk, team2=team_pk)
            matches_total = len(matches1) + len(matches2)
            wons1 = len([match for match in matches1 if match.sets1 > match.sets2])
            wons2 = len([match for match in matches2 if match.sets2 > match.sets1])
            wons_total = wons1 + wons2
            wons_tb1 = len([match for match in matches1 if match.sets1 == 3 and match.sets2 == 2])
            wons_tb2 = len([match for match in matches2 if match.sets1 == 2 and match.sets2 == 3])
            wons_tb_total = wons_tb1 + wons_tb2
            losts1 = len(matches1) - wons1
            losts2 = len(matches2) - wons2
            losts_total = losts1 + losts2
            losts_tb1 = len([match for match in matches1 if match.sets1 == 2 and match.sets2 == 3])
            losts_tb2 = len([match for match in matches2 if match.sets1 == 3 and match.sets2 == 2])
            losts_tb_total = losts_tb1 + losts_tb2
            sets_won1 = sum([match.sets1 for match in matches1])
            sets_won2 = sum([match.sets2 for match in matches2])
            sets_won_total = sets_won1 + sets_won2
            sets_lost1 = sum([match.sets2 for match in matches1])
            sets_lost2 = sum([match.sets1 for match in matches2])
            sets_lost_total = sets_lost1 + sets_lost2
            points1 = sum(match.points1 for match in matches1)
            points2 = sum(match.points2 for match in matches2)
            points_total = points1 + points2

            data.append({
            'team_id' : team_pk,
            'team_name': team.name,
            'matches_total' : matches_total,
            'wons_total' : wons_total,
            'wons_tb_total': wons_tb_total,
            'losts_total' : losts_total,
            'losts_tb_total' : losts_tb_total,
            'sets_won_total' : sets_won_total,
            'sets_lost_total' : sets_lost_total,
            'points_total': points_total
            })
            data.sort(key=lambda e: e['points_total'], reverse=True)

        return Response({
            'data': data
            },200)
