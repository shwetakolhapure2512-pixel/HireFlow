import api from './api'

export const dashboardService = {
  getRecruiterDashboard: () => api.get('/dashboard/recruiter/'),
  getCandidateDashboard: () => api.get('/dashboard/candidate/'),
}
