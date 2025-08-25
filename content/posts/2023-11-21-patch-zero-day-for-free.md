---
title: "Automating Software Updates with RSS Feeds and PowerShell"
description: "Learn how to automate software updates using PowerShell and RSS feeds to stay ahead of zero-day vulnerabilities"
date: "2023-11-21"
tags: ["PowerShell", "Automation", "RSS"]
category: "Security"
---

# Automating Software Updates with RSS Feeds and PowerShell 😎💻

## Effortlessly Stay Up-to-Date with the Latest Software Updates 🚀🔒

Imagine logging into work one morning, only to be greeted by the shocking news of zero-day vulnerabilities that have struck your organization. Panic sets in as the executives saw it on the news and are worried about what will we do.

But worry not! In this blog post, I'll show you how you can use the power of some clever scripting, package deployment tools, and an RSS feed to make light work of these challenges.

We'll explore a powerful script that not only helps you fix the immediate crisis but also equips you to handle any future morning outages, allowing you to relax and enjoy a well-deserved cup of coffee. 

```
<#
.SYNOPSIS
This script checks for software updates and installs them using different methods based on the software type.

.DESCRIPTION
The script retrieves an RSS feed containing software update information from the Zero Day Initiative website. It then filters the updates based on specific software titles such as Adobe Reader DC, Microsoft Office, Google Chrome, Firefox, Microsoft Edge, and Microsoft Windows. For the selected software updates, it uses different methods to perform the update. For Adobe Reader DC, Microsoft Office, Google Chrome, Firefox, and Microsoft Edge, it uses the 'winget' command-line tool to update the software. For Microsoft Windows updates, it uses the 'PSWindowsUpdate' module to install the updates and perform an automatic reboot if necessary. The script also logs the updates performed and writes the log messages to a text file.

.PARAMETER None

.INPUTS
None

.OUTPUTS
None

.EXAMPLE
.\Untitled-1.ps1
Runs the script to check for software updates and install them.

.NOTES
Author: Guy Kastner
Date: 21/11/2023
Version: 1.0
#>
# Create a variable to hold the log messages
$log = ""

# Add the current date and time to the log messages
$log += "Script run at: $(Get-Date)`n"

# Check if the PSWindowsUpdate module is installed
if (-not(Get-Module -ListAvailable -Name PSWindowsUpdate)) {
    # Install the PSWindowsUpdate module for all users and allow clobbering
    Install-Module -Name PSWindowsUpdate -Scope AllUsers -AllowClobber -Force
}

# URL of the RSS feed
$url = "https://www.zerodayinitiative.com/rss/published/"

# Use Invoke-RestMethod cmdlet to get the RSS feed
$response = Invoke-RestMethod -Uri $url

# Parse the response to get the updates list
$updates = $response.Channel.Item | Where-Object {
    $_.Title -match "Adobe Reader DC" -or
    $_.Title -match "Microsoft Office" -or
    $_.Title -match "Google Chrome" -or
    $_.Title -match "Firefox" -or
    $_.Title -match "Microsoft Edge" -or
    $_.Title -match "Microsoft Windows"
}

# Check the updates list
foreach ($update in $updates) {
    # If the update is for Adobe Reader DC, Microsoft Office, Google Chrome, Firefox, or Microsoft Edge
    if ($update.Title -match "Adobe Reader DC" -or
        $update.Title -match "Microsoft Office" -or
        $update.Title -match "Google Chrome" -or
        $update.Title -match "Firefox" -or
        $update.Title -match "Microsoft Edge") {
        # Use winget to update the software
        winget upgrade --id=$update.Title
        # Add a log message
        $log += "Updated: $($update.Title)`n"
    }
    # If the update is for Microsoft Windows
    elseif ($update.Title -match "Microsoft Windows") {
        # Use PSWindowsUpdate to update Windows
        Get-WindowsUpdate -MicrosoftUpdate | Install-WindowsUpdate -AcceptAll -AutoReboot
        # Add a log message
        $log += "Updated: $($update.Title)`n"
    }
}

# If there are log messages, write them to a text file
if ($log -ne "") {
    $log | Out-File -FilePath "updates_log.txt" -Append
}

```

### Let's Dive into the Script:

Our script starts by seamlessly retrieving an RSS feed from the esteemed Zero Day Initiative website. 
This feed is a treasure trove of essential information about software updates, including critical zero-day vulnerabilities. 

Using this data as our foundation, we then filter the updates based on specific software titles, including heavyweights like:
* Adobe Reader DC
* Microsoft Office
* Google Chrome, 
* Mozilla Firefox
* Microsoft Edge, 
**and Microsoft Windows**


But here's where our script truly shines. It leverages a range of impressive methods to flawlessly perform the updates. For updates related to Adobe Reader DC, Microsoft Office, Google Chrome, Firefox, and Microsoft Edge, we confidently utilize the 'winget' command-line tool. This tool, a Windows package manager, simplifies the installation and updating of applications like never before. 💪🔥

And let's not forget about our beloved Microsoft Windows updates. We deftly handle them using the mighty 'PSWindowsUpdate' module. This module empowers us with powerful cmdlets to interact with the Windows Update service and install updates with ease. It even includes intelligent options for automatic reboot if necessary, ensuring a seamless update experience. 🌟🔁
To keep you in the loop:

Our script diligently logs all the updates performed and writes them to a text file. With this log file at your disposal, you can effortlessly keep track of all the updates made on your system. 📝📆

## Conclusion:

Gone are the days of manually tracking and installing software updates. With our confident PowerShell script, you can effortlessly stay ahead of the game and ensure your system remains up-to-date with the latest security patches and bug fixes.

Take control of your software updates today! If you have any questions or need further assistance, feel free to reach out to us. We're here to help you conquer the world of automated software updates with confidence! 💪🌐