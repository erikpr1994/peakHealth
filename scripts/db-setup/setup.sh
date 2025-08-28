#!/bin/bash

# Setup script for PeakHealth Routines database

echo "Setting up PeakHealth Routines database..."

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null
then
    echo "MongoDB is not running. Starting MongoDB..."
    mkdir -p /data/db
    mongod --fork --logpath /var/log/mongodb.log
    
    # Wait for MongoDB to start
    sleep 3
    
    if ! pgrep -x "mongod" > /dev/null
    then
        echo "Failed to start MongoDB. Please start it manually and try again."
        exit 1
    fi
    
    echo "MongoDB started successfully."
else
    echo "MongoDB is already running."
fi

# Install dependencies
echo "Installing dependencies..."
npm install

# Run the setup script
echo "Running database setup script..."
node setup-db.js

echo "Setup completed!"

