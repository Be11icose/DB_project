# Generated by Django 3.0.6 on 2020-05-18 20:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('session', '0003_auto_20200518_2337'),
    ]

    operations = [
        migrations.AlterField(
            model_name='session',
            name='group',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='sessions', to='session.Group'),
        ),
    ]