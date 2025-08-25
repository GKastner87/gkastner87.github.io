---
title: "PowerShell Automation: 5 Scripts That Will Change Your Life (And Save You Hours)"
description: "Ready to level up your automation game? These advanced PowerShell scripts will transform your Intune management from chaos to ORGANIZED PERFECTION! 🚀"
date: "2023-12-09"
category: "PowerShell"
tags: ["PowerShell", "Intune", "Automation"]
---

# PowerShell Automation: 5 Advanced Scripts That Will Change Your Life! 🚀

What's up, tech warriors! Today, we're not just scratching the surface - we're diving DEEP into some MIND-BLOWING PowerShell automation that's going to make you look like an absolute WIZARD! 🧙‍♂️

*Grab your coffee and buckle up, because these scripts are NOT your basic "Hello World" stuff!*

## Why These Scripts Are Different

Look, anyone can write a script to check disk space (yawn 🥱). But we're going to create something that actually SOLVES REAL PROBLEMS. These are scripts I've developed in the trenches, dealing with real enterprise challenges. Let's GO!

## Script #1: The Intune Group Naming Convention ENFORCER! 💪

Ever joined a company where Intune groups look like they were named by a cat walking on a keyboard? NOT ANYMORE! This module enforces a standardized naming convention that'll make your Intune groups look PROFESSIONAL AF!

```powershell
# BOOM! Here's your Intune Group Naming Convention Module!
function New-IntuneGroup {
    [CmdletBinding()]
    param (
        [Parameter(Mandatory)]
        [ValidateSet('Device', 'User')]
        [string]$Type,
        
        [Parameter(Mandatory)]
        [ValidateSet('Policy', 'App', 'Configuration')]
        [string]$Purpose,
        
        [Parameter(Mandatory)]
        [string]$AppName,
        
        [Parameter(Mandatory)]
        [ValidateSet('All', 'Pilot', 'Test')]
        [string]$Scope
    )
    
    # Connect to Microsoft Graph if not already connected
    try {
        Get-MgContext -ErrorAction Stop
    }
    catch {
        Connect-MgGraph -Scopes "Group.ReadWrite.All"
    }
    
    # Build standardized group name
    $groupName = "IG_{0}_{1}_{2}_{3}_{4}" -f $Type, $Purpose, $AppName, $Scope, (Get-Date -Format "MMddyyyy")
    
    # Create dynamic membership rule based on type
    $membershipRule = if ($Type -eq 'Device') {
        "(device.deviceOwnership -eq 'Company')"
    }
    else {
        "(user.userPrincipalName -contains '@yourdomain.com')"
    }
    
    # Create the group with standardized settings
    $params = @{
        DisplayName = $groupName
        Description = "Auto-generated group for $Purpose - $AppName ($Scope)"
        GroupTypes = @("DynamicMembership")
        MembershipRule = $membershipRule
        MembershipRuleProcessingState = "On"
        SecurityEnabled = $true
        MailEnabled = $false
        MailNickname = $groupName.ToLower()
    }
    
    New-MgGroup @params
    
    Write-Host "🎉 BOOM! Created standardized group: $groupName" -ForegroundColor Green
}

# Usage example that'll make you look like a BOSS:
# New-IntuneGroup -Type Device -Purpose App -AppName "Adobe" -Scope Pilot
```

BOOM! 🎯 This script is a GAME CHANGER because:
- Enforces consistent naming (no more random group names!)
- Automatically sets up dynamic membership rules
- Includes date stamps for tracking
- Makes your Intune environment look PROFESSIONAL

## Script #2: The Device-to-User Matchmaker! 💘

You know what's worse than being single? Having Intune devices with no assigned users! This script is like Tinder for your devices - it matches them with their most active users!

