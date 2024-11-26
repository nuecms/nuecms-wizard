#!/bin/bash

# Ensure the script is run from the root of the project
if [ ! -f "package.json" ]; then
  echo "Error: package.json not found in the current directory."
  exit 1
fi

# Read the version from package.json using Node.js
VERSION=$(node -p "require('./package.json').version")

if [ -z "$VERSION" ]; then
  echo "Error: Version not found in package.json."
  exit 1
fi

# Ensure the correct version is read
echo "Updating version to v$VERSION..."

# Define the regex pattern to match versions (e.g., v1.2.3)
VERSION_PATTERN="v[0-9]+\.[0-9]+\.[0-9]+"

# Function to perform the version replacement in a given file
replace_version_in_file() {
  local file="$1"

  # Check if the file exists
  if [ ! -f "$file" ]; then
    echo "Warning: File '$file' does not exist. Skipping."
    return
  fi

  if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS: Use '' for no backup
    sed -E -i '' "s/$VERSION_PATTERN/v$VERSION/g" "$file"
  else
    # Linux or other systems: standard sed usage
    sed -E -i "s/$VERSION_PATTERN/v$VERSION/g" "$file"
  fi

  echo "Updated version in $file."
}

# Replace the version in install.sh
replace_version_in_file "install.sh"

# Replace the version in install.ps1
replace_version_in_file "install.ps1"

# Commit the changes if they were made
if git diff --quiet; then
  echo "No changes to commit."
else
  git add ./install.sh ./install.ps1
  git commit -m "Update version to v$VERSION in install scripts"
  echo "Changes committed."
fi
