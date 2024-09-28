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

const activePage = window.location.pathname;
const navLinks = document.querySelectorAll ('header nav a').forEach(link => {
    if(link.href.includes(`${activePage}`)){
        link.classList.add('active-page');
    }
})