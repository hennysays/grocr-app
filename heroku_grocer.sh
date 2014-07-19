#! /bin/bash

git add -A
git commit -m “test”
git push heroku master
heroku logs -t