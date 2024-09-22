const circles = document.querySelectorAll('.circle');
const cube = document.querySelector('.cube');
const copyButton = document.querySelector('.copy-button');
const preview = document.getElementById('border-radius-preview');

circles.forEach(circle => {
    const input = circle.querySelector('input');
    const numberDisplay = circle.querySelector('.number');

    input.value = 0; // Iniciar el valor en 0
    numberDisplay.textContent = input.value; // Mostrar el valor en el círculo

    input.addEventListener('wheel', function(event) {
        event.preventDefault();
        const delta = Math.sign(event.deltaY);
        const newValue = parseInt(input.value) - delta; // Permitir números negativos
        input.value = newValue;
        numberDisplay.textContent = newValue; // Actualizar el número en el círculo

        // Cambiar el estado del círculo según el valor
        if (newValue > parseInt(numberDisplay.textContent)) {
            circle.setAttribute('data-value', 'positive');
        } else if (newValue < parseInt(numberDisplay.textContent)) {
            circle.setAttribute('data-value', 'negative');
        } else {
            circle.removeAttribute('data-value'); // Sin cambio
        }

        // Aplicar el valor del input al border-radius del cubo
        updateCubeBorderRadius();
    });
});

function updateCubeBorderRadius() {
    const aValue = parseInt(document.getElementById('A').value) || 0;
    const sValue = parseInt(document.getElementById('S').value) || 0;
    const wValue = parseInt(document.getElementById('W').value) || 0;
    const dValue = parseInt(document.getElementById('D').value) || 0;

    const borderRadius = `${wValue}px ${dValue}px ${sValue}px ${aValue}px`;
    cube.style.borderRadius = borderRadius; // Aplicar el estilo al cubo
    preview.textContent = `border-radius: ${borderRadius};`; // Actualizar vista previa
}

// Función para copiar al portapapeles
copyButton.addEventListener('click', () => {
    const borderRadius = preview.textContent;
    navigator.clipboard.writeText(borderRadius).then(() => {
        // Mostrar una notificación temporal
        const originalText = copyButton.textContent;
        copyButton.textContent = '¡Copiado!';
        setTimeout(() => {
            copyButton.textContent = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Error al copiar: ', err);
    });
});
