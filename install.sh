#!/bin/bash

# Variables
VERSION="v1.0.7"
GITHUB_REPO="nuecms/nuecms-wizard"
WIZARD_URL="https://github.com/$GITHUB_REPO/releases/download/$VERSION/wizard.zip"
DEMO_REPO_URL="https://github.com/nuecms/demo-repository/archive/refs/heads/main.zip"

# Functions
cleanup() {
    echo "Cleaning up..."
    rm -rf dist wizard.zip demo-repository.zip demo-repository-main
    echo "Cleanup complete."
    kill $B_PID
}

download_and_unzip() {
    local url=$1
    local output_zip=$2
    echo "Downloading from $url..."
    curl -L -o "$output_zip" "$url"
    echo "Unzipping $output_zip..."
    unzip -o "$output_zip"
}

install_dependencies() {
    if ! command -v pnpm &>/dev/null; then
        echo "pnpm not found. Install it with: npm install -g pnpm"
        exit 1
    fi
    echo "Installing dependencies with pnpm..."
    pnpm install
}

start_server() {
    echo "Starting Node.js server..."
    node dist/server.cjs
}

# Main Script Execution
trap cleanup EXIT

# Step 1: Set up wizard
download_and_unzip "$WIZARD_URL" "wizard.zip"

(
  # Step 2: Set up demo repository
  download_and_unzip "$DEMO_REPO_URL" "demo-repository.zip"
  mv -f demo-repository-main/{.,}* .
  rm -rf demo-repository-main

  # Step 3: Install dependencies and start server
  install_dependencies
) &
B_PID=$!



start_server
