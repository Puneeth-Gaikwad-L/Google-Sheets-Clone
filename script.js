const header = document.getElementById("header");
const body = document.getElementById("body");
let rows = 0; //to keep count of number of rows dynamically
const boldButton = document.getElementById("bold");
const italicButton = document.getElementById("italic");
const underlineButton = document.getElementById("underline");

const leftAlignBtn = document.getElementById("left-align");
const centerAlignBtn = document.getElementById("center-align");
const rightAlignBtn = document.getElementById("right-align");

// creating the rows containing A, B, C...
for (let i = 64; i <= 90; i++) {
    if (i == 64) {
        const bold = document.createElement("b");
        bold.className = "startCell";
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
function createRows() {
    for (let i = 1; i <= 100; i++) {
        addCells();
    }
}

// initial call for building 100 rows
createRows();

// will hold the start data on focus of a particular cell
let activeOptionState;

// function will be called when a cell is focused
let activeCell;


function onFocus(e) {
    if (activeCell) {
        if (activeCell.id === e.target.id) {
            return;
        }
        activeCell.style.border = "1px solid #dbdbdb";
    }
    let cellName = document.getElementById("cellName");
    activeCell = e.target;
    activeCell.style.border = "1px solid blue";
    cellName.innerText = e.target.id;

    const computedStyle = getComputedStyle(activeCell);

    // stores the formatting data related to the active cell
    activeOptionState = {
        id: e.target.id,
        fontFamily: computedStyle.fontFamily,
        isBoldSelected: computedStyle.fontWeight === "600",
        isItalicSelected: computedStyle.fontStyle === "italic",
        isUnderLineSelected: computedStyle.textDecoration.includes("underline"),
        textAlign: computedStyle.textAlign,
        textColor: computedStyle.color,
        backgroundColor: computedStyle.backgroundColor,
        fontSize: computedStyle.fontSize,
    };
    highlightButtons()
}

function toggleButton(button, isSelected) {
    if (isSelected) {
        button.classList.add("active");
    } else {
        button.classList.remove("active");
    }
}

function highlightButtons() {
    // console.log(computedStyle);
    // if (activeOptionState.isBoldSelected) {
    //     boldButton.classList.add("active");
    // } else {
    //     boldButton.classList.remove("active");
    // }

    toggleButton(boldButton, activeOptionState.isBoldSelected);

    // if (activeOptionState.isItalicSelected) {
    //     italicButton.classList.add("active")
    // } else {
    //     italicButton.classList.remove("active");
    // }

    toggleButton(italicButton, activeOptionState.isItalicSelected);


    // if (activeOptionState.isUnderLineSelected) {
    //     underlineButton.classList.add("active");
    // } else {
    //     underlineButton.classList.remove("active");
    // }

    toggleButton(underlineButton, activeOptionState.isUnderLineSelected);

    if (activeOptionState.textAlign === "center") {
        centerAlignBtn.classList.add("active");
    } else {
        centerAlignBtn.classList.remove("active");
    }

    if (activeOptionState.textAlign === "right") {
        rightAlignBtn.classList.add("active");
    } else {
        rightAlignBtn.classList.remove("active");
    }
}

// function for toggling boldness
function onClickBold(boldButton) {

    boldButton.classList.toggle("active");

    if (activeCell) {
        if (activeOptionState.isBoldSelected === false) {
            activeCell.style.fontWeight = "600";
        } else {
            activeCell.style.fontWeight = "400";
        }
        activeOptionState.isBoldSelected = !activeOptionState.isBoldSelected;
    }

}

// function for toggling italic
function onClickItalic(italicButton) {

    italicButton.classList.toggle("active");

    if (activeCell) {
        if (activeOptionState.isItalicSelected) {
            activeCell.style.fontStyle = "normal";
        } else {
            activeCell.style.fontStyle = "italic";
        }
        activeOptionState.isItalicSelected = !activeOptionState.isItalicSelected;
    }

}

// function for toggling underline
function onClickUnderline(undelineButton) {
    undelineButton.classList.toggle("active");

    if (activeCell) {
        if (activeOptionState.isUnderLineSelected) {
            activeCell.style.textDecoration = "none";
        } else {
            activeCell.style.textDecoration = "underline";
        }
        activeOptionState.isUnderLineSelected = !activeOptionState.isUnderLineSelected;
    }
}
// will have an arr of formating elements
const textAlignElements = document.getElementsByClassName("text-align")
// function for traversing the above arr and highlighting the required element
function highlightTextAlignButton(textAlign) {
    for (let i = 0; i < textAlignElements.length; i++) {
        if (textAlignElements[i].getAttribute("data-value") === textAlign) {
            textAlignElements[i].classList.add("active");
        } else {
            textAlignElements[i].classList.remove("active");
        }
    }
}
// function for aligning the text inside each cell
function textAlign(textAlignButton) {
    let selectedValue = textAlignButton.getAttribute("data-value");

    //calling the function for highlighting the button
    highlightTextAlignButton(selectedValue);

    if (activeCell) {
        activeCell.style.textAlign = selectedValue;
        activeOptionState.textAlign = selectedValue;
    }
}

// function for changing the text color
function textColor(textColorInput) {
    let selectedValue = textColorInput.value;
    if (activeCell) {
        activeCell.style.color = selectedValue;
        activeOptionState.textColor = selectedValue;
    }
}

function backgroundColor(backgroundInput) {
    let selectedValue = backgroundInput.value;
    if (activeCell) {
        activeCell.style.backgroundColor = selectedValue;
        activeOptionState.backgroundColor = selectedValue;
    }
}