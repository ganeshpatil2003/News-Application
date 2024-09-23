const API_KEY = "0d26ff8e31ef4add9dba523467bd3179";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load',() => fetchNews('india'));

async function fetchNews(query){
    const fetchData =await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const jsonData = await fetchData.json();
    // console.log(jsonData);
    bindData(jsonData.articles);
}

function bindData(articles){
    const cardContainer = document.getElementById('card-container');
    const cardTemplate =  document.getElementById('template-news-card');

    cardContainer.innerHTML = '';

    articles.forEach((article)=>{
        if(!article.urlToImage) return;
        const cardClone = cardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardContainer.appendChild(cardClone);
    })
}

function fillDataInCard(cardClone,article){
    const newsImage = cardClone.querySelector('#news-image');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImage.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString('en-US',
    {timeZone:"Asia/Jakarta"})
    newsSource.innerHTML = `${article.source.name} : ${date}`;

    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,'_blank');
    })
}

let currentSelectedNav = null;

function onNaveItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    currentSelectedNav?.classList.remove('active');
    currentSelectedNav = navItem;
    currentSelectedNav.classList.add('active');
}

const searchText = document.getElementById('search-text');
const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click',() =>{
    const query = searchText.value;
    if(!query)return;
    fetchNews(query);
    currentSelectedNav?.classList.remove('active');
    currentSelectedNav = null;
})

function relode(){
    window.location.reload();
}
