from django.db import models

from competitions.models import Competiton
from teams.models import Team


# Create your models here.

class Match(models.Model):
    date = models.DateTimeField()
    competition = models.ForeignKey(Competiton, on_delete=models.CASCADE)
    team1 = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='team1')
    team2 = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='team2')
    sets1 = models.PositiveIntegerField()
    sets2 = models.PositiveIntegerField()
    points1 = models.PositiveIntegerField()
    points2 = models.PositiveIntegerField()

    def __str__(self):
        return "Mecz " + str(self.team1) + " - " + str(self.team2)
