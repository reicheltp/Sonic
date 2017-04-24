#!/usr/bin/env bash

# run with:
# $ ./deploy company/repo master MyApp

LOCAL_ROOT="/tmp/sonic/deploy";
LOCAL_REPO_NAME="$1";
LOCAL_REPO="$LOCAL_ROOT/$LOCAL_REPO_NAME";
REMOTE_REPO="https://github.com/$1.git";
BRANCH=$2;
APP_NAME=$3;

mkdir -p $LOCAL_REPO
cd $LOCAL_REPO

git init
git pull $REMOTE_REPO $BRANCH -f

yarn

code-push release-react $APP_NAME ios
code-push release-react $APP_NAME android

