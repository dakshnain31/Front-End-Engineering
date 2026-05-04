document.addEventListener('DOMContentLoaded', function() {

    const hamburgerButton = document.getElementById('menuToggle');
    const hiddenMenu = document.getElementById('primaryNav');

    // 3. SEARCH BOX

    const searchBox = document.getElementById('searchInput');
  
    const allArticles = document.querySelectorAll('.post');

    if (searchBox) {
       
        searchBox.addEventListener('input', function(event) {
           
            const typedWords = event.target.value.toLowerCase();

            
            for (let article of allArticles) {
                // Get all the words inside this article
                const articleWords = article.innerText.toLowerCase();


                if (articleWords.includes(typedWords)) {
                    article.style.display = 'block'; // Show it
                } else {
                    article.style.display = 'none'; // Hide it
                }
            }
        });
    }

    // 4. COOL SCROLLING ANIMATION


    const hiddenThings = document.querySelectorAll('.reveal');

  
    function showHiddenThings() {
        const screenHeight = window.innerHeight;
        
        for (let thing of hiddenThings) {
         
            const position = thing.getBoundingClientRect().top;
            
            if (position < screenHeight - 50) {
                thing.classList.add('is-visible');
            }
        }
    }

    
    window.addEventListener('scroll', showHiddenThings);
    
    showHiddenThings();

  
    // 5. AUTO-UPDATING YEAR
   
  
    const yearText = document.getElementById('year');
    if (yearText) {
        
        const today = new Date();
        const thisYear = today.getFullYear();
        
   
        yearText.textContent = thisYear;
    }

 
    // 6. CATEGORY BUTTONS (Tags)

   
    const categoryButtons = document.querySelectorAll('.tag');
    
    for (let button of categoryButtons) {
        
        button.addEventListener('click', function() {
            
           
            for (let btn of categoryButtons) { 
                btn.classList.remove('active'); 
            }
            
            button.classList.add('active');

           
            const chosenCategory = button.getAttribute('data-tag');

           
            for (let article of allArticles) {
              
                const articleTags = article.getAttribute('data-tags') || '';
                
               
                if (!chosenCategory || articleTags.includes(chosenCategory)) {
                    article.style.display = 'block'; // Show it
                } else {
                    article.style.display = 'none'; // Hide it
                }
            }
        });
    }

    // 7. POPUP WINDOW (Modal)
 
  
    const popupWindow = document.getElementById('articleModal');
    const popupContent = document.getElementById('modalBody');
    const closeButton = document.getElementById('closeModal');


    document.addEventListener('click', function(event) {
        
        const clickedArticle = event.target.closest('.post');
        
        if (clickedArticle && popupWindow && popupContent) {
            event.preventDefault(); 
            
           
            const titleBox = clickedArticle.querySelector('h3');
            const textBox = clickedArticle.querySelector('p');
            const picture = clickedArticle.querySelector('img');

           
            const titleWords = titleBox ? titleBox.innerText : "Cool Article";
            const storyWords = textBox ? textBox.innerText : "No story here.";
            const pictureLink = picture ? picture.src : "";

         
            popupContent.innerHTML = `
                <img src="${pictureLink}" style="width: 100%; border-radius: 12px; margin-bottom: 20px;">
                <h2>${titleWords}</h2>
                <p style="margin-top: 15px; line-height: 1.6;">${storyWords}</p>
                <p style="margin-top: 15px; color: gray;">Click the X or outside this box to close.</p>
            `;

            popupWindow.style.display = 'flex';
        }
    });

    if (closeButton) {
        closeButton.addEventListener('click', function() {
            popupWindow.style.display = 'none';
        });
    }

   
    window.addEventListener('click', function(event) {
        if (event.target === popupWindow) {
            popupWindow.style.display = 'none';
        }
    });

});