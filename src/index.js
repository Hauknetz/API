const express = require('express');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const categoryRoutes = require('./routes/category.routes');
const blogsRoutes = require('./routes/blogs.routes');
const productRoutes = require('./routes/product.routes');
const roleRoutes = require('./routes/role.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

app.use(express.json());

//app.use('/api/auth', authRoutes)
//app.use('/api/categories', categoryRoutes)
//app.use('/api/blogs', blogsRoutes)
//app.use('/api/products', productRoutes)
//app.use('/api/roles', roleRoutes)
//app.use('/api/users', userRoutes)

const port = process.env.PORT || 3000;
const basicURL = process.env.BASE_URL;
const sslNossl = process.env.SSL_NOSSL;
app.listen(port, basicURL, sslNossl, () => {
    console.log(`API run on URI: ${sslNossl}://${basicURL}:${port}`);
});

module.exports = app;