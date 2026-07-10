from django.contrib import admin
from companies.models import Company


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ['name', 'location', 'industry', 'company_size', 'created_at']
    search_fields = ['name', 'location', 'industry']
    list_filter = ['company_size', 'industry', 'created_at']
    readonly_fields = ['id', 'slug', 'created_at', 'updated_at', 'created_by']
    
    def save_model(self, request, obj, form, change):
        if not change:
            obj.created_by = request.user
        super().save_model(request, obj, form, change)
