#!/bin/bash

# Ensure GITHUB_TAG is set (or use default version)
VERSION="v1.0.6"

# Define the GitHub release URL (adjust with your repo details)
GITHUB_REPO="nuecms/nuecms-wizard"
DOWNLOAD_URL="https://github.com/$GITHUB_REPO/releases/download/$VERSION/wizard.zip"

# Download the wizard.zip from the latest release
echo "Downloading $DOWNLOAD_URL..."
curl -L -o wizard.zip "$DOWNLOAD_URL"

# Unzip the downloaded file
echo "Unzipping wizard.zip..."
unzip -o wizard.zip -d ./wizard

# Navigate into the unzipped directory and run the Node.js server
echo "Running server..."
cd ./wizard
node server.cjs

# Clean up by removing the zip file after use
cd ..
rm wizard.zip

echo "Installation and server start complete."
