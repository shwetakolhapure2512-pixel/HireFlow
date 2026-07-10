from django.db import models
from django.utils.text import slugify
import uuid


class Company(models.Model):
    """Company model for job postings"""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(unique=True, max_length=255)
    logo = models.ImageField(upload_to='company_logos/', null=True, blank=True)
    website = models.URLField(blank=True, null=True)
    description = models.TextField(blank=True)
    location = models.CharField(max_length=255)
    city = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100, blank=True)
    company_size = models.CharField(
        max_length=50,
        choices=[
            ('1-50', '1-50'),
            ('51-200', '51-200'),
            ('201-500', '201-500'),
            ('501-1000', '501-1000'),
            ('1000+', '1000+'),
        ],
        blank=True
    )
    industry = models.CharField(max_length=100, blank=True)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    founded_year = models.IntegerField(null=True, blank=True)
    created_by = models.ForeignKey('accounts.User', on_delete=models.SET_NULL, null=True, related_name='companies_created')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name_plural = 'Companies'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['slug']),
            models.Index(fields=['created_at']),
        ]
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
