
export const environment = {
  production: false,
  BASE_URL_API: 'http://localhost:8000/api',
};

export const API_ENV = {
  production: false,
  protocol: 'http',
  subDomain: "",
  domain: 'localhost',
  port: '',
  gateway: '',
  apiVersion: 'v1',
  prefix: 'api',
} as const;

export const API_URL: string = `${API_ENV['protocol']}://${API_ENV['subDomain'] ? `${API_ENV['subDomain']}.` : ''}${API_ENV['domain']}${API_ENV['port'] ? ':' + API_ENV['port'] : ''}/${API_ENV['gateway'] ? API_ENV['gateway'] + '/' : ''}`;
