/**Get id of photographer in the URL */
    let params = (new URL(document.location)).searchParams;
    const idPhotographer = params.get('id');
/*************************************/
    
let totalLikes = 0;/**Init total like */

/**Table of Data from JSON */
    class Card {
        constructor(picture, title, like, date, photographerId, id, video) {
            this.picture = picture;
            this.title = title;
            this.like = like;
            this.date = date;
            this.photographerId = photographerId;
            this.id = id;
            this.video = video;
        }
    }
/***************************/

    let tabCard = [];/**Storage for table Card */

/*********************Create a Class Object*************************/
    class Api {
        constructor(url) {
            this._url = url
        }
    
        async getPhotographerData() {/**Get data from photographers Object */
            return fetch(this._url)
                .then(res => res.json())
                .then(res => res.photographers)
                .catch(err => console.log('an error occurs', err))
        }

        async getPictureData() {/**Get data from media Object */
            return fetch(this._url)
                .then(res => res.json())
                .then(res => res.media)
                .catch(err => console.log('an error occurs', err))
        }
    }
    
/************Create a Class legacy with "extends" & "super"****************/
    class PhotographerApi extends Api {
        
        constructor(url) {
            super(url)
        }
    
        async getPhotographer() {/**Return Data from photograhers Object */
            return await this.getPhotographerData()
        }

        async getPicture() {/**Return Data from photograhers Object */
            return await this.getPictureData()
        }
    }
    
/* Create a class with a function, this function add dynamic HTML with data JSON*/   
    class PhotographerCard {
        constructor(profil) {
            this._profil = profil
        }
    
        createPhotographerCard() {
            const bio = document.querySelector('.photograph-bio');
            const picture = document.querySelector('.photograph-header');
            const footer = document.querySelector('.price-day');
            const header = document.querySelector('#headerModal')

            if (this._profil.id == idPhotographer) {/**Check URL matches with Data*/
                
                const photographerCard = "<h1 class='photographName' aria-label='Nom du photographe "+this._profil.name+"'>"+this._profil.name+"</h1><h2 class='location' aria-label='Localisation du photographe "+this._profil.city+", "+this._profil.country+"'>"+this._profil.city+", "+this._profil.country+"</h2><h3 class='tagLine' aria-label='Mantra du photographe "+this._profil.tagline+"'>"+this._profil.tagline+"</h3>"

                const photographerPicture = '<img src="assets/photographers/'+this._profil.portrait+'" class="profil-picture" alt="'+this._profil.name+'" aria-label="Photo de profil de '+this._profil.name+' "/>'

                const photographerForm = '<h2>'+this._profil.name+'</h2>'


                bio.innerHTML += photographerCard;
                picture.innerHTML += photographerPicture;
                header.innerHTML += photographerForm;
                
                footer.innerHTML += '<div class="footer">'+this._profil.price+'€ / jour</div>'

            }  
        }
    }
      
/* Create a class with a function, this function add dynamic HTML with data JSON*/
    class PictureCard {
        constructor(profil) {
            this._profil = profil
        }
    
        createPictureCard() {
            const post = document.querySelector('.post');
            const footer = document.querySelector('.likes-total');

            if (this._profil.photographerId == idPhotographer) {

                totalLikes = totalLikes + this._profil.likes;/**Increment total likes */

                if (this._profil.image == undefined) {/**Check if it's not a picture -> video */
                    
                    const pictureCard = "<article class='publication' aria-label='Post du photographe'><video id='"+this._profil.id+"' class='postPicture' alt='"+this._profil.title+"' aria-label='Vidéo'><source src='assets/images/"+this._profil.video+"' type='video/mp4'></video><div class='stats'><h2 class='pictureTitle'>"+this._profil.title+" aria-label='Titre de la vidéo "+this._profil.title+"'</h2><h3 value='0' class='likeNumber' id='"+this._profil.id+"' aria-label='Nombre de like "+this._profil.likes+"'>"+this._profil.likes+" <img class='heart' src='assets/icons/heart-red.svg' alt=''></img></h3></div></article>";

                    post.innerHTML += pictureCard;

                    /**Table for slideshow Modal*/
                    const CardClass = new Card(this._profil.image, this._profil.title, this._profil.likes, this._profil.date, this._profil.photographerId, this._profil.id, this._profil.video);

                    tabCard.push(CardClass);
                
                } else { /**It's a picture */
                    
                    const pictureCard = "<article class='publication' aria-label='Post du photographe'><img src='assets/images/"+this._profil.image+"' class='postPicture' id='"+this._profil.id+"' alt='"+this._profil.title+"' aria-label='Photo'/><div class='stats'><h2 class='pictureTitle' aria-label='Titre de la photo "+this._profil.title+"'>"+this._profil.title+"</h2><h3 value='0' class='likeNumber' id='"+this._profil.id+"' aria-label='Nombre de like "+this._profil.likes+"'>"+this._profil.likes+" <img class='heart' src='assets/icons/heart-red.svg' alt=''></img></h3></div></article>";
                    
                    post.innerHTML += pictureCard;

                    /**Table for slideshow Modal*/
                    const CardClass = new Card(this._profil.image, this._profil.title, this._profil.likes, this._profil.date, this._profil.photographerId, this._profil.id);

                    tabCard.push(CardClass);
                }
                
                

            }
            footer.innerHTML = '<div class="footer">'+totalLikes+' <img class="heartFooter" src="assets/icons/heart-solid.svg" alt=""></div>'

        }
    }

