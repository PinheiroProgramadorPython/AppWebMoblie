let canais = [];

let lista = [];


let download = async () => {
    let req;
    try {
        req = await fetch("../canais.json");
        if (!req.ok) { throw new Error("canais.json não foi Encontrado!") }
    } catch (error) {
        req = await fetch(`${import.meta.env.VITE_LINK}`);
        throw (`Deu Ruim: ${error}! Baixando direto da playlist m3u`);
    }

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

    return canais;
};

export default async function getCanais() {
    return await download();
}
