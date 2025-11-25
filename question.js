let questionDiv = document.getElementById ('question');
let optionsDiv = document.getElementById('options');
let prevBtn = document.getElementById('prevBtn');
let nextBtn = document.getElementById('nextBtn');
let terminaBtn = document.getElementById('terminaBtn');

const questions = [
    { title: "DOMANDA 1", text: "Quale di questi manufatti è il più antico?" },
    { title: "DOMANDA 2", text: "Quale struttura non appartiene all'epoca greca?" },
    { title: "DOMANDA 3", text: "Quale scarpa sembra più comoda?" },
    { title: "DOMANDA 4", text: "Quale scarpa è meno scivolosa?" },
    { title: "DOMANDA 5", text: "Quale pianta sceglieresti per il tuo balcone?" },
    { title: "DOMANDA 6", text: "Che clima preferisce questa pianta?", mode: 1, mesh: () => loadMeshWithOrbitControls('modelli/piante/aloe_vera_plant.glb', 'aloe_vera_plant.glb', true) },
    { title: "DOMANDA 7", text: "Quale insegna è più adatta per un ristorante asiatico?" },
    { title: "DOMANDA 8", text: "Quale di questi oggetti non è reale?" },
    { title: "DOMANDA 9", text: "A cosa serve questo oggetto?", mode: 1, mesh: () => loadMeshWithOrbitControls('modelli/elettronica/forgiato_blank-ra.glb', 'forgiato_blank-ra.gbl', true) },
    { title: "DOMANDA 10", text: "Quale tazza è più adatta come regalo?" },
    { title: "DOMANDA 11", text: "Quale di questi trofei è adatto per una cerimonia di premiazione cinematografica?" },
    { title: "DOMANDA 12", text: "Quale di questi vasi non è cinese?" },
    { title: "DOMANDA 13", text: "Quale auto è più veloce?" },
    { title: "DOMANDA 14", text: "Questo edificio è reale o modellato al computer?", mode: 1, mesh: () => loadMeshWithOrbitControls('modelli/edifici/koscio_nspj_w_bytomiuheritage_nspj_church.glb', 'koscio_nspj_w_bytomiuheritage_nspj_church.glb', true, 0, 1000, 10) },
    { title: "DOMANDA 15", text: "Da dove proviene questa statua?", mode: 1, mesh: () => loadMeshWithOrbitControls('modelli/statue/kui_xing_god_of_literature_16th_c_ce.glb', 'kui_xing_god_of_literature_16th_c_ce.glb', false, 4) },
    { title: "DOMANDA 16", text: "Quale parte del corpo allena questa macchina?", mode: 1, mesh: () => loadMeshWithOrbitControls('modelli/utensili/gym_machine__body_solid.glb', 'gym_machine__body_solid.glb', true) },
    { title: "DOMANDA 17", text: "Scatta una foto rappresentativa per questa scena", mode: 2, mesh: () => loadMeshWithOrbitControls('modelli/tastiera/Logitech_Keyboard.glb', 'Logitech_Keyboard.glb', true,0,2,2) },
    { title: "DOMANDA 18", text: "Quale auto è più economica?" }
];

