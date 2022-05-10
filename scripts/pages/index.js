/*********************Create a Class Object*************************/
    class Api {
        constructor(url) {
            this._url = url
        }
    
        async get() {
            return fetch(this._url)/*Fetch take data from a JSON file*/
                .then(res => res.json())
                .then(res => res.photographers)
                .catch(err => console.log('an error occurs', err))
        }
    }
    
/************Create a Class legacy with "extends" & "super"****************/
    class PhotographerApi extends Api {
        
        constructor(url) {
            super(url)
        }
    
        async getPhotographer() {
            return await this.get()
        }
    }
    
/* Create a class with a function, this function add dynamic HTML with data JSON*/
    class PhotographerCard {
        constructor(profil) {
            this._profil = profil
        }
    
        createPhotographerCard() {
            const article = document.getElementById("card");
    
            const photographerCard = "<a class='profil' href='photographer.html?id="+this._profil.id+"'><img class='profil-picture' src='assets/photographers/"+this._profil.portrait+"' alt='"+this._profil.name+"' aria-label='Photo de profil'><h2 aria-label='Nom du photographe'>"+this._profil.name+"</h2><h3 aria-label='Localisation du photographe'>"+this._profil.city+", "+this._profil.country+"</h3><h4 aria-label='Mantra du photographe'>"+this._profil.tagline+"</h4><div class='price' aria-label='Prix du photographe à la journée'>"+this._profil.price+"€/jour</div></a>"
            
            article.innerHTML += photographerCard
        }
    }
      
/**************Class Object give file for the Class Legacy**************/
    class App {
        constructor() {
            this.photographerApi = new PhotographerApi('data/photographers.json')
        }
    
        async main() {
            const cards = await this.photographerApi.getPhotographer()
    
            cards.forEach(profil => {/**For each Object use the previous function*/
                const Template = new PhotographerCard(profil)
                Template.createPhotographerCard()       
            })    
        }
    }
    

/**Use the Class Object everytime user load the page*/    
    const app = new App();
    app.main();