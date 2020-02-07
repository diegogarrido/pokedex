var page = 1
var perPage = 20

$("document").ready(function(){
    console.log("ready")
    fetchPokemons()
})

$(document).on("click","#next",function(){
    page++
    $("#page").html("Page: "+page)
    $("#container").text("")
    fetchPokemons()
})

$(document).on("click","#previous",function(){
    if(page>1){
        page--
        $("#page").html("Page: "+page)
        $("#container").text("")
        fetchPokemons()
    }
})

$(document).on("change","#per-page",function(){
    perPage = $("#per-page")[0].value
    fetchPokemons()
    var output = ""
    for(var i=20;i<=50;i+=10){
        if(i==perPage){
            output += "<option selected>"
        }else{
            output += "<option>"
        }
        output +=i
        output += "</option>"
    }
    $(this).html()
})

$(document).on("click",".pokemon img",function(){
    var pokemon = JSON.parse($(this).siblings()[0].value)
    console.log(pokemon)
    $("#details").children()[0].innerText = "ID: "+pokemon.id
    $("#details").children()[1].src = pokemon.sprites.front_default
    $("#details").children()[2].innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
    $("#details").children()[3].innerText = "Types: "
    for(var type of pokemon.types){
        var name = type.type.name+" "
        $("#details").children()[3].innerText += name.charAt(0).toUpperCase() + name.slice(1)
    }
    $("#details").children()[4].innerText = "Abilities: "
    for(var ability of pokemon.abilities){
        var name = ability.ability.name+" "
        $("#details").children()[4].innerText += name.charAt(0).toUpperCase() + name.slice(1)
    }
    $("#stats").text("")
    for(var status of pokemon.stats){
        var name = status.stat.name
        $("#stats").append("<p>"+name.charAt(0).toUpperCase() + name.slice(1)+": "+status.base_stat+"</p>")
    }
    $("#modal").fadeIn()
})

function fetchPokemons(){
    $("#container").text("")
    $("#loading").css("display","flex")
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://pokeapi.co/api/v2/pokemon/?offset="+(perPage*(page-1))+"&limit="+perPage, true);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var results = JSON.parse(this.responseText).results
            for(var i=0;i<results.length;i++){
                fetchPokemon(results[i].url)
            }
        }
    };
    xhttp.send();
}

function fetchPokemon(url){
    var pokemonRequest = new XMLHttpRequest();
    pokemonRequest.open("GET", url, false);
    pokemonRequest.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            var pokemon = JSON.parse(this.responseText)
            var output="<div class='pokemon'>"
            output+="<input type='hidden' value='"+this.responseText+"'/><br>"+
            "<img src='"+pokemon.sprites.front_default+"'>"
            var name = pokemon.name
            output+="<p>"+name.charAt(0).toUpperCase() + name.slice(1)+"</p>"
            output+="</div>"
            $("#container").append(output)
            $("#loading").css("display","none")
        }
    }
    pokemonRequest.send()
}
