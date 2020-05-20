# Generated by Django 3.0.6 on 2020-05-18 16:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Group',
            fields=[
                ('number', models.IntegerField(primary_key=True, serialize=False, unique=True)),
                ('course', models.IntegerField()),
                ('number_of_students', models.IntegerField(default=0)),
                ('faculty', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Subject',
            fields=[
                ('name', models.TextField(primary_key=True, serialize=False, unique=True)),
                ('department', models.TextField()),
                ('hours', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Session',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('teacher', models.TextField()),
                ('control', models.TextField()),
                ('date', models.DateField()),
                ('group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='session.Group')),
                ('subject', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='session.Subject')),
            ],
        ),
    ]