export const environment = {
  production: true,
  
  /* API Configuration */
  apiUrl: 'https://your-secure-api.com/api',
  apiVersion: 'v1',
  
  /* Security Configuration */
  security: {
    enableCSRFProtection: true,
    enableRateLimiting: true,
    maxRequestsPerMinute: 60,
    sessionTimeout: 1800000, /* 30 minutes */
    enableEncryption: true,
    enableIntegrityCheck: true,
    enableLogging: true,
    logLevel: 'error', /* Only log errors in production */
    
    /* JWT Configuration */
    jwtSecret: 'your-super-secure-jwt-secret-key-here',
    jwtExpiration: 3600, /* 1 hour */
    refreshTokenExpiration: 604800, /* 7 days */
    
    /* Encryption keys (should be stored securely) */
    encryptionKey: 'your-32-character-encryption-key-here',
    integrityKey: 'your-32-character-integrity-key-here',
    
    /* CORS Configuration */
    allowedOrigins: [
      'https://rasfarras.my.id/',
      'https://www.rasfarras.my.id/'
    ],
    
    /* Security Headers */
    securityHeaders: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
    }
  },
  
  /* Feature flags */
  features: {
    enableBiometricAuth: true,
    enablePushNotifications: true,
    enableOfflineMode: true,
    enableAnalytics: false, /* Disable in production for privacy */
    enableDebugMode: false
  },
  
  /* API Rate Limiting */
  rateLimiting: {
    enabled: true,
    maxRequests: 1000,
    windowMs: 900000, /* 15 minutes */
    skipSuccessfulRequests: false,
    skipFailedRequests: false,
    keyGenerator: (req: any) => {
      return req.ip || req.connection.remoteAddress;
    }
  },
  
  /* Database Configuration */
  database: {
    name: '__myappdb_prod',
    encryptionKey: 'your-database-encryption-key-here',
    maxAge: 86400000 /* 24 hours */
  },
  
  /* Logging Configuration */
  logging: {
    level: 'error',
    enableConsoleLog: false,
    enableFileLog: true,
    maxLogSize: 10485760, /* 10MB */
    maxLogFiles: 5
  },
  
  /* Performance Configuration */
  performance: {
    enableCaching: true,
    cacheMaxAge: 3600000, /* 1 hour */
    enableCompression: true,
    enableMinification: true
  },
  
  /* Third-party Services */
  thirdParty: {
    googleAnalytics: {
      enabled: false,
      trackingId: ''
    },
    crashlytics: {
      enabled: true,
      apiKey: 'your-crashlytics-api-key'
    },
    sentry: {
      enabled: true,
      dsn: 'your-sentry-dsn-here'
    }
  }
};