/* Create a class with a function, this function add dynamic HTML with data JSON*/
    class PictureCardSelected {
        constructor(profil) {
            this._profil = profil
        }
    
        createPictureCardSelected() {
            const post = document.querySelector('.post');
            
            /**Delete all previous post */
            while (post.firstChild) {
                post.removeChild(post.firstChild);
              }
            
              if (this._profil.photographerId == idPhotographer) {

                /**Table for sorting Data*/
                const CardClass = new Card(this._profil.image, this._profil.title, this._profil.likes, this._profil.date, this._profil.photographerId, this._profil.id, this._profil.video);

                tabCard.push(CardClass);
            }
        }
    } 
   
/**************Class Object give file for the Class Legacy**************/
    class App {
        constructor() {
            this.photographerApi = new PhotographerApi('data/photographers.json')
        }
    
        async profil() {
            const cards = await this.photographerApi.getPhotographer();
    
            cards.forEach(profil => {
                const Template = new PhotographerCard(profil)
                Template.createPhotographerCard()       
            })    
        }

        async image() {
            const cards = await this.photographerApi.getPicture();
    
            cards.forEach(profil => {
                const Template = new PictureCard(profil)
                Template.createPictureCard()       
            })
            imagetListener();
            likeListener();   
        }

        async like() {
            const cards = await this.photographerApi.getPicture();
            tabCard = [];

            cards.forEach(profil => {
                const Template = new PictureCardSelected(profil)
                Template.createPictureCardSelected()       
            })
            bestPicture();
        }

        async title() {
            const cards = await this.photographerApi.getPicture();
            tabCard = [];
    
            cards.forEach(profil => {
                const Template = new PictureCardSelected(profil)
                Template.createPictureCardSelected()       
            })
            titlePicture();
        }

        async date() {
            const cards = await this.photographerApi.getPicture();
            tabCard = [];
    
            cards.forEach(profil => {
                const Template = new PictureCardSelected(profil)
                Template.createPictureCardSelected()       
            })
            datePicture();
        }
    }
    
    const app = new App();
    app.profil();
    app.image();

    /**Sorting by like */
    function bestPicture() {

        const changeSelect = document.querySelector('.select')

        tabCard.sort(function(a, b) {
            return a.like - b.like
        });
        tabCard.reverse();
        
        loopInnerHTML();
        changeSelect.innerHTML = '<div>Popularité</div>'
    }

    /**Sorting by title */
    function titlePicture() {

        const changeSelect = document.querySelector('.select')

        tabCard.sort(function(a, b) {
            if(a.title > b.title) {
                return 1;
            } else if (b.title > a.title) {
                return -1;
            } else {
                return 0;
            }
        });
        
        loopInnerHTML();
        changeSelect.innerHTML = '<div>Titre</div>'
    }

    /**Sorting by date */
    function datePicture() {

        const changeSelect = document.querySelector('.select')

        tabCard.sort(function(a, b) {
            return new Date(a.date).valueOf() - new Date(b.date).valueOf();
        })
        
        loopInnerHTML();
        changeSelect.innerHTML = '<div>Date</div>'
    }

   /**Display picture after sorting */ 
    function loopInnerHTML() {
        let j = 0;
        const post = document.querySelector('.post');

        while (j < tabCard.length) {
        
            /**Get Data from Table Object */
            const picture = tabCard[j].picture;
            const title = tabCard[j].title;
            const likes = tabCard[j].like;
            const id = tabCard[j].id;
            const video = tabCard[j].video;

            if (picture == undefined) {
                
                const pictureCard = "<article class='publication'><video  class='postPicture' id='"+id+"' alt='"+title+"' aria-label='Vidéo'><source src='assets/images/"+video+"' type='video/mp4'></video><div class='stats'><h2 class='pictureTitle' aria-label='Titre de la vidéo "+title+"'>"+title+"</h2><h3 value='0' class='likeNumber' id='"+id+"' aria-label='Nombre de like "+likes+"'>"+likes+" <img class='heart' src='assets/icons/heart-red.svg' alt=''></img></h3></div></article>";
    
                post.innerHTML += pictureCard;
            } else {
                
                const pictureCard = "<article class='publication'><img src='assets/images/"+picture+"' class='postPicture' id='"+id+"' alt='"+title+"' aria-label='Photo'/><div class='stats'><h2 class='pictureTitle' aria-label='Titre de la photo "+title+"'>"+title+"</h2><h3 value='0' class='likeNumber' id='"+id+"' aria-label='Nombre de like "+likes+"'>"+likes+" <img class='heart' src='assets/icons/heart-red.svg' alt=''></img></h3></div></article>";
    
                post.innerHTML += pictureCard;
            }
            j++;
        }
        imagetListener();
        likeListener();
    }

    const picture = document.querySelector(".picture");
    
    const modal = document.querySelector(".modalDisplayPicture");
    const left = document.querySelector("#left");
    const right = document.querySelector("#right");
    const html = document.querySelector('html')
    let tabModal = [];/**Storage for table modale for the slideshow */

    /**Add listener on every picture for the slideshow */
    function imagetListener() {

        let image = document.getElementsByClassName("postPicture");

        for(let i = 0; i < image.length; i++) {
            image[i].addEventListener("click", displayPicture);
        }
    }
 
    /**Add listener on every like for the increment*/
    function likeListener() {

        let like = document.getElementsByClassName("likeNumber");

        for(let i = 0; i < like.length; i++) {
            like[i].addEventListener("click", incrementLike);
        }
    }
    
    /**Increment like*/
    function incrementLike(e) {

        const attribute = e.target.getAttribute("id");
        const footer = document.querySelector('.likes-total');
        let attributeValue = e.target.getAttribute("value")
        let j = 0;
        let valueStorage = attributeValue;

        
        while (j < tabCard.length) {
            const likeX = tabCard[j].like;
            const idX = tabCard[j].id;

            if(idX == attribute) {
                const like = document.querySelector("h3[class=likeNumber][id="+ CSS.escape(attribute) +"")/**get variable in the attribute*/

                let i = 0;
                i += likeX;
                ++valueStorage;
                let likeIncrement = i + valueStorage;                

                like.innerHTML = "<h3 value='"+valueStorage+"' class='likeNumber2' id='"+attribute+"'>"+likeIncrement+" <img class='heartRed' src='assets/icons/heart-solid-red.svg' alt=''></img></h3>";

                ++totalLikes;
                
                footer.innerHTML = '<div class="footer">'+totalLikes+' <img class="heartFooter" src="assets/icons/heart-solid.svg" alt=""></div>'
            }
            j++;
        }
    }

    /**Display slideshow Modal */
    function displayPicture(e) {
        
        const attribute = e.target.getAttribute("id");
        let j = 0;

        openModalePicture();


        while (j < tabCard.length) {
            const imgX = tabCard[j].picture;
            const idX = tabCard[j].id;

            if(idX == attribute) {

                if(imgX == undefined) {

                    const imgX = tabCard[j].video;

                    picture.innerHTML = "<video controls  class='modalPicture'><source src='assets/images/"+imgX+"' type='video/mp4'></video>";
                } else {

                    picture.innerHTML = `<img class="modalPicture" src="assets/images/`+imgX+`" alt="">`;
                }
                
                tabModal.push(imgX)
                
                left.addEventListener("click", changeLeft);
                right.addEventListener("click", changeRight);

                document.onkeydown = function(e) {
                    switch (e.keyCode) {
                        case 37:
                            changeLeft();
                            break;
                        case 39:
                            changeRight();
                            break;
                    }
                };
            }
            j++;
        }
    }

    function openModalePicture() {

        const footer = document.querySelector('footer');
        const unroll = document.querySelector('.unroll');

        if (modal.style.display == "flex") {
            modal.style.display = "none";
            html.style.overflow = "auto";
            footer.style.display = "flex";
            unroll.style.visibility = "visible";
            tabModal = [];
        } else {
            modal.style.display = "flex";
            html.style.overflow = "hidden";
            footer.style.display = "none";
            unroll.style.visibility = "hidden";
        }
    }

    function changeLeft() {

        let x = 0;
        let y = 1;

        while (x < tabCard.length) {
            let imgY = tabCard[x].picture;

            if (imgY == tabModal[0]) {
                y = x - y;
                
                imgY = tabCard[y].picture;

                if (imgY == undefined) {
                    imgY = tabCard[y].video;

                    picture.innerHTML = "<video controls  class='modalPicture'><source src='assets/images/"+imgY+"' type='video/mp4'></video>";
                    imgY = tabCard[y].picture;
                } else {

                    picture.innerHTML = `<img class="modalPicture" src="assets/images/`+imgY+`" alt="">`;
                }
                
                
                
                tabModal = [];
                tabModal.push(imgY)
                
                y = 1;
                
                left.addEventListener("click", changeLeft);
                right.addEventListener("click", changeRight);
                return;                
            }
            x++;
        }
    }

    function changeRight() {
        
        let x = 0;
        let y = 1;

        while (x < tabCard.length) {
            let imgY = tabCard[x].picture;

            if (imgY == tabModal[0]) {
                y = y + x;
                
                imgY = tabCard[y].picture;
                
                if (imgY == undefined) {
                    imgY = tabCard[y].video;

                    picture.innerHTML = "<video controls  class='modalPicture'><source src='assets/images/"+imgY+"' type='video/mp4'></video>";
                    imgY = tabCard[y].picture;
                } else {

                    picture.innerHTML = `<img class="modalPicture" src="assets/images/`+imgY+`" alt="">`;
                }
                
                tabModal = [];
                tabModal.push(imgY)
                y = 1;
                
                left.addEventListener("click", changeLeft);
                right.addEventListener("click", changeRight);
                return;
            }
            x++;
        }
    }

    function testSubmitModal() {
        closeModal();
        return false; 
    }