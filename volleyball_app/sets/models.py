from django.db import models

from matches.models import Match


# Create your models here.

class Set(models.Model):
    points1 = models.PositiveIntegerField()
    points2 = models.PositiveIntegerField()
    match = models.ForeignKey(Match, on_delete=models.CASCADE)
    count = models.PositiveIntegerField(default=1)

    def __str__(self):
        return str(self.count) + ". set " + str(self.match)
