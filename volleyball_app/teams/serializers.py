from sys import flags

from rest_framework import serializers
from django_countries.serializer_fields import CountryField
from django_countries.widgets import CountrySelectWidget

from .models import Team


class TeamSerializer(serializers.ModelSerializer):
    country = CountryField(country_dict=True)

    class Meta:
        model = Team
        fields = '__all__'
        widgets = {"country": CountrySelectWidget()}