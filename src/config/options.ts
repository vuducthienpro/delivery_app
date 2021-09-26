const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    autoIndex: false,
    retryWrites: false,
};

const MONGO = {
    options: MONGO_OPTIONS,
};

const config = {
    mongo: MONGO,
};

export default config;