```powershell
# The Ultimate Device-User Matchmaker!
function Set-IntuneDevicePrimaryUser {
    [CmdletBinding()]
    param(
        [int]$DaysToCheck = 30,
        [int]$MinimumLogins = 5
    )
    
    # Connect to Microsoft Graph
    Connect-MgGraph -Scopes "Device.Read.All", "User.Read.All", "DeviceManagementManagedDevices.ReadWrite.All"
    
    # Get all Intune managed devices
    $devices = Get-MgDeviceManagementManagedDevice -All
    
    foreach ($device in $devices) {
        # Get sign-in logs for this device
        $signInLogs = Get-MgAuditLogSignIn -Filter "deviceDetail/deviceId eq '$($device.AzureAdDeviceId)'" `
                                          -Top 1000 `
                                          -OrderBy "createdDateTime DESC"
        
        # Group by user and count logins
        $userLogins = $signInLogs | Where-Object { 
            $_.CreatedDateTime -gt (Get-Date).AddDays(-$DaysToCheck) 
        } | Group-Object -Property UserId
        
        # Find the most active user
        $mostActiveUser = $userLogins | 
            Where-Object { $_.Count -ge $MinimumLogins } |
            Sort-Object Count -Descending |
            Select-Object -First 1
        
        if ($mostActiveUser) {
            # Get user details
            $user = Get-MgUser -UserId $mostActiveUser.Name
            
            # Set primary user
            Update-MgDeviceManagementManagedDevice -ManagedDeviceId $device.Id `
                -UserId $user.Id
            
            Write-Host "🔗 MATCHED: $($device.DeviceName) with $($user.UserPrincipalName) ($($mostActiveUser.Count) logins)" `
                -ForegroundColor Green
        }
    }
}

# Run it and watch the magic happen!
# Set-IntuneDevicePrimaryUser -DaysToCheck 30 -MinimumLogins 5
```

DOUBLE BOOM! 🎯🎯 Why this script is EPIC:
- Analyzes actual device usage patterns
- Sets primary users automatically
- Configures minimum login thresholds
- Makes your device management ACTUALLY MAKE SENSE

## Script #3: The Login History ANALYZER! 📊

Want to know who REALLY uses each device? This script digs through login data like a DIGITAL ARCHAEOLOGIST and creates a BEAUTIFUL Power BI-ready report!

```powershell
function Get-DeviceLoginAnalytics {
    [CmdletBinding()]
    param (
        [int]$DaysToAnalyze = 30,
        [string]$OutputPath = ".\DeviceAnalytics.json",
        [switch]$ExportToPowerBI
    )

    # Connect to Microsoft Graph with the scopes we need
    Connect-MgGraph -Scopes @(
        "Device.Read.All",
        "User.Read.All",
        "AuditLog.Read.All",
        "DeviceManagementManagedDevices.Read.All"
    )

    # Get all managed devices
    $devices = Get-MgDeviceManagementManagedDevice -All
    $startDate = (Get-Date).AddDays(-$DaysToAnalyze)
    $results = @()

    foreach ($device in $devices) {
        Write-Host "🔍 Analyzing device: $($device.DeviceName)" -ForegroundColor Cyan

        # Get sign-in logs for this device
        $signInLogs = Get-MgAuditLogSignIn -Filter "deviceDetail/deviceId eq '$($device.AzureAdDeviceId)'" `
                                          -Top 1000 `
                                          -OrderBy "createdDateTime DESC"

        # Group logins by user and time periods
        $userStats = $signInLogs | Where-Object { 
            $_.CreatedDateTime -gt $startDate 
        } | Group-Object -Property UserId | ForEach-Object {
            $user = Get-MgUser -UserId $_.Name
            $loginDays = $_.Group.CreatedDateTime | ForEach-Object { 
                Get-Date $_ -Format "yyyy-MM-dd" 
            } | Select-Object -Unique

            # Calculate login patterns
            $weekdayLogins = $_.Group | Where-Object { 
                (Get-Date $_.CreatedDateTime).DayOfWeek -in 1..5 
            } | Measure-Object | Select-Object -ExpandProperty Count

            $weekendLogins = $_.Group | Where-Object { 
                (Get-Date $_.CreatedDateTime).DayOfWeek -in 0,6 
            } | Measure-Object | Select-Object -ExpandProperty Count

            [PSCustomObject]@{
                DeviceName = $device.DeviceName
                DeviceId = $device.Id
                UserPrincipalName = $user.UserPrincipalName
                TotalLogins = $_.Count
                UniqueDays = $loginDays.Count
                WeekdayLogins = $weekdayLogins
                WeekendLogins = $weekendLogins
                AverageLoginsPerDay = [math]::Round($_.Count / $DaysToAnalyze, 2)
                LastLoginDate = ($_.Group | Select-Object -First 1).CreatedDateTime
                LoginPattern = if ($weekdayLogins -gt $weekendLogins * 3) {
                    "Business User"
                } elseif ($weekendLogins -gt $weekdayLogins) {
                    "Weekend Warrior"
                } else {
                    "Regular User"
                }
            }
        }

        $results += $userStats
    }

    # Create a rich analytics report
    $analyticsReport = @{
        GeneratedDate = Get-Date
        DaysAnalyzed = $DaysToAnalyze
        DeviceCount = $devices.Count
        TotalLogins = ($results | Measure-Object TotalLogins -Sum).Sum
        UserPatterns = @{
            BusinessUsers = ($results | Where-Object LoginPattern -eq "Business User").Count
            WeekendWarriors = ($results | Where-Object LoginPattern -eq "Weekend Warrior").Count
            RegularUsers = ($results | Where-Object LoginPattern -eq "Regular User").Count
        }
        DetailedResults = $results
    }

    # Export the results
    $analyticsReport | ConvertTo-Json -Depth 10 | Out-File $OutputPath

    if ($ExportToPowerBI) {
        # Export in Power BI friendly format
        $results | Export-Csv -Path ($OutputPath -replace '\.json$', '_PowerBI.csv') -NoTypeInformation
    }

    # Generate some quick insights
    Write-Host "`n🎯 QUICK INSIGHTS:" -ForegroundColor Yellow
    Write-Host "📱 Total Devices: $($devices.Count)"
    Write-Host "👥 Total Unique Users: $(($results | Select-Object UserPrincipalName -Unique).Count)"
    Write-Host "🔥 Most Active Device: $(($results | Sort-Object TotalLogins -Descending | Select-Object -First 1).DeviceName)"
    Write-Host "💼 Business Users: $($analyticsReport.UserPatterns.BusinessUsers)"
    Write-Host "🎮 Weekend Warriors: $($analyticsReport.UserPatterns.WeekendWarriors)"

    return $analyticsReport
}

