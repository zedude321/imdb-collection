const cheerio = require('cheerio')
const axios = require('axios')
const firebase = require('firebase')
require("firebase/firestore");

const firebaseConfig = {
       apiKey: "AIzaSyBQ1yC4ntqvBOKbpmIJjr-8msavCo2OuaE",
       authDomain: "imdb-collection.firebaseapp.com",
       projectId: "imdb-collection",
       storageBucket: "imdb-collection.appspot.com",
       messagingSenderId: "842483507417",
       appId: "1:842483507417:web:0bea67c5e6f5e569aa5ec8",
       measurementId: "G-BRG1M8FF30"
};

const imdbTop100 = 'https://www.imdb.com/search/title/?count=100&groups=top_100&sort=user_rating'

const fetchHTML = async (url) => {
       const resp = await axios.get(url)
       return cheerio.load(resp.data)
}

(async () => {
       await firebase.initializeApp(firebaseConfig);
       const $ = await fetchHTML(imdbTop100)

       const movies = $('div.lister-item')

       await movies.each((i, element) => {
              const movie = $(element)
              
              console.log('Title: ' + movie.find('.lister-item-header > a').text())
              console.log('Date: ' + movie.find('.lister-item-year').text())
              console.log('Rating: ' + movie.find('.ratings-imdb-rating > strong').text())

              firebase.firestore().collection('100').doc(i + 'number').set({
                     title: movie.find('.lister-item-header > a').text(),
                     date: movie.find('.lister-item-year').text(),
                     rating: movie.find('.ratings-imdb-rating > strong').text(),
                     rank: i + 1
              })
       })

       return 0;
})();

return 0;