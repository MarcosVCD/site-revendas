document.addEventListener('DOMContentLoaded', function() {
    // Adiciona o evento 'mouseenter' para mover o elemento para o final, sobrepondo os demais
    document.querySelectorAll('path').forEach(path => {
        path.addEventListener('mouseenter', function() {
            this.parentNode.appendChild(this); // Move o elemento para o final
        });
    });

    // Adiciona o evento 'click' aos elementos com a classe 'svgbutton'
    document.querySelectorAll('.svgbutton').forEach(button => {
        button.addEventListener('click', function(event) {
            var menu = document.getElementById('dropdownmenu');
            // Alterna a visibilidade do menu
            if (menu.style.display === 'block') {
                menu.style.display = 'none';
            } else {
                // Posiciona o menu dropdown próximo ao botão clicado
                var rect = button.getBoundingClientRect();
                menu.style.display = 'block';
                menu.style.top = `${rect.bottom + window.scrollY}px`;
                menu.style.left = `${rect.left + window.scrollX}px`;
            }
            event.stopPropagation(); // Impede o evento de propagação
        });
    });

    // Fecha o menu se clicar fora dele
    document.addEventListener('click', function(event) {
        var dropdownmenu = document.getElementById('dropdownmenu');
        if (!dropdownmenu.contains(event.target)) {
            dropdownmenu.style.display = 'none';
        }
    });
});


// Indicador da página atual no header
const activePage = window.location.pathname;
const navLinks = document.querySelectorAll ('header nav a').forEach(link => {
    if(link.href.includes(`${activePage}`)){
        link.classList.add('active-page');
    }
})


// Linha do tempo
let currentSlide = 0;
const totalSlides = document.querySelectorAll('.card-historia').length;

function moveToSlide(index) {
    if (index < 0 || index >= totalSlides) return;

    currentSlide = index;
    updateCards();
    updateTimeline();
}

// Função para atualizar as bolas visíveis
function updateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const start = Math.max(0, currentSlide - 1);
    const end = Math.min(totalSlides, currentSlide + 2);

    // Atualiza as bolas da timeline para mostrar três por vez
    timelineItems.forEach((item, idx) => {
        item.classList.remove('active');
        if (idx >= start && idx < end) {
            item.classList.add('active');
        }
    });

    // Atualiza a linha da timeline
    // const timelineLine = document.querySelector('.timeline-line');
    // timelineLine.style.width = `${((currentSlide + 1) / totalSlides) * 1000}%`;
}

// Função para atualizar os cards visíveis
function updateCards() {
    const content = document.querySelector('.historia');
    const cards = document.querySelectorAll('.card-historia');
    
    // Atualizar a posição de deslizamento dos cards
    const offset = -currentSlide * 100; // Move o conteúdo em porcentagem
    content.style.transform = `translateX(${offset}%)`;

    // Atualiza a visibilidade dos cards
    cards.forEach((card, idx) => {
        if (idx === currentSlide) {
            card.classList.add('active');  // Ativa o card correto
        } else {
            card.classList.remove('active'); // Desativa os outros cards
        }
    });
}

// Inicializar o carrossel no primeiro card
updateTimeline();
updateCards();


// Para adicionar suporte a gestos de toque (em dispositivos móveis), você pode usar o seguinte código para permitir o deslize
let touchStartX = 0;
let touchEndX = 0;

const content = document.querySelector('.timeline-content');

// Captura o início do toque
content.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

// Captura o fim do toque e determina se o usuário deslizou para a esquerda ou direita
content.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
});

function handleGesture() {
    if (touchEndX < touchStartX) {
        moveToSlide(currentSlide + 1); // Deslizar para a esquerda
    }
    if (touchEndX > touchStartX) {
        moveToSlide(currentSlide - 1); // Deslizar para a direita
    }
}
