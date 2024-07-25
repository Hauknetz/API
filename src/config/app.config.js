require('dotenv').config();

module.exports = {
    App: {
        Environment: process.env.NODE_ENV === 'production' ? 'development' : 'production',
        Name: process.env.APP_NAME,
        Version: process.env.APP_VERSION,
        Description: process.env.APP_DESCRIPTION,
        Author: process.env.APP_AUTHOR,
        Email: process.env.APP_EMAIL,
        BuildDate: new Date().toISOString(),
        Scripts: {
            Test: process.env.APP_SCRIPT_TEST,
            Development: process.env.APP_SCRIPT_DEVELOPMENT,
            Build: process.env.APP_SCRIPT_BUILD,
            Production: process.env.APP_SCRIPT_PRODUCTION,
        }
    },
    Server: {
        TLS: {
            SSLNoSSL: process.env.SERVER_TLS_SSL_NOSSL || 'http',
            KeyPath: process.env.SERVER_TLS_KEYPATH,
            CertPath: process.env.SERVER_TLS_CERTPATH,
        },
        BaseURL: process.env.SERVER_BASE_URL,
        Port: process.env.SERVER_PORT || 8080,
    },
    Database: {
        MySQL: {
            Enabled: process.env.MYSQL_ENABLED,
            ConnectionString: {
                Host: process.env.DB_HOST,
                Port: process.env.DB_PORT || 3306,
                User: process.env.DB_USER,
                Password: process.env.DB_PASSWORD,
                Database: process.env.DB_NAME,
            }
        },
        MongoDB: {
            Enabled: process.env.MONGODB_ENABLED,
            ConnectionString: {
                URI: process.env.MONGODB_URI,
            }
        },
    },
    Security: {
        JWT: {
            Secret: process.env.JWT_SECRET,
            ExpirationTime: process.env.JWT_EXPIRATION_TIME || '1h',
        },
        Cors: {
            AllowedOrigins: process.env.CORS_ALLOWED_ORIGINS,
            AllowedHeaders: process.env.CORS_ALLOWED_HEADERS,
            ExposedHeaders: process.env.CORS_EXPOSED_HEADERS,
            Credentials: process.env.CORS_CREDENTIALS,
            Methods: process.env.CORS_METHODS,
            MaxAge: process.env.CORS_MAX_AGE,
        },
        RateLimit: {
            Enabled: process.env.SECURITY_RATE_LIMIT_ENABLED,
            Max: process.env.SECURITY_RATE_LIMIT_MAX,
            Interval: process.env.SECURITY_RATE_LIMIT_INTERVAL,
            Message: process.env.SECURITY_RATE_LIMIT_MESSAGE,
            StatusCode: process.env.SECURITY_RATE_LIMIT_STATUS_CODE,
            Headers: process.env.SECURITY_RATE_LIMIT_HEADERS,
            DisableHeaders: process.env.SECURITY_RATE_LIMIT_DISABLE_HEADERS,
            EnableCORS: process.env.SECURITY_RATE_LIMIT_ENABLE_CORS,
            EnableIP: process.env.SECURITY_RATE_LIMIT_ENABLE_IP,
            EnablePath: process.env.SECURITY_RATE_LIMIT_ENABLE_PATH,
            EnableMethod: process.env.SECURITY_RATE_LIMIT
        }
    },
    Email: {
        SMTP_IMAP: {
            SMTPServer: process.env.SMTP_SERVER,
            SMTPPort: process.env.SMTP_PORT || 993,
            SMTPUsername: process.env.SMTP_USERNAME,
            SMTPPassword: process.env.SMTP_PASSWORD,
        },
        Sender: {
            SenderEmail: process.env.SENDER_EMAIL || 'noreply@hauknetz.de',
            SenderName: process.env.SENDER_NAME || 'noReply | Hauknetz',
        },
        Templates: {
            ResetPassword: process.env.EMAIL_TEMPLATE_RESET_PASSWORD,
            VerifyEmail: process.env.EMAIL_TEMPLATE_VERIFY_EMAIL,
            ForgotPassword: process.env.EMAIL_TEMPLATE_FORGOT_PASSWORD,
            InviteUser: process.env.EMAIL_TEMPLATE_INVITE_USER,
        },
    },
    Discord: {
        Token: process.env.DISCORD_BOT_TOKEN,
        ClientId: process.env.DISCORD_CLIENT_ID,
        ClientSecret: process.env.DISCORD_CLIENT_SECRET,
        WebhookURL: process.env.DISCORD_WEBHOOK_URL
    },
    Sentry: {
        Dsn: process.env.SENTRY_DSN,
    },
    Proxmox: {
        Host: process.env.PROXMOX_HOST,
        Port: process.env.PROXMOX_PORT,
        User: process.env.PROXMOX_USER,
        Password: process.env.PROXMOX_PASSWORD,
        Realm: process.env.PROXMOX_REALM,
        HTTPS: process.env.PROXMOX_HTTPS,
    },
    WhatsApp: {
        ApiUrl: process.env.WHATSAPP_API_URL,
        ApiToken: process.env.WHATSAPP_API_TOKEN,
        FromNumber: process.env.WHATSAPP_FROM_NUMBER,
        Whitelist: process.env.WHATSAPP_WHITELIST,
        MessageTemplate: process.env.WHATSAPP_MESSAGE_TEMPLATE,
    },
    Plex: {
        ApiToken: process.env.PLEX_API_TOKEN,
        Host: process.env.PLEX_HOST,
        Port: process.env.PLEX_PORT,
    },
    GitLab: {
        BaseURL: process.env.GITLAB_BASE_URL,
        Token: process.env.GITLAB_TOKEN,
    },
    Github: {
        ApiToken: process.env.GITHUB_API_TOKEN,
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
        ArchiveCount: process.env.ERROR_LOG_ARCHIVE_COUNT
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
    Development: {
        Database: {
            URI: process.env.DEVELOPMENT_DATABASE_URI
        },
    }
};
