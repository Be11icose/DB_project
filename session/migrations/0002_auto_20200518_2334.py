# Generated by Django 3.0.6 on 2020-05-18 20:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('session', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='session',
            name='group',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sessions', to='session.Group'),
        ),
    ]
