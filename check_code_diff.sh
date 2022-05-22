#!/bin/bash
set -e

if [[ `git status --porcelain` ]]; then
    echo "changed"
    git diff --name-only
    exit 1
else
    echo "no change"
    exit 0
fi
