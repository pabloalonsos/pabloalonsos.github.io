#!/bin/sh
npm run build
git subtree push --prefix build upstream main
