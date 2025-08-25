---
title: "Mastering Windows Package Manager (winget) and Intune Like a Pro!"
date: "2023-01-03"
draft: false
tags: ["Intune", "winget", "Windows Package Manager"]
description: "A guide to deploying and managing applications with Windows Package Manager and Intune."
category: "Intune"
---

# Mastering Windows Package Manager (winget) and Intune Like a Pro! 🚀🔐

Today, we're diving into the realm of Windows Package Manager (winget) and the mighty Intune, the dynamic duo that'll have your Windows applications bowing down in updates! 🌐💻

## What's the Deal with winget and Windows Package Manager?

So, you've heard of Chocolatey, right? Well, winget is like its cool, integrated sibling in the new Windows versions, and it's gearing up to become the superhero of the Endpoint Manager (Intune) world. No more worries about rollouts and autopilot glitches – winget is here to save the day!

## Distributing Windows Package Manager with Intune

The Windows Package Manager, also known as the App Installer, might be hiding in your Windows versions, but the winget command might be playing hide and seek. To solve this, we're distributing the App Installer as a sleek Win32 package using Intune. This package becomes the backbone for all our future software updates.

Here's the secret sauce:

1. Download the latest App Installer from "https://aka.ms/getwinget".
2. Put it in a temporary directory, install it, and then delete the evidence – directory, consider yourself gone!

## Deploying winget Packages with Intune

Now, let's get into the nitty-gritty of deploying applications straight from the winget repository using Intune. It's like casting spells of installation, and I'm about to show you the magic!

### Finding winget ID:

- CMD? PowerShell? Nah, just hit up winget.run. Easy peasy.

### Template Customization and intunewin Creation:

Once you have the ID, inject it into my template. Yep, three files: install.ps1, uninstall.ps1, and check.ps1. Make 'em yours!

### Detection Rule:

You've got options – script or static detection rule based on a folder. Choose your weapon wisely. If script, you're already halfway there.

### Building Win32 App in Intune:

Adapt the template, create intunewin, and decide on a detection rule. Now, head to Endpoint Manager, hit "Create," and let the magic unfold.

## Decoding the Template (install.ps1)

It's like reading ancient scrolls of PowerShell wisdom:
- Declare optional parameters for added installation spice.
- Set the winget ID – the hero of our repository saga.

And then, it's showtime:
- Navigate to the winget.exe lair.
- Unleash the winget command with all its silent installation glory.

## Updating winget Apps

Wanna keep those apps sharp? Here's your magic spell:
- Upgrade specific app: `winget upgrade Logitech.Options`
- Upgrade all apps: `winget upgrade --query --silent --force --accept-package-agreements --accept-source-agreements --all`

Pro Tip: You can schedule the "Upgrade all" command to keep the apps on your devices perpetually fresh.

And there you have it! Conquer software updates with winget and Intune, and let your Windows applications know who's the true master of the update game. Keep soaring, keep securing, and as always, keep rocking the IT world! 🚀💻
