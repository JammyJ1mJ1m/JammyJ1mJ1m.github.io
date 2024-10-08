+++
title = "DirectX11 ACW"
date = "2023-11-24T10:43:59Z"
lastmod = "2023-12-13T10:43:59Z"
author = "James"
authorTwitter = "" #do not include @
cover = ""
tags = ["DX11","C++"]
keywords = ["", ""]
description = "A real time renderer using DirectX11"
showFullContent = false
readingTime = false
hideComments = false
color = "" #color from the theme settings
+++

# Brief
Computer graphics gallery consisting of 4 rooms each with a different exhibit  

* Each room is to contain an exhibit that demonstrates one or more of the shading, animation and lighting effects listed below. Advanced effects (see below for a full description) are marked with a (*)

* The exhibits can consist of one or more 3D objects.

* The specific 3D objects that make up the exhibit are not defined, although they should be different in every room, and selected to clearly enhance the chosen shading, lighting, animation effects.

* At least one of the 3D objects should consist of a high definition mesh containing 1000's of polygons and be irregular (e.g. teapot, dragon, etc)

* At least one of the exhibits should consist of 1000's of dynamic 3D objects (e.g. a stream of spheres appearing in the ceiling and falling to the floor)

* At least one of the exhibits should consist of multiple dynamic 3D objects where the various animation effects can be demonstrated

## **13/12/2023**


### Gallery rooms
Started the day off in Blender creating some models to use as the gallery rooms.
My initial thoughts were to have each of the rooms connected via a small corridoor: 

{{< figure src="https://i.imgur.com/cUphB2A.png" alt="Fig1" position="center" style="border-radius: 8px;" caption="" captionPosition="center" captionStyle="color: white;" >}}

After thinking about the layout for a little while I deciced that i'll keep it a lot simpler and just have 4 rooms next to each other with a door way.

{{< figure src="https://i.imgur.com/oU5hYwx.png" alt="Fig1" position="center" style="border-radius: 8px;" caption="" captionPosition="center" captionStyle="color: white;" >}}
Each room has its own area, floor, walls and celing. This allows me to create the one room, duplicate it and rotate it for the other 3 rooms. 
The texture design of the walls and floor aren't finalised yet, however something fairly monotone is my general idea as it won't take the attention away from whatever will eventually be showcased in the room. 


### UML
Shown below is the first diagram I have created relating to the light setup that I would like to implement.
Light is an abstract class that contains some common data members that all light types will use as well as a virtual run method. All the other light types will ovveride the run method with their own logic. 

{{< figure src="https://i.imgur.com/GFbBO49.png" alt="Fig1" position="center" style="border-radius: 8px;" caption="" captionPosition="center" captionStyle="color: white;" >}}
**Directional light**

Directional lights are like the sun where all rays coming from the light are more or less parallel to each other and far away. In this case a position isnt neccesary, only a direction is needed. 

**Point light**

Point lights are omnidirectional emitting, for example a lightbulb hanging from a ceiling. The light source needs a position but does not need a direction. Constant, linear and quadratic data members are used in the calculations for the light attenuation, this refers to how far the light can reach objects. Another name for this is light falloff.

**Spot light**

Spot lights are like a flashlight, coming from a single position but only in a given direction. 
Spotlights are almost the same as a pointlight with the difference being that there are a few other parameters that control the output into a cone shape. 

###### Models
Below is the diagram I am working on for a model class and its relationships. The main class, model will store the relevant data members for a model, this can include the vertex and index lists, for later rendering. 
As well as this it can also contain position, scale and rotation values.
Each model will have a material that will be used for the drawing stage. This class is essentially just a data container. The material class will have four Texture classes, one for each of the texture types that will be used, diffuse map, normal map, height map and specular map.

There is also a seperate class that contains a sampler state, this is its own entity as it should be called by multiple material classes. 
The reason for this being that the majority, if not all of my textures will be sampled in the same way.

{{< figure src="https://i.imgur.com/8Eh5u2I.png" alt="Fig1" position="center" style="border-radius: 8px;" caption="" captionPosition="center" captionStyle="color: white;" >}}

## **20/12/2023**
Today I created a quick mock up of what I would like my four gallery rooms to look like. 

Starting in the far left, the teapot room. One teapot will have gourad lighting appplied (vertex lighting) and the other teapot will have phong lighting applied(per pixel).  
Next is the room with lots of dynamic spheres, these will fall from the ceiling into the floor all while being illumiated by three point lights of different colours.  
The nect room is animated, I will have three suzanne models with different transformation animations applied, translation, scale and rotation.  
The final room is empty as it is left to whatever I want to add to it, I haven't decided on what to add yet.  
Although it's not shown here, the actual scene will have a ceiling.

{{< figure src="https://i.imgur.com/mr7bm5C.gif" alt="Fig1" position="center" style="border-radius: 8px;" caption="" captionPosition="center" captionStyle="color: white;" >}}

## **11/01/2024**
# Submission day
Shown below is what I produced for my final assignment for the two modules, "C++ programming and design" and "real-time graphics". Unlike as previously mentioned this scene does not have a ceiling. 
{{< youtube BeZAlWUrvjw >}}

<!--
## **3/01/2024**
It's been a while since the last update. Today after some tedious issues I have managed to implement normal maps for models. This video highlights the new additions. Parralax is next on the list of things to implement.
{{< youtube hxTX2S0eETs >}}

## **4/01/2024**
Reviewing yesterday's progress, I have decided that it would be wise to change the way I am handling my materials in order to allow different models to have different textures.
The new system works great and still allows for normal maps. This clip shows the floor having a texture and a normal map wheras the floor appears to just be a shiny floor texture.

{{< youtube rpYW0YU6qmg >}}

## **5/01/2024**
 Another day, another update. I should probably condense these down into weekly updates?
Anyway. Multiple lights working with normal maps! 😎
Each light is its own object and they are stored inside a light manager which, as you can imagine, manages the lights. The manager reads the light data and sends it to the shader where the magic happens. This video highlights the progress. 
{{< youtube P5Qa6W84cMo >}}
-->
