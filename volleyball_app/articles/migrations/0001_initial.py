# Generated by Django 5.1 on 2024-09-17 10:09

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Articles',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=300)),
                ('content', models.TextField()),
                ('photo', models.ImageField(null=True, upload_to='')),
                ('creation_date', models.DateTimeField(default=datetime.datetime(2024, 9, 17, 12, 9, 52, 961806))),
            ],
        ),
    ]
