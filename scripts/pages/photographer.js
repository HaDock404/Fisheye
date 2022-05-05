    let params = (new URL(document.location)).searchParams;
    const idPhotographer = params.get('id');

    let totalLikes = 0;


    class Card {
        constructor(picture, title, like, date, photographerId, id) {
            this.picture = picture;
            this.title = title;
            this.like = like;
            this.date = date;
            this.photographerId = photographerId;
            this.id = id;
        }
    }

    let tabCard = [];


    class Api {
        constructor(url) {
            this._url = url
        }
    
        async getPhotographerData() {
            return fetch(this._url)
                .then(res => res.json())
                .then(res => res.photographers)
                .catch(err => console.log('an error occurs', err))
        }

        async getPictureData() {
            return fetch(this._url)
                .then(res => res.json())
                .then(res => res.media)
                .catch(err => console.log('an error occurs', err))
        }
    }
    
    class PhotographerApi extends Api {
        
        constructor(url) {
            super(url)
        }
    
        async getPhotographer() {
            return await this.getPhotographerData()
        }

        async getPicture() {
            return await this.getPictureData()
        }
    }
    
    
    
    
    class PhotographerCard {
        constructor(profil) {
            this._profil = profil
        }
    
        createPhotographerCard() {
            const bio = document.querySelector('.photograph-bio');
            const picture = document.querySelector('.photograph-header');
            const footer = document.querySelector('.price-day');

            if (this._profil.id == idPhotographer) {
                
                const photographerCard = "<h1 class='photographName'>"+this._profil.name+"</h1><h2 class='location'>"+this._profil.city+", "+this._profil.country+"</h2><h3 class='tagLine'>"+this._profil.tagline+"</h3>"

                const photographerPicture = '<img src="assets/photographers/'+this._profil.portrait+'" class="image" />'


                bio.innerHTML += photographerCard;
                picture.innerHTML += photographerPicture;
                
                footer.innerHTML += '<div class="footer">'+this._profil.price+'€ / jour</div>'

            }  
        }
    }
      

    class PictureCard {
        constructor(profil) {
            this._profil = profil
        }
    
        createPictureCard() {
            const post = document.querySelector('.post');
            const footer = document.querySelector('.likes-total');

            if (this._profil.photographerId == idPhotographer) {

                totalLikes = totalLikes + this._profil.likes;
                
                const pictureCard = "<div class='publication'><img src='assets/images/"+this._profil.image+"' class='postPicture' id='"+this._profil.id+"'/><div class='stats'><div class='pictureTitle'>"+this._profil.title+"</div><div class='likeNumber'>"+this._profil.likes+"</div></div></div>";

                post.innerHTML += pictureCard;

                const CardClass = new Card(this._profil.image, this._profil.title, this._profil.likes, this._profil.date, this._profil.photographerId, this._profil.id);

                tabCard.push(CardClass);

            }
            footer.innerHTML = '<div class="footer">'+totalLikes+'</div>'

        }
    }

    class PictureCardSelected {
        constructor(profil) {
            this._profil = profil
        }
    
        createPictureCardSelected() {
            const post = document.querySelector('.post');
    
            while (post.firstChild) {
                post.removeChild(post.firstChild);
              }
            
              if (this._profil.photographerId == idPhotographer) {

                const CardClass = new Card(this._profil.image, this._profil.title, this._profil.likes, this._profil.date, this._profil.photographerId, this._profil.id);

                tabCard.push(CardClass);
            }
        }
    }
    
    
    
    
    
    
    
    
    
    
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
            eventListener();   
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

    




    function bestPicture() {

        const changeSelect = document.querySelector('.select')

        tabCard.sort(function(a, b) {
            return a.like - b.like
        });
        tabCard.reverse();
        
        loopInnerHTML();
        changeSelect.innerHTML = '<div>Popularité</div>'
    }


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


    function datePicture() {

        const changeSelect = document.querySelector('.select')

        tabCard.sort(function(a, b) {
            return new Date(a.date).valueOf() - new Date(b.date).valueOf();
        })
        
        loopInnerHTML();
        changeSelect.innerHTML = '<div>Date</div>'
    }

    
    function loopInnerHTML() {
        let j = 0;
        const post = document.querySelector('.post');

        while (j < tabCard.length) {
        
            const picture = tabCard[j].picture;
            const title = tabCard[j].title;
            const likes = tabCard[j].like;
            const id = tabCard[j].id;

            const pictureCard = "<div class='publication'><img src='assets/images/"+picture+"' class='postPicture' id='"+id+"'/><div class='stats'><div class='pictureTitle'>"+title+"</div><div class='likeNumber'>"+likes+"</div></div></div>";
    
            post.innerHTML += pictureCard;
    
            j++;
        }
        eventListener();
        //tabCard = [];
    }








    const picture = document.querySelector(".picture");
    const modal = document.querySelector(".modalDisplayPicture");
    const left = document.querySelector("#left");
    const right = document.querySelector("#right");
    const html = document.querySelector('html')
    let tabModal = [];

    function eventListener() {

        let image = document.getElementsByClassName("postPicture");

        for(let i = 0; i < image.length; i++) {
            image[i].addEventListener("click", displayPicture);
        }
    }

    function displayPicture(e) {
        
        const attribute = e.target.getAttribute("id");
        let j = 0;

        openModalePicture();


        while (j < tabCard.length) {
            const imgX = tabCard[j].picture;
            const idX = tabCard[j].id;

            if(idX == attribute) {
                console.log('ok')
                picture.innerHTML = `<img class="modalPicture" src="assets/images/`+imgX+`" alt="">`;
                tabModal.push(imgX)
                left.addEventListener("click", changeLeft);
                right.addEventListener("click", changeRight);
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
        let y = 1

        while (x < tabCard.length) {
            let imgY = tabCard[x].picture;

            if (imgY == tabModal[0]) {
                y = x - y;
                imgY = tabCard[y].picture;
                picture.innerHTML = `<img class="modalPicture" src="assets/images/`+imgY+`" alt="">`;
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
                picture.innerHTML = `<img class="modalPicture" src="assets/images/`+imgY+`" alt="">`;
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