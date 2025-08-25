---
title: "Converting PowerShell Scripts to EXE with PS2EXE: A Real-World Example"
description: "Learn how to convert PowerShell scripts into standalone executables using PS2EXE, with a practical example of automating Excel file backups to OneDrive."
date: "2024-01-09"
category: "Scripting"
tags: ["Scripting"]
---

# Converting PowerShell Scripts to EXE with PS2EXE: A Real-World Example

In many organizations, legacy systems and processes often persist because "they just work." I recently encountered such a scenario where a 15-year-old Excel-based price estimation system was still in active use. While the system functioned well, it stored critical quote data locally on users' C: drives, causing anxiety about potential data loss. Here's how I used PowerShell and PS2EXE to create a user-friendly backup solution.

## The Challenge

- Legacy Excel-based pricing system storing files locally
- Users concerned about data loss
- Need for automated backups to OneDrive
- Solution needs to be user-friendly for non-technical staff
- Must work both interactively and silently for scheduled tasks

## Enter PS2EXE

PS2EXE is a powerful module that converts PowerShell scripts into standalone executable files. This is particularly useful when:

- You want to hide the complexity of PowerShell from end users
- The solution needs to run on systems with restricted PowerShell execution policies
- You want to package your script as a professional-looking application

## Installing PS2EXE

First, let's install the PS2EXE module from the PowerShell Gallery:

```powershell
Install-Module -Name ps2exe -Scope CurrentUser
```

## The Backup Script

Here's the PowerShell script that handles our Excel file backups:

```powershell
param(
    [switch]$Silent
)

# Configuration
$sourceFolder = "C:\Quotes"
$oneDrivePath = [System.IO.Path]::Combine($env:USERPROFILE, "OneDrive - Company Name", "QuotesBackup")
$logFile = [System.IO.Path]::Combine($env:USERPROFILE, "QuoteBackupLog.txt")

function Write-LogMessage {
    param($Message)
    
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logMessage = "[$timestamp] $Message"
    Add-Content -Path $logFile -Value $logMessage
    
    if (-not $Silent) {
        Write-Host $logMessage
    }
}

try {
    # Create backup folder if it doesn't exist
    if (-not (Test-Path $oneDrivePath)) {
        New-Item -ItemType Directory -Path $oneDrivePath -Force | Out-Null
        Write-LogMessage "Created backup directory: $oneDrivePath"
    }

    # Get all Excel files
    $files = Get-ChildItem -Path $sourceFolder -Filter "*.xls*" -Recurse

    if ($files.Count -eq 0) {
        Write-LogMessage "No Excel files found in $sourceFolder"
        if (-not $Silent) {
            [System.Windows.Forms.MessageBox]::Show("No Excel files found to backup.", "Backup Status", [System.Windows.Forms.MessageBoxButtons]::OK, [System.Windows.Forms.MessageBoxIcon]::Information)
        }
        exit
    }

    # Create timestamp for backup folder
    $timestamp = Get-Date -Format "yyyy-MM-dd_HHmmss"
    $backupFolder = Join-Path $oneDrivePath $timestamp
    New-Item -ItemType Directory -Path $backupFolder -Force | Out-Null

    # Copy files
    foreach ($file in $files) {
        Copy-Item -Path $file.FullName -Destination $backupFolder -Force
        Write-LogMessage "Backed up: $($file.Name)"
    }

    $message = "Successfully backed up $($files.Count) files to OneDrive"
    Write-LogMessage $message

    if (-not $Silent) {
        [System.Windows.Forms.MessageBox]::Show($message, "Backup Complete", [System.Windows.Forms.MessageBoxButtons]::OK, [System.Windows.Forms.MessageBoxIcon]::Information)
    }
}
catch {
    $errorMessage = "Error during backup: $($_.Exception.Message)"
    Write-LogMessage $errorMessage
    
    if (-not $Silent) {
        [System.Windows.Forms.MessageBox]::Show($errorMessage, "Backup Error", [System.Windows.Forms.MessageBoxButtons]::OK, [System.Windows.Forms.MessageBoxIcon]::Error)
    }
}
```

## Converting to EXE

With our script ready, we can convert it to an executable using PS2EXE. Here's the command:

```powershell
Invoke-ps2exe -InputFile QuoteBackup.ps1 -OutputFile QuoteBackup.exe -NoConsole -RequireAdmin
```

The parameters used:
- `-NoConsole`: Hides the console window when running interactively
- `-RequireAdmin`: Ensures the executable runs with administrative privileges
- You can also use `-IconFile` to add a custom icon

## Deployment and Usage

1. **Interactive Use**:
   - Users can double-click the executable to run a backup on demand
   - They'll receive a popup notification when the backup completes

2. **Silent Mode**:
   - Create a scheduled task that runs monthly:
   ```powershell
   QuoteBackup.exe -Silent
   ```
   - The script will run in the background and log all activities

3. **Monitoring**:
   - Check the log file at `%USERPROFILE%\QuoteBackupLog.txt`
   - Each backup creates a timestamped folder in OneDrive

## Benefits Realized

- **User-Friendly**: Staff can run backups with a simple double-click
- **Automated Safety Net**: Monthly scheduled backups ensure nothing is lost
- **Clear Feedback**: Users know exactly when backups succeed or fail
- **Audit Trail**: Detailed logging of all backup activities
- **Cloud Storage**: Files safely stored in OneDrive for Business

## Best Practices and Tips

1. **Error Handling**: Always implement robust error handling and logging
2. **User Feedback**: Provide clear visual feedback for interactive mode
3. **Silent Mode**: Enable automation without user interaction
4. **Logging**: Maintain detailed logs for troubleshooting
5. **Testing**: Thoroughly test both interactive and silent modes

## Conclusion

PS2EXE is a powerful tool that bridges the gap between PowerShell scripting and end-user applications. In our case, it transformed a simple backup script into a professional solution that both technical and non-technical users can confidently use. The combination of automated and on-demand backups ensures business continuity while providing peace of mind to staff who rely on legacy systems.

Remember to always test your converted executables thoroughly in your target environment, as some antivirus software may flag unknown executables. Consider signing your executable with a code signing certificate for additional trust and security. 