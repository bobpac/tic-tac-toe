function renderControls() {
    // hide it on first load show once there is a game over
    playBtn.style.visibility = winner ? 'visible' : 'hidden';

    // if there is a winner we should not be able to place a disc
    // quadrantEls.forEach(function(quadrantEl, colIdx) {
    //     // if there is a tie or if the column is full
    //     const hideMarker = !board[colIdx].includes(0) || winner
    //     markerEl.style.visibility = hideMarker ? 'hidden' : 'visible'
    // })
}
