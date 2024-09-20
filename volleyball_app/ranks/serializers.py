from rest_framework import serializers

from .models import Rank
from teams.serializers import TeamSerializer


class RankSerializer(serializers.ModelSerializer):
    team = TeamSerializer(read_only=True)

    class Meta:
        model = Rank
        fields = '__all__'