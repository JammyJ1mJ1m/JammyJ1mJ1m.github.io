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
color = "" #color from the theme settings
+++

### Background
I've always been fascinated with game engines and creating my own has been something that i have wanted to do for a long time. Primarily this engine is being developed in OpenGL but it *could* have DirectX11 thrown at it.   

### June 12th '24 - Cubemaps and physics
Another big delay between updates but at least I have now finished with University.  
I have made the decision to focus more on a single graphics API rather than try and implement multiple at the same time. I have decided to stick with OpenGL for the time being. This is primarily due to wanting to actually accomplish something rather than being stuck in development hell.
This aside, the engine now supports cubemaps as well as physics based objects. 

{{< youtube 670SCI6BVuQ >}}  

Callisto now makes use of the Bullet physics [engine](https://pybullet.org/wordpress/), this is a brilliant library and is relatively easy to setup. To make use of this, I implemented a rigidbody, collider component and a physics manager. The physics manager handles the bullet initialisation and management. So far I can create static mesh colliders and dynamic primitive colliders, which for now is perfectly adequate for the intended use case of Callisto.  
Cubemaps can also be loaded from disk using a config file, similar to how my materials for objects work. 


### April 17th '24 - Assimp, materials, camera and a library
Big delay in this update, but some cool updates. The engine is now using Assimp to load models and it is also now capable of reading materials from a file to apply to the newly lodaded models.


{{< figure src="https://i.imgur.com/3pyxgd0.png" alt="coloured shapes" position="center" style="border-radius: 8px;" caption="" captionPosition="center" captionStyle="color: white;" size="100px;" >}}

As you can see things are looking a little less like a triangle. I have a spaceship model with a wooden box texture applied. The black and purple box in the backgorund shows that if a material can't be found the default texture will load instead. Very cool.  
loading the models and materials is handled by the resource manager, the same one used for loading shaders. 
As well as the models and materials it is now possible to navigate around the scene with WASD. The cool part is that this feature is a standalone camera with its own values that can tweaked later on.  
This was a pain to setup correctly and a steep learning curve, but the engine is now a true library. This means that to develop a game using it you simply need to copy the .lib and its headers into the game project. My original setup was inside of visual studio with two projects, one being the engine and the other being a game. Now this was technically a standalone engine but I found it quite tedious to start a new project using the engine. I have now set up a seperate game project in Clion using cmake and after some tweaking with files "it just works".

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