const questions_ing = [
    { title: "QUESTION 1", text: "Which of these artifacts is the oldest?",mode:0},
    { title: "QUESTION 2", text: "Which structure is not from the Greek era?", mode:0 },
    { title: "QUESTION 3", text: "Which shoe looks more comfortable?", mode:0 },
    { title: "QUESTION 4", text: "Which shoe is less slippery?", mode:0 },
    { title: "QUESTION 5", text: "Which plant would you choose for your balcony?", mode:0 },
    { title: "QUESTION 6", text: "What climate does this plant prefer?", mode:1, mesh: () => loadMeshWithOrbitControls('modelli/piante/aloe_vera_plant.glb', 'aloe_vera_plant.glb',true) },
    { title: "QUESTION 7", text: "Which sign is better for an Asian restaurant?", mode:0},
    { title: "QUESTION 8", text: "Which of these objects is not from reality?", mode:0 },
    { title: "QUESTION 9", text: "What is this object used for?", mode:1, mesh: () => loadMeshWithOrbitControls('modelli/elettronica/forgiato_blank-ra.glb', 'forgiato_blank-ra.gbl',true) },
    { title: "QUESTION 10", text: "Which mug is more suitable as a gift?" , mode:0},
    { title: "QUESTION 11", text: "Which of these trophies is suitable for a film award ceremony?" , mode:0},
    { title: "QUESTION 12", text: "Which of these vases is not Chinese?", mode:0 },
    { title: "QUESTION 13", text: "Which car is faster?", mode:0},
    { title: "QUESTION 14", text: "Is this building real or computer-modeled?", mode:1, mesh: () => loadMeshWithOrbitControls( 'modelli/edifici/koscio_nspj_w_bytomiuheritage_nspj_church.glb', 'koscio_nspj_w_bytomiuheritage_nspj_church.glb',true,0,1000,10) },
    { title: "QUESTION 15", text: "Where does this statue come from?" , mode:1, mesh: () => loadMeshWithOrbitControls( 'modelli/statue/kui_xing_god_of_literature_16th_c_ce.glb', 'kui_xing_god_of_literature_16th_c_ce.glb',false,4) },
    { title: "QUESTION 16", text: "What does this machine train?", mode:1, mesh: () => loadMeshWithOrbitControls( 'modelli/utensili/gym_machine__body_solid.glb', 'gym_machine__body_solid.glb',true) },
    { title: "QUESTION 17", text: "Take one representative photo for this scene.", mode: 2, mesh: () => loadMeshWithOrbitControls('modelli/tastiera/Logitech_Keyboard.glb', 'Logitech_Keyboard.glb',  true,0,2,2) },
    { title: "QUESTION 18", text: "Which car is cheaper?", mode:0 }
];



