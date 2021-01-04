const cheerio = require('cheerio')
const axios = require('axios')

const imdbTop100 = 'https://www.imdb.com/search/title/?count=100&groups=top_100&sort=user_rating'

const fetchHTML = async (url) => {
       const resp = await axios.get(url)
       return cheerio.load(resp.data)
}

(async () => {
       const $ = await fetchHTML(imdbTop100)

       const movies = $('div.lister-item')

       movies.each((i, element) => {
              const movie = $(element)
              
              console.log('Title: ' + movie.find('.lister-item-header > a').text())
              console.log('Poster: ' + movie.find('.lister-item-content > p')[4].text())
       })
})();