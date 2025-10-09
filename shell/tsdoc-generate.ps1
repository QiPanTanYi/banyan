#!/usr/bin/env pwsh
# TSDoc documentation generation and update script
# Used for generating and updating TypeScript documentation

Write-Host "=== TSDoc Documentation Generation Script ===" -ForegroundColor Green
Write-Host ""

# 1. Clean existing documentation
Write-Host "1. Cleaning existing documentation..." -ForegroundColor Cyan
if (Test-Path "docs") {
    Remove-Item -Recurse -Force "docs"
    Write-Host "[OK] Existing documentation cleaned" -ForegroundColor Green
} else {
    Write-Host "[INFO] No existing documentation found" -ForegroundColor Blue
}

Write-Host ""

# 2. Generate TSDoc documentation
Write-Host "2. Generating TSDoc documentation..." -ForegroundColor Cyan
pnpm docs:generate
if ($LASTEXITCODE -eq 0) {
    Write-Host "[OK] TSDoc documentation generated successfully" -ForegroundColor Green
} else {
    Write-Host "[X] TSDoc documentation generation failed" -ForegroundColor Red
    Write-Host "Please check your TSDoc comments and configuration" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# 3. Verify documentation files
Write-Host "3. Verifying documentation files..." -ForegroundColor Cyan
if (Test-Path "docs") {
    $docFiles = Get-ChildItem -Path "docs" -Recurse -File
    $fileCount = $docFiles.Count
    Write-Host "[OK] Documentation generated with $fileCount files" -ForegroundColor Green
    
    # List main documentation files
    Write-Host "Main documentation files:" -ForegroundColor Blue
    Get-ChildItem -Path "docs" -Name "*.md" | ForEach-Object {
        Write-Host "  - $_" -ForegroundColor White
    }
} else {
    Write-Host "[X] Documentation directory not found" -ForegroundColor Red
    exit 1
}

Write-Host ""

# 4. Optional: Start documentation server
Write-Host "4. Starting documentation server (optional)..." -ForegroundColor Cyan
Write-Host "Do you want to start the documentation server? (y/N): " -NoNewline -ForegroundColor Yellow
$response = Read-Host
if ($response -eq "y" -or $response -eq "Y") {
    Write-Host "Starting documentation server..." -ForegroundColor Cyan
    pnpm docs:serve
} else {
    Write-Host "[INFO] Documentation server not started" -ForegroundColor Blue
    Write-Host "You can start it manually with: pnpm docs:serve" -ForegroundColor Blue
}

Write-Host ""
Write-Host "=== TSDoc Generation Completed ===" -ForegroundColor Green
Write-Host "Documentation is available in the 'docs' directory" -ForegroundColor Blue
Write-Host "To view documentation, run: pnpm docs:serve" -ForegroundColor Blue

exit 0