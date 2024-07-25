const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const passport = require('passport');
const path = require('path');

// Middleware
const requestLogger = require('./middlewares/logger.middleware');
const sentryMiddleware = require('./middlewares/sentry.middleware');
const socketIOMiddleware = require('./middlewares/socketio.middleware');

// Configs
const config = require('./config/app.config');

// Databases
const connectDatabase = require('./database/connect.database');

// Special Features
const discordBot = require('./bot/index.bot');

// Authentication
const authRouter = require('./routes/auth.router');

// User Personalization Routes
const profileRouter = require('./routes/profile.router');
const friendRouter = require('./routes/friend.router');

// CRUD Routes
const userRouter = require('./routes/user.router');
const tagRouter = require('./routes/tag.router');
const roleRouter = require('./routes/role.router');
const projectRouter = require('./routes/project.router');
const productRouter = require('./routes/product.router');
const teamRouter = require('./routes/team.router');
const postRouter = require('./routes/post.router');
const partnerRouter = require('./routes/partner.router');
const groupRouter = require('./routes/group.router');
const gameRouter = require('./routes/game.router');
const categoryRouter = require('./routes/category.router');
const blogRouter = require('./routes/blog.router');
const companyRouter = require('./routes/company.router');
const tournamentRouter = require('./routes/tournament.router');
const ticketRouter = require('./routes/ticket.router');
const certificateRouter = require('./routes/certificate.router');
const fileRouter = require('./routes/file.router');
const taskRouter = require('./routes/task.router');

// Services
const emailRouter = require('./routes/email.router');
const chatService = require('./routes/chat.router');
const serverService = require('./routes/server.router');
const proxmoxService = require('./routes/proxmox.router');
const whatsappService = require('./routes/whatsapp.router');
const plexService = require('./routes/plex.router');
const gitlabService = require('./routes/gitlab.router');

// Utils
const logger = require('./utils/winston.util');
const debugUtil = require('./utils/debug.util');

// Store
const reviewRouter = require('./routes/review.router');

const app = express();

// Middleware
app.use(bodyParser.json()); // Parse JSON request body
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request body
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(cookieParser());

app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy({ policy: 'no-referrer' }));
app.use(helmet.hsts({ maxAge: 31536000, includeSubDomains: true, preload: true }));
app.use(helmet.frameguard({ action: 'deny' }));
app.use(helmet.xssFilter());
app.use(helmet.dnsPrefetchControl({ allow: false }));

// Data sanitization against NoSQL injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Middleware für Passport
app.use(passport.initialize());

// Apply request logging middleware
app.use(requestLogger);

// Connect to database and start bot
connectDatabase(); // Connect to database
//discordBot.startBot(); // Start the Discord bot

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/api', cors({
    origin: ['http://localhost:3030', 'https://localhost:3030'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Authorization'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

// Hauptroute zum Anzeigen aller Anfragen und Antworten
app.use('/api', (req, res, next) => {
    const { method, originalUrl } = req;
    const start = Date.now();

    // Log incoming request
    requestLogger(req, res, () => {});

    res.on('finish', () => {
        const duration = Date.now() - start;
        logger.info(`API Route Hit: ${method} ${originalUrl} - ${res.statusCode} ${res.statusMessage} (${duration}ms)`);
        console.log(`API Route Hit: ${method} ${originalUrl} - ${res.statusCode} ${res.statusMessage} (${duration}ms)`);
    });

    next();
});

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/v1', (req, res) => {
    res.render('api');
});

// Authentication Routes
app.use('/api/auth', authRouter);

// User Personalization Routes
app.use('/api/profiles', profileRouter);
app.use('/api/friends', friendRouter);

// CRUD Routes
app.use('/api/users', userRouter);
app.use('/api/tags', tagRouter);
app.use('/api/roles', roleRouter);
app.use('/api/projects', projectRouter);
app.use('/api/products', productRouter);
app.use('/api/teams', teamRouter);
app.use('/api/posts', postRouter);
app.use('/api/partners', partnerRouter);
app.use('/api/groups', groupRouter);
app.use('/api/games', gameRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/companies', companyRouter);
app.use('/api/tournaments', tournamentRouter);
app.use('/api/tickets', ticketRouter);
app.use('/api/certificates', certificateRouter);
app.use('/api/files', fileRouter);
app.use('/api/tasks', taskRouter);

// Services
app.use('/api/emails', emailRouter);
app.use('/api/chats', chatService);
app.use('/api/servers', serverService);
app.use('/api/proxmox', proxmoxService);
app.use('/api/whatsapp', whatsappService);
app.use('/api/plex', plexService);
app.use('/api/gitlab', gitlabService);

// Store
app.use('/api/review', reviewRouter);

// Error handling middleware
app.use(sentryMiddleware.errorHandler);

// 404 Error handler
app.use((req, res, next) => {
    res.status(404).json({
        error: {
            message: 'Not Found'
        }
    });
    logger.error(`Error occurred: Not Found`, { url: req.originalUrl });
});

// General error handler
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    });
    logger.error(`Error occurred: ${error.message}`, { stack: error.stack });
});

// Initialize Socket.IO and start the server
socketIOMiddleware(app);

module.exports = app;
