import numpy as np
from django.http import HttpResponse, JsonResponse
from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response

from session.models import Groups, Session, Subject
from session.serializers import GroupSerializer, SessionSerializer, SubjectSerializer


# удалить группу
class DeleteGroupAPI(generics.GenericAPIView):
    serializer_class = GroupSerializer
    permission_classes = [
        permissions.AllowAny
    ]

    def post(self, request, *args, **kwargs):
        group_number = self.request.GET.get('group')
        try:
            Groups.objects.filter(number=group_number).delete()
        except:
            print("there is no such group")
        return Response()


# удалить сессию
class DeleteSessionAPI(generics.GenericAPIView):
    serializer_class = SessionSerializer
    permission_classes = [
        permissions.AllowAny
    ]

    def post(self, request, *args, **kwargs):
        group = self.request.GET.get('group')
        date = self.request.GET.get('date')
        try:
            Session.objects.filter(group=group, date=date).delete()
        except:
            print("there is no such raw")
        return Response()


# номер группы с наибольшим / наименьшим количеством сдач
class GetMaxMinAPI(generics.GenericAPIView):
    serializer_class = SessionSerializer
    permission_classes = [
        permissions.AllowAny
    ]

    def get(self, request, *args, **kwargs):
        groups_list = [raw.number for raw in Groups.objects.all()]
        exams_number = np.array([Session.objects.filter(group=i).count() for i in groups_list])
        method = self.request.GET.get('method')
        if method == 'max':
            return Response(groups_list[np.argmax(exams_number)])
        else:
            return Response(groups_list[np.argmin(exams_number)])


# по номеру группы вывести дату предмет и вид контроля
class GetDateAndSubjectByGroupAPI(generics.GenericAPIView):
    serializer_class = SessionSerializer
    permission_classes = [
        permissions.AllowAny
    ]

    def get(self, request, *args, **kwargs):
        group = self.request.GET.get('group')
        queryset = Session.objects.filter(group=group)
        return JsonResponse([{
            'date': i.date,
            'subject': i.subject.name,
            'control': i.control
        } for i in queryset], safe=False)


# добавить запись в любую таблицу
class GroupViewSet(viewsets.ModelViewSet):
    serializer_class = GroupSerializer
    permission_classes = [
        permissions.AllowAny
    ]

    def get_queryset(self):
        queryset = Groups.objects.all()
        return queryset


class SessionViewSet(viewsets.ModelViewSet):
    serializer_class = SessionSerializer
    permission_classes = [
        permissions.AllowAny
    ]

    def get_queryset(self):
        queryset = Session.objects.all()
        return queryset

    def perform_create(self, serializer):
        session = serializer.save()
        session.group = Groups.objects.get(pk=self.request.data['group'])
        Subject.objects.get(pk=self.request.data['subject']).sessions.add(session)
        session.save()


class SubjectViewSet(viewsets.ModelViewSet):
    serializer_class = SubjectSerializer
    permission_classes = [
        permissions.AllowAny
    ]

    def get_queryset(self):
        queryset = Subject.objects.all()
        return queryset


# по ФИО преподавателя вывести номер группы, дата
class GetInfoByTeacherAPI(generics.GenericAPIView):
    serializer_class = SessionSerializer
    permission_classes = [
        permissions.AllowAny
    ]

    def get(self, request, *args, **kwargs):
        teacher = self.request.GET.get('teacher')
        raws = Session.objects.filter(teacher=teacher)
        return JsonResponse([{
            'group': raw.group.number,
            'date': raw.date
        } for raw in raws], safe=False)


# консоль
class CustomQueryAPI(generics.GenericAPIView):
    serializer_class = SessionSerializer
    permission_classes = [
        permissions.AllowAny
    ]

    def get(self, request, *args, **kwargs):
        query = self.request.GET.get('query')
        Session.objects.raw(query)
