const formElements = document.querySelectorAll("#form_nombre, #form_correo, #form_asunto, #limited-input");
const submitButton = document.getElementById("send-message-button");
const form = document.querySelector("form"); // Obtenemos el formulario

const sendMessageButton = document.getElementById("send-message-button");


const limitedInput = document.getElementById("limited-input");
const message = "Hola dagger, me gusta el pepino 🤤🥒";
const typingSpeed = 40;
const deleteSpeed = 100;


function deleteMessage() {
    let currentText = limitedInput.value;
    let index = currentText.length;

    // Deshabilitar el campo mientras se borra y se escribe
    limitedInput.disabled = true;

    const deleteInterval = setInterval(() => {
        if (index > 0) {
            limitedInput.value = currentText.substring(0, index - 1);
            index--;
        } else {
            clearInterval(deleteInterval);
            typeMessage(); // Iniciar la escritura del nuevo mensaje
        }
    }, deleteSpeed);
}

function typeMessage() {
    let index = 0;

    const typeInterval = setInterval(() => {
        if (index < message.length) {
            limitedInput.value += message[index];
            index++;
        } else {
            clearInterval(typeInterval); // Detener la animación de escritura
            setTimeout(() => {
                // Habilitar el campo después de un breve delay
                limitedInput.disabled = false;
                triggerButtonPressAnimation(); // Llamar a la animación de "presionar" el botón
            }, 500);
        }
    }, typingSpeed);
}


function triggerButtonPressAnimation() {
    sendMessageButton.classList.add("pressed"); 

    setTimeout(() => {
        sendMessageButton.classList.remove("pressed"); 
        clearForm(); 
    }, 500);
}

function clearForm() {
    form.reset(); // Esto borra todos los campos del formulario
    submitButton.classList.remove("disabled");

}


function validateForm() {
    let isValid = true;

    formElements.forEach((element) => {
        if (element.value.trim() === "") {
            element.style.borderBottom = "1px solid red";
            isValid = false;
        } else {
            element.style.borderBottom = "1px solid white";
        }
    });

    return isValid;
}

submitButton.addEventListener("click", () => {
    const formIsValid = validateForm();
    if (formIsValid) {
        deleteMessage()
        submitButton.classList.add("disabled");
    } 
});

formElements.forEach((element) => {
    element.addEventListener("input", () => {
        if (element.value.trim() !== "") {
            element.style.borderBottom = "1px solid white";
        }
    });
});
