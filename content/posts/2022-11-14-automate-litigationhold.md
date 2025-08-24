---
title: "Automating Litigation Hold with Managed Identity: A Step-by-Step Guide"
date: "2022-11-14"
draft: false
tags: ["Azure", "Automation", "Exchange Online"]
summary: "How to use Azure Automation and managed identity to manage litigation holds in Exchange Online."
category: "Automation"
---

## Automating Litigation Hold with Managed Identity: A Step-by-Step Guide

📣 Great News: Managed Identities Now Compatible with Exchange Online PowerShell Module!

It's now possible to seamlessly utilize managed identities with the Exchange Online PowerShell module, enabling secure assignment of the Exchange Administrator role and safe operation in your environment.

For additional information and to commence, refer to the resource: Connect to Exchange Online PowerShell using managed identity

With the introduction of the new command "Connect-ExchangeOnline -ManagedIdentity -Organization," establishing a secure connection has become more straightforward. Leverage the capabilities of managed identities to enhance your Exchange Online PowerShell experience!


Using these new features we can automate litigation hold management! 

By combining the superpowers of Azure Automation and Managed Identity, you can automate this process and save valuable time while ensuring security and compliance. Let's dive into the steps to set it up!

### Step 1: Create Azure Automation Account

Start by creating an Azure Automation Account in your Azure portal. This account will serve as the central hub for your automation tasks. You can follow the instructions provided in the official Microsoft documentation [here](https://docs.microsoft.com/azure/automation/quickstart-create-account).

You can do this in the shell with Powershell

####  Powershell
```powershell
# Set your Variables
$subscriptionID = "<Subscription-ID>"
$rg = "<Your-Resource-Group-Name>"
$automationname = "<Your-Automation-Account-Name>"
$location = "<Your-location>"
```
#### Azure CLI
```bash
# Set your Variables
subscriptionID="<Subscription-ID>"
rg="<Your-Resource-Group-Name>"
automationname="<Your-Automation-Account-Name>"
location="<Your-location>"
```
Replace `<Subscription-ID>`, `<Your-Resource-Group-Name>`, `<Your-Automation-Account-Name>`, and `<Your-Location>` with your actual Subscription ID, Resource Group name, Automation Account name, and Azure location (like "West US", "East US", etc.).


####  Powershell
```powershell
# Login to your Azure account
Connect-AzAccount

# Select the subscription where you want to create the Automation Account
Select-AzSubscription -SubscriptionId $subscriptionID

# Create a new resource group (if needed)
New-AzResourceGroup -Name <Your-Resource-Group-Name> -Location <Your-Location>

# Create the Automation Account
New-AzAutomationAccount -ResourceGroupName <Your-Resource-Group-Name> -Name <Your-Automation-Account-Name> -Location <Your-Location> -Plan Basic
```


#### Azure CLI

```bash
# Login to your Azure account
az login

# Select the subscription where you want to create the Automation Account
az account set --subscription $subscriptionID

# Create a new resource group (if needed)
az group create --name <Your-Resource-Group-Name> --location <Your-Location>

# Create the Automation Account
az automation account create --name <Your-Automation-Account-Name> --resource-group <Your-Resource-Group-Name> --location <Your-Location>
```

### Step 2: Assign Managed Identity with Exchange Administrator Role

Within your Azure Automation Account, assign a Managed Identity with the Exchange Administrator role. This ensures that your automation solution has the necessary permissions to interact with Exchange services. Microsoft provides detailed guidance on how to assign roles to a Managed Identity [here](https://docs.microsoft.com/azure/active-directory/managed-identities-azure-resources/how-to-manage-ua-identity-portal).

```Powershell
# Get the Automation Account
$automationAccount = Get-AzAutomationAccount -ResourceGroupName <Your-Resource-Group-Name> -Name <Your-Automation-Account-Name>

# Get the system-assigned managed identity
$managedIdentity = $automationAccount.Identity

# Output the managed identity
$managedIdentity
```
I don't have the Azure CLI code to hand, use powershell or follow the guide or try writing your own 😜

### Step 3: Create Runbook

Next, create a Runbook within your Azure Automation Account. This Runbook will contain the script or code that will execute the litigation hold actions. Microsoft offers a comprehensive guide on how to create and manage Runbooks in Azure Automation [here](https://docs.microsoft.com/azure/automation/automation-first-runbook-textual-powershell).

```Powershell
$runbookName = "<Your-Runbook-Name>"
$runbookType = "PowerShell"

# Create the runbook
New-AzAutomationRunbook -AutomationAccountName $automationname -Name $runbookName -Type $runbookType -ResourceGroupName $rg
```

### Step 4: Setup Your Litigation Hold Script

In the Runbook, implement the script or code that will place and manage litigation hold. Utilize the Exchange PowerShell module and authenticate using the Managed Identity credentials.

### Litigation hold script
```powershell
#Create Array for Changes
$LitigationHoldChanges = @()

# Connect to MS Exchange
Connect-ExchangeOnline -ManagedIdentity -Organization citadelcloud.onmicrosoft.com

# Get all users in your organization
$AllUsers = Get-Mailbox -ResultSize Unlimited

# Loop through each user and enable litigation hold if not already enabled
foreach ($User in $AllUsers) {
    $UserPrincipalName = $User.UserPrincipalName
    $LitigationHoldEnabled = $User.LitigationHoldEnabled

    if (-Not $LitigationHoldEnabled) {
        # Enable litigation hold for the user
        $Result = Set-Mailbox $UserPrincipalName -LitigationHoldEnabled $true -ErrorAction "SilentlyContinue"

        # If the litigation hold was successfully enabled, add the user to the changes array
        if ($Result -ne $null) {
            Write-Host "Litigation hold enabled for: $UserPrincipalName"

            #Update Array
            $LitigationHoldChanges += [PSCustomObject]@{
                UserPrincipalName = $UserPrincipalName
                Action = "Enabled"
                Timestamp = Get-Date
            }
        }
    }
}

# Output the user changes to the console
$LitigationHoldChanges | Format-Table
```

### Step 5: Setup Runbook and Schedule

To setup your runbook import your Litigation Hold Script

```Powershell
$RunbookPath = "C:\Runbooks\"  # Specify the path to your runbook script

# Create the new runbook
New-AzAutomationRunbook -ResourceGroupName $rg -AutomationAccountName $AutomationAccount -Name $RunbookName -Type $RunbookType -Path $RunbookPath
```
Configure the schedule for your Runbook. Decide how frequently you want the script to run and set the appropriate schedule within Azure Automation.

```powershell
# Find the next Sunday from the current date
$nextSunday = (Get-Date).Date.AddDays((7 - (Get-Date).DayOfWeek.value__ + [DayOfWeek]::Sunday.value__) % 7)

# Set the start time to the next Sunday at 8 PM
$startTime = $nextSunday.AddHours(20)

# Create the schedule
$schedule = New-AzAutomationSchedule -AutomationAccountName $automationname -Name $scheduleName -StartTime $startTime -Frequency "Week" -Interval 1 -ResourceGroupName $rg

# Register the runbook with the schedule
Register-AzAutomationScheduledRunbook -AutomationAccountName $automationname -Name $runbookName -Schedule $schedule -ResourceGroupName $rg
```

This code will run it weekly on Sundays. If you want to set a different schedule try the portal you may find it easier

### Step 6: Enjoy a Coffee

Sit back, relax, and enjoy a cup of coffee while Azure Automation takes care of automating your litigation hold processes. With Managed Identity granting secure access and the power of automation, you can focus on other important tasks knowing that your litigation hold is being handled efficiently.
