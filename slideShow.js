
function SlideShow(p) { // definition of a slide show object. Creates a div container, appends images to it, then cycles through them.
        


    //variable definitions
    var i = 0; // used as in index variable in a few places
    var imgCount = 0; //incremented as images are loaded
    var largestWidth = 0; //not used at the moment
    var largestHeight = 0; //not used at the moment
    var backgroundImage = null; //image object if p.backgroundImage is set. a sort of frame for the slide show
    var slideTop = 0; // sets the top style of slide show images
    var slideLeft = 0; // sets the left style of slide show images
    var mainLoopInt = 0; // stores the reference to the interval for the mainLoop fucntion
    var miniLoopInt = 0; // stores the reference to the interval for the miniLoop function
    var upSlide = null; // points to an image in slides array that is fading in
    var downSlide = null; // points to an image in slides array that is fading out
    var slides = []; // an array of image objects that will make the slide show
    var div = document.createElement('div'); // a div to place it all in



    //function definitions
    var doIt = function() { // the main function that runs when all the images have loaded
        slides[0].style.opacity = 1; //sets the first image in the slide show to visible
        document.getElementById(p.container).appendChild(div); // attaches the div to a container element. Probably a blank div
        i = 0; // resets the index to zero
        mainLoopInt = window.setInterval(mainLoop, p.mainInterval); // starts the main interval. 


    };

    var mainLoop = function() {  // main loop where logic between image transitions is performed.ie, the current visible image is set to downSlide and the next image to fade in is set upSlide
        downSlide = slides[i]; // i should point to the current visible image in the slide show. this is set to downSlide, the image to fade out.
        if (i < slides.length - 1) { // checks to see if the current visible slide is the last
            upSlide = slides[i + 1]; // if not, the set the next image to fade in as i + 1
            i++; // increment the index for the next go around
        } else {
            upSlide = slides[0]; // if the last image is currently visible, set the first image to fade in
            i = 0; // reset the index to zero
        }

        miniLoopInt = window.setInterval(miniLoop, 25); // start up the mini loop function interval


    }

    var miniLoop = function() { // this is where the actual image transition occurs
    
        if (upSlide.style.opacity < .98) { // check to se if the transistion is almost complete
            upSlide.style.opacity = parseFloat(upSlide.style.opacity) + .01; // if not, increment to opacity of the image to fade in
            downSlide.style.opacity = 1 - parseFloat(upSlide.style.opacity); // set the fade out image to the opposite (you know what I mean)
        } else {
            upSlide.style.opacity = 1; // if it's almost down, make the fade in image 100% visible
            downSlide.style.opacity = 0; // and then fade out image 100% invisible
            window.clearInterval(miniLoopInt); // go ahead and clear this interval
        }
        

    }

    var imgLoad = function() { // this is attached to each image that needs to be loaded
        imgCount++; // keep track of how many images have loaded
        if (imgCount == p.slides.length) { // see if the number of slides is the same as the number of images loaded
            doIt(); // run the main function if this is true
        }
    };


    //configures some objects for the main function

    
    div.id = 'slideShowDiv'; // give the div a semantically meaningful id. Might set this to a random value eventually as it would allow multiple slide shows on on page. Could test to see if id exist and append an index value to it or something
    div.style.position = 'relative'; //allows the child element images to be set to position: absolute and lay on top of each other in the div
    div.style.width = '0px'; //default values. they should change during initialization. need to ad code in doIt() to catch if still 0px and do something with it. Probably set to the slide show image with the largest corresponding value
    div.style.height = '0px'; // ditto
    if (p.divClass) { // if set
        div.className += " " + p.divClass; // add string to class accosiated with div
    }

    if (p.backgroundImage) { // check to see if a bakgroung image frame has been defined
        backgroundImage = new Image(); // if so, make image
        backgroundImage.src = p.backgroundImage; // set src to p.backgroundImage
        backgroundImage.onload = function() { // wait for the image to load
            if (p.frameWidth) { //check to see if a frameWidth is defined
                div.style.width = p.frameWidth; // if so, set bg image width and div wid to that
                backgroundImage.width = p.frameWidth;
            } else {
                div.style.width = backgroundImage.width + 'px'; // otherwise, use image width as div width
            }
            if (!p.frameHeight) { // ditto for height
                div.style.height = backgroundImage.height + 'px';
            } else {
                div.style.height = p.frameHeight;
                backgroundImage.height = p.frameHeight;
            }
            div.appendChild(backgroundImage); // attach to bg image to the div

        };

        if (p.slideTop) { // if p.slideTop is set, use that. Plan on adding code to calculate the value that would place it at the center if not set
            slideTop = p.slideTop
        } 

        if (p.slideLeft) { // ditto for left
            slideLeft = p.slideLeft
        }

    } else {

        if (p.width) { // if no bg-image, depend on a manually setting dimensions. Plan on ading code to figure the largest dimensions for width and height of slide show images as a last resort.
            div.style.width = p.width;
        }
        if (p.height) {
            div.style.height = p.height;
        }
            
    }




    for (i = 0; i < p.slides.length; i++) { // cycle through array of image urls and make image objects for each one.
        slides[i] = new Image();
        slides[i].onload = imgLoad;
        slides[i].src = p.slides[i];
        slides[i].style.position = 'absolute'; // makes images sit on top of each other
        slides[i].style.top = slideTop;
        slides[i].style.left = slideLeft;
        slides[i].style.opacity = 0;
        div.appendChild(slides[i]); // attachs images to div object

    }


}
