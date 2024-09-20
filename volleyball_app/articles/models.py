from django.db import models

from django.utils import timezone


# Create your models here.

class Article(models.Model):
    title = models.CharField(max_length=300)
    content = models.TextField()
    photo = models.ImageField(null=True)
    creation_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return str(self.title)