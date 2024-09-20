from django.db import models
from django_countries.fields import CountryField

# Create your models here.

class Team(models.Model):
    name = models.CharField(max_length=255)
    country = CountryField(default=None, countries_flag_url="flags/{code}.gif")
    creation_date = models.DateField()
    logo = models.ImageField(null=True, blank=True)

    def __str__(self):
        return self.name
