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
            output+="<p>ID: "+pokemon.id+"</p>"+
            "<img src='"+pokemon.sprites.front_default+"'>"
            var name = pokemon.name
            output+="<p>"+name.charAt(0).toUpperCase() + name.slice(1)+"</p><p>"
            for(var j=0;j<pokemon.types.length;j++){
                var type= pokemon.types[j].type.name+" "
                output += (type).charAt(0).toUpperCase() + type.slice(1)
            }
            output+="</p></div>"
            $("#container").append(output)
            $("#loading").css("display","none")
        }
    }
    pokemonRequest.send()
}
