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

// convert english number to bengali number
function convertToBengaliNum(engNum) {
    const engNumArray = Array.from(engNum.toString()).map(el => {
        switch(el) {
            case '1':
                return '১';
            case '2':
                return '২';
            case '3':
                return '৩';
            case '4':
                return '৪';
            case '5':
                return '৫';
            case '6':
                return '৬';
            case '7':
                return '৭';
            case '8':
                return '৮';
            case '9':
                return '৯';
            case '0':
                return '০';
        }
    });
    return engNumArray.join('');
}


function changeAyah(verses, ayahCount) {
    // arabic
    const ayah = document.createElement('div');
    ayah.classList.add('arabic');

    //translation
    const initialTranslatedAyah = document.createElement('div');
    initialTranslatedAyah.classList.add('translation');

    // remove previous ayah element and create next ayah element
    document.addEventListener('keydown',  function(event) {

        // add new ayah element
        if(event.key === 'ArrowRight') {
            // remove previous ayah element
            document.querySelector('.arabic').remove();
            document.querySelector('.translation').remove();

            //arabic
            ayah.innerText = verses[ayahCount + 1].text_uthmani;
            document.querySelector('#root').append(ayah);

            //translation
            initialTranslatedAyah.innerText = convertToBengaliNum(ayahCount + 2) + '. ' + verses[ayahCount + 1].translations[0].text;
            document.querySelector('#root').append(initialTranslatedAyah);
           

            ayahCount += 1;
        } else if(event.key === 'ArrowLeft'){
            // remove previous ayah element
            document.querySelector('.arabic').remove();
            document.querySelector('.translation').remove();

            //arabic
            ayah.innerText = verses[ayahCount - 1].text_uthmani;
            document.querySelector('#root').append(ayah);

            //translation
            initialTranslatedAyah.innerText =  convertToBengaliNum(ayahCount) + '. ' + verses[ayahCount - 1].translations[0].text;
            document.querySelector('#root').append(initialTranslatedAyah);

            ayahCount -= 1;
        }
    })
        
}
window.onload = () => {
    const grayOverlay = document.createElement('div');
    grayOverlay.classList.add('gray-overlay');
    document.querySelector('#root').append(grayOverlay);
    arrangeSlide(0);
    
    //get quran verses
    fetch('https://api.quran.com/api/v4/verses/by_chapter/2?translations=163&page=1&per_page=300&fields=text_uthmani')
    .then (res => res.json())
    .then (data => {
        let verses = data.verses;
        // initial ayah number
        const initialVerseNumber = 1;
        const ayahCount = (initialVerseNumber - 1);

        /*
        Arabic
        */
        
        // show ayah for first load
        const initialAyah = document.createElement('div');
        initialAyah.classList.add('arabic');
        initialAyah.innerText = verses[ayahCount].text_uthmani;
        document.querySelector('#root').append(initialAyah);

        /*
        Translation
        */
        const initialTranslatedAyah = document.createElement('div');
        initialTranslatedAyah.classList.add('translation');
        initialTranslatedAyah.innerText = convertToBengaliNum(initialVerseNumber) + '. ' + verses[ayahCount].translations[0].text;
        document.querySelector('#root').append(initialTranslatedAyah);

        //Show ayah deta
        changeAyah(verses, ayahCount)
    });

}




