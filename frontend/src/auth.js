// auth.js
export const isAuthenticated = () => {
  const token = localStorage.getItem('access_token');
  return !!token;
};

export const getRole = () => {
  return localStorage.getItem('role');
};

export const getUserId = () => {
  const role = getRole();
  return role === 'donor' 
    ? localStorage.getItem('donorId') 
    : localStorage.getItem('ngoId');
};

export const clearAuth = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('role');
  localStorage.removeItem('donorId');
  localStorage.removeItem('ngoId');
};

export const saveAuth = (token, role) => {
  localStorage.setItem('access_token', token);
  localStorage.setItem('role', role);
};

// Check if token is expired
export const isTokenValid = () => {
  const token = localStorage.getItem('access_token');
  if (!token) return false;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};