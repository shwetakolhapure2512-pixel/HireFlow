from django.test import TestCase
from companies.models import Company


class CompanyModelTest(TestCase):
    def setUp(self):
        self.company = Company.objects.create(
            name='Tech Corp',
            location='San Francisco',
            industry='Technology'
        )
    
    def test_company_creation(self):
        self.assertEqual(self.company.name, 'Tech Corp')
        self.assertEqual(self.company.slug, 'tech-corp')
    
    def test_company_string_representation(self):
        self.assertEqual(str(self.company), 'Tech Corp')
