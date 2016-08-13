#!/bin/bash

k8s_host=$1
version=$2
if [[ -z "$version" ]]; then
  echo "usage: $(basename $0) k8s_host version"
  exit 1
fi

echo ssh $k8s_host "'kubectl rolling-update pcars-leaderboard --image=registry.swervesoft.com/pcars-leaderboard:$version'"
