# Ensure GITHUB_TAG is set (or use default version)
$VERSION="v1.0.7"

# Define the GitHub release URL (adjust with your repo details)
$GITHUB_REPO = "nuecms/nuecms-wizard"
$DOWNLOAD_URL = "https://github.com/$GITHUB_REPO/releases/download/$VERSION/wizard.zip"

# Download the wizard.zip from the latest release
Write-Host "Downloading $DOWNLOAD_URL..."
Invoke-WebRequest -Uri $DOWNLOAD_URL -OutFile "wizard.zip"

# Unzip the downloaded file
Write-Host "Unzipping wizard.zip..."
Expand-Archive -Path "wizard.zip" -DestinationPath "."

# Navigate into the unzipped directory and run the Node.js server
Write-Host "Running server..."
node dist/server.cjs

# Clean up by removing the zip file after use

Remove-Item -Path "wizard.zip"

Write-Host "Installation and server start complete."



# Step 2: Download the repository as 'demo-repository.zip'
Invoke-WebRequest -Uri https://github.com/nuecms/demo-repository/archive/refs/heads/main.zip -OutFile demo-repository.zip

# Step 3: Unzip the downloaded file
Expand-Archive -Path demo-repository.zip -DestinationPath .

# Step 4: Move the contents of the extracted folder to the current directory
Move-Item -Path .\demo-repository-main\* -Destination .\

# Step 5: Remove the extracted folder and the ZIP file
Remove-Item -Recurse -Force .\demo-repository-main
Remove-Item -Force .\demo-repository.zip


# Step 1: Check if pnpm is installed
$pnpmExists = Get-Command pnpm -ErrorAction SilentlyContinue

if ($pnpmExists) {
    Write-Host "pnpm is already installed. Proceeding with installation of dependencies..."
} else {
    Write-Host "pnpm is not installed. Please install pnpm first."
    Write-Host "You can install pnpm using the following command:"
    Write-Host "npm install -g pnpm"
    exit
}

# Step 6: Run pnpm install in the background
Write-Host "Running pnpm install in the background..."

# Start pnpm install in the background and redirect output to a log file
Start-Process pnpm -ArgumentList "install" -NoNewWindow -RedirectStandardOutput "pnpm-install.log" -RedirectStandardError "pnpm-install-error.log" -WindowStyle Hidden

Write-Host "pnpm install is running in the background. Check 'pnpm-install.log' and 'pnpm-install-error.log' for logs."


