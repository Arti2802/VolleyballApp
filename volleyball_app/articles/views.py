from django.shortcuts import render
from rest_framework import generics

from .models import Article
from .serializers import ArticleSerializer

# Create your views here.


class ArticlesList(generics.ListCreateAPIView):
    name = 'articles-list'
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    ordering = ['-creation_date']


class ArticleDetail(generics.RetrieveUpdateDestroyAPIView):
    name = 'article-detail'
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
