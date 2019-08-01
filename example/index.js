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
    if(this.label === 'Left-aligned but right aligned when large screen') {
        dropDown.classList.add('dropdown-menu-lg-right');
    }
    else if(this.label === 'Right-aligned but left aligned when large screen') {
        dropDown.classList.add('dropdown-menu-right');
        dropDown.classList.add('dropdown-menu-lg-left');
    }
}