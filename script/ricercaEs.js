let esercizi = [];
let esercizioSelezionato = null;

fetch('data/esercizi.json')
    .then(res => res.json())
    .then(data => {
        esercizi = data;
        mostraRisultati(esercizi); // mostra subito tutti
    });

// Funzione separata per mostrare i risultati
function mostraRisultati(lista) {
    const ul = document.getElementById('results');

    if (lista.length === 0) {
        ul.innerHTML = `<li class="text-white text-sm px-2 py-2">Nessun esercizio trovato.</li>`;
        return;
    }

    ul.innerHTML = lista.map(e => `
        <li class="flex items-center justify-between bg-white rounded-lg px-4 py-3 shadow-sm cursor-pointer hover:bg-lime-100 transition-colors">
            <div>
                <p class="font-semibold text-gray-800 text-sm">${e.nome}</p>
                <p class="text-gray-400 text-xs mt-0.5">${e.gruppo} · ${e.attrezzatura}</p>
            </div>
            <span id="aggiungi" class="text-lime-600 text-xs font-bold">+ Aggiungi</span>
        </li>
    `).join('');
}

// Filtra mentre scrivi
document.getElementById('search').addEventListener('input', function () {
    const query = this.value.toLowerCase().trim();

    if (query === '') {
        mostraRisultati(esercizi); // se cancelli tutto, torna a mostrare tutti
        return;
    }

    const filtrati = esercizi.filter(e =>
        e.nome.toLowerCase().includes(query) ||
        e.gruppo.toLowerCase().includes(query)
    );

    mostraRisultati(filtrati);
});

// Aggiungi funzionalità al pulsante "Aggiungi"
document.getElementById('results').addEventListener('click', function (e) {
    if (e.target.id === 'aggiungi') {
        const nomeEsercizio = e.target.closest('li').querySelector('p').textContent;
        apriModal(esercizi.find(e => e.nome === nomeEsercizio));
    }
});

function apriModal(esercizio) {
    esercizioSelezionato = esercizio;
    document.getElementById('modal-titolo').textContent = esercizio.nome;

    //svuotare i campi
    document.getElementById('input-serie').value = '';
    document.getElementById('input-reps').value = '';
    document.getElementById('input-peso').value = '';
    document.getElementById('input-note').value = '';

    //mostra il modal
    const modal = document.getElementById('modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function chiudiModal() {
    const modal = document.getElementById('modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}