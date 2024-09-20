from rest_framework import serializers

from .models import Set


class SetSerializer(serializers.ModelSerializer):

    class Meta:
        model = Set
        fields = '__all__'


    def validate(self, attrs):
        errors = []
        if attrs['points1'] < 25 and attrs['points2'] < 25 and attrs['count'] < 5:
            errors.append('Liczba punktów jednej z drużyn musi wynosić min. 25')
        if attrs['points1'] < 15 and attrs['points2'] < 15 and attrs['count'] == 5:
            errors.append('Liczba punktów jednej z drużyn w 5. secie musi wynosić min. 15')
        if abs(attrs['points1'] - attrs['points2']) < 2:
            errors.append('Jedna z drużyn musi mieć min. 2 punkty przewagi')
        if errors:
            raise serializers.ValidationError(errors)
        return attrs