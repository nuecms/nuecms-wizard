# Variables
$VERSION = "v1.0.9"
$GITHUB_REPO = "nuecms/nuecms-wizard"
$WIZARD_URL = "https://github.com/$GITHUB_REPO/releases/download/$VERSION/wizard.zip"
$DEMO_REPO_URL = "https://github.com/nuecms/demo-repository/archive/refs/heads/main.zip"
$B_PID = $null

# Functions
function Cleanup {
    Write-Host "Cleaning up..."
    Remove-Item -Recurse -Force dist,wizard.zip,demo-repository.zip,demo-repository-main -ErrorAction SilentlyContinue
    Write-Host "Cleanup complete."
    if ($B_PID) {
        Stop-Process -Id $B_PID -Force -ErrorAction SilentlyContinue
    }
}

function DownloadAndUnzip {
    param (
        [string]$Url,
        [string]$OutputZip
    )
    Write-Host "Downloading from $Url..."
    Invoke-WebRequest -Uri $Url -OutFile $OutputZip
    Write-Host "Unzipping $OutputZip..."
    Expand-Archive -Path $OutputZip -DestinationPath . -Force
}

function InstallDependencies {
    if (-not (Get-Command "pnpm" -ErrorAction SilentlyContinue)) {
        Write-Host "pnpm not found. Install it with: npm install -g pnpm"
        exit 1
    }
    Write-Host "Installing dependencies with pnpm..."
    pnpm install
}

function StartServer {
    Write-Host "Starting Node.js server..."
    Start-Process "node" -ArgumentList "dist/server.cjs" -NoNewWindow
}

# Main Script Execution
try {
    # Ensure cleanup runs on exit
    Register-EngineEvent PowerShell.Exiting -Action { Cleanup }

    # Step 1: Set up wizard
    DownloadAndUnzip -Url $WIZARD_URL -OutputZip "wizard.zip"

    Start-Job -ScriptBlock {
        # Step 2: Set up demo repository
        DownloadAndUnzip -Url $using:DEMO_REPO_URL -OutputZip "demo-repository.zip"
        Move-Item -Path "demo-repository-main/*", "demo-repository-main/.*" -Destination . -Force -ErrorAction SilentlyContinue
        Remove-Item -Recurse -Force "demo-repository-main" -ErrorAction SilentlyContinue

        # Step 3: Install dependencies
        InstallDependencies
    } -PassThru | ForEach-Object { $B_PID = $_.Id }

    # Step 4: Start server
    StartServer
}
catch {
    Write-Host "An error occurred: $_"
    Cleanup
    exit 1
}
