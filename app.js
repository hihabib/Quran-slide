//animation list
/*
1. color-zoom-in
2. color-zoom-out
3. right-to-center
4. center-right-to-center-left
*/

const animationData = [
    {
        className: 'color-zoom-out', 
        image: '1.jpg'
    }, 
    {
        className: 'center-right-to-center-left', 
        image: '2.jpg'
    },
    {
        className: 'color-zoom-out', 
        image: '3.jpg'
    },
    {
        className: 'right-to-center', 
        image: '4.jpg'
    },
    {
        className: 'color-zoom-in', 
        image: '5.jpg'
    },
    
]

// create slide
const createSlide = (image, className) => {
    // create main image, add src and main animation class
    const picture = new Image();
    picture.src = './image/'+image;
    picture.classList.add(className);

    // create delay element and add class
    const transitionAfter = document.createElement('span')
    const transitionBefore = document.createElement('span')
    transitionAfter.classList.add('transition-after');
    transitionBefore.classList.add('transition-before');

    // append elements on root
    const root = document.getElementById('root');
    root.append(picture);
    root.append(transitionBefore);
    root.append(transitionAfter);
}


// arrange slide data
const arrangeSlide = (slideCount) => {

     // remove previous slide's tags
     if(document.querySelector('#root>img')){
        document.querySelector('img').remove();
        document.querySelectorAll('span').forEach(el => el.remove());
    }

    // create slide
    if(animationData[slideCount]) {
        // create slide
        createSlide(animationData[slideCount].image, animationData[slideCount].className);
    } else {
        // if all slide done, then reset slide count and create slide from first
        slideCount = 0;
        createSlide(animationData[slideCount].image, animationData[slideCount].className);
    }
    
    // play next slide
    document.querySelector('img').addEventListener('animationend', function(){
        arrangeSlide(slideCount+1);
    })
}
window.onload = () => {
    arrangeSlide(0)
}




