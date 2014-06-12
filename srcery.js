// Combination of responsive images with srcset polyfill,
// and lazy loading images

var Srcery = (function () {
    var d=document, eagerness=2, g=window, i, len, s, src, srcset, w, 
        attr, onEvent, inViewport, loadImage, runImages, vHeight, vWidth;

    imgs = d.querySelectorAll ?
           d.querySelectorAll('img[data-srcset]'):
           d.getElementsByTagName('img');
          
    // get or set an html attribute
    attr = function() {
        // if three arguments
        return arguments.length-2 ? 
            // set attribute if different
            (attr(arguments[0],arguments[1]) != arguments[2]) && arguments[0].setAttribute(arguments[1],arguments[2]): 
            // if two arguments, get attribute
            arguments[0].getAttribute(arguments[1]);
    };

    onEvent = function(event, action){
        g.addEventListener?
            this.addEventListener(event, action, false):
            (g.attachEvent)?
                this.attachEvent('on' + event, action):
                this['on' + event] = action;
    };

    inViewport = function(el) {
        var rect = el.getBoundingClientRect();

        return (
           rect.left   >= 0 - eagerness * viewportHeight() &&
           rect.top <= eagerness * viewportHeight()
        )
    };

    loadImage = function(img){
        srcset = attr(img, 'data-srcset');
        
        // exit if no srcset attribute
        if (!srcset) return;
        
        // save original src
        if ( !attr(img, 'data-original-src') ) {
            attr( img, 'data-original-src', attr(img, 'src') );
        }

        // split srcset into array by comma
        srcset = srcset.split(/, ?/);
                
        // iterate array image widths in srcset
        for ( s=0; s<srcset.length; s++ ) {
        
            if ( srcset[s].match(/\dw$/) ) {
                // capture desired width for image in srcset
                w = +srcset[s].match(/\d+(?=w$)/) ;
                if (w <= vWidth ) {
                    // apply first src matching page width
                    src = srcset[s].split(/ /)[0];
                    if ( attr(img, 'src')!= src ) {
                         attr(img, 'src', src);
                    }
                    break;
                } 

            } else {
                attr(img, 'src', srcset[s]);
            } 
        }
    };

    runImages = function() {
        // cache viewportWidth before looping over every image
        vWidth = viewportWidth();
        for ( i=0, len=imgs.length; i<len; i++ ) {
            
            if ( inViewport(imgs[i]) ) {

                loadImage(imgs[i]);
            }
        }
    }

    // get page height
    // and cache result in vHeight
    viewportHeight = function() {
        return vHeight = vHeight || 
            (g.innerHeight || d.documentElement.clientHeight);
    }

    // get page width
    // and multiply width by retina display level
    viewportWidth = function() {
        return (g.innerWidth || d.body.parentNode.clientWidth ) * (g.devicePixelRatio || 1);
    }

    onEvent( 'load', runImages );
    onEvent( 'orientationchange', function() {
        // reset cached vHeight so it will load the new viewportHeight
        vHeight = 0;
        runImages();
    });
    onEvent( 'scroll', runImages );
    runImages();

    // optional public methods
    return({

        // Allow updating eagerness number.
        // Eagerness is how many pixels to look ahead when loading images
        
        // example: 
        // Srcery.setEagerness(0);  // no eagerness, completely lazy loading
        // Srcery.setEagerness(2);  // double the eagerness

        setEagerness: function(newEagerness) {
            eagerness = newEagerness++;
        }
        
        // Allowing adding new images after page loads.
        // To update images loaded with ajax
        
        // example: 
        // var newImage = document.createElement('img');
        // newImage.src = 'cat.gif';
        // Srcery.push(newImage);
        ,push: function(img) {
            return imgs.push(img);
        }
        
        // Load all images right away, cancelling laziness
        
        // example:
        // Srcery.now();
        ,now: function() {
            for ( i=0, len=imgs.length; i<len; i++ ) {
                loadImage(imgs[i]);
            }
        }

        //,imgs: function() {
        //    return imgs;
        //}

    });

})();
