#!/bin/bash
if [ "$TRAVIS_REPO_SLUG" == "hannes-hochreiner/more-todos" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ] && [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_TAG" ]; then
  echo -e "Publishing...\n"

  cp -r . $HOME/export

  cd $HOME
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "travis-ci"
  git clone --quiet --branch=gh-pages https://${GH_TOKEN}@github.com/hannes-hochreiner/more-todos gh-pages > /dev/null
  cd gh-pages
  git rm -rf .
  cp -rf $HOME/export/bld .

  git add -f .
  git commit -m "Lastest version on successful travis build $TRAVIS_BUILD_NUMBER auto-pushed to gh-pages"
  git push -fq origin gh-pages > /dev/null
  echo -e "Published to gh-pages.\n"
fi
