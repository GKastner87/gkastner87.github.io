# **PSAppDeployToolkit v4: Enhancing Intune Deployments with User Notifications and Reliability** 🚀

---

## **Introduction**

Deploying applications via **Microsoft Intune** has become the standard for modern endpoint management. However, when deploying **Win32 applications**, Intune runs installations under the **SYSTEM context**, which has historically caused problems for displaying **user notifications** or prompts. 

This is where **PSAppDeployToolkit (PSADT) v4** steps in. With its improved framework and integration options, PSADT ensures:
1. **User-friendly prompts and dialogs** (e.g., welcome screens, progress bars, reboot messages).
2. **Graceful pre- and post-installation handling** (stopping processes, detecting installs).
3. **Seamless compatibility** with Intune's Win32 app packaging and deployment.

In this blog post, we’ll deep dive into how PSADT v4 works with Intune, and provide you with **step-by-step instructions** and **code examples** to leverage its full potential.

---

## **Challenges with Intune and Win32 App Deployments** 🛑

Before we explore the solutions, let’s understand the core challenges:

1. **SYSTEM Context**: Intune runs deployments as SYSTEM, which cannot display UI elements to the active user session.
2. **No User Interaction**: Without user prompts, users might:
   - Experience sudden app closures.
   - Miss installation progress updates.
   - Be surprised by unexpected restarts.
3. **Limited Logging**: Intune’s logging is basic, making troubleshooting difficult.

While Intune provides a robust deployment pipeline, these limitations can reduce user satisfaction and delay issue resolution.

---

## **How PSAppDeployToolkit v4 Solves These Problems** 🛠️

### **1. ServiceUI.exe for User Prompts** 🪄

To display popups and dialogs in the user session when running from the SYSTEM context, PSADT leverages **ServiceUI.exe**. This tool comes from the **Microsoft Deployment Toolkit (MDT)** and allows a process to interact with the active user session.

When used correctly, ServiceUI.exe enables PSADT’s interactive features, such as:
- **Welcome prompts**
- **Progress bars**
- **Restart notifications**

### **2. Built-In Detection of User Sessions**

PSADT intelligently detects:
- Whether an active user session exists.
- If no user is logged in, it suppresses popups and silently installs the app.

This dual behavior ensures smooth deployments in both interactive and non-interactive environments.

### **3. Robust Logging and Error Handling**

PSADT v4 generates detailed logs during every step of the deployment process, stored locally for easy review. This complements Intune’s limited reporting capabilities.

### **4. Improved User Experience with Interactive Prompts**

With PSADT v4, you get a polished, branded user experience, featuring:
- **Customizable welcome messages** for users to defer or close applications.
- **Real-time progress bars** to communicate installation status.
- **Flexible reboot prompts** that allow users to delay restarts.

These features ensure that your deployments feel smooth and professional, reducing end-user frustration.

---

## **Step-by-Step Guide: Using PSADT v4 with Intune and ServiceUI** 🚀

Follow these steps to successfully integrate PSAppDeployToolkit with Intune to display user-facing notifications.

---

### **Step 1: Obtain ServiceUI.exe**

1. Download and install the **Microsoft Deployment Toolkit (MDT)**.
2. Extract **ServiceUI.exe** from the following location:
   ```
   C:\Program Files\Microsoft Deployment Toolkit\Templates\Distribution\Tools\x64\ServiceUI.exe
   ```
3. Place **ServiceUI.exe** in the root folder of your PSADT deployment package alongside `Deploy-Application.ps1`.

Your folder structure should look like this:
```plaintext
C:\Apps\MyAppDeployment\
|-- Deploy-Application.ps1
|-- ServiceUI.exe
|-- Files\ (App installers or dependencies)
```

---

### **Step 2: Customize Deploy-Application.ps1**

Here’s how you configure PSADT for user-friendly prompts during installation.

#### **Welcome Message and Process Closure**
```powershell
# Show welcome message and prompt to close conflicting apps
Show-InstallationWelcome -CloseApps 'AcroRd32' -AllowDefer -DeferTimes 3
```

#### **Installation Progress Notification**
```powershell
# Show a progress bar during installation
Show-InstallationProgress -Status "Installing Adobe Acrobat Reader DC... Please wait."

# Execute the installer silently
Execute-MSI -Action Install -Path "Files\AcroRead.msi" -Parameters "/qn"
```

#### **Restart Notification**
```powershell
# Prompt the user for a reboot with countdown
Show-InstallationRestartPrompt -CountdownSeconds 300 -DeferTimes 2
```

---

### **Step 3: Wrap the Application with Intune Win32 Content Prep Tool**

1. Download the **Win32 Content Prep Tool** from [Microsoft](https://learn.microsoft.com/en-us/mem/intune/apps/apps-win32-app-management).
2. Run the following command to create an `.intunewin` package:
   ```bash
   IntuneWinAppUtil.exe -c "C:\Apps\MyAppDeployment" -s "Deploy-Application.ps1" -o "C:\Output"
   ```
3. This will generate a file named `Deploy-Application.intunewin`.

---

### **Step 4: Upload the App to Intune**

1. Go to **Microsoft Endpoint Manager** (https://endpoint.microsoft.com).
2. Navigate to:
   **Apps** > **Windows** > **Add** > **Win32 App**.
3. Upload the `.intunewin` file.
4. Configure the **Install Command** to use ServiceUI.exe:
   ```bash
   ServiceUI.exe -process:explorer.exe Deploy-Application.ps1 -DeployMode Interactive
   ```
5. Configure the **Uninstall Command**:
   ```bash
   Deploy-Application.ps1 -DeploymentType Uninstall -DeployMode Silent
   ```
6. Add detection rules for Intune to validate the installation (e.g., file existence):
   ```plaintext
   Path: C:\Program Files\Adobe\Acrobat Reader DC\Reader
   File: AcroRd32.exe
   Detection Method: File exists
   ```
7. Assign the app to your target user group.

---

### **Step 5: Test the Deployment**

1. Deploy the app to a test machine.
2. Verify the following:
   - PSADT prompts appear for the logged-in user (welcome, progress, restart).
   - The app installs correctly.
   - Logs are created in `C:\Windows\Logs\Software\Deploy-Application.log`.
3. If no user is logged in, confirm that the installation runs silently without errors.

---

## **Key Benefits of Using PSADT with Intune** 🎯

1. **Interactive Notifications**: Display progress bars, prompts, and restart messages to users.
2. **User Session Awareness**: No user? No problem. PSADT handles silent installs gracefully.
3. **Better User Experience**: Inform users about installations instead of surprising them.
4. **Improved Logging**: Troubleshoot failures with detailed logs.
5. **Seamless Automation**: Combine PSADT’s robust framework with Intune for reliable deployments.

---

## **Conclusion**

With **PSAppDeployToolkit v4** and **ServiceUI.exe**, you can finally overcome the limitations of Intune’s SYSTEM context for Win32 app deployments. 

By following this guide, you’ll:
- Provide a **polished user experience** with interactive dialogs.
- Ensure **reliable deployments** using PSADT’s pre/post-install logic.
- Improve **troubleshooting** with robust logs.

Ready to revolutionize your Intune deployments? Download **PSAppDeployToolkit v4** and start building interactive, reliable app deployments today!

---

**Have you used PSADT with Intune? Share your experiences or questions in the comments below! 🚀**
