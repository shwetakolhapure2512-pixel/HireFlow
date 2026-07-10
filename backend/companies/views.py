from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from companies.models import Company
from companies.serializers import CompanySerializer, CompanyListSerializer


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    permission_classes = [AllowAny]
    lookup_field = 'slug'
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ['name', 'location', 'industry', 'description']
    ordering_fields = ['created_at', 'name']
    ordering = ['-created_at']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return CompanyListSerializer
        return CompanySerializer
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAuthenticated()]
        return [AllowAny()]
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
    
    def perform_update(self, serializer):
        if self.request.user != serializer.instance.created_by and self.request.user.role != 'admin':
            return Response(
                {'error': 'You do not have permission to update this company'},
                status=status.HTTP_403_FORBIDDEN
            )
        serializer.save()
    
    @action(detail=False, methods=['get'])
    def my_companies(self, request):
        """Get companies created by current user"""
        if not request.user.is_authenticated:
            return Response({'error': 'Authentication required'}, status=status.HTTP_401_UNAUTHORIZED)
        
        companies = Company.objects.filter(created_by=request.user)
        serializer = self.get_serializer(companies, many=True)
        return Response(serializer.data)
