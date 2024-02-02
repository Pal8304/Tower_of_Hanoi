const tower = document.querySelectorAll('.rod_region');
const disk = document.querySelectorAll('.disk');
const move_count = document.getElementById('move_count');
const reset_button = document.getElementById('reset_button');
const error_message = document.getElementById('error_message');
const undo_button = document.getElementById('undo_button');

moves = [];

tower.forEach(elem => {
    elem.addEventListener("dragover",dragOver);
    elem.addEventListener("drop",drop);
    // elem.addEventListener("drop",checkWin);
})

disk.forEach(elem => {
    elem.addEventListener("dragstart",dragStart);
    elem.addEventListener("dragend",dragEnd);
})

function dragStart(event){
    // console.log('drag start');
    event.dataTransfer.setData('text', event.target.id);
    const droppingDisk = document.getElementById(event.target.id);
    droppingDisk.style.opacity = '0.5';
}

function dragEnd(event){
    // console.log('drag end');
    const droppingDisk = document.getElementById(event.target.id);
    droppingDisk.style.opacity = '1';
    event.dataTransfer.clearData();
}

function dragOver(event){
    // console.log('drag over');
    event.preventDefault();
}

function drop(event){
    // console.log('drop');
    event.preventDefault();
    const id = event.dataTransfer.getData('text');
    const droppingDisk = document.getElementById(id);
    const topDisk = this.firstElementChild.firstElementChild;
    const droppingDiskId = droppingDisk.id;
    const sourceRod = droppingDisk.parentElement.id;
    const destinationRod = this.id;
    // console.log("topDisk: ", topDisk.offsetWidth);
    // console.log("droppingDisk: ", droppingDisk.offsetWidth);
    if(topDisk === null || droppingDisk.offsetWidth < topDisk.offsetWidth){
        this.firstElementChild.prepend(droppingDisk);
        // animate dropping disk
        droppingDisk.style.transition = '1s';
        move_count.innerHTML = parseInt(move_count.innerHTML) + 1;
        moves.push(
            {
                disk: droppingDiskId,
                source: sourceRod,
                destination: destinationRod
            }
        )
    }
    else{
        console.log("Invalid move!" + droppingDisk.offsetWidth + " " + topDisk.offsetWidth);
        if(droppingDisk.offsetWidth == topDisk.offsetWidth){
            error_message.innerHTML = "Error : You cannot place the disk on the same rod again"
        }
        else{
            error_message.innerHTML = "Error : You cannot place a larger disk on a smaller disk"
        }
        // alert("Invalid move!");
    }
    checkWin();
}

function checkWin(){
    const tower2 = document.getElementById('rod2').children;
    const tower3 = document.getElementById('rod3').children;
    // console.log("tower2: ", tower2.length);
    if(tower3.length === 4){
        alert('You win!');
        resetGame();
    }
}

function resetGame(){
    const tower1 = document.getElementById('rod1');
    const tower2 = document.getElementById('rod2');
    const tower3 = document.getElementById('rod3');
    const disk1 = document.getElementById('disk1');
    const disk2 = document.getElementById('disk2');
    const disk3 = document.getElementById('disk3');
    const base1 = document.getElementById('base1');
    const base2 = document.getElementById('base2');
    const base3 = document.getElementById('base3');
    tower1.innerHTML = '';
    tower2.innerHTML = '';
    tower3.innerHTML = '';
    tower1.append(disk1);
    tower1.append(disk2);
    tower1.append(disk3);
    tower1.append(base1);
    tower2.append(base2);
    tower3.append(base3);
    move_count.innerHTML = 0;
}

function undoMove(){
    if(moves.length > 0){
        const lastMove = moves[moves.length - 1];
        const disk = document.getElementById(lastMove.disk);
        const sourceRod = document.getElementById(lastMove.source);
        const destinationRod = document.getElementById(lastMove.destination);
        sourceRod.prepend(disk);
        moves.pop();
        move_count.innerHTML = parseInt(move_count.innerHTML) - 1;
    }
}

reset_button.addEventListener('click', resetGame);
undo_button.addEventListener('click', undoMove);
