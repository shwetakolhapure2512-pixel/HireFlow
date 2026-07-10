import api from './api'

export const notificationService = {
  getNotifications: () => api.get('/notifications/'),
  markAsRead: (id) => api.patch(`/notifications/${id}/mark_as_read/`),
  markAllAsRead: () => api.patch('/notifications/mark_all_as_read/'),
  getUnreadCount: () => api.get('/notifications/unread_count/'),
}
