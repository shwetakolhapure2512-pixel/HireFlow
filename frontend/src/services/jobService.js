import api from './api'

export const jobService = {
  getAllJobs: (page = 1, filters = {}) => api.get('/jobs/', { params: { page, ...filters } }),
  getJobBySlug: (slug) => api.get(`/jobs/${slug}/`),
  createJob: (data) => api.post('/jobs/', data),
  updateJob: (slug, data) => api.patch(`/jobs/${slug}/`, data),
  deleteJob: (slug) => api.delete(`/jobs/${slug}/`),
  searchJobs: (query) => api.get('/jobs/', { params: { search: query } }),
}
