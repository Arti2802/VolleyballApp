from django.db import models

from teams.models import Team

# Create your models here.

class Rank(models.Model):
    points = models.IntegerField(default=0)
    position = models.PositiveIntegerField(blank=True, null=True)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
