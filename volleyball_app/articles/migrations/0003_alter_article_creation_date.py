# Generated by Django 5.1 on 2024-09-17 11:14

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0002_article_delete_articles'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='creation_date',
            field=models.DateTimeField(default=datetime.datetime(2024, 9, 17, 11, 14, 23, 66506, tzinfo=datetime.timezone.utc)),
        ),
    ]
