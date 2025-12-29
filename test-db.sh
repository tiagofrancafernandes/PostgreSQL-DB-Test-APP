#!/bin/bash

SHOW_DATABASE_URL=$1

if [[ -f .env ]]; then
    source .env
else
    exit 3
fi

if [[ $SHOW_DATABASE_URL == "1" || $SHOW_DATABASE_URL == "on" || $SHOW_DATABASE_URL == "true" ]]; then
    echo "${DATABASE_URL}";
fi

psql "${DATABASE_URL}" -c "SELECT 1;" > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo "✅ Database connection successful"
    exit 0
else
    echo "🔴 Database connection failed"
    exit 1
fi
