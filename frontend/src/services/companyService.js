import api from './api'

export const companyService = {
  getAllCompanies: (page = 1) => api.get('/companies/', { params: { page } }),
  getCompanyBySlug: (slug) => api.get(`/companies/${slug}/`),
  createCompany: (data) => api.post('/companies/', data),
  updateCompany: (slug, data) => api.patch(`/companies/${slug}/`, data),
  searchCompanies: (query) => api.get('/companies/', { params: { search: query } }),
}
