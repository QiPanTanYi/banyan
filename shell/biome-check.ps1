#!/usr/bin/env pwsh
# Biome code formatting and checking script
# Used for Biome formatting and linting functionality

Write-Host "=== Biome Code Formatting and Checking Script ===" -ForegroundColor Green
Write-Host ""

# 1. Run Biome check and auto-fix
Write-Host "1. Running Biome code check and auto-fix..." -ForegroundColor Cyan
pnpm check
if ($LASTEXITCODE -ne 0) {
    Write-Host "[X] Code issues found, attempted auto-fix" -ForegroundColor Yellow
} else {
    Write-Host "[OK] Code check passed" -ForegroundColor Green
}

Write-Host ""

# 2. Run Biome formatting
Write-Host "2. Running Biome code formatting..." -ForegroundColor Cyan
pnpm format
if ($LASTEXITCODE -eq 0) {
    Write-Host "[OK] Code formatting completed" -ForegroundColor Green
} else {
    Write-Host "[X] Code formatting failed" -ForegroundColor Red
}

Write-Host ""

# 3. Run Biome Linting
Write-Host "3. Running Biome Linting..." -ForegroundColor Cyan
pnpm lint
if ($LASTEXITCODE -eq 0) {
    Write-Host "[OK] Linting check passed" -ForegroundColor Green
} else {
    Write-Host "[X] Linting issues found" -ForegroundColor Yellow
}

Write-Host ""

# 4. Final check
Write-Host "4. Final code check..." -ForegroundColor Cyan
pnpm check
if ($LASTEXITCODE -eq 0) {
    Write-Host "[OK] All checks passed!" -ForegroundColor Green
} else {
    Write-Host "[X] Issues remain, manual handling required" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== Biome Check Completed ===" -ForegroundColor Green

# Exit with appropriate code
if ($LASTEXITCODE -eq 0) {
    Write-Host "Script executed successfully" -ForegroundColor Green
    exit 0
} else {
    Write-Host "Script completed with issues" -ForegroundColor Yellow
    exit 1
}