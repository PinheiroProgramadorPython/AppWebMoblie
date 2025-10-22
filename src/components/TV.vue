<script setup>
import videojs from "video.js";
import "video.js/dist/video-js.css";
import getCanais from "../config/extrator.js";
import { onMounted, ref } from "vue";


let esportes = ["sportv", "espn", "premiere", "band sports", "combate", "prime video", "caze tv","fox", "dazn", "disney", "fcf", "jogos se hoje", "lutas do dia", "lutas exclusivas", "nba", "nfl", "spotynet", "onefootball", "ufc"];

let abertos = ["band", "record", "sbt", "cultura", "redetv", "gazeta"];

let filmes = ["telecine", "hbo", "cinemax", "tnt", "universal", "warner", "woohoo", "tbs", "tcm", "syfy", "studio", "space", "sony", "paramount", "a&e", "amc","axn", "MegaPix", "cine sky", "comedy central", "curta!", "discovery channel", "discovery home", "discovery sciense", "discovery theater", "discovery turbo", "discovery world", "e!", "fim&arts, fish", "food", "history", "investigacao", "lifetime", "off", "prime box", "space"];

let infantils = ["cartoonito", "discovery kids", "dog", "gloobinho", "nick jr", "nickelodeon", "ra-tim-bum"];

let horas = ["24horas", "[24h]"];

let adultos = ["xxx", "[xxx]"];

const video = ref(null);

let canais = ref([]);

let canal = ref(null);

let channel = ref(null);

let player = "";

function abrirCanal (url, name){
    canal.value = url;
    channel.value = name
    player.pause();
    player.reset();
    player.src({src: canal.value, type: "application/x-mpegURL"});
    player.load();
    player.play(); 
}

onMounted(async () => {

    canais.value = await getCanais();
    
    canal.value = canais.value[333].url;
    channel.value = canais.value[333].nome;
    
    player = videojs(video.value, {
    width: 200,
    height: 100,
    controls: true,
    autoplay: false,
    fluid: true,
    sources: [{src: canal.value, type: "application/x-mpegURL"}]
    });
    player.load();
});
</script>

<template>
<main class="container">
    <section class="my-5">
        <div class="text-center fs-1 bg-primary rounded-3 p-2">
            <h1>Bem Vindo ao nosso Site PinheiroTVOnline</h1>
        </div>
    </section>
    <section class="d-flex justify-content-center align-items-center row my-5">    
        <div class="dropdown col mb-5">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Canais Globo ao Vivo
            </button>
            <ul class="dropdown-menu">
                <li class="list-group-item" v-for="(canal, i) in canais.filter(canal => canal.nome.toLowerCase().includes('globo') )" :key="i">      
                    <button class="btn btn-primary mb-2" @click="abrirCanal(canal.url, canal.nome)">{{ canal.nome }}</button>   
                </li>
            </ul>
        </div>

        <div class="dropdown col mb-5">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Canais Aberto ao Vivo
            </button>
            <ul class="dropdown-menu">
                <li class="list-group-item" v-for="(canal, i) in canais.filter(canal => abertos.some(aberto => canal.nome.toLowerCase().includes(aberto)))" :key="canal.url">      
                    <button class="btn btn-primary mb-2" @click="abrirCanal(canal.url, canal.nome)">{{ canal.nome }}</button>   
                </li>
            </ul>
        </div>

        <div class="dropdown col mb-5">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Canais de Filmes ao Vivo
            </button>
            <ul class="dropdown-menu">
                <li class="list-group-item" v-for="(canal, i) in canais.filter(canal => filmes.some(filme => canal.nome.toLowerCase().includes(filme)))" :key="i">      
                    <button class="btn btn-primary mb-2" @click="abrirCanal(canal.url, canal.nome)">{{ canal.nome }}</button>   
                </li>
            </ul>
        </div>

        <div class="dropdown col mb-5">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Canais 24 Horas ao Vivo
            </button>
            <ul class="dropdown-menu">
                <li class="list-group-item" v-for="(canal, i) in canais.filter(canal => horas.some(hora => canal.nome.toLowerCase().includes(hora)))" :key="i">      
                    <button class="btn btn-primary mb-2" @click="abrirCanal(canal.url, canal.nome)">{{ canal.nome }}</button>   
                </li>
            </ul>
        </div>
        
        <div class="dropdown col mb-5">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Canais Adulto ao Vivo
            </button>
            <ul class="dropdown-menu">
                <li class="list-group-item" v-for="(canal, i) in canais.filter(canal => adultos.some(adulto => canal.nome.toLowerCase().includes(adulto)))" :key="i">      
                    <button class="btn btn-primary mb-2" @click="abrirCanal(canal.url, canal.nome)">{{ canal.nome }}</button>   
                </li>
            </ul>
        </div>

        <div class="dropdown col mb-5">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Canais Infantil ao Vivo
            </button>
            <ul class="dropdown-menu">
                <li class="list-group-item" v-for="(canal, i) in canais.filter(canal => infantils.some(infantil => canal.nome.toLowerCase().includes(infantil)))" :key="i">      
                    <button class="btn btn-primary mb-2" @click="abrirCanal(canal.url, canal.nome)">{{ canal.nome }}</button>   
                </li>
            </ul>
        </div>

        <div class="dropdown col mb-5">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Esportes ao Vivo
            </button>
            <ul class="dropdown-menu">
                <li class="list-group-item" v-for="(canal, i) in canais.filter(canal => esportes.some(esporte => canal.nome.toLowerCase().includes(esporte)))" :key="i">      
                    <button class="btn btn-primary mb-2" @click="abrirCanal(canal.url, canal.nome)">{{ canal.nome }}</button>   
                </li>
            </ul>
        </div>
    </section>
  
    <section class="my-5"> 
        <h2 class="text-center">{{ channel }}</h2>
        <div>
            <video class="video-js vjs-theme-modern rounded-3" ref="video"></video>
        </div>      
    </section>
</main>
</template>

<style scoped>
.dropdown-menu {
  max-height: 200px;
  overflow-y: auto;
}
</style>
