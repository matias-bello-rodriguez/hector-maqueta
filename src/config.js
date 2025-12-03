const envUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
export const API_URL = envUrl.endsWith('/api') ? envUrl : `${envUrl}/api`;
