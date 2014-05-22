Srcery
===

Responsive images done right

Ever want to have multiple resolutions of one image on a webpage?

This image loading plugin makes it easy to create HTML images that are responsive, lazy loading, so you can use images that look great at any size or resolution while reducing load time and saving bandwidth.
#### Features

* Responsive image loading using HTML5 srcset attribute. This allows listing several different versions of an image, then loading one automatically based on the browser's current width.
* Lazy loading - Images are not loaded until they are scrolled into view, to efficiently save bandwidth
* Eager loading - To reduce delay from lazy loading, this plugin "looks ahead" and loads images right before they enter view.
* Supports retina displays - target browser sizes are adjusted automatically to support high resolution displays
* Images are updated automatically on orientation change and while scrolling
* Supports regular HTML image tags
* No dependencies - just one small Javascript file implements features in all browsers 


[Source Code](https://github.com/garyv/srcery/blob/master/srcery.js) (3.77KB)

[Minified Code](http://garyv.s3.amazonaws.com/srcery/srcery.min.js) (635 bytes gzipped)
 
View live [Demo](http://garyv.s3.amazonaws.com/srcery/demo.html).
### To use Srcery

* Start with regular HTML image tags
* Add a srcset, like in the examples below
* Then add one tiny script directly before the end body tag


        <script src='srcery.js' async></script> 



### Examples


simple image (nothing special)

    <img src="images/480x320.gif">
    
lazy load image

    <img src="clear.gif" data-srcset="images/480x322.gif">
    
large image, or small image

    <img src="images/480x321.gif" data-srcset="images/800x480.gif 800w">
    
HD image, that scales down

    <img src="clear.gif" data-srcset="images/1440x600.gif 1400w, images/800x400.gif 800w, images/480x240.gif">
    
HD image, lazy loading, with fallback for no JavaScript

    <img src="clear.gif" data-srcset="images/2400x800.gif 2300w, images/1440x600.gif 1400w, images/800x400.gif 800w, images/480x240.gif"> <noscript><img src='images/800x400.gif'></noscript>
    
