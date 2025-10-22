let lista = [];

let canais = [];

let download = async () => {
    const cache = localStorage.getItem("canais");
    let now = Date.now();
    let lastUpdate = Number(localStorage.getItem("canais_time"));
    if (now - lastUpdate < Number(import.meta.env.VITE_CACHE_DURATION)) {
        return JSON.parse(cache);
    }

    let req = await fetch(import.meta.env.VITE_LINK_LISTA_M3U8);
    let resp = await req.text();
    lista = resp.split("\n");
    lista.forEach((linha, i) => {
        if (linha.includes("http://")) {
            lista[i] = linha.replace(".ts", ".m3u8").trim();
        } else {
            lista[i] = linha.replace("#EXTINF:-1,", "").trim();
        }
    });

    lista.forEach((linha, i) => {
        if (linha.includes("http://")) {
            let nome = lista[i - 1];
            let url = lista[i];
            canais.push({ nome: nome, url: url })
        }
    });

    localStorage.setItem("canais", JSON.stringify(canais.slice(0, 1000)));
    localStorage.setItem("canais_time", now);

    return canais;
};

export default async function getCanais() {
    return await download();
}
