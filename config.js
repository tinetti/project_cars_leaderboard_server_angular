module.exports = {
    hapi: {
        options: {}
    },
    server: {
        port: process.env.PORT || 4000
    },
    mongo: {
        url: process.env.MONGO_URL || 'mongodb://10.0.0.15:27017/pcars_leaderboard'
    }
};