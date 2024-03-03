+++
title = "Callisto Engine"
date = "2024-02-28T03:08:13+01:00"
author = "James"
authorTwitter = "JammyJ1mJ1m" #do not include @
cover = ""
tags = ["C++", "Engine","Personal", "OpenGL","DirectX"]
keywords = ["", ""]
description = "A game engine being written in C++ designed to render with OpenGl or DirectX"
showFullContent = false
readingTime = true
hideComments = false
color = "green" #color from the theme settings
+++

# Background
This engine is designed with abstraction in mind and will follow an ECS architecture.  
While most engines you see people devloping are with OpenGL **OR** DirectX, Callisto will be made with both.  
This is something that has always fascinated me and shall be accomplished with some cool abstraction and inheritance tricks.   

### February 28th '24 - Inception of Callisto engine 
The aim of this blog is to produce weekly* devlogs on the progress of the engine.  
**(This providing University doesn't get in the way).*

I spent the first few day setting up the basic project and implementing the window creation on the OpenGl side of things.  
The design of the window and rendering relationship is listed below:
{{< figure src="https://i.imgur.com/qJAN2ZR.png" alt="Windowing relationships" position="center" style="border-radius: 8px;" caption="" captionPosition="center" captionStyle="color: white;" >}}
Classes in yellow are abstract, blue are related to DirectX11 and red is OpenGL related. A pre-processor is set in "main" to allow the program to run in either OpenGL or DirectX11. 
After I had a window system in place it was time to draw my first triangle. 
{{< figure src="https://i.imgur.com/xvrFvGb.png" alt="orange triangle" position="center" style="border-radius: 8px;" caption="" captionPosition="center" captionStyle="color: white;" >}}
As well as drawing I also allowed input to be deteced in the window class and "offload" that into the game where I can do specific logic, such as the escape key closing the window and exiting the game. 