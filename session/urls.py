from django.urls import path
from rest_framework import routers

from session.api import DeleteGroupAPI, DeleteSessionAPI, GetMaxMinAPI, GetDateAndSubjectByGroupAPI, GroupViewSet, \
    SessionViewSet, SubjectViewSet, GetInfoByTeacherAPI

router = routers.DefaultRouter()
router.register('api/group', GroupViewSet, 'group')
router.register('api/session', SessionViewSet, 'session')
router.register('api/subject', SubjectViewSet, 'subject')
urlpatterns = router.urls + [
    path('api/stat', GetMaxMinAPI.as_view()),
    path('api/byGroup', GetDateAndSubjectByGroupAPI.as_view()),
    path('api/byTeacher', GetInfoByTeacherAPI.as_view()),
    path('api/deleteSession', DeleteSessionAPI.as_view()),
    path('api/deleteGroup', DeleteGroupAPI.as_view()),
]
