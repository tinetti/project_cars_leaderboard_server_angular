# project_cars_leaderboard_server_angular

### Running Locally
Requires node 4.4
```
nvm use 4.4
```

```
(cd public && npm install)
npm install
npm start
```

### Publishing to DockerHub
```
docker build -t pcars-leaderboard .
docker tag pcars-leaderboard registry.swervesoft.com/pcars-leaderboard:1.0.1
docker tag pcars-leaderboard registry.swervesoft.com/pcars-leaderboard:latest
docker push registry.swervesoft.com/pcars-leaderboard
```
