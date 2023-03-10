import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import { ApolloServer } from 'apollo-server-express';
import passport from 'passport';
require('dotenv').config();

import loggerConfig from './config/loggerConfig';

import typeDefs from './graphql/schemas/schemas';
import resolvers from './graphql/resolvers/resolvers';

const { NODE_ENV, SESSION_NAME, SESSION_SECRET, SESSION_MAX_AGE } = process.env;

const app = express();
const port = process.env.PORT || 8080;

mongoose.set('useCreateIndex', true);

// Secure Headers with Helmet
app.use(helmet());
app.use(helmet.permittedCrossDomainPolicies());

const MongoStore = connectMongo(session);
app.use(
    session({
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
        name: SESSION_NAME,
        secret: SESSION_SECRET,
        resave: true,
        rolling: true,
        saveUninitialized: false,
        cookie: {
            maxAge: parseInt(SESSION_MAX_AGE, 10),
            sameSite: true,
            httpOnly: true,
            secure: !NODE_ENV.trim() === 'development'
        }
    })
);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    context: ({ req, res }) => ({ req, res })
});

// Start passport service
app.use(passport.initialize());
app.use(passport.session());

// logging with morgan
// if (NODE_ENV === 'development') {
//     loggerConfig(app);
// }

server.applyMiddleware({
    app,
    cors: {
        credentials: true,
        origin: ['http://localhost:3000', 'http://localhost:8080']
    }
});

mongoose.connect('mongodb://127.0.0.1:27017/stuff', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"));

mongoose.connection.once('open', () => {
    app.listen({ port }, () => {
        console.log(`Server running on port ${port}`);
    });
});
mongoose.connection.on('error', error => console.error(error));