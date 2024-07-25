[
    {
        App: {
            Environment: process.env.NODE_ENV === 'production' ? 'development' : 'production',
            Name: process.env.SERVER_NAME,
            Version: process.env.VERSION,
            Description: process.env.APP_DESCRIPTION,
            Author: process.env.APP_AUTHOR,
            Email: process.env.APP_EMAIL,
            BuildDate: new Date().toISOString(),
            Scripts: {
                Test: process.env.APP_SCRIPTS_TEST,
                Development: process.env.APP_SCRIPTS_DEVELOPMENT,
                Build: process.env.APP_SCRIPTS_BUILD,
                Production: process.env.APP_SCRIPTS_PRODUCTION,
            }
        },
        Server: {
            TLS: {
                SSLNoSSL: process.env.SSL_NOSSL || false,
            },
            BaseURL: process.env.BASE_URL,
            Port: process.env.PORT || 8080,
        },
        Database: {
            MongoDBURI: process.env.MONGODB_URI,
        },
        JWT: {
            Secret: process.env.JWT_SECRET,
            ExpirationTime: process.env.JWT_EXPIRATION_TIME || '1h',
        },
        Email: {
            SMTPServer: process.env.SMTP_SERVER,
            SMTPPort: process.env.SMTP_PORT || 993,
            SMTPUsername: process.env.SMTP_USERNAME,
            SMTPPassword: process.env.SMTP_PASSWORD,
            SenderEmail: process.env.SENDER_EMAIL || 'noreply@hauknetz.de',
            SenderName: process.env.SENDER_NAME || 'noReply | Hauknetz',
            Templates: {
                ResetPassword: process.env.EMAIL_TEMPLATE_RESET_PASSWORD,
                VerifyEmail: process.env.EMAIL_TEMPLATE_VERIFY_EMAIL,
                ForgotPassword: process.env.EMAIL_TEMPLATE_FORGOT_PASSWORD,
                InviteUser: process.env.EMAIL_TEMPLATE_INVITE_USER,
            },
        },
        Cors: {
            AllowedOrigins: process.env.CORS_ALLOWED_ORIGINS,
            AllowedHeaders: process.env.CORS_ALLOWED_HEADERS,
            ExposedHeaders: process.env.CORS_EXPOSED_HEADERS,
            Credentials: process.env.CORS_CREDENTIALS,
            Methods: process.env.CORS_METHODS,
            MaxAge: process.env.CORS_MAX_AGE,
        },
        Swagger: {
            Enabled: process.env.SWAGGER_ENABLED,
            Path: process.env.SWAGGER_PATH,
            UIPath: process.env.SWAGGER_UI_PATH,
            UIConfig: process.env.SWAGGER_UI_CONFIG,
            JsonConfig: process.env.SWAGGER_JSON_CONFIG,
        },
        Monitoring: {
            PrometheusEnabled: process.env.PROMETHEUS_ENABLED,
            PrometheusPath: process.env.PROMETHEUS_PATH,
            PrometheusPort: process.env.PROMETHEUS_PORT,
        },
        Security: {
            RateLimitEnabled: process.env.SECURITY_RATE_LIMIT_ENABLED,
            RateLimitMax: process.env.SECURITY_RATE_LIMIT_MAX,
            RateLimitInterval: process.env.SECURITY_RATE_LIMIT_INTERVAL,
            RateLimitMessage: process.env.SECURITY_RATE_LIMIT_MESSAGE,
            RateLimitStatusCode: process.env.SECURITY_RATE_LIMIT_STATUS_CODE,
            RateLimitHeaders: process.env.SECURITY_RATE_LIMIT_HEADERS,
            RateLimitDisableHeaders: process.env.SECURITY_RATE_LIMIT_DISABLE_HEADERS,
            RateLimitEnableCORS: process.env.SECURITY_RATE_LIMIT_ENABLE_CORS,
            RateLimitEnableIP: process.env.SECURITY_RATE_LIMIT_ENABLE_IP,
            RateLimitEnablePath: process.env.SECURITY_RATE_LIMIT_ENABLE_PATH,
            RateLimitEnableMethod: process.env.SECURITY_RATE_LIMIT
        },
        ErrorHandling: {
            FilePath: process.env.ERROR_LOG_FILE_PATH,
            FileName: process.env.ERROR_LOG_FILE_NAME,
            MaxFileSize: process.env.ERROR_LOG_MAX_FILE_SIZE,
            MaxFiles: process.env.ERROR_LOG_MAX_FILES,
            Archive: process.env.ERROR_LOG_ARCHIVE,
            ArchiveFrequency: process.env.ERROR_LOG_ARCHIVE_FREQUENCY,
            ArchiveCompress: process.env.ERROR_LOG_ARCHIVE_COMPRESS,
            ArchivePath: process.env.ERROR_LOG_ARCHIVE_PATH,
            ArchiveName: process.env.ERROR_LOG_ARCHIVE_NAME,
            ArchiveSize: process.env.ERROR_LOG_ARCHIVE_SIZE,
            ArchiveCount: process.env.ERROR_LOG_ARCHIVE_
        },
        Logging: {
            LogToFile: process.env.LOG_TO_FILE,
            LogFileName: process.env.LOG_FILE_NAME,
        },
        Debug: {
            Enabled: process.env.DEBUG_ENABLED,
            ColorEnabled: process.env.DEBUG_COLOR_ENABLED,
            Output: process.env.DEBUG_OUTPUT,
            Level: process.env.DEBUG_LEVEL,
            Tags: process.env.DEBUG_TAGS,
            Timezone: process.env.DEBUG_TIMEZONE,
            StackTraceLimit: process.env.DEBUG_STACK_TRACE_LIMIT,
        },
        Development:
        {
            Database: {
                DatabaseURI: process.env.DEVELOPMENT_DATABASE_URI,
                DatabaseName: process.env.DEVELOPMENT_DATABASE_NAME
            },
        }
    }
]