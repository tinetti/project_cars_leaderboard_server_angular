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

### Publishing to the Registry
```
version=<version from package.json>
docker build -t pcars-leaderboard .
docker tag pcars-leaderboard registry.swervesoft.com/pcars-leaderboard:$version
docker tag pcars-leaderboard registry.swervesoft.com/pcars-leaderboard:latest
docker push registry.swervesoft.com/pcars-leaderboard
```

### Updating Kubernetes
```
# run from k8s master or a client that has kubectl
version=<last published version>
kubectl rolling-update pcars-leaderboard --image=registry.swervesoft.com/pcars-leaderboard:$version
```

