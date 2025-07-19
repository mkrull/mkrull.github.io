document.addEventListener('DOMContentLoaded', function() {
    const switchableWindow = document.getElementById('switchableWindow');
    const toggleButton = document.getElementById('toggleFloat');
    const sidebar = document.querySelector('.sidebar');
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    const originalNextSibling = switchableWindow.nextSibling;

    toggleButton.addEventListener('click', function() {
        if (switchableWindow.classList.contains('floating')) {
            // Docking
            switchableWindow.classList.remove('floating');
            switchableWindow.style.transform = '';
            sidebar.insertBefore(switchableWindow, originalNextSibling);
            toggleButton.innerHTML = '~';
            toggleButton.setAttribute('aria-label', 'Float window');
            makeNonDraggable();
        } else {
            // Floating
            switchableWindow.classList.add('floating');
            document.body.appendChild(switchableWindow);
            toggleButton.innerHTML = '_';
            toggleButton.setAttribute('aria-label', 'Dock window');
            makeDraggable();
        }
    });

    function makeDraggable() {
        switchableWindow.addEventListener('mousedown', dragStart);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);
    }

    function makeNonDraggable() {
        switchableWindow.removeEventListener('mousedown', dragStart);
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', dragEnd);
    }

    function dragStart(e) {
        if (e.target.closest('.titlebar') && e.target !== toggleButton) {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
            isDragging = true;
        }
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;

            xOffset = currentX;
            yOffset = currentY;

            setTranslate(currentX, currentY, switchableWindow);
        }
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }

    function dragEnd(e) {
        initialX = currentX;
        initialY = currentY;

        isDragging = false;
    }
});
