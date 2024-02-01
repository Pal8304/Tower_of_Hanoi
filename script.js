const tower = document.querySelectorAll('.rod_region');
const disk = document.querySelectorAll('.disk');
const move_count = document.getElementById('move_count');
tower.forEach(elem => {
    elem.addEventListener("dragover",dragOver);
    elem.addEventListener("drop",drop);
    elem.addEventListener("drop",checkWin);
})

disk.forEach(elem => {
    elem.addEventListener("dragstart",dragStart);
    elem.addEventListener("dragend",dragEnd);
})

function dragStart(event){
    // console.log('drag start');
    event.dataTransfer.setData('text', event.target.id);
}

function dragEnd(event){
    // console.log('drag end');
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
    console.log("topDisk: ", topDisk);
    console.log("droppingDisk: ", droppingDisk);
    if(topDisk === null || droppingDisk.offsetWidth < topDisk.offsetWidth){
        this.firstElementChild.prepend(droppingDisk);
        move_count.innerHTML = parseInt(move_count.innerHTML) + 1;
    }
    else{
        alert("Can't place larger disk on smaller disk");
    }
}

function checkWin(){
    const tower2 = document.getElementById('rod2').children;
    const tower3 = document.getElementById('rod3').children;
    console.log("tower2: ", tower2.length);
    if(tower2.length === 3 || tower3.length === 3){
        alert('You win!');
        // resetGame();
    }
}

function resetGame(){
    const tower1 = document.getElementById('rod1');
    const tower2 = document.getElementById('rod2');
    const tower3 = document.getElementById('rod3');
    const disk1 = document.getElementById('disk1');
    const disk2 = document.getElementById('disk2');
    const disk3 = document.getElementById('disk3');
    tower1.innerHTML = '';
    tower2.innerHTML = '';
    tower3.innerHTML = '';
    tower1.append(disk1);
    tower1.append(disk2);
    tower1.append(disk3);
}