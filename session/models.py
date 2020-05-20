from django.db import models


# Create your models here.

class Groups(models.Model):
    # номер группы
    number = models.IntegerField(blank=False, primary_key=True, unique=True)
    # номер курса
    course = models.IntegerField(blank=False)
    # количество студентов
    number_of_students = models.IntegerField(blank=False, default=0)
    # факультет
    faculty = models.TextField()


class Subject(models.Model):
    # название
    name = models.TextField(blank=False, unique=True, primary_key=True)
    # кафедра
    department = models.TextField()
    # объем часов
    hours = models.IntegerField()


class Session(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    # ФИО преподавателя
    teacher = models.TextField()
    # вид контроля
    control = models.TextField()
    # дата
    date = models.DateField()
    # группа
    group = models.ForeignKey(Groups, on_delete=models.CASCADE, related_name='sessions', blank=True, null=True)
    # предмет
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='sessions', blank=True, null=True)
