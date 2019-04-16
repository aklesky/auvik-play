#!/bin/sh
set -e

cd /usr/src/app

dist_dir="/usr/src/app/dist"

if [ ! -d "$dist_dir" ]; then
  npm run build
fi

exec "$@";
