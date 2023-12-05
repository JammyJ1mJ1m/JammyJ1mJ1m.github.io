+++
title = "Cookie Clicker Clone"
date = "2023-12-05T16:58:03Z"
author = ""
authorTwitter = "" #do not include @
cover = ""
tags = ["Cookie"]
keywords = ["", ""]
description = ""
showFullContent = false
readingTime = false
hideComments = false
color = "" #color from the theme settings
+++
When designing the costing for the building I stumbled upon the official cookie clicker building cost wiki page and copied the formula from there. Or so I thought.  
Here is the original formula:
{{< figure src="https://i.imgur.com/otJ2dnv.png" alt="Fig1" position="center" style="border-radius: 8px;" caption="cookieclicker.fandom.com/wiki/Building" captionPosition="center" captionStyle="color: white;" >}}
The formula is fairly straightforward. I was able to completely omit the need for *"F"* as I don't currently have any options for free buildings.
Here is my formula:
{{< code language="js" title="costing formula" id="1" expand="Show" collapse="Hide" isCollapsed="false" >}}
price = Math.ceil(originalPrice * exponent * buildingAmount));
{{< /code >}}
Notice any issues?

In hindsight, this was a silly error as I completely read the formula wrong. I should have multiplied the **exponent** by the **buildingAmount**.





{{< figure src="https://i.imgur.com/mbGECUt.png" alt="Fig1" position="center" style="border-radius: 8px;" caption="Fig 1" captionPosition="center" captionStyle="color: white;" >}}

Figure 1 shows the error in my formula compared to the official game. As you can see, mine is very linear with a more expensive start up but leading to easier prices later in the game. 


  
But this is a simple fix with:  

{{< code language="js" title="Corrected formula" id="1" expand="Show" collapse="Hide" isCollapsed="false" >}}
price = Math.ceil(originalPrice * Math.pow(exponent, buildingAmount));
{{< /code >}}


{{< figure src="https://i.imgur.com/eEpQFcJ.png" alt="Fig1" position="center" style="border-radius: 8px;" caption="Fig 2" captionPosition="center" captionStyle="color: white;" >}}

Figure 2 shows the original pricing along with the new pricing. They are now identical, which is cool.  

I then changed the exponential value to 1.2. Figure 3 shows the result of this. The new pricing is **a lot** more costly.

{{< figure src="https://i.imgur.com/az1IOuL.png" alt="Fig1" position="center" style="border-radius: 8px;" caption="Fig 3" captionPosition="center" captionStyle="color: white;" >}}