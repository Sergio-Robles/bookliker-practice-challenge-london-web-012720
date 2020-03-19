document.addEventListener("DOMContentLoaded", function() {

    const listPanel = document.querySelector("#list-panel")
    const showPanelDiv = document.querySelector("#show-panel")
    const currentUser = {id: 12, username: "sergio"}
    

    const baseUrl = "http://localhost:3000/"
    const booksUrl = baseUrl + "books/"


    const patch = (bookData) => {
        fetch(booksUrl + bookData.id, { 
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(bookData)   
        }).then( resp => resp.json() ) 
    }


    const renderAllBooks = (books) => {
        books.forEach(renderBook)
    }


    const fetchAllBooks = () => {
        return fetch(booksUrl)
        .then( resp => resp.json() )
    }


    fetchAllBooks().then(renderAllBooks)


    const renderBook = (book) => {
        
        const singleBook = document.createElement("div")   
        singleBook.className = "list-panel" 
        
        const list = document.createElement("li")
        list.innerHTML = book.title  
        list.addEventListener("click", () => displayBookInfo(book) )

        list.append(singleBook)
        listPanel.append(list)

    }


    const displayBookInfo = (book) => {


        const bookTitle = document.createElement("p")
        bookTitle.innerHTML = book.title

        const bookImage = document.createElement("img")
        bookImage.src = book.img_url

        const bookDescript = document.createElement("p")
        bookDescript.innerHTML = book.description

        const bookButton = document.createElement("button")
        bookButton.innerText = "Read Book"
        bookButton.addEventListener("click", handleClick(book))

        const listOfUsers = document.createElement("ul")
        book.users.forEach( user => {
            const singleUser = document.createElement("li")
            singleUser.innerText = user.username
            listOfUsers.append(singleUser) 
        } )

        showPanelDiv.append(bookTitle, bookImage, bookDescript, bookButton, listOfUsers) 

    }



    const handleClick = (book) => {
        book.users.push(currentUser) 
        patch(book)//.then( newBook => console.log(newBook) ) 

    }




});
