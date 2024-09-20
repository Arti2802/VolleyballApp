from django.db import models

# Create your models here.

class Competiton(models.Model):
    name = models.CharField(max_length=500)
    date_start = models.DateTimeField()
    date_stop = models.DateTimeField()

    def __str__(self):
        return str(self.name)
