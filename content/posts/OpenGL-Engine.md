+++
title = "Callisto Engine"
date = "2024-02-28T03:08:13+01:00"
lastmod = ""
author = "James"
authorTwitter = "JammyJ1mJ1m" #do not include @
cover = ""
tags = ["C++", "Engine","Personal", "OpenGL","DirectX"]
keywords = ["", ""]
description = "A game engine being written in C++ designed to render with OpenGl or DirectX"
showFullContent = false
readingTime = true
hideComments = false
color = "orange" #color from the theme settings
+++

### Background
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

### March 10th '24 - Slow but steady progress
The first half of this week was painful and slow. I split my project in half, the engine and the game. The engine is now a standalone static library that I can plug into a game project and use its functions. This however, was not easy to set up. I kept running into error after error even testing on multiple computers to which I was receiving different errors. Long story short, linking errors and file pathing was all wrong.  
Anyway, progress.
Additions
 - Entities
 - Model component
 - VBO object
 - Shader component  
 - Shader object
 - Resource manager  

An entity is essentially just a holder of components, such as in this instance an entity can currently contain model components and shader components.  
The model component holds the mesh and the relevant VBO depending on if GL or DX is being used.  
A shader component holds and configures the shader to be used for that object, again this is relating to whether GL or DX is in use. The shader is loaded by calling the `LoadShader` method from the resource manager. 

An updated UMl design is listed below. This, I hope clarifies the relationships between some of the classes. Shooter game can hold multiple entities. Transform and rigidbody are yet to be implemented.
{{< figure src="https://i.imgur.com/spPQGTQ.png" alt="UML" position="center" style="border-radius: 8px;" caption="" captionPosition="center" captionStyle="color: white;" >}}

As well as the above, this is the current output. This output is two entities with different model components/meshes showing different vertex colours.
{{< figure src="https://i.imgur.com/8rj7Etw.png" alt="coloured shapes" position="center" style="border-radius: 8px;" caption="" captionPosition="center" captionStyle="color: white;" size="100px;" >}}
