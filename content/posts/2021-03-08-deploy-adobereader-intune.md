---
title: "Deploy Adobe Acrobat Reader DC via Intune"
description: "A step-by-step guide to deploying Adobe Acrobat Reader DC to your endpoints using Microsoft Intune."
date: "2021-03-08"
category: "Intune"
tags: ["Intune"]
---

# Deploy Adobe Acrobat Reader DC via Intune

If you've landed here you have noticed that deploying Adobe Acrobat Reader to your endpoints hasn't been as simple as other deployments.

To deploy an Adobe Acrobat Reader DC package the wonderful people at Adobe are going to make us work for it.

First we'll need to get the Customization Wizard tool, then we'll need to download the latest version of Reader DC Enterprise, convert it to a MSI, package it back to a executable, then wrap it up into an IntuneWin file. Fun, right?!

## Important Downloads

Download Adobe Acrobat Reader DC Enterprise full installation _AcroRdrDC2200120085_en_US.exe_ from  [http://get.adobe.com/reader/enterprise/](https://get.adobe.com/reader/enterprise/ "http://get.adobe.com/reader/enterprise/").

Download the Adobe Acrobat DC Customization Wizard from here:  
https://ardownload2.adobe.com/pub/adobe/acrobat/win/AcrobatDC/misc/CustWiz2100720091_en_US_DC.exe

Download the Microsoft Win32 Content Prep Tool for creating executable packages for Intune
[microsoft/Microsoft-Win32-Content-Prep-Tool: A tool to wrap Win32 App and then it can be uploaded to Intune (github.com)](https://github.com/Microsoft/Microsoft-Win32-Content-Prep-Tool)

## Creating our Adobe package for Intune

**Extracting the download to get the MSI**

Open Powershell as Administrator and call the below command against the download of Acrobat Reader DC Enterprise. 

I have created a folder under Temp called Adobe so it is easy for me to find

```
.\AcroRdrDC2200120117_en_US.exe -sfx_o"C:\temp\adobe" -sfx_ne
```

Click  **Yes** on the user account control prompt that appears and wait for the Adobe Reader DC setup to complete.

**Customisating and packaging Setup.exe**

Once extraction has completed open the Adobe Customisation Wizard and open the package under your destination. Have a look through the left hand side menus for how you would like to customise your Adobe install


 1. Personalization Options:  Suppress display of End User License Agreement (EULA)
 2. Installation Options: Make Reader the default PDF viewer, Silently (no interface), Suppress reboot
 3.  Shortcuts: Remove Desktop shortcut
 4. Online Services and Features: Disable Upsell

Then save your package to finish customising.

## Package for Intune

 1. Open the [IntuneWinAppUtil.exe](https://docs.microsoft.com/en-us/mem/intune/apps/apps-win32-prepare)
 2. Specify your output folder as to where you have saved the Adobe Packages -eg c:\temp\adobe
 3. Specify "setup.exe" as the setup file
 4.  Specify the same directory as output folder -eg c:\temp\adobe
 5.  Press N for specifying catalog folder
 
 ## Setup your Intune App
 
 1.  Open endpoint.microsoft.com
 2.  Apps > Windows > Add Windows app (Win32)
 3.  Select your setup.intunewin package
 4.  Edit name to be Adobe Acrobat Reader
 5.  For Description add the link to this blog for how the app was created
 6.  Publisher Adobe, add a logo if you like and fill out any other option fields as you desire
 7.  Under Program tab

```
Install Command: setup.exe -s
Uninstall Command:  MsiExec.exe /x {AC76BA86-7AD7-1033-7B44-AC0F074E4100} /q
```
8.  Requirements choose which Operating System architecture and the minimum operating system you wish to deploy this too
9. Detection rules > Manually configure detection rules

```
Path: C:\Program Files (x86)\Adobe\Acrobat Reader DC\Reader
File or folder: AcroRd32.exe
Detection method: File or folder exists
Associated with a 32-bit app on 64-bit clients: Yes
```
10. No need for depencies or Supersedence
11.  Publish to whichever Assignments you want as Required or Available app
12. Save and you're all done - recommend to test it in a VM deployment to ensure it loaded all correctly
 
