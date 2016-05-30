module.exports = {
    server: {
        port: process.env.PORT || 3000
    },
    mongo: {
        url: process.env.MONGO_URL || 'mongodb://mongo.swervesoft.net:27017/pcars_leaderboard'
    }
}