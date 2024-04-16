pageGrid.querySelectorAll('.grid-img').forEach(
    img => { img.addEventListener('click', function() {
            let randomPokemonNumber = this.nextElementSibling.innerText.split("No: ")[1];
            document.getElementById("pokemonInput").value = randomPokemonNumber;
        
    });
});