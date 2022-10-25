var searchButton = document.getElementById('searchButton')
var searchInputn = document.getElementById('searchInput')




searchButton.addEventListener('click', function(e){
    e.preventDefault();
    const  userSearchInput = searchInput.value
    getMoVie( ,userSearchInput)