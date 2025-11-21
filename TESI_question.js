let questionDiv = document.getElementById ('question');
let optionsDiv = document.getElementById('options');
let prevBtn = document.getElementById('prevBtn');
let nextBtn = document.getElementById('nextBtn');
let terminaBtn = document.getElementById('terminaBtn');
//DOMANDE
const questions = [
    { title: "DOMANDA 1", text: "Quale di questi manufatti è il più antico?" },
    { title: "DOMANDA 2", text: "Scatta una foto rappresentativa per questa scena", mode: 2, mesh: () => loadMeshWithOrbitControls('modelli/tastiera/Logitech_Keyboard.glb', 'Logitech_Keyboard.glb', true,0,2,2) },
    { title: "DOMANDA 3", text: "Quale parte del corpo allena questa macchina?", mode: 1, mesh: () => loadMeshWithOrbitControls('modelli/utensili/gym_machine__body_solid.glb', 'gym_machine__body_solid.glb', true) }
];

const questions_ing = [
    { title: "QUESTION 1", text: "Which of these artifacts is the oldest?",mode:0},
    { title: "QUESTION 2", text: "Take one representative photo for this scene.", mode: 2, mesh: () => loadMeshWithOrbitControls('modelli/tastiera/Logitech_Keyboard.glb', 'Logitech_Keyboard.glb',  true,0,2,2) },
    { title: "QUESTION 3", text: "What does this machine train?", mode:1, mesh: () => loadMeshWithOrbitControls( 'modelli/utensili/gym_machine__body_solid.glb', 'gym_machine__body_solid.glb',true) },

];



//MESH DA SCEGLIERE
const questionOptions = [

        [//1
            { value: "1", label: "Manufatto 1", mesh: () => loadMeshWithOrbitControls('modelli/statue/granite_head_of_amenemhat_iii.glb', 'granite_head_of_amenemhat_iii.glb',true) },
            { value: "2", label: "Manufatto 2", mesh: () => loadMeshWithOrbitControls('modelli/statue/kneeling_statue_of_amenhotep_ii_replica.glb', 'kneeling_statue_of_amenhotep_ii_replica.glb',false) },
            { value: "3", label: "Manufatto 3", mesh: () => loadMeshWithTrackballControls('modelli/statue/lo-rez_nefertiti_wlo-rez_texture_3d4aw18.glb', 'lo-rez_nefertiti_wlo-rez_texture_3d4aw18.glb') },
        ],
         [//17
            //photo
        ],
        [//16
            { value: "1", label: "Schiena"},
            { value: "2", label: "Gambe"},
            { value: "3", label: "Braccia"}
        ]
    ];
    

const questionOptions_ing = [

        [//1
            { value: "1", label: "Artifact 1", mesh: () => loadMeshWithOrbitControls('modelli/statue/granite_head_of_amenemhat_iii.glb', 'granite_head_of_amenemhat_iii.glb',true) },
            { value: "2", label: "Artifact 2", mesh: () => loadMeshWithOrbitControls('modelli/statue/kneeling_statue_of_amenhotep_ii_replica.glb', 'kneeling_statue_of_amenhotep_ii_replica.glb',false) },
            { value: "3", label: "Artifact 3", mesh: () => loadMeshWithTrackballControls('modelli/statue/lo-rez_nefertiti_wlo-rez_texture_3d4aw18.glb', 'lo-rez_nefertiti_wlo-rez_texture_3d4aw18.glb') },
        ],
        [//17
            //photo
        ],
        [//16
            { value: "1", label: "Back"},
            { value: "2", label: "Legs"},
            { value: "3", label: "Arms"}
        ]
];

let selectedAnswers = Array(questionOptions_ing.length).fill(null);
let currentQuestionIndex = 0;

//caricamento domanda
function setActiveButton(index) {
    document.querySelectorAll('.circle').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.circle')[index].classList.add('active');
}
let interactionTracker = {}; 

const optionContainers = document.querySelectorAll('.option-container');

