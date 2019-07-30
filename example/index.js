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

function onMouseOut(target) {
    const tooltipText = event.target.classList.contains('tooltip-text') ? event.target : event.target.querySelector('.tooltip-text');

    tooltipText.innerHTML = 'Copy to clipboard';
}