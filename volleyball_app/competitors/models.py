from django.db import models


from teams.models import Team


# Create your models here.

class Competitor(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    date_of_birth = models.DateField()
    position = models.CharField(max_length=50, choices=(('attacker', 'attacker'), ('libero', 'libero')))
    team = models.ForeignKey(Team, null=True, on_delete=models.SET_NULL)