var searchButton = document.getElementById('searchButton')
var searchInput = document.getElementById('searchInput')




searchButton.addEventListener('click', function(e){
    e.preventDefault();
    const  userSearchInput = searchInput.value
    getMovie( ,userSearchInput)
});
