const disk_count = document.getElementById('disk_count');
const rod1 = document.getElementById('rod1');
const base1 = document.getElementById('base1');
const base2 = document.getElementById('base2');
const base3 = document.getElementById('base3');
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

const tower = document.querySelectorAll('.rod_region');
let disk = document.querySelectorAll('.disk');
const move_count = document.getElementById('move_count');
const reset_button = document.getElementById('reset_button');
const error_message = document.getElementById('error_message');
const undo_button = document.getElementById('undo_button');

moves = [];

let count = parseInt(disk_count.value);

for(let i = 0; i < disk_count.value;i++){
    const disk = document.createElement('div');
    disk.classList.add("disk");
    disk.setAttribute('id', 'disk' + (i+1));
    disk.setAttribute('draggable', 'true');
    disk.style.width = base1.offsetWidth - (i+1)*50 + 'px';
    disk.style.height = '20px';
    disk.style.backgroundColor = colors[i%(colors.length)];
    rod1.prepend(disk);
}

disk = document.querySelectorAll('.disk');

disk_count.addEventListener('change', function(){
    resetGame();
    count = parseInt(disk_count.value);
    while(rod1.firstChild != base1){
        rod1.removeChild(rod1.firstChild);
    }
    for(let i = 0; i < count;i++){
        const disk = document.createElement('div');
        disk.classList.add('disk');
        disk.setAttribute('id', 'disk' + String(i+1));
        disk.setAttribute('draggable', 'true');
        disk.style.width = base1.offsetWidth - (i+1)*50 + 'px';
        disk.style.height = '20px';
        disk.style.backgroundColor = colors[i%(colors.length)];
        rod1.prepend(disk);
    }
    disk = document.querySelectorAll('.disk');
    disk.forEach(elem => {
        elem.addEventListener("dragstart",dragStart);
        elem.addEventListener("dragend",dragEnd);
    })
    //console.log("disk: ", disk);
})

tower.forEach(elem => {
    elem.addEventListener("dragover",dragOver);
    elem.addEventListener("drop",drop);
    // elem.addEventListener("drop",checkWin);
})

disk.forEach(elem => {
    elem.addEventListener("dragstart",dragStart);
    elem.addEventListener("dragend",dragEnd);
})

//console.log("disk: ", disk);

function dragStart(event){
    //console.log('drag start');
    event.dataTransfer.setData('text', event.target.id);
    const droppingDisk = document.getElementById(event.target.id);
    const rod = droppingDisk.parentElement;
    const topDisk = rod.firstElementChild;
    // console.log("topDisk: ", topDisk);
    // console.log("droppingDisk: ", droppingDisk);
    // console.log("rod: ", rod);
    if(topDisk === droppingDisk){
        droppingDisk.style.opacity = '0.5';
    }
    else{
        event.preventDefault();
    }
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
    event.preventDefault();
    const did = event.dataTransfer.getData('text');
    const droppingDisk = document.getElementById(did);
    const topDisk = this.firstElementChild.firstElementChild;
    // console.log("Drop :");
    // console.log("droppingDisk: ", droppingDisk);
    // console.log("topDisk: ", topDisk);
    // console.log("this: ", this);
    // console.log("id: ", did);
    const droppingDiskId = droppingDisk.id;
    const sourceRod = droppingDisk.parentElement.id;
    const destinationRod = this.id;
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
        error_message.innerHTML = "";
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
    //console.log("checkWin: ", tower3, count+1)
    if(tower3.length === count+1){
        alert('You win!');
        resetGame();
    }
}

function resetGame(){
    const tower1 = document.getElementById('rod1');
    const tower2 = document.getElementById('rod2');
    const tower3 = document.getElementById('rod3');
    const disks = document.querySelectorAll('.disk');
    disks_array = [].slice.call(disks);
    disks_array.sort((a,b) => {
        return b.offsetWidth - a.offsetWidth;
    });
    console.log("disks: ", disks);
    for(let i = 0; i < count;i++){
        tower1.prepend(disks_array[i]);
    }
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
