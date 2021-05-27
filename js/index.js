let bookList = document.querySelector('#list')
let showBookPanel = document.querySelector('#show-panel')
let bookCollection = []

document.addEventListener("DOMContentLoaded", function() {
    getBooks()
});
bookList.addEventListener('click', (e) => {
    showPanel(e.target.id)
})
showBookPanel.addEventListener('click', (e) => {
    if (e.target.textContent === "LIKE"){
        let id = e.target.parentElement.id
        bookCollection[id - 1].users.push({"id": 1, "username": "pouros"})
        let updateCollection = bookCollection[id - 1]
        //console.log(updateCollection)
        patchLikes(id, updateCollection)
    }
})

function getBooks(){
    fetch('http://localhost:3000/books')
    .then(res => res.json())
    .then(data => data.forEach(renderBookList))
}
function patchLikes(id, likesObj){
    // console.log(id)
    // console.log(likesObj)
    fetch(`http://localhost:3000/books/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(likesObj)
    })
    .then(res => res.json())
    .then(showPanel(id))
}
function renderBookList(bookObj){
    bookCollection.push(bookObj)
    let bookTitle = document.createElement('li')

    bookTitle.textContent = bookObj.title
    bookTitle.id = bookObj.id

    bookList.append(bookTitle)
}
function showPanel(click){
    console.log(click)
    showBookPanel.textContent = ""
    let bookImg = document.createElement('img')
    let bookTitle = document.createElement('h3')
    let bookSubtitle = document.createElement('h3')
    let bookAuth = document.createElement('h3')
    let bookDesc = document.createElement('p')
    let likes = document.createElement('ul')
    let clickedBook = bookCollection[click - 1]
    let likeBtn = document.createElement('button')
    //console.log(clickedBook)
    
    showBookPanel.id = clickedBook.id
    bookImg.src = clickedBook.img_url
    bookImg.alt = "book cover"
    bookTitle.textContent = clickedBook.title
    bookSubtitle.textContent = clickedBook.subtitle
    bookAuth.textContent = clickedBook.author
    bookDesc.textContent = clickedBook.description
    likeBtn.textContent = "LIKE"

    showBookPanel.append(bookImg, bookTitle, bookSubtitle, bookAuth, bookDesc, likes, likeBtn)

    clickedBook.users.forEach(function(users){
        let username = document.createElement('li')
        //console.log(users.username)
        username.textContent = users.username
        likes.append(username)
    })
}