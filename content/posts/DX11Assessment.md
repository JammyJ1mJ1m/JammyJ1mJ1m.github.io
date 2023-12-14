+++
title = "DirectX11 ACW"
date = "2023-11-24T10:43:59Z"
lastmod = "2023-11-24T10:43:59Z"
author = ""
authorTwitter = "" #do not include @
cover = ""
tags = ["DX11"]
keywords = ["", ""]
description = ""
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

# **13/12/2023**

###### Gallery rooms
Started the day off in Blender creating some models to use as the gallery rooms.
My initial thoughts were to have each of the rooms connected via a small corridoor: 

{{< figure src="https://i.imgur.com/cUphB2A.png" alt="Fig1" position="center" style="border-radius: 8px;" caption="" captionPosition="center" captionStyle="color: white;" >}}

After thinking about the layout for a little while I deciced that i'll keep it a lot simpler and just have 4 rooms next to each other with a door way.

{{< figure src="https://i.imgur.com/oU5hYwx.png" alt="Fig1" position="center" style="border-radius: 8px;" caption="" captionPosition="center" captionStyle="color: white;" >}}
Each room is its area, floor, walls and ceiling their own individual models. This allows me to create the one area, deuplicate it and rotate it for the other 3 rooms. 
The design of the walls and floor aren't finalised yet, however somehting fairly monotone is my general idea as it won't take the attention away from whatever will eventually be showcased in the room. 

Start on some UML diagrams and mockup room layout