# Run it like a BOSS:
# Get-DeviceLoginAnalytics -DaysToAnalyze 30 -ExportToPowerBI
```

TRIPLE BOOM! 🎯🎯🎯 Why this script is NEXT LEVEL:
- Deep analytics on device usage patterns
- Power BI-ready export for sexy visualizations
- User behavior categorization
- Identifies business vs. personal usage patterns
- Rich insights for device management decisions

## BONUS: Advanced Features for Previous Scripts! 🚀

Let's supercharge our earlier scripts with some EPIC additions:

### Enhanced Group Naming Convention:
```powershell
# Add to Script #1
# Advanced validation and auto-tagging
$params['Tags'] = @{
    "Environment" = $Scope
    "CreatedBy" = $env:USERNAME
    "LastModified" = Get-Date -Format "o"
    "AutomationLevel" = "Full"
}

# Add compliance check
$complianceRule = switch ($Purpose) {
    "Policy" { "(device.compliance -eq 'True')" }
    "App" { "(device.deviceOwnership -eq 'Company') and (device.compliance -eq 'True')" }
    default { "(device.deviceOwnership -eq 'Company')" }
}

$params.MembershipRule = "($membershipRule) and $complianceRule"
```

### Enhanced Device-User Matchmaker:
```powershell
# Add to Script #2
# Advanced user activity scoring
$activityScore = @{
    LastLoginWeight = 0.4
    FrequencyWeight = 0.3
    DurationWeight = 0.3
}

$userScore = $signInLogs | ForEach-Object {
    $daysSinceLogin = (New-TimeSpan -Start $_.CreatedDateTime -End (Get-Date)).Days
    $loginScore = 1 / [Math]::Max(1, $daysSinceLogin) * $activityScore.LastLoginWeight
    $frequencyScore = ($_.Count / $DaysToCheck) * $activityScore.FrequencyWeight
    
    # Calculate session duration if available
    if ($_.SessionDuration) {
        $durationHours = [TimeSpan]::Parse($_.SessionDuration).TotalHours
        $durationScore = [Math]::Min($durationHours / 8, 1) * $activityScore.DurationWeight
    }
    else {
        $durationScore = 0
    }
    
    $totalScore = $loginScore + $frequencyScore + $durationScore
    
    [PSCustomObject]@{
        UserId = $_.UserId
        Score = $totalScore
    }
}
```

## The Power Is REALLY Yours! ⚡

These aren't just scripts anymore - they're full-blown ENTERPRISE SOLUTIONS! We've got:
- Deep analytics and insights
- Advanced scoring algorithms
- Compliance integration
- Power BI-ready reporting

Want to take it even further? Here are some ideas:
- Add Teams notifications for important events
- Integrate with Azure Automation for scheduling
- Add error handling and logging
- Create a custom PowerShell module

Remember: "If it's worth doing, it's worth OVER-ENGINEERING!" 😎

Until next time, keep pushing those boundaries and stay EPIC! 💻✨

---

*P.S. Want to see how to turn these scripts into a full DevOps pipeline? Let me know in the comments!*