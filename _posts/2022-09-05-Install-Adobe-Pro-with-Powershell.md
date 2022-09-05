# Install Adobe Acrobat Pro via Intune

<iframe src="https://giphy.com/embed/5xCGnF93P90UE" width="383" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/grandpa-teetertotter-5xCGnF93P90UE">via GIPHY</a></p>

Moving on from the hurdles we had to leap to install Adobe Acrobat Reader through Intune the Pro suite has it's own challenges.

Of course you can try the "official method" as per  [Deploy Adobe packages using Microsoft Intune "Adobe documentation"). 

It may be the Australian internet or that I haven't sacrificed the goat the right way but I've never had any success with deploying via that method. I suspect the Intune CDN struggles on any larger application files.

## Powershell Magic to install Adobe

To combat this I've written up some Powershell code using one of my favourite commands Invoke-WebRequest to get the job done direct from Adobe. 

This will download the installer, extract the files and run the installer.

You can find the code on my GitHub repo:
https://github.com/GKastner87/PowershellScripts/blob/41bbf02b6648ec2965285167762951caa9de5118/InstallAdobePro.ps1

The workstations in my current environment receive a prompt about Internet Explorer updates on launch, written in that script is also the registry fix to attend to that. Comment it out if not relevant to you.


## Package for Intune

Package up the Win32App as you would normally with Intune and use the below for your Install commands and detection methods

```
Install command:
powershell.exe -executionpolicy bypass -file InstallAdobePro.ps1
Uninstall command: msiexec /x "{AC76BA86-1033-FFFF-7760-BC15014EA700}" /qn

Path: C:\Program Files \Adobe\Acrobat Reader DC\Reader
File or folder: Acrobat.exe
Detection method: File or folder exists
Associated with a 32-bit app on 64-bit clients: Yes
```

## Clean-up Script

I also wrote a sister script that will check if the downloaded Adobe files are older than 24 hours and if so to purge them to not leave any old data behind.

https://github.com/GKastner87/PowershellScripts/blob/41bbf02b6648ec2965285167762951caa9de5118/CleanUp-OldAdobeFiles.ps1![image](https://user-images.githubusercontent.com/74800477/188368583-0ff8ae02-01b3-4895-bc0d-d799511aebe1.png)
