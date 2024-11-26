# Ensure GITHUB_TAG is set (or use default version)
$VERSION="v1.0.0"

# Define the GitHub release URL (adjust with your repo details)
$GITHUB_REPO = "nuecms/nuecms-wizard"
$DOWNLOAD_URL = "https://github.com/$GITHUB_REPO/releases/download/$VERSION/wizard.zip"

# Download the wizard.zip from the latest release
Write-Host "Downloading $DOWNLOAD_URL..."
Invoke-WebRequest -Uri $DOWNLOAD_URL -OutFile "wizard.zip"

# Unzip the downloaded file
Write-Host "Unzipping wizard.zip..."
Expand-Archive -Path "wizard.zip" -DestinationPath "./wizard"

# Navigate into the unzipped directory and run the Node.js server
Write-Host "Running server..."
Set-Location -Path "./wizard"
node server.cjs

# Clean up by removing the zip file after use
Set-Location -Path ..
Remove-Item -Path "wizard.zip"

Write-Host "Installation and server start complete."
