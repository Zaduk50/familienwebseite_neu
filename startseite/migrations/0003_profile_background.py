# Generated by Django 5.2.3 on 2025-06-22 19:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('startseite', '0002_sharedlist_sharedlistitem'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='background',
            field=models.ImageField(blank=True, null=True, upload_to='backgrounds'),
        ),
    ]
