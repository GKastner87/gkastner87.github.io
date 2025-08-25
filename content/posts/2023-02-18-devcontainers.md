---
title: "Dev Containers + VS Code - don't have it work on your machine, have it work on every machine"
date: "2023-02-18"
draft: false
tags: ["DevOps"]
description: "Introduction to using VS Code Dev Containers for consistent development environments."
category: "DevOps"
---

# Dev Containers + VS Code - don't have it work on your machine, have it work on every machine

## Introduction
I've recently been experimenting with the Dev Containers extension in VS Code for writing and testing code without the fear of bricking my machine.

What I like about it is that it enables you to run and test code, install various libraries and modules, and containerize your code for seamless deployment, all without overwhelming your development machine.

## Pre-requisites
- Visual Studio Code
- [Docker installed on machine](https://docs.docker.com/desktop/)
- Dev container extension

### Docker Prework

* Install Docker: Docker is needed to create and manage your containers.
* Start Docker:

    * On Mac - To verify if Docker is running, you can check the activity tray for the Docker whale icon. It may take a few minutes for Docker to start up.

    * Check in the system tray on Windows to ensure Docker is running.

* Start Docker using the appropriate command.

    * Mac/Linux: sudo systemctl status docker
    * Windows: docker info

### Extra Resources
- [Microsoft's documentation on Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers)


## Setting Up a Test Development Container for Python in VS Code
To get started with Dev Containers it's quite easy

1. git clone https://github.com/Microsoft/vscode-remote-try-node 

2. Open the Command Palette (F1) to run the command Dev Containers: Try a Dev Container Sample... 

and select the Python sample ![Select a sample](https://code.visualstudio.com/assets/docs/devcontainers/containers/select-a-sample.png)

3. Wait for container to build

![container build](https://code.visualstudio.com/assets/docs/devcontainers/containers/dev-container-progress.png)

4. Test your environment to confirm your Python version

```python --version```

Hope you found this post helpful! Happy coding! 🌟
