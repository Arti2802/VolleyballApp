from rest_framework import serializers

from .models import Match
from teams.serializers import TeamSerializer


class MatchSerializer(serializers.ModelSerializer):
    team1 = TeamSerializer(read_only=True)
    team2 = TeamSerializer(read_only=True)

    class Meta:
        model = Match
        fields = '__all__'


class MatchPostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Match
        fields = '__all__'

    def validate(self, attrs):
        errors = []
        team1 = attrs['team1']
        team2 = attrs['team2']
        date = attrs['date']
        if team1 == team2:
            errors.append('Nie może być meczu między tą samą drużyną')
        if attrs['points1'] + attrs['points2'] != 3:
            errors.append('Suma punktów zdobyta przez obie drużyny nie może być różna od 3')
        if attrs['sets1'] > 3 or attrs['sets2'] > 3:
            errors.append('Liczba wygranych setów przez daną drużynę nie może być większa niż 3')
        if attrs['sets1'] + attrs['sets2'] > 5:
            errors.append('Nie może być więcej niż 5 rozegranych setów')
        if Match.objects.filter(team1=team1, date=date).exists() or Match.objects.filter(team2=team1, date=date).exists():
            errors.append(str(team1) + ' ma w tym czasie inny mecz')
        if Match.objects.filter(team1=team2, date=date).exists() or Match.objects.filter(team2=team2, date=date).exists():
            errors.append(str(team2) + ' ma w tym czasie inny mecz')
        if errors:
            raise serializers.ValidationError(errors)
        return attrs
