// Combination of responsive images with srcset polyfill,
// and lazy loading images

//function log(message) { window.console && console.log && console.log(message) };


jQuery( function($) { {
var eagerness=300, i, imgs, len, s, src, srcset, w, 
    allImages, inView, loadImage, runImages;
    
    allImages = function() { return $('img[data-srcset]') };

    inView = function(el) {
        var rect = el.getBoundingClientRect();

        return (
           // rect.top >= 0 &&
           rect.left   >= 0 - eagerness &&
           rect.top <= eagerness + (g.innerHeight || d.documentElement.clientHeight)
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
                if (w <= viewportWidth() ) {
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
        for ( i=0, len=imgs.length; i<len; i++ ) {
            
            if ( inView(imgs[i]) ) {

                loadImage(imgs[i]);
            }
        }
    }

    // get page width
    // and multiply width by retina display level
    viewportWidth = function() {
        return (g.innerWidth || d.body.parentNode.clientWidth ) * (g.devicePixelRatio || 1);
    }
     
    imgs = allImages();
    runImages();
    onEvent( 'scroll', runImages );
    onEvent( 'orientationchange', runImages );

    // * optional public interface *
    $.Srcery ={

        // Allow updating eagerness, how many pixels to look when loading images
        
        // example: 
        // Srcery.set({eagerness: 600});  // double the eagerness
        
        set: function(options) {
            if (options.eagerness) {
                return eagerness = options.eagerness;
            }
        }
        // example: 
        // Srcery.setEagerness(0);    // no eagerness, completely lazy loading

        ,setEagerness: function(lookAhead) {
            Srcery.set({eagerness: lookAhead});
        }
        
        // Add new images, so such as images loaded with ajax
        
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
            imgs = [];
        }
    });
    // *  */
})();
