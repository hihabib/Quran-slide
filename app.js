const animationData = [
    {
        className: 'right-to-center', 
        image: '1.jpg'
    }, 
    {
        className: 'center-right-to-center-left', 
        image: '2.jpg'
    } 
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
animationData.forEach((data, key) => {
    if(!key) {
        createSlide(data.image, data.className);
    } else {
        setTimeout(() => {
            document.querySelector('img').remove();
            document.querySelectorAll('span').forEach(el => el.remove());
            createSlide(data.image, data.className);
        }, 10000)
    }
})




