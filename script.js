const header = document.getElementById("header");
const body = document.getElementById("body");
let rows = 0; //to keep count of number of rows dynamically

// creating the rows containing A, B, C...
for (let i = 64; i <= 90; i++) {
    if (i == 64) {
        const bold = document.createElement("b");
        bold.className="startCell";
        header.appendChild(bold);
    } else {
        const bold = document.createElement("b");
        bold.innerHTML = String.fromCharCode(i);

        header.appendChild(bold);
    }
}

// adding cells dynamicaly
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
            cell.id = `${String.fromCharCode(i)}${rows}`
            cell.contentEditable = true;
            cell.addEventListener("focus", onFocus)
            row.appendChild(cell);
        }
    }
    body.appendChild(row);
}

// function will be called to create rows
function createRows(){
    for (let i = 1; i <= 100; i++) {
        addCells();
    }
}

// initial call for building 100 rows
createRows();

// function will be called when a cell is focused
let activeCell = null;

function onFocus(e){
let cellName = document.getElementById("cellName");
activeCell =  e.target;
cellName.innerText = e.target.id;
}

const defaultOptionsState = {
    fontFamily: "",
    isBoldSelected: false,
    isItalicSelected: false,
    isUnderLineSelected: false,
    textAlign: "left",
    textColor: "#000",
    backgroundColor: "#fff",
    fontSize: 14,
};

const activeOptionState = {...defaultOptionsState};

// function for toggling boldness
function onClickBold(boldButton){

    boldButton.classList.toggle("active");

    if(activeCell){
        if(activeOptionState.isBoldSelected === false){
            activeCell.style.fontWeight = "600";
            activeOptionState.isBoldSelected = true;
        }else{
            activeCell.style.fontWeight = "400";
            activeOptionState.isBoldSelected = false;
        }
    }
    
}

function onClickItalic(italicButton){

    italicButton.classList.toggle("active");

    if(activeCell){        
        if(activeOptionState.isItalicSelected === false){
            activeCell.style.fontStyle = "italic";
            activeOptionState.isItalicSelected = true;
        }else{
            activeCell.style.fontStyle = "normal";
            activeOptionState.isItalicSelected = false;
        }
    }
    
}

function onClickUnderline(undelineButton){
    undelineButton.classList.toggle("active");
    
    if(activeCell){
        let textDecoration = getComputedStyle(activeCell).textDecoration;

        if(textDecoration === "none"){
            activeCell.style.textDecoration = "underline";
        }else{
            activeCell.style.textDecoration = "none";
        }
    }
}


