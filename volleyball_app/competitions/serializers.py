from rest_framework import serializers

from .models import Competiton


class CompetitionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Competiton
        fields = '__all__'


    def validate(self, attrs):
        if attrs['date_start'] > attrs['date_stop']:
            raise serializers.ValidationError('Data rozpoczęcia musi być wcześniejsza '
                                              'niż data zakończenia')
        return attrs