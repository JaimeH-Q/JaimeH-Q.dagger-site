// Referencia al contenedor y al elemento
const fakeCVSpace = document.getElementById('fakeCV-space');
const fakeCV = document.getElementById('fakeCV');

// Variable para determinar si el #fakeCV está en la posición inicial o final
let isLeft = true;

// Función para mover el #fakeCV
function moveFakeCV() {
    const spaceWidth = fakeCVSpace.offsetWidth; // Obtiene el ancho del contenedor
    const fakeCVWidth = fakeCV.offsetWidth; // Obtiene el ancho del fakeCV

    if (isLeft) {
        // Mueve al extremo derecho
        fakeCV.style.left = `${spaceWidth - fakeCVWidth - 10}px`;
    } else {
        // Mueve al extremo izquierdo
        fakeCV.style.left = '0';
    }

    // Cambia el estado de la posición para el siguiente movimiento
    isLeft = !isLeft;
}

// Evento para detectar cuando el ratón pasa sobre el fakeCV
fakeCV.addEventListener('mouseenter', moveFakeCV);


const inputField = document.getElementById("limited-input");

inputField.addEventListener("input", (event) => {
    // Divide palabras considerando espacios y cambios de mayúsculas/minúsculas
    const words = inputField.value
        .trim()
        .split(/(?=[A-Z])|\s+/); // Divide en mayúsculas y espacios

    if (words.length > 10) {
        inputField.value = words.slice(0, 10).join(" "); // Limita a 10 palabras
    }
});





// CONSOLA 
const terminal = document.getElementById("terminal");
const output = document.getElementById("output");
const inputTerminal = document.getElementById("input");
let attemps = 0;
let unlocked = false;

// Lista de comandos válidos (puedes extenderla fácilmente)
const commands = {
    help: () => {
        const availableCommands = [
          "HELP   Muestra esta lista de comandos",
          "CLS   Limpia la consola",
          "ECHO [mensaje]    Muestra el mensaje proporcionado",
          "DIR   Lista el directorio actual",
          "+   Y más comandos",
          // Agrega más comandos aquí si los tienes
        ];
        return "Comandos disponibles:\n" + availableCommands.join("\n");
      },
    cls: () => { output.innerHTML = ""; return "Terminal limpiada."; },
    echo: (args) => args.join(" ") || "Error: No hay mensaje para decir.",
    dir: () => {
        const files = ["23/11/2024  17:24        108 secret.txt"]; // Lista de "archivos" en la terminal
        return files.length > 0 ? files.join("\n") : "No se encontraron archivos.";
    },
    more: (args) => {
        const fileName = args[0]; // Archivo a abrir
        
        if(attemps == 0){
            attemps = attemps + 1;
            if (!fileName) return "Error: No sé que abrir, boludo.";
        } else {
            if (!fileName) return "Error: Proporcione un nombre de archivo.";
        }
        
        // Contenido de los archivos simulados
        const fileContents = {
            "secret.txt": "Hay un comando secreto. No te lo puedo decir, pero lo podés saber si me das tu atención."
        };

        return fileContents[fileName] || `Error: El archivo '${fileName}' no existe.`;
    },
    "secret.txt": () => {
        const responseElement = document.createElement("div");
        responseElement.textContent = "Abriendo archivo...";
        output.appendChild(responseElement);
        return "Error: No se puede abrir fuera de la terminal."
    },
    "¡falopa!": () => {
        unlockLumberjackBUtton();
        if(unlocked){
            return "*Escuchas el sonido de algo entrando a otra cosa que ya está abierta, es un poco raro que sepas reconocer tan bien este sonido*"
        }
        unlocked = true;
        return "*Escuchas el sonido de un candado abriendose*"
    },
    del: (args) => {
        const fileName = args[0]; // Archivo a abrir
        
        if(!fileName){
            return "La sintaxis del comando no es correcta."
        }
        
        if(fileName == "secret.txt"){
            return "Error: Insuficientes permisos."
        } else {
            return `Error: El archivo o directorio '${fileName}' no existe.`
        }
    },
    rm: () => {return "Te estás confundiendo de terminal."},
    mkdir: () => {
        return "Tampoco rompamos las bolas"
    },
    soygay: () => {
        return "Bueno, no te la bancaste. El comando secreto es: ¡FALOPA!, se revela al final de página. Si no encontras el lumberjack, reemplazó a lo que antes era una foto de ese mismo frame (te agarré eh). "
    },
    cd: (args) => {
        if(args[0]){
            return "El sistema no puede encontrar la ruta especificada."
        }
        return "C:\\Users\\Dagger"
    }
};

// Manejar el envío de comandos
inputTerminal.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const input = inputTerminal.value.trim();
        if (input) {
            addCommandToOutput(input);
            processCommand(input);
        }
        inputTerminal.value = ""; // Limpiar el campo de entrada
    }
});

// Agregar el comando al registro
function addCommandToOutput(command) {
    const commandElement = document.createElement("div");
    commandElement.textContent = `C:\\Users\\Dagger> ${command}`;
    output.appendChild(commandElement);
}

// Procesar el comando y mostrar la salida
function processCommand(input) {
    const [command, ...args] = input.split(/\s+/); // Dividir en comando y argumentos
    const result = commands[command.toLowerCase()];
    const response = typeof result === "function" ? result(args) : result || "Comando no reconocido.";
    if (response) {
        const responseElement = document.createElement("div");
        responseElement.textContent = response;
        output.appendChild(responseElement);
    }
}

// Asegurarse de que el terminal se desplace automáticamente al final
function scrollToBottom() {
    terminal.scrollTop = terminal.scrollHeight;
}


function unlockLumberjackBUtton(){
    lumberjackBadge = document.getElementById("lumberjack-badge");
    lumberjackBadge.classList.remove("locked")
    lumberjackBadge.classList.add("unlocked")
    lumberjackLock = document.getElementById("lumberjack-lock");
    lumberjackLock.classList.remove("fa-lock")
    lumberjackLock.classList.add("fa-lock-open")
    lumberjackBadge.addEventListener("click", () => {
        if (lumberjackBadge.classList.contains("unlocked")) {
            unlockLumberjack();
        } 
    });
}


function unlockLumberjack(){
    lumberjackImage = document.getElementById("lumberjack-image");
    if(lumberjackImage){
        lumberjackImage.remove()
    }
    lumberjack = document.getElementById("lumberjack");
    lumberjack.classList.remove("hidden")

}


// Llamar a scrollToBottom después de cada nueva línea
const observer = new MutationObserver(scrollToBottom);
observer.observe(output, { childList: true });
