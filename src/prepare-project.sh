#!/usr/bin/env bash

# run with:
# $ ./prepare-project company/repo master MyApp token

LOCAL_ROOT="/tmp/sonic/deploy";
LOCAL_REPO_NAME="$1";
LOCAL_REPO="$LOCAL_ROOT/$LOCAL_REPO_NAME";
REMOTE_REPO="https://github.com/$1.git";
BRANCH=$2;
APP_NAME=$3;
GITHUB_TOKEN=$4;

mkdir -p $LOCAL_REPO;
cd $LOCAL_REPO;

git init;
git pull $REMOTE_REPO $BRANCH -f;

yarn;
yarn add react-native-code-push@latest;

react-native link;

git add *;
git branch $BRANCH sonic/auto-update;
git commit -m "Added Code-Push";

git push origin sonic/auto-update;

# TODO: Automated Pull Request for project