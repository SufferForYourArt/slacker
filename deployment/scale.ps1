# Exit on any error
$ErrorActionPreference = "Stop"

# Get a tag for the build
$ScaleTo = Read-Host -Prompt "Enter new replicas total"

# Get currently active replication controller
[regex]$regex = "(api-[a-zA-Z0-9\.-:]+)"

$ActiveReplicationControllers = kubectl get rc
$CurrentReplicationController = $regex.Matches($ActiveReplicationControllers) | % {$_.Value}

# Scale replication controllers
kubectl scale --replicas=$ScaleTo rc/$CurrentReplicationController