// Copy code button click functionality
function onClick(target) {
    const copyText = event.target.closest('.bd-clipboard').nextElementSibling,
        selection = window.getSelection(),
        range = new Range();

    if (window.getSelection) {
        selection.removeAllRanges();
    }

    range.selectNodeContents(copyText);
    selection.addRange(range);

    document.execCommand('copy');

    selection.removeAllRanges();
    event.target.querySelector('.tooltip-text').innerHTML = 'Copied!';
}

// Copy code button hover functionality
function onMouseOut(target) {
    const tooltipText = event.target.classList.contains('tooltip-text') ? event.target : event.target.querySelector('.tooltip-text');

    tooltipText.innerHTML = 'Copy to clipboard';
}

function customDropDownPositioning(dropDown) {
    if (this.label === 'Left-aligned but right aligned when large screen') {
        dropDown.classList.add('dropdown-menu-lg-right');
    }
    else if (this.label === 'Right-aligned but left aligned when large screen') {
        dropDown.classList.add('dropdown-menu-right');
        dropDown.classList.add('dropdown-menu-lg-left');
    }
}

window.onload = function () {
    document.addEventListener('click', function () {
        const target = event.target,
            isButton = event.target.closest('button');

        if (isButton && isButton.getAttribute('data-toggle') === 'modal') {
            const modal = document.querySelector(isButton.getAttribute('data-target')),
                data = isButton.getAttribute('data-whatever');

            if (data) {
                const modalInput = modal.querySelector('.modal-body input');

                if (modalInput) {
                    modalInput.value = data;
                }
            }

            if (modal) {
                modal.toggle();
            }
        }
    });

    const modal = document.querySelector('#exampleModal');

    modal
}