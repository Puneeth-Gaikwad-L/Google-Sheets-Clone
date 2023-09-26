const header = document.getElementById("header");
const body = document.getElementById("body");
let rows = 0; 

for (let i = 64; i <= 90; i++) {
    if (i == 64) {
        const bold = document.createElement("b");
        bold.innerText = "Sl.no";
        header.appendChild(bold);
    } else {
        const bold = document.createElement("b");
        bold.innerHTML = String.fromCharCode(i);

        header.appendChild(bold);
    }

}


function addCells() {
    const row = document.createElement("div");
    row.className = "row";

    for (let i = 64; i <= 90; i++) {
        if (i == 64) {
            const bold = document.createElement("b");
            bold.innerText = ++rows;
            row.appendChild(bold);
        } else {
            const cell = document.createElement("div");
            row.appendChild(cell);
        }
    }
    body.appendChild(row);
}

function createRows(){
    for (let i = 1; i <= 100; i++) {
        addCells();
    }
}

createRows();




