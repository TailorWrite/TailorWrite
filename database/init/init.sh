#!/bin/bash
set -e

# Wait for the database to be ready
until PGPASSWORD=$POSTGRES_PASSWORD psql -h db -U postgres -d postgres -c '\q'; do
    >&2 echo "Postgres is unavailable - sleeping"
    sleep 1
done

>&2 echo "Postgres is up - executing initialization"

# Run your SQL commands
PGPASSWORD=$POSTGRES_PASSWORD psql -h db -U postgres -d postgres -f /schema.sql
PGPASSWORD=$POSTGRES_PASSWORD psql -h db -U postgres -d postgres -f /data.sql

echo "Database initialization completed"

exit 0