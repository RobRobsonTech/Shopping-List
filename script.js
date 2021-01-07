var button = document.querySelector("#enter");
var input = document.getElementById("userInput");
var ul = document.querySelector("ul");
var li = document.querySelector("li");
var deleteButton = document.querySelectorAll(".delete");
var editConfirm = document.getElementById("editConfirm");
var editCancel = document.getElementById("editCancel");
var editInput = document.getElementById("editInput");
var startingNumber = 6;
var editTarget = null;

function inputLength() {
	return input.value.length;
}

function createListElement() {
	var li = document.createElement("li");

	// Create grab image
	var div = document.createElement("div");
	var grab = document.createElement("img");
	grab.src = "grip-vertical.svg";
	div.classList.add("drag-container");
	div.classList.add("my-handle");
	div.appendChild(grab);
	li.appendChild(div);

	// Create span text
	var span = document.createElement("span");
	var newContent = document.createTextNode(input.value);
	span.appendChild(newContent);
	span.id = "span_" + (startingNumber + 1);
	li.appendChild(span);

	// Create edit button
	editTarget = "span_" + (startingNumber + 1);
	var editDiv = document.createElement("div");
	var editIcon = document.createElement("div");
	editIcon.classList.add("edit");
	editIcon.classList.add("fas");
	editIcon.classList.add("fa-edit");
	editDiv.classList.add("edit-container");
	editDiv.onclick = function () {
		editText(startingNumber);
	};
	editDiv.appendChild(editIcon);
	li.appendChild(editDiv);

	// Create delete button
	var trashContainer = document.createElement("div");
	trashContainer.classList.add("trash-container");
	var icon = document.createElement("div");
	icon.src = "trash.svg";
	icon.classList.add("delete");
	icon.classList.add("fas");
	icon.classList.add("fa-trash");
	trashContainer.appendChild(icon);
	li.appendChild(trashContainer);

	// Add list item
	ul.insertBefore(li, ul.firstChild);
	input.value = "";
	startingNumber++;
}

function addListAfterClick() {
	if (inputLength() > 0) {
		createListElement();
	}
}

function addListAfterKeypress(event) {
	// Check if the enter key has been pressed on input
	if (inputLength() > 0 && event.keyCode === 13) {
		createListElement();
	}
}

function taskManagement(event) {
	// Check if delete button has been pressed
	if (
		event.target.classList[0] == "delete" ||
		event.target.classList[0] == "trash-container"
	) {
		let li = event.target.closest("li");
		li.parentElement.removeChild(li);
	}
	// Check if list element has been clicked
	else if (event.target.tagName == "LI") {
		event.target.querySelector("SPAN").classList.toggle("done");
		event.target.classList.toggle("complete");

		if (event.target.classList.contains("complete")) {
			// If target contains complete class move it to the bottom
			event.target.parentElement.appendChild(event.target);
		} else {
			// If target does not contain complete class, move it to the top
			event.target.parentElement.insertBefore(
				event.target,
				event.target.parentElement.firstChild
			);
		}
	}
	// Check if Span element has been clicked
	else if (event.target.tagName == "SPAN") {
		event.target.classList.toggle("done");
		event.target.parentElement.classList.toggle("complete");

		if (event.target.parentElement.classList.contains("complete")) {
			// If target contains complete class move it to the bottom
			event.target.parentElement.parentElement.appendChild(
				event.target.parentElement
			);
		} else {
			// If target does not contain complete class, move it to the top
			event.target.parentElement.parentElement.insertBefore(
				event.target.parentElement,
				event.target.parentElement.parentElement.firstChild
			);
		}
	}
}

function editListAfterKeypress(event) {
	// Check if enter key has been pressed on the edit input
	if (editInput.value.length > 0 && event.keyCode === 13) {
		makeChanges();
	}
	// If user hits escape, close overlay
	else if (event.key === "Escape") {
		closeOverlay();
	}
}

function editText(spanNumber) {
	// Open the text editor overlay
	document.getElementById("overlay-back").style.display = "block";
	document.getElementById("overlay").style.display = "block";

	// Retrieve span text to be edited
	span = "span_" + spanNumber;
	editTarget = document.getElementById(span);
	editInput.value = editTarget.innerText;
	editInput.focus();
}

function makeChanges() {
	// Update list with new text
	var inputValue = editInput.value;
	editTarget.innerHTML = inputValue;
	closeOverlay();
	inputValue = "";
}

function closeOverlay() {
	document.getElementById("overlay-back").style.display = "none";
	document.getElementById("overlay").style.display = "none";
}

// Edit Overlay
editConfirm.addEventListener("click", makeChanges);
editInput.addEventListener("keypress", editListAfterKeypress);
editCancel.addEventListener("click", closeOverlay);

// Input submission
button.addEventListener("click", addListAfterClick);
input.addEventListener("keypress", addListAfterKeypress);

// Check off list item
ul.addEventListener("click", taskManagement);

// List Handle
Sortable.create(listWithHandle, {
	handle: ".my-handle",
	animation: 150,
});
