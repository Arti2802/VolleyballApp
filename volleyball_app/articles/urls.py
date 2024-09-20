from django.urls import path
from .views import ArticlesList, ArticleDetail

urlpatterns = [
    path('articles/', ArticlesList.as_view(), name=ArticlesList.name),
    path('articles/<int:pk>/',ArticleDetail.as_view(), name=ArticleDetail.name),
]