# Python Project: Turn your smart lights into light show when there's a goal

As an avid sports fan who's finding less time to make it to the matches these days. I'm often finding myself watching from my lounge room. Missing the stadium atmosphere I was thinking how can I bring some of the fun to me.

Then I got the idea of linking my smart lights to a live score API so they can celebrate when my team scores a goal!

# Reqister your API keys
Like with any home project I try to get my hands on the price I want to pay is free.


To get the live score notifications I signed up for API-Football and used their free plan.

### API-Football

    1. Go to the API-Football website at https://www.api-football.com/.
    2. Click on the "Sign Up" button located at the top right corner of the page.
    3. Fill in the required information to create a new account.
    4. Once registered and logged in, navigate to your account dashboard.
    5. In the dashboard, you will find your API key under the "API Access" section.
    6. Copy your API key and store it securely, as it will be used to authenticate your requests when using the API-Football services.

## Govee API Key

1. Download and install the Govee Home app on your mobile device.
2. Register an account or log in if you already have one.
3. Tap on "About Us" in the "Profile" section.
4. Tap on "Apply for API Key".
5. Fill out the application form and submit it.

After you've submitted the form, Govee will review your application and send you an API key if your application is approved. Please note that it may take a few days for Govee to review your application.

## Setup Python

##modules

1. `http.client`: This is a low-level HTTP protocol client; it's used in this script to make HTTP requests.

2. `json`: This module can encode and decode JSON data. It's used to parse the JSON responses from the HTTP requests.

3. `socket`: This module provides low-level networking interface. It's not used in the provided excerpt, but it's typically used for network-related tasks like opening sockets.

4. `PyQt5.QtWidgets`: This module contains classes for creating desktop-style user interfaces. In this script, it's used to create the application's GUI. I was having trouble with TKinter so this was the next best option.

5. `sys`: This module provides access to some variables used or maintained by the Python interpreter. In this script, it's used to ensure the clean exit of the application when the main loop ends.

6. `pandas`: This is a data analysis and manipulation library. It's not used in the provided excerpt, but it's typically used for tasks like reading data from files and manipulating data frames.

7. `requests`: This is a simple HTTP library for Python, used for making various types of HTTP requests.

The `ip_address` variable is commented out, but it seems like it would be used to store the IP address of your Govee light.

The `get_important_goals` function appears to be used to fetch important goals for a specific team from a football API.

## Create your script

api.py

This code is a Python script that includes functions to interact with two different APIs: the Football Data API and the Govee API. Let's break down the code step by step:

Importing necessary modules:

http.client: Used for making HTTP requests to the Football Data API.
json: Used for working with JSON data.
socket: Used for creating a UDP socket to send commands to the Govee device.
requests: Used for making HTTP requests to the Govee API.
pygovee: A custom library for controlling Govee lights.


Defining a dictionary called COLORS:

This dictionary maps color names to their RGB values.


Defining a constant variable called API_KEY:

This variable should contain your personal API key for the Football Data API.


Defining a function named get_important_goals:

This function retrieves important goals of a given team from the Football Data API.
It takes an optional argument team_id (default value: 944) representing the ID of the team.
It uses the http.client module to make a GET request to the Football Data API and fetches the matches data.
The function filters the matches to find only those where the home team was the winner.
It returns a list of important goals.


Defining a function named turn_on_light:

This function turns on a Govee light by sending a command to it via UDP.
It takes an argument ip_address representing the IP address of the Govee device.
It creates a UDP socket, sets the IP address and port of the Govee device, and defines a command to turn on the light.
The function then sends the command to the Govee device using the socket.


Defining a function named change_light_color:

This function changes the color of a Govee light by making an HTTP PUT request to the Govee API.
It takes two arguments: ip_address (representing the IP address of the Govee device) and color (representing the desired color).
The function constructs a payload containing the RGB values corresponding to the desired color.
It makes an HTTP PUT request to the Govee API endpoint with the payload to change the light's color.
The function returns the status code of the HTTP response.

Please note that some parts of this code snippet are incomplete or require additional input, such as assigning a value to API_KEY.