//MESH DA SCEGLIERE
const questionOptions = [

        [//1
            { value: "1", label: "Manufatto 1", mesh: () => loadMeshWithOrbitControls('modelli/statue/granite_head_of_amenemhat_iii.glb', 'granite_head_of_amenemhat_iii.glb',true) },
            { value: "2", label: "Manufatto 2", mesh: () => loadMeshWithOrbitControls('modelli/statue/kneeling_statue_of_amenhotep_ii_replica.glb', 'kneeling_statue_of_amenhotep_ii_replica.glb',false) },
            { value: "3", label: "Manufatto 3", mesh: () => loadMeshWithOrbitControls('modelli/statue/lo-rez_nefertiti_wlo-rez_texture_3d4aw18.glb', 'lo-rez_nefertiti_wlo-rez_texture_3d4aw18.glb') },
        ],
        [//2
            { value: "1", label: "Struttura 1", mesh: () => loadMeshWithOrbitControls('modelli/statue/cupola.glb', 'cupola.glb',false) },
            { value: "2", label: "Struttura 2", mesh: () => loadMeshWithOrbitControls('modelli/statue/griechischer_tempel.glb', 'griechischer_tempel.glb',false) },
            { value: "3", label: "Struttura 3", mesh: () => loadMeshWithOrbitControls('modelli/statue/temple_ruin_aquarium_decoration_-_photoscan.glb', 'temple_ruin_aquarium_decoration_-_photoscan.glb') },
        ],
        [//3
            { value: "1", label: "Scarpa 1", mesh: () => loadMeshWithTrackballControls('modelli/scarpe/nike_air_zoom_pegasus_36.glb', 'nike_air_zoom_pegasus_36.glb',false) },
            { value: "2", label: "Scarpa 2", mesh: () => loadMeshWithTrackballControls('modelli/scarpe/unused_blue_vans_shoe.glb', 'unused_blue_vans_shoe.glb',false) },
            { value: "3", label: "Scarpa 3", mesh: () => loadMeshWithTrackballControls('modelli/scarpe/photocatch_shoe.glb', 'photocatch_shoe.glb') }
        ],
        [//4
            { value: "1", label: "Scarpa 1", mesh: () => loadMeshWithTrackballControls('modelli/scarpe/scanned_adidas_sports_shoe.glb', 'scanned_adidas_sports_shoe.glb') },
            { value: "2", label: "Scarpa 2", mesh: () => loadMeshWithTrackballControls('modelli/scarpe/winter_shoe.glb', 'winter_shoe.glb') },
            { value: "3", label: "Scarpa 3", mesh: () => loadMeshWithTrackballControls('modelli/scarpe/Seen_low_2K.glb', 'Seen_low_2K.glb',true) }
        ],
        [//5
            { value: "1", label: "Pianta 1", mesh: () => loadMeshWithOrbitControls('modelli/piante/plant_pot.glb', 'plant_pot.glb',false,3) },
            { value: "2", label: "Pianta 2", mesh: () => loadMeshWithOrbitControls('modelli/piante/rhyzome_plant.glb', 'rhyzome_plant.glb') },
            { value: "3", label: "Pianta 3", mesh: () => loadMeshWithOrbitControls('modelli/piante/succulent_arrangement.glb', 'succulent_arrangement.glb') }
        ],
        [//6
            { value: "1", label: "Caldo-secco" },
            { value: "2", label: "Caldo-umido" },
            { value: "3", label: "Temperato" }
        ],    
        [//7
            { value: "1", label: "Cartello 1", mesh: () => loadMeshWithTrackballControls('modelli/cartelli/we_are_watching_cyberpunk_dystopian_sign.glb', 'we_are_watching_cyberpunk_dystopian_sign.glb') },
            { value: "2", label: "Cartello 2", mesh: () => loadMeshWithTrackballControls('modelli/cartelli/chinese_neon_dragon_sign.glb', 'chinese_neon_dragon_sign.glb') },
            { value: "3", label: "Cartello 3", mesh: () => loadMeshWithTrackballControls('modelli/cartelli/japanese_neon_street_sign.glb', 'japanese_neon_street_sign.glb') }
        ],
        [//8
            { value: "1", label: "Oggetto 1", mesh: () => loadMeshWithOrbitControls('modelli/elettronica/roland_tr-909.glb', 'roland_tr-909.glb',false) },
            { value: "2", label: "Oggetto 2", mesh: () => loadMeshWithOrbitControls('modelli/elettronica/sci-fi_synth_machine.glb', 'sci-fi_synth_machine.glb') },
            { value: "3", label: "Oggetto 3", mesh: () => loadMeshWithOrbitControls('modelli/elettronica/tr-808.glb', 'tr-808.glb') }
        ],
        [//9
            { value: "1", label: "Ruote auto" },
            { value: "2", label: "Altoparlante" },
            { value: "3", label: "Luce" }
        ],
        [//10
            { value: "1", label: "Tazza 1", mesh: () => loadMeshWithOrbitControls('modelli/tazze/gromit_mug.glb', 'gromit_mug.glb') },
            { value: "2", label: "Tazza 2", mesh: () => loadMeshWithOrbitControls('modelli/tazze/scp-999_mug.glb', 'scp-999_mug.glb') },
            { value: "3", label: "Tazza 3", mesh: () => loadMeshWithOrbitControls('modelli/tazze/mug.glb', 'mug.glb') }
        ],
        [//11
            { value: "1", label: "Trofeo 1", mesh: () => loadMeshWithOrbitControls('modelli/trofei/commissioners_trophy.glb', 'commissioners_trophy.glb',true,0,2,10) },
            { value: "2", label: "Trofeo 2", mesh: () => loadMeshWithOrbitControls('modelli/trofei/trophy_3d_model.glb', 'trophy_3d_model.glb',true,0,1.3) },
            { value: "3", label: "Trofeo 3", mesh: () => loadMeshWithOrbitControls('modelli/trofei/day31_trophy.glb', 'day31_trophy.glb',true,0,2,5) }
        ],
        [//12
            { value: "1", label: "Vaso 1", mesh: () => loadMeshWithOrbitControls('modelli/vasi/hu_wine_vessel_5th_c_bce.glb', 'hu_wine_vessel_5th_c_bce.glb') },
            { value: "2", label: "Vaso 2", mesh: () => loadMeshWithOrbitControls('modelli/vasi/hu_wine_vessel_base_late_9th-8th_century_bce.glb', 'hu_wine_vessel_base_late_9th-8th_century_bce.glb',false,3)},
            { value: "3", label: "Vaso 3", mesh: () => loadMeshWithOrbitControls('modelli/vasi/vietnamese_bottle_vase_yu-hu_chun_15th_c_ce.glb', 'vietnamese_bottle_vase_yu-hu_chun_15th_c_ce.glb') }
        ],
        [//13
            { value: "1", label: "Auto 1", mesh: () => loadMeshWithOrbitControls('modelli/veicoli/2021_lamborghini_sian_roadster.glb', '2021_lamborghini_sian_roadster.glb',true,0,1.4,2) },
            { value: "2", label: "Auto 2", mesh: () => loadMeshWithOrbitControls('modelli/veicoli/mclaren_p1__www.vecarz.com.glb', 'mclaren_p1__www.vecarz.com.glb',true,0,2,5) },
            { value: "3", label: "Auto 3", mesh: () => loadMeshWithOrbitControls('modelli/veicoli/rossa.glb', 'rossa.glb',true,0,1.4,3) }
        ],
        [//14
            { value: "1", label: "Reale" },
            { value: "2", label: "Falso"}
        ],
        [//15
            { value: "1", label: "India"},
            { value: "2", label: "Malesia"},
            { value: "3", label: "Cina"}
        ],
        [//16
            { value: "1", label: "Schiena"},
            { value: "2", label: "Gambe"},
            { value: "3", label: "Braccia"}
        ],
        [//17
            //photo
        ],
        [//18
            { value: "1", label: "Auto 1", mesh: () => loadMeshWithOrbitControls('modelli/veicoli/car__4__3d_model.glb', 'car__4__3d_model.glb',true,0,1,4) },
            { value: "2", label: "Auto 2", mesh: () => loadMeshWithOrbitControls('modelli/veicoli/cyberpunk_car.glb', 'cyberpunk_car.glb',true,0,2,3) },
            { value: "3", label: "Auto 3", mesh: () => loadMeshWithOrbitControls('modelli/veicoli/free_porsche_911_carrera_4s.glb', 'free_porsche_911_carrera_4s.glb',true,0,1.4,3) }
        ]
    ];
    

