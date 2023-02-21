#!/bin/bash
ng build
git add .
git commit -m "This is another commit soon will keep new ones"
git push -u origin main
firebase deploy

