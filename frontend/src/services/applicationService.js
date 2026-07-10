import api from './api'

export const applicationService = {
  getApplications: (page = 1) => api.get('/applications/applications/', { params: { page } }),
  getApplicationById: (id) => api.get(`/applications/applications/${id}/`),
  createApplication: (jobId, data) => api.post('/applications/applications/', { job_id: jobId, ...data }),
  updateApplicationStatus: (id, status) => api.patch(`/applications/applications/${id}/update_status/`, { status }),
  getSavedJobs: (page = 1) => api.get('/applications/saved-jobs/', { params: { page } }),
  saveJob: (jobId) => api.post('/applications/saved-jobs/', { job_id: jobId }),
  removeSavedJob: (id) => api.delete(`/applications/saved-jobs/${id}/remove_saved/`),
}
