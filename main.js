const form = document.querySelector('form');
const imageDiv = document.querySelector('.images');
const previousBtn = document.querySelector('#previous-btn');
const nextBtn = document.querySelector('#next-btn');
let url = new URLSearchParams();
let page;
let pageCount;

form.onsubmit = e => {
    e.preventDefault();
    let imageInput = form.elements.image.value;
    let colorInput = form.elements.color.value;
    page = 1;
    imageDiv.innerHTML = '';

    url = new URLSearchParams({
        q: imageInput,
        colors: colorInput 
    });

    previousBtn.style.display = 'inline-block';
    nextBtn.style.display = 'inline-block';
    previousBtn.disabled = true;
    nextBtn.disabled = false;

    getImages(url.toString(), page);
};

previousBtn.addEventListener('click', e => {
    e.preventDefault();
    page--;
    if (page === 1) {
        previousBtn.disabled = true;
    }
    imageDiv.innerHTML = '';
    nextBtn.disabled = false;
    getImages(url.toString(), page);

});

nextBtn.addEventListener('click', e => {
    e.preventDefault();
    page++;
    if (page === pageCount) {
        nextBtn.disabled = true;
    }
    imageDiv.innerHTML = '';
    previousBtn.disabled = false;
    getImages(url.toString(), page);
});

async function getImages(q, page) {
    const response = await fetch(`https://pixabay.com/api/?key=23490353-89c36c37714c9cf4ccb87e1c8&${q}&per_page=10&page=${page}`);
    const data = await response.json();

    console.log(data);

    pageCount = Math.ceil(data.totalHits / 10);

    let hits = data.hits;
    hits.forEach(i => {
        let parent = document.createElement('div');
        parent.setAttribute('class', 'image-container')
        let link = document.createElement('a');
        link.setAttribute('href', i.largeImageURL)
        let image = document.createElement('img');
        image.setAttribute('src', i.largeImageURL);
        image.setAttribute('class', 'image-result');
        link.append(image);
        parent.append(link);
        let caption = document.createElement('figcaption');
        let tags = document.createElement('h2');
        tags.innerText = i.tags;
        caption.append(tags);
        let author = document.createElement('p');
        author.innerText = 'Creator: ' + i.user;
        caption.append(author);
        parent.append(caption);
        imageDiv.append(parent);


    });

}