function loadQuestion(index) {
    const language = sessionStorage.getItem("language") || "en";
    const optionsArray = (language === "en") ? questionOptions_ing : questionOptions;
    const questionArray = (language === "en") ? questions_ing : questions;

    const question = questionArray[index];
    questionDiv.innerHTML = `<h1 id="titolo-text">${question.title}</h1><p class="question-text" id="domanda">${question.text}</p>`;
    optionsDiv.innerHTML = "";

    // Se mode è true, carica solo la mesh della domanda
    if (question.mode === 1 || question.mode === 2) {
        if (typeof question.mesh === 'function') {
            question.mesh();
        }
        
        if (question.mode === 2) {
            nextBtn.style.display = "none";
            Deactivate = true //disattiva il monitoring della camera
            // Crea il bottone "Scatta foto" 
            const container = document.createElement('div');
            container.classList.add("option-container");
            container.classList.add("photo-option-container");
        
            const textLabel = document.createElement('span');
            textLabel.classList.add("option-text");
            textLabel.textContent = language === "en" ? "Take Photo" : "Scatta Foto";
        
            
            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add("button-container");
        
            container.addEventListener('click', () => {
                if (isBlurred) {
                    const alertMessage = language === "en"
                        ? "Please interact with the object before taking the photo."
                        : "Per favore interagisci con l'oggetto prima di scattare la foto.";
                    alert(alertMessage);
                    return;
                }
                nextBtn.style.display = "inline-block";
                Deactivate = false;
                selectedAnswers[currentQuestionIndex] = 1; 
                Savedata();
                nextQuestionPicture();
            });
        
            
            container.appendChild(textLabel);
            container.appendChild(buttonContainer);
            optionsDiv.appendChild(container);
        }
            
    }
    optionsArray[index].forEach((option, i) => {
        const container = document.createElement('div');
        container.classList.add("option-container");
        container.dataset.value = option.value;

        const textLabel = document.createElement('span');
        textLabel.classList.add("option-text");
        textLabel.textContent = option.label;

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add("button-container");

        const radio = document.createElement('input');
        radio.type = "radio";
        radio.name = "answer";
        radio.classList.add("radio-option");
        radio.value = option.value;
        if (selectedAnswers[index] == option.value) {
            radio.checked = true;
            container.classList.add("selected");
        }
        radio.addEventListener('change', (event) => {
            selectedAnswers[currentQuestionIndex] = event.target.value;
            document.querySelectorAll(".option-container").forEach(el => el.classList.remove("selected"));
            container.classList.add("selected");
        });

        const radioLabel = document.createElement('label');
        radioLabel.classList.add("radio-label");
        radioLabel.appendChild(radio);

        buttonContainer.appendChild(radioLabel);
        container.appendChild(textLabel);
        container.appendChild(buttonContainer);
        optionsDiv.appendChild(container);

        container.addEventListener("click", () => {
            radio.checked = true;
            selectedAnswers[currentQuestionIndex] = radio.value;
            document.querySelectorAll(".option-container").forEach(el => el.classList.remove("selected"));
            container.classList.add("selected");
        
            // Tracciamento interazioni per modalità 0
            if (question.mode === 0 || question.mode === undefined) {
                if (!interactionTracker[currentQuestionIndex]) {
                    interactionTracker[currentQuestionIndex] = new Set();
                }
                interactionTracker[currentQuestionIndex].add(radio.value);
            }
        
            // Se mode è false o non presente, carica la mesh dell'opzione
            if (!question.mode && typeof option.mesh === 'function') {
                option.mesh();
            }
        });
        
        
    });

    
    nextBtn.style.display = index === questions.length - 1 ? "none" : "inline-block";
    terminaBtn.style.display = index === questions.length - 1 ? "inline-block" : "none";    
}

function nextQuestionPicture() {
    if (currentQuestionIndex < questions.length - 1) {
        hideCurrentMesh()
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
        
    }
}

function nextQuestion() {
    const language = sessionStorage.getItem("language") || "en";
    const questionArray = (language === "en") ? questions_ing : questions;
    const optionsArray = (language === "en") ? questionOptions_ing : questionOptions;

    const question = questionArray[currentQuestionIndex];
    const mode = question.mode;

    if (mode === 2) {
        return; 
    }

    if (mode === 0 || mode === undefined) {
        const currentOptions = optionsArray[currentQuestionIndex];
        const totalOptions = currentOptions.length;
    
        if (!interactionTracker[currentQuestionIndex]) {
            interactionTracker[currentQuestionIndex] = new Set();
        }
    
        
        document.querySelectorAll('input[name="answer"]:checked').forEach(input => {
            interactionTracker[currentQuestionIndex].add(input.value);
        });
    
        const interactionCount = interactionTracker[currentQuestionIndex].size;
    
        if (interactionCount < totalOptions) {
            alert(`Per favore, interagisci con tutte le ${totalOptions} opzion${totalOptions === 1 ? 'e' : 'i'} prima di continuare.`);
            return;
        }
    }

    if (mode === 1) {
        const anySelected = document.querySelector('input[name="answer"]:checked');
        if (!anySelected) {
            alert("Per favore, seleziona almeno una risposta prima di continuare.");
            return;
        }
    }

    
    interactionTracker[currentQuestionIndex] = null;

    if (currentQuestionIndex < questionArray.length - 1) {
        hideCurrentMesh();
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    }
}



// Carica la prima domanda all'avvio
loadQuestion(0);

function finishQuestionnaire() {
    // Controlla se ogni domanda ha una risposta
    let allAnswered = selectedAnswers.every(answer => answer !== null);
    const language = sessionStorage.getItem("language") || "en";
    if(language =="en"){
        if (allAnswered) {
            alert('✅ COMPLETE!');
            window.location.href = "grazie.html";
            
        } else {
            alert('⚠️ You have to answer every question.');
        }
    } else {
        if (allAnswered) {
            alert('✅ Questionario completato con successo!');
            window.location.href = "grazie.html";
            
        } else {
            alert('⚠️ Devi rispondere a tutte le domande prima di terminare.');
        }
    }
}