const questionOptions_ing = [

        [//1
            { value: "1", label: "Artifact 1", mesh: () => loadMeshWithOrbitControls('modelli/statue/granite_head_of_amenemhat_iii.glb', 'granite_head_of_amenemhat_iii.glb',true) },
            { value: "2", label: "Artifact 2", mesh: () => loadMeshWithOrbitControls('modelli/statue/kneeling_statue_of_amenhotep_ii_replica.glb', 'kneeling_statue_of_amenhotep_ii_replica.glb',false) },
            { value: "3", label: "Artifact 3", mesh: () => loadMeshWithOrbitControls('modelli/statue/lo-rez_nefertiti_wlo-rez_texture_3d4aw18.glb', 'lo-rez_nefertiti_wlo-rez_texture_3d4aw18.glb') },
        ],
        [//2
            { value: "1", label: "Structure 1", mesh: () => loadMeshWithOrbitControls('modelli/statue/cupola.glb', 'cupola.glb',false) },
            { value: "2", label: "Structure 2", mesh: () => loadMeshWithOrbitControls('modelli/statue/griechischer_tempel.glb', 'griechischer_tempel.glb',false) },
            { value: "3", label: "Structure 3", mesh: () => loadMeshWithOrbitControls('modelli/statue/temple_ruin_aquarium_decoration_-_photoscan.glb', 'temple_ruin_aquarium_decoration_-_photoscan.glb',) },
        ],
        [//3
            { value: "1", label: "Shoe 1", mesh: () => loadMeshWithTrackballControls('modelli/scarpe/nike_air_zoom_pegasus_36.glb', 'nike_air_zoom_pegasus_36.glb',false) },
            { value: "2", label: "Shoe 2", mesh: () => loadMeshWithTrackballControls('modelli/scarpe/unused_blue_vans_shoe.glb', 'unused_blue_vans_shoe.glb',false) },
            { value: "3", label: "Shoe 3", mesh: () => loadMeshWithTrackballControls('modelli/scarpe/photocatch_shoe.glb', 'photocatch_shoe.glb') }
        ],
        [//4
            { value: "1", label: "Shoe 1", mesh: () => loadMeshWithTrackballControls('modelli/scarpe/scanned_adidas_sports_shoe.glb', 'scanned_adidas_sports_shoe.glb') },
            { value: "2", label: "Shoe 2", mesh: () => loadMeshWithTrackballControls('modelli/scarpe/winter_shoe.glb', 'winter_shoe.glb') },
            { value: "3", label: "Shoe 3", mesh: () => loadMeshWithTrackballControls('modelli/scarpe/Seen_low_2K.glb', 'Seen_low_2K.glb',true) }
        ],
        [//5
            { value: "1", label: "Plant 1", mesh: () => loadMeshWithOrbitControls('modelli/piante/plant_pot.glb', 'plant_pot.glb',false,3) },
            { value: "2", label: "Plant 2", mesh: () => loadMeshWithOrbitControls('modelli/piante/rhyzome_plant.glb', 'rhyzome_plant.glb') },
            { value: "3", label: "Plant 3", mesh: () => loadMeshWithOrbitControls('modelli/piante/succulent_arrangement.glb', 'succulent_arrangement.glb') }
        ],
        [//6
            { value: "1", label: "Hot-dry" },
            { value: "2", label: "Hot-humid" },
            { value: "3", label: "Temperate" }
        ],    
        [//7
            { value: "1", label: "Sign 1", mesh: () => loadMeshWithTrackballControls('modelli/cartelli/we_are_watching_cyberpunk_dystopian_sign.glb', 'we_are_watching_cyberpunk_dystopian_sign.glb') },
            { value: "2", label: "Sign 2", mesh: () => loadMeshWithTrackballControls('modelli/cartelli/chinese_neon_dragon_sign.glb', 'chinese_neon_dragon_sign.glb') },
            { value: "3", label: "Sign 3", mesh: () => loadMeshWithTrackballControls('modelli/cartelli/japanese_neon_street_sign.glb', 'japanese_neon_street_sign.glb') }
        ],
        [//8
            { value: "1", label: "Object 1", mesh: () => loadMeshWithOrbitControls('modelli/elettronica/roland_tr-909.glb', 'roland_tr-909.glb',false) },
            { value: "2", label: "Object 2", mesh: () => loadMeshWithOrbitControls('modelli/elettronica/sci-fi_synth_machine.glb', 'sci-fi_synth_machine.glb') },
            { value: "3", label: "Object 3", mesh: () => loadMeshWithOrbitControls('modelli/elettronica/tr-808.glb', 'tr-808.glb') }
        ],
        [//9
            { value: "1", label: "car wheels" },
            { value: "2", label: "speaker" },
            { value: "3", label: "light" }
        ],
        [//10
            { value: "1", label: "Mug 1", mesh: () => loadMeshWithOrbitControls('modelli/tazze/gromit_mug.glb', 'gromit_mug.glb') },
            { value: "2", label: "Mug 2", mesh: () => loadMeshWithOrbitControls('modelli/tazze/scp-999_mug.glb', 'scp-999_mug.glb') },
            { value: "3", label: "Mug 3", mesh: () => loadMeshWithOrbitControls('modelli/tazze/mug.glb', 'mug.glb') }
        ],
        [//11
            { value: "1", label: "Trophy 1", mesh: () => loadMeshWithOrbitControls('modelli/trofei/commissioners_trophy.glb', 'commissioners_trophy.glb',true,0,2,10) },
            { value: "2", label: "Trophy 2", mesh: () => loadMeshWithOrbitControls('modelli/trofei/trophy_3d_model.glb', 'trophy_3d_model.glb',true,0,1.3) },
            { value: "3", label: "Trophy 3", mesh: () => loadMeshWithOrbitControls('modelli/trofei/day31_trophy.glb', 'day31_trophy.glb',true,0,2,5) }
        ],
        [//12
            { value: "1", label: "Vase 1", mesh: () => loadMeshWithOrbitControls('modelli/vasi/hu_wine_vessel_5th_c_bce.glb', 'hu_wine_vessel_5th_c_bce.glb') },
            { value: "2", label: "Vase 2", mesh: () => loadMeshWithOrbitControls('modelli/vasi/hu_wine_vessel_base_late_9th-8th_century_bce.glb', 'hu_wine_vessel_base_late_9th-8th_century_bce.glb',false,3)},
            { value: "3", label: "Vase 3", mesh: () => loadMeshWithOrbitControls('modelli/vasi/vietnamese_bottle_vase_yu-hu_chun_15th_c_ce.glb', 'vietnamese_bottle_vase_yu-hu_chun_15th_c_ce.glb') }
        ],
        [//13
            { value: "1", label: "Car 1", mesh: () => loadMeshWithOrbitControls('modelli/veicoli/2021_lamborghini_sian_roadster.glb', '2021_lamborghini_sian_roadster.glb',true,0,1.4,2) },
            { value: "2", label: "Car 2", mesh: () => loadMeshWithOrbitControls('modelli/veicoli/mclaren_p1__www.vecarz.com.glb', 'mclaren_p1__www.vecarz.com.glb',true,0,2,5) },
            { value: "3", label: "Car 3", mesh: () => loadMeshWithOrbitControls('modelli/veicoli/rossa.glb', 'rossa.glb',true,0,1.4,3) }
        ],
        [//14
            { value: "1", label: "Real" },
            { value: "2", label: "Fake"}
           
        ],
        [//15
            { value: "1", label: "India"},
            { value: "2", label: "Malaysia"},
            { value: "3", label: "China"}
        ],
        [//16
            { value: "1", label: "Back"},
            { value: "2", label: "Legs"},
            { value: "3", label: "Arms"}
        ],
         [//17
            //photo
        ],
        [//18
            { value: "1", label: "Car 1", mesh: () => loadMeshWithOrbitControls('modelli/veicoli/car__4__3d_model.glb', 'car__4__3d_model.glb',true,0,1,4) },
            { value: "2", label: "Car 2", mesh: () => loadMeshWithOrbitControls('modelli/veicoli/cyberpunk_car.glb', 'cyberpunk_car.glb',true,0,2,3) },
            { value: "3", label: "Car 3", mesh: () => loadMeshWithOrbitControls('modelli/veicoli/free_porsche_911_carrera_4s.glb', 'free_porsche_911_carrera_4s.glb',true,0,1.4,3) }
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
            Deactivate = true 
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
        return; // Non si può procedere
    }

    if (mode === 0 || mode === undefined) {
        const currentOptions = optionsArray[currentQuestionIndex];
        const totalOptions = currentOptions.length;
    
        if (!interactionTracker[currentQuestionIndex]) {
            interactionTracker[currentQuestionIndex] = new Set();
        }
    
        // Conta le opzioni uniche con cui l'utente ha interagito
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

    // Se tutto va bene, resettiamo il tracker della domanda corrente
    interactionTracker[currentQuestionIndex] = null;

    if (currentQuestionIndex < questionArray.length - 1) {
        hideCurrentMesh();
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    }
}




loadQuestion(0);

function finishQuestionnaire() {

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

loadQuestion(0);








//-----------------------------------------------

const Questions = [
    { title: "QUESTION 1", text: "What does this machine train?", mode:1, mesh: () => loadMeshWithOrbitControls( 'modelli/utensili/gym_machine__body_solid.glb', 'gym_machine__body_solid.glb',true) },
    { title: "QUESTION 2", text: "Take one representative photo for this scene.", mode: 2, mesh: () => loadMeshWithOrbitControls('modelli/tastiera/Logitech_Keyboard.glb', 'Logitech_Keyboard.glb',  true,0,2,2) },
    { title: "QUESTION 3", text: "Which car is cheaper?", mode:0 }
];

const Questions_answer = [
        [//1
            { value: "1", label: "Back"},
            { value: "2", label: "Legs"},
            { value: "3", label: "Arms"}
        ],
         [//2
            //photo
        ],
        [//3
            { value: "1", label: "Car 1", mesh: () => loadMeshWithOrbitControls('URL_modello','nome_modello',true,0,1,2) },
            { value: "1", label: "Car 1", mesh: () => loadMeshWithTrackballControls('URL_modello','nome_modello',false,2,0,0) },

            { value: "2", label: "Car 2", mesh: () => loadMeshWithTrackballControls('URL_modello', 'nome_modello',"luce-posiz","int-ambientale","rinforzo","int-posiz") },
            { value: "3", label: "Car 3", mesh: () => loadMeshWithOrbitControls('modelli/veicoli/free_porsche_911_carrera_4s.glb', 'free_porsche_911_carrera_4s.glb',true,0,1.4,3) }
        ]
];
