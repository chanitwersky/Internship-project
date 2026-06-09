# Stops any process on port 5141, builds, and starts the API (avoids DLL lock errors).
$port = 5141
$connections = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
if ($connections) {
    $connections | ForEach-Object {
        Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue
    }
    Start-Sleep -Seconds 2
    Write-Host "Stopped existing process on port $port"
}

dotnet build
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

dotnet run --launch-profile http --no-build
