/*fetch("data/photographers.json")
    .then(res=>res.json())
    .then (function(data) {
        let i = 0;

        while (i<data.photographers.length) {

            const profilPicture = data.photographers[i].portrait;
            const photographerName = data.photographers[i].name;
            const locationCity = data.photographers[i].city;
            const locationCountry = data.photographers[i].country;
            const tagLine = data.photographers[i].tagline;
            const price = data.photographers[i].price;
            const id = data.photographers[i].id;


            const article = document.getElementById("test");

            article.innerHTML += "<div class='profil'><a href='photographer.html?id="+id+"'><img class='image' src='assets/photographers/"+profilPicture+"' alt=''></a><h2>"+photographerName+"</h2><h3>"+locationCity+", "+locationCountry+"</h3><h4>"+tagLine+"</h4><div class='price'>"+price+"€/jour</div></div>"

            i++;
        }
    })*/



    class Api {
        constructor(url) {
            this._url = url
        }
    
        async get() {
            return fetch(this._url)
                .then(res => res.json())
                .then(res => res.photographers)
                .catch(err => console.log('an error occurs', err))
        }
    }
    
    class PhotographerApi extends Api {
        
        constructor(url) {
            super(url)
        }
    
        async getPhotographer() {
            return await this.get()
        }
    }
    
    
    
    
    class PhotographerCard {
        constructor(profil) {
            this._profil = profil
        }
    
        createPhotographerCard() {
            const article = document.getElementById("test");
    
            const photographerCard = "<div class='profil'><a href='photographer.html?id="+this._profil.id+"'><img class='image' src='assets/photographers/"+this._profil.portrait+"' alt=''></a><h2>"+this._profil.name+"</h2><h3>"+this._profil.city+", "+this._profil.country+"</h3><h4>"+this._profil.tagline+"</h4><div class='price'>"+this._profil.price+"€/jour</div></div>"
            
            article.innerHTML += photographerCard
        }
    }
      
    class App {
        constructor() {
            this.photographerApi = new PhotographerApi('data/photographers.json')
        }
    
        async main() {
            const cards = await this.photographerApi.getPhotographer()
    
            cards.forEach(profil => {
                const Template = new PhotographerCard(profil)
                Template.createPhotographerCard()       
            })    
        }
    }
    
    const app = new App();
    app.main();