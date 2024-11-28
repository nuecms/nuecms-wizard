#!/bin/bash

# Ensure GITHUB_TAG is set (or use default version)
VERSION="v1.0.7"

# Define the GitHub release URL (adjust with your repo details)
GITHUB_REPO="nuecms/nuecms-wizard"
DOWNLOAD_URL="https://github.com/$GITHUB_REPO/releases/download/$VERSION/wizard.zip"

# Download the wizard.zip from the latest release
echo "Downloading $DOWNLOAD_URL..."
curl -L -o wizard.zip "$DOWNLOAD_URL"

# Unzip the downloaded file
echo "Unzipping wizard.zip..."
unzip -o wizard.zip -d .

# Navigate into the unzipped directory and run the Node.js server
echo "Running server..."

node dist/server.cjs

# Clean up by removing the zip file after use

rm wizard.zip

echo "Installation and server start complete."

# todo remove the demo-repository

# Step 2: Download the repository as 'demo-repository.zip'
wget -O demo-repository.zip https://github.com/nuecms/demo-repository/archive/refs/heads/main.zip

# Step 3: Unzip the downloaded file
unzip demo-repository.zip

# Step 4: Move the contents of the extracted folder to the current directory
mv demo-repository-main/* .

# Step 5: Remove the extracted folder and the ZIP file
rm -rf demo-repository-main demo-repository.zip

# Step 1: Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "pnpm is not installed. Please install pnpm first."
    echo "You can install pnpm using the following command:"
    echo "npm install -g pnpm"
    exit 1
else
    echo "pnpm is already installed. Proceeding with installation of dependencies..."
fi

# Step 6: Run pnpm install in the background
echo "Installing dependencies with pnpm in the background..."
nohup pnpm install &

# Optionally, you can save the process output to a file:
# nohup pnpm install > pnpm-install.log 2>&1 &

echo "pnpm install is running in the background. Check 'nohup.out' for logs."
