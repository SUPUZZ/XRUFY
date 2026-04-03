# Start/stop repo-local PostgreSQL (.pgdata-local, port 5433).
# Requires PostgreSQL 16 (winget EDB default path).
param(
    [Parameter(Position = 0)]
    [ValidateSet("start", "stop", "status")]
    [string]$Action = "start"
)

$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $PSScriptRoot
$data = Join-Path $repoRoot ".pgdata-local"
$log = Join-Path $data "pg.log"
$pgCtl = "C:\Program Files\PostgreSQL\16\bin\pg_ctl.exe"

if (-not (Test-Path $pgCtl)) {
    Write-Error "pg_ctl not found: $pgCtl. Install PostgreSQL 16 or edit this script."
}

switch ($Action) {
    "start" {
        if (-not (Test-Path $data)) {
            Write-Error "Data directory missing: $data. Run initdb first (see server/.env.example)."
        }
        & $pgCtl -D $data -l $log -o "-p 5433" start
    }
    "stop" { & $pgCtl -D $data stop }
    "status" { & $pgCtl -D $data status }
}
