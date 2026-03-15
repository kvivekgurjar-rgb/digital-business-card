import client from './client.js';

export const api = {
    profile:       ()        => client.get('/api/profile/'),
    skills:        ()        => client.get('/api/skills/'),
    projects:      (params)  => client.get('/api/projects', { params }),
    testimonials:  ()        => client.get('/api/testimonials/'),
    contact:       (data)    => client.post('/api/contact/', data),
    login:         (creds)   => client.post('/api/auth/token/', creds),
    refreshToken:  (ref)     => client.post('/api/auth/token/refresh', { refresh: ref }),
};