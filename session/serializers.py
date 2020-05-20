from rest_framework import serializers

from session.models import Groups, Subject, Session


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Groups
        fields = ['number', 'course', 'number_of_students', 'faculty']


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'


class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = '__all__'
        depth = 1
