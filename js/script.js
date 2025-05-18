/////////////////////////////////////
// Controle de abas
/////////////////////////////////////

function setupTabs() {
    function switchTab(activeTab) {
    // Lista de todos os editores
    const editors = [
        'header', 'menu', 'gallery', 
        'form', 'footer', 'export'
    ];
    
    // Esconde todos os editores
    editors.forEach(editor => {
        const editorElement = document.getElementById(`editor-${editor}`);
        const tabElement = document.getElementById(`tab-${editor}`);
        
        if (editorElement && tabElement) {
        editorElement.style.display = 'none';
        tabElement.className = 'bg-gray-700 hover:bg-gray-600 w-1/6';
        }
    });
    
    // Mostra o editor ativo
    const activeEditor = document.getElementById(`editor-${activeTab}`);
    const activeTabElement = document.getElementById(`tab-${activeTab}`);
    
    if (activeEditor && activeTabElement) {
        activeEditor.style.display = 'block';
        activeTabElement.className = 'bg-green-700 hover:bg-green-600 w-1/6';
    }
    }

    // Configura os event listeners para cada aba
    function setupTabListeners() {
    const tabs = [
        'header', 'menu', 'gallery', 
        'form', 'footer', 'export'
    ];
    
    tabs.forEach(tab => {
        const tabElement = document.getElementById(`tab-${tab}`);
        if (tabElement) {
        tabElement.addEventListener('click', () => switchTab(tab));
        }
    });
    }

    // Mostra a primeira aba ao carregar
    document.addEventListener('DOMContentLoaded', () => {
    setupTabListeners();
    switchTab('header');
    });
}

// Inicializa as abas
setupTabs();    

////////////////////////////////////////
//abas
////////////////////////////////////////

// --- Cabeçalho ---
const headerBgColorInput = document.getElementById("header-bg-color");
const headerTextColorInput = document.getElementById("header-text-color");
const headerItemBgColorInput = document.getElementById("header-item-bg-color");
const headerBorderRadiusInput = document.getElementById("header-item-border-radius");
const headerSpacingInput = document.getElementById("header-item-spacing");
const headerHeightInput = document.getElementById("header-height");
const headerAlignSelect = document.getElementById("header-align-items");
const headerTextInput = document.getElementById("header-text");
const toggleHeaderLogoBtn = document.getElementById("toggle-header-logo-btn");
const headerLogoFileInput = document.getElementById("header-logo-file");
const generatedHeader = document.getElementById("generated-header");

let headerLogoEnabled = false;
let headerLogoSrc = null;

function renderHeader() {
    const headerHeight = `${headerHeightInput.value}px`;
    
    // Estilos do container principal
    generatedHeader.style.backgroundColor = headerBgColorInput.value;
    generatedHeader.style.height = headerHeight;
    generatedHeader.style.minHeight = headerHeight; // Garante altura mínima
    generatedHeader.style.display = 'flex';
    generatedHeader.style.alignItems = 'center'; // Centraliza verticalmente
    generatedHeader.style.justifyContent =
    headerAlignSelect.value === "left" ? "flex-start" :
    headerAlignSelect.value === "center" ? "center" : "flex-end";
    generatedHeader.style.padding = '0 20px'; // Padding lateral
    generatedHeader.style.flexWrap = 'wrap'; // Para quebra em telas pequenas

    generatedHeader.innerHTML = "";

    // Imagem do logo (ajustada proporcionalmente)
    if (headerLogoEnabled) {
    const imgContainer = document.createElement("div");
    imgContainer.style.display = 'flex';
    imgContainer.style.alignItems = 'center';
    imgContainer.style.height = `calc(${headerHeight} * 0.8)`; // 80% da altura
    
    const img = document.createElement("img");
    img.src = headerLogoSrc || "";
    img.alt = "Logo Cabeçalho";
    img.style.maxHeight = '100%';
    img.style.width = 'auto';
    img.style.marginRight = headerSpacingInput.value + "px";
    
    imgContainer.appendChild(img);
    generatedHeader.appendChild(imgContainer);
    }

    // Texto do cabeçalho (ajustado proporcionalmente)
    if (headerTextInput.value.trim() !== "") {
    const textContainer = document.createElement("div");
    textContainer.style.display = 'flex';
    textContainer.style.alignItems = 'center';
    textContainer.style.height = `calc(${headerHeight} * 0.8)`; // 80% da altura
    
    const span = document.createElement("span");
    span.textContent = headerTextInput.value;
    span.style.backgroundColor = headerItemBgColorInput.value;
    span.style.color = headerTextColorInput.value;
    span.style.borderRadius = `${headerBorderRadiusInput.value}px`;
    span.style.padding = "6px 12px";
    span.style.lineHeight = '1'; // Remove espaçamento extra
    span.style.display = 'inline-flex';
    span.style.alignItems = 'center';
    
    textContainer.appendChild(span);
    generatedHeader.appendChild(textContainer);
    }
}

headerTextInput.addEventListener("input", renderHeader);

toggleHeaderLogoBtn.addEventListener("click", () => {
    headerLogoEnabled = !headerLogoEnabled;
    toggleHeaderLogoBtn.textContent = headerLogoEnabled
    ? "Desativar Imagem de Cabeçalho"
    : "Ativar Imagem de Cabeçalho";
    renderHeader();
});

headerLogoFileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
        headerLogoSrc = event.target.result;
        renderHeader();
    };
    reader.readAsDataURL(file);
    }
});

headerBgColorInput.addEventListener("input", renderHeader);
headerTextColorInput.addEventListener("input", renderHeader);
headerItemBgColorInput.addEventListener("input", renderHeader);
headerBorderRadiusInput.addEventListener("input", renderHeader);
headerSpacingInput.addEventListener("input", renderHeader);
headerHeightInput.addEventListener("input", renderHeader);
headerAlignSelect.addEventListener("change", renderHeader);

// --- Menu ---
const menuBgColorInput = document.getElementById("menu-bg-color");
const menuTextColorInput = document.getElementById("menu-text-color");
const menuItemBgColorInput = document.getElementById("menu-item-bg-color");
const menuBorderRadiusInput = document.getElementById("menu-item-border-radius");
const menuSpacingInput = document.getElementById("menu-item-spacing");
const menuHeightInput = document.getElementById("menu-height");
const menuAlignSelect = document.getElementById("align-items");
const addItemInput = document.getElementById("add-item");
const addItemBtn = document.getElementById("add-item-btn");
const clearItemsBtn = document.getElementById("clear-items-btn");
const toggleLogoBtn = document.getElementById("toggle-logo-btn");
const logoFileInput = document.getElementById("logo-file");
const generatedMenu = document.getElementById("generated-menu");
const menuList = document.getElementById("menu-list");

let menuItems = [];
let menuLogoEnabled = false;
let menuLogoSrc = null;

function renderMenu() {
// Define a altura do menu principal
const menuHeight = `${menuHeightInput.value}px`;
generatedMenu.style.backgroundColor = menuBgColorInput.value;
generatedMenu.style.height = menuHeight;
generatedMenu.style.minHeight = menuHeight; // Garante altura mínima
generatedMenu.style.alignItems = 'center'; // Centraliza verticalmente

// Ajusta o alinhamento dos itens
menuList.style.justifyContent =
menuAlignSelect.value === "left" ? "flex-start" :
menuAlignSelect.value === "center" ? "center" : "flex-end";

menuList.style.height = '100%'; // Ocupa toda a altura do menu
menuList.style.alignItems = 'center'; // Centraliza itens verticalmente

menuList.innerHTML = "";

// Logotipo (ajustado para altura proporcional)
if (menuLogoEnabled) {
const logoDiv = document.createElement("div");
logoDiv.className = "menu-logo";
logoDiv.style.height = `calc(${menuHeight} - 10px)`; // 10px de margem
logoDiv.style.display = 'flex';
logoDiv.style.alignItems = 'center';

if (menuLogoSrc) {
    const img = document.createElement("img");
    img.src = menuLogoSrc;
    img.alt = "Logotipo";
    img.style.maxHeight = `calc(${menuHeight} - 5px)`; // Altura proporcional
    img.style.width = 'auto';
    img.className = "logo-img";
    logoDiv.appendChild(img);
} else {
    logoDiv.textContent = "LOGO";
}
menuList.appendChild(logoDiv);
}

// Itens do menu (ajustados para altura completa)
menuItems.forEach((item) => {
const div = document.createElement("div");
div.className = "menu-item";
div.textContent = item;
div.style.backgroundColor = menuItemBgColorInput.value;
div.style.color = menuTextColorInput.value;
div.style.borderRadius = `${menuBorderRadiusInput.value}px`;
div.style.marginRight = `${menuSpacingInput.value}px`;
div.style.padding = '0 15px';
div.style.height = `calc(${menuHeight} - 10px)`; // Altura proporcional
div.style.display = 'flex';
div.style.alignItems = 'center';
menuList.appendChild(div);
});
}

addItemBtn.addEventListener("click", () => {
    const newItem = addItemInput.value.trim();
    if (newItem) {
    menuItems.push(newItem);
    addItemInput.value = "";
    renderMenu();
    }
});

clearItemsBtn.addEventListener("click", () => {
    menuItems = [];
    renderMenu();
});

toggleLogoBtn.addEventListener("click", () => {
    menuLogoEnabled = !menuLogoEnabled;
    toggleLogoBtn.textContent = menuLogoEnabled
    ? "Desativar Logotipo"
    : "Ativar Logotipo";
    renderMenu();
});

logoFileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
        menuLogoSrc = event.target.result;
        renderMenu();
    };
    reader.readAsDataURL(file);
    }
});

menuBgColorInput.addEventListener("input", renderMenu);
menuTextColorInput.addEventListener("input", renderMenu);
menuItemBgColorInput.addEventListener("input", renderMenu);
menuBorderRadiusInput.addEventListener("input", renderMenu);
menuSpacingInput.addEventListener("input", renderMenu);
menuHeightInput.addEventListener("input", renderMenu);
menuAlignSelect.addEventListener("change", renderMenu);

// --- Galeria ---
const galleryContainer = document.getElementById("gallery-container");

const addCardBtn = document.getElementById("add-card-btn");
const cardBgColorInput = document.getElementById("card-bg-color");
const cardBorderColorInput = document.getElementById("card-border-color");
const cardBorderRadiusInput = document.getElementById("card-border-radius");
const cardWidthInput = document.getElementById("card-width");
const cardHeightInput = document.getElementById("card-height");
const cardTextBgColorInput = document.getElementById("card-text-bg-color");
const cardTextColorInput = document.getElementById("card-text-color");
const cardTextFontSizeInput = document.getElementById("card-text-font-size");
const gallerySpacingInput = document.getElementById("gallery-spacing");
const galleryAlignSelect = document.getElementById("gallery-align");

// Array dos cards da galeria
let galleryCards = [];

// Função para criar card com estrutura, dados e eventos
function createGalleryCard(cardData, index) {
    const card = document.createElement("div");
    card.className = "gallery-card";
    card.style.backgroundColor = cardBgColorInput.value;
    card.style.borderColor = cardBorderColorInput.value;
    card.style.borderStyle = "solid";
    card.style.borderRadius = `${cardBorderRadiusInput.value}px`;
    card.style.width = `${cardWidthInput.value}px`;
    card.style.height = `${cardHeightInput.value}px`;
    card.style.display = "flex";
    card.style.flexDirection = "column";

    // IMG (com fallback vazio)
    const img = document.createElement("img");
    img.src = cardData.imageSrc || "";
    img.alt = "Imagem do Card";
    img.style.height = "140px";
    img.style.width = "100%";
    img.style.objectFit = "cover";

    // Input para trocar imagem
    img.addEventListener("click", () => {
    // Cria input file temporário
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.style.display = "none";
    fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
            galleryCards[index].imageSrc = ev.target.result;
            renderGallery();
        };
        reader.readAsDataURL(file);
        }
    });
    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
    });

    card.appendChild(img);

    // Container dos textos do card
    const textsContainer = document.createElement("div");
    textsContainer.className = "card-texts";
    textsContainer.style.backgroundColor = cardTextBgColorInput.value;
    textsContainer.style.color = cardTextColorInput.value;
    textsContainer.style.fontSize = `${cardTextFontSizeInput.value}px`;
    textsContainer.style.flexGrow = "1";
    textsContainer.style.display = "flex";
    textsContainer.style.flexDirection = "column";
    textsContainer.style.justifyContent = "center";

    // Texto 1 - título
    const text1Input = document.createElement("input");
    text1Input.type = "text";
    text1Input.placeholder = "Título";
    text1Input.value = cardData.text1 || "";
    text1Input.addEventListener("input", (e) => {
    galleryCards[index].text1 = e.target.value;
    });
    textsContainer.appendChild(text1Input);

    // Texto 2 - descrição
    const text2Input = document.createElement("input");
    text2Input.type = "text";
    text2Input.placeholder = "Descrição";
    text2Input.value = cardData.text2 || "";
    text2Input.addEventListener("input", (e) => {
    galleryCards[index].text2 = e.target.value;
    });
    textsContainer.appendChild(text2Input);

    card.appendChild(textsContainer);

    // Botão para excluir card
    const controlsDiv = document.createElement("div");
    controlsDiv.className = "card-controls";

    const delBtn = document.createElement("button");
    delBtn.textContent = "Excluir";
    delBtn.addEventListener("click", () => {
    galleryCards.splice(index, 1);
    renderGallery();
    });

    controlsDiv.appendChild(delBtn);
    card.appendChild(controlsDiv);

    return card;
}

function renderGallery() {
    galleryContainer.style.justifyContent = galleryAlignSelect.value;
    galleryContainer.style.gap = `${gallerySpacingInput.value}px`;
    galleryContainer.innerHTML = "";

    galleryCards.forEach((cardData, index) => {
    const card = createGalleryCard(cardData, index);
    galleryContainer.appendChild(card);
    });
}

addCardBtn.addEventListener("click", () => {
    galleryCards.push({
    imageSrc: "",
    text1: "",
    text2: "",
    });
    renderGallery();
});

// --- Formulário ---
const formContainer = document.getElementById("form-container");
const formTitleInput = document.getElementById("form-title-input");
const formBgColorInput = document.getElementById("form-bg-color");
const formBorderColorInput = document.getElementById("form-border-color");
const formBorderRadiusInput = document.getElementById("form-border-radius");
const formTitleColorInput = document.getElementById("form-title-color");
const formLabelColorInput = document.getElementById("form-label-color");
const formFieldBgColorInput = document.getElementById("form-field-bg-color");
const addFieldBtn = document.getElementById("add-form-field-btn");

let fields = [];
let editingIndex = null;

function renderForm() {
    formContainer.innerHTML = "";

    formContainer.style.backgroundColor = formBgColorInput.value;
    formContainer.style.borderColor = formBorderColorInput.value;
    formContainer.style.borderRadius = `${formBorderRadiusInput.value}px`;

    const title = document.createElement("div");
    title.className = "form-title";
    title.textContent = formTitleInput.value;
    title.style.color = formTitleColorInput.value;
    formContainer.appendChild(title);

    fields.forEach((field, index) => {
    const fieldDiv = document.createElement("div");
    fieldDiv.className = "form-field";
    fieldDiv.style.backgroundColor = formFieldBgColorInput.value;

    const label = document.createElement("label");
    label.className = "form-field-label";
    label.textContent = field.label;
    label.style.color = formLabelColorInput.value;
    if (field.required) {
        const requiredSpan = document.createElement("span");
        requiredSpan.textContent = " *";
        requiredSpan.style.color = "#c0392b";
        label.appendChild(requiredSpan);
    }
    fieldDiv.appendChild(label);

    let input;
    if (field.type === "textarea") {
        input = document.createElement("textarea");
        input.className = "form-field-input";
        input.rows = 4;
        input.style.backgroundColor = formFieldBgColorInput.value;
    } else if (field.type === "select") {
        input = document.createElement("select");
        input.className = "form-field-select";
        input.style.backgroundColor = formFieldBgColorInput.value;
        field.options.forEach(opt => {
        const option = document.createElement("option");
        option.textContent = opt;
        input.appendChild(option);
        });
    } else if (field.type === "radio") {
        input = document.createElement("div");
        field.options.forEach(opt => {
        const radioDiv = document.createElement("div");
        radioDiv.className = "form-field-radio";
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = `radio-${index}`;
        radio.style.backgroundColor = formFieldBgColorInput.value;
        const span = document.createElement("span");
        span.textContent = opt;
        span.style.color = formLabelColorInput.value;
        radioDiv.appendChild(radio);
        radioDiv.appendChild(span);
        input.appendChild(radioDiv);
        });
    } else {
        input = document.createElement("input");
        input.type = field.type;
        input.className = "form-field-input";
        input.style.backgroundColor = formFieldBgColorInput.value;
        input.placeholder = `Digite ${field.label.toLowerCase()}`;
    }

    input.required = field.required;
    input.disabled = false; // Garante que os campos não estejam desabilitados
    fieldDiv.appendChild(input);

    const controls = document.createElement("div");
    controls.className = "form-field-control";
    const delBtn = document.createElement("button");
    delBtn.className = "form-field-delete-btn";
    delBtn.textContent = "Remover";
    delBtn.addEventListener("click", () => {
        fields.splice(index, 1);
        renderForm();
    });

    const editBtn = document.createElement("button");
    editBtn.className = "form-field-delete-btn";
    editBtn.style.backgroundColor = "#2980b9";
    editBtn.textContent = "Editar";
    editBtn.addEventListener("click", () => {
        document.getElementById("field-properties-editor").style.display = "block";
        document.getElementById("field-label-input").value = field.label;
        document.getElementById("field-type-select").value = field.type;
        document.getElementById("field-required-check").checked = field.required;
        document.getElementById("field-options-input").value = field.options?.join(", ") || "";
        document.getElementById("options-container").style.display = ["select", "radio"].includes(field.type) ? "block" : "none";
        editingIndex = index;
    });

    controls.appendChild(editBtn);
    controls.appendChild(delBtn);
    fieldDiv.appendChild(controls);
    formContainer.appendChild(fieldDiv);
    });

    // Adicionar botão de envio
    const submitBtn = document.createElement("button");
    submitBtn.className = "form-submit-btn";
    submitBtn.textContent = "Enviar Formulário";
    formContainer.appendChild(submitBtn);
}

// Footer ou rodapé render

function renderFooter() {
const footer = document.getElementById('generated-footer');

// Configuração básica do rodapé
footer.style.backgroundColor = document.getElementById('footer-bg-color').value;
footer.style.color = document.getElementById('footer-text-color').value;
footer.style.fontSize = document.getElementById('footer-font-size').value + 'px';
footer.style.textAlign = document.getElementById('footer-align').value;
footer.style.padding = '20px';

// Garante que o conteúdo fique centralizado verticalmente
footer.style.display = 'flex';
footer.style.flexDirection = 'column';
footer.style.alignItems = 
document.getElementById('footer-align').value === 'left' ? 'flex-start' :
document.getElementById('footer-align').value === 'center' ? 'center' : 'flex-end';

// Processa a imagem do rodapé se existir
const footerImage = document.getElementById('footer-image-preview');
if (footerImage && footerImage.src) {
footerImage.style.maxHeight = '80px';
footerImage.style.marginBottom = '10px';
footerImage.style.display = 'block';
} else {
// Remove a imagem se não existir
const existingImg = footer.querySelector('img');
if (existingImg) {
    existingImg.remove();
}
}

// Atualiza o texto do rodapé
const footerText = document.getElementById('footer-text-content') || document.createElement('div');
footerText.textContent = document.getElementById('footer-text').value;
footerText.style.margin = '0';

// Garante a estrutura correta
footer.innerHTML = '';
if (footerImage && footerImage.src) {
footer.appendChild(footerImage.cloneNode(true));
}
footer.appendChild(footerText);
}

addFieldBtn.addEventListener("click", () => {
    fields.push({ label: "Novo Campo", type: "text", required: false, options: [] });
    renderForm();
});

document.getElementById("field-type-select").addEventListener("change", e => {
    document.getElementById("options-container").style.display =
    ["select", "radio"].includes(e.target.value) ? "block" : "none";
});

document.getElementById("update-field-btn").addEventListener("click", () => {
    if (editingIndex !== null) {
    fields[editingIndex] = {
        label: document.getElementById("field-label-input").value,
        type: document.getElementById("field-type-select").value,
        required: document.getElementById("field-required-check").checked,
        options: document.getElementById("field-options-input").value.split(",").map(s => s.trim()).filter(Boolean),
    };
    editingIndex = null;
    document.getElementById("field-properties-editor").style.display = "none";
    renderForm();
    }
});

document.getElementById("cancel-field-edit-btn").addEventListener("click", () => {
    editingIndex = null;
    document.getElementById("field-properties-editor").style.display = "none";
});

[
    formTitleInput, formBgColorInput, formBorderColorInput,
    formBorderRadiusInput, formTitleColorInput, formLabelColorInput,
    formFieldBgColorInput
].forEach(input => input.addEventListener("input", renderForm));

// Inicializar com alguns campos de exemplo
fields = [
    { label: "Nome", type: "text", required: true, options: [] },
    { label: "E-mail", type: "email", required: true, options: [] },
    { label: "Telefone", type: "tel", required: false, options: [] },
    { label: "Mensagem", type: "textarea", required: false, options: [] }
];

// Footer

function atualizarFooter() {
    const texto = document.getElementById('footer-text').value;
    const tamanho = document.getElementById('footer-font-size').value + 'px';
    const corTexto = document.getElementById('footer-text-color').value;
    const corFundo = document.getElementById('footer-bg-color').value;
    const alinhamento = document.getElementById('footer-align').value;

    const footer = document.getElementById('generated-footer');
    footer.innerText = texto;
    footer.style.fontSize = tamanho;
    footer.style.color = corTexto;
    footer.style.backgroundColor = corFundo;
    footer.style.textAlign = alinhamento;
}

// processar imagens
function processarImagensParaBase64(element) {
    const images = element.getElementsByTagName('img');
    for (let img of images) {
    if (img.src && !img.src.startsWith('data:')) {
        try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);
        img.src = canvas.toDataURL('image/png');
        } catch (e) {
        console.error('Erro ao converter imagem:', e);
        }
    }
    }
}

function gerarCSS() {
return `
/* ========== ESTILOS GERAIS ========== */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: white;
}

/* ========== CABEÇALHO ========== */
.generated-header {
    background-color: ${document.getElementById('header-bg-color').value};
    color: ${document.getElementById('header-text-color').value};
    min-height: ${document.getElementById('header-height').value}px; /* Altura mínima garantida */
    height: auto;
    display: flex;
    align-items: center;
    padding: 0 20px;
    gap: ${document.getElementById('header-item-spacing').value}px;
    justify-content: ${document.getElementById('header-align-items').value === 'left' ? 'flex-start' : 
                        document.getElementById('header-align-items').value === 'center' ? 'center' : 'flex-end'};
    flex-wrap: wrap;
    border-bottom: 2px solid #ccc;
}

/* ========== MENU ========== */
.generated-menu {
    background-color: ${document.getElementById('menu-bg-color').value};
    min-height: ${document.getElementById('menu-height').value}px;
    height: ${document.getElementById('menu-height').value}px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box; /* Importante: inclui padding na altura total */
}

.menu-items {
    display: flex;
    gap: ${document.getElementById('menu-item-spacing').value}px;
    width: 100%;
    height: 100%; /* Ocupa toda a altura do menu */
    align-items: center; /* Centraliza verticalmente os itens */
}

.menu-item {
    background-color: ${document.getElementById('menu-item-bg-color').value};
    color: ${document.getElementById('menu-text-color').value};
    border-radius: ${document.getElementById('menu-item-border-radius').value}px;
    padding: 0 20px;
    height: ${document.getElementById('menu-height').value - 10}px; /* Ajuste fino */
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
}

/* ========== GALERIA ========== */
.gallery-container {
    display: flex;
    flex-wrap: wrap;
    gap: ${document.getElementById('gallery-spacing').value}px;
    padding: 20px;
    justify-content: ${document.getElementById('gallery-align').value};
    background-color: transparent;
}

.gallery-card {
    background-color: ${document.getElementById('card-bg-color').value};
    border: 1px solid ${document.getElementById('card-border-color').value};
    border-radius: ${document.getElementById('card-border-radius').value}px;
    width: ${document.getElementById('card-width').value}px;
    height: ${document.getElementById('card-height').value}px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

/* ========== FORMULÁRIO ========== */
.form-container {
    background-color: ${document.getElementById('form-bg-color').value};
    border: 1px solid ${document.getElementById('form-border-color').value};
    border-radius: ${document.getElementById('form-border-radius').value}px;
    padding: 20px;

        
    margin: 20px auto; /* Centraliza horizontalmente */
    width: 90%; /* Largura responsiva */
    max-width: 600px; 
}

.form-title {
    color: ${document.getElementById('form-title-color').value};
    font-size: 20px;
    text-align: center;
    margin-bottom: 20px;
}

.form-field {
    margin-bottom: 15px;
    background-color: ${document.getElementById('form-field-bg-color').value};
    padding: 10px;
    border-radius: 5px;
}

/* ===== CAMPOS DO FORMULÁRIO ===== */
.form-field-input, .form-field-select, .form-field textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: ${document.getElementById('form-field-bg-color').value};
    color: #333;
    box-sizing: border-box;
}

.form-field-label {
    color: ${document.getElementById('form-label-color').value};
    font-weight: bold;
    margin-bottom: 5px;
    display: block;
}


/* ========== RODAPÉ ========== */
.generated-footer {
    background-color: ${document.getElementById('footer-bg-color').value};
    color: ${document.getElementById('footer-text-color').value};
    padding: 20px;
    text-align: ${document.getElementById('footer-align').value};
    font-size: ${document.getElementById('footer-font-size').value}px;
}
`;
}

function cssTextFromStyle(style) {
return Array.from(style)
.filter(prop => !prop.startsWith('-')) // Remove propriedades vendor-specific
.map(prop => `${prop}: ${style.getPropertyValue(prop)};`)
.join('\n      ');
}

function cssTextFromStyle(style) {
return Array.from(style)
.filter(prop => !prop.startsWith('-')) // Remove propriedades vendor-specific
.map(prop => `${prop}: ${style.getPropertyValue(prop)};`)
.join('\n      ');
}


function mostrarCodigo() {
const codigoCompleto = gerarCodigoCompleto();
const codePreview = document.getElementById('code-preview');
codePreview.textContent = codigoCompleto;
codePreview.style.display = 'block';
}

function salvarLocalStorage() {
try {
const codigoCompleto = gerarCodigoCompleto();
localStorage.setItem('siteHTML', codigoCompleto);
mostrarStatus('Código salvo com sucesso!', 'success');
} catch (error) {
mostrarStatus('Erro ao salvar: ' + error.message, 'error');
}
}

function carregarLocalStorage() {
try {
const codigoSalvo = localStorage.getItem('siteHTML');
if (codigoSalvo) {
    const codePreview = document.getElementById('code-preview');
    codePreview.textContent = codigoSalvo;
    codePreview.style.display = 'block';
    mostrarStatus('Código carregado com sucesso!', 'success');
} else {
    mostrarStatus('Nenhum código salvo encontrado', 'error');
}
} catch (error) {
mostrarStatus('Erro ao carregar: ' + error.message, 'error');
}
}

function limparLocalStorage() {
try {
localStorage.removeItem('siteHTML');
mostrarStatus('Armazenamento limpo com sucesso!', 'success');
} catch (error) {
mostrarStatus('Erro ao limpar: ' + error.message, 'error');
}
}

function mostrarStatus(mensagem, tipo) {
const statusElement = document.getElementById('status-message');
statusElement.textContent = mensagem;
statusElement.className = 'status-message ' + tipo;
statusElement.style.opacity = 1;

setTimeout(() => {
statusElement.style.opacity = 0;
}, 3000);
}

// captura e exportacao de codigo

function gerarCodigoCompleto() {
// Clona elementos e remove event listeners
const header = document.getElementById('generated-header').cloneNode(true);
const menu = document.getElementById('generated-menu').cloneNode(true);
const gallery = document.getElementById('gallery-container').cloneNode(true);
const form = document.getElementById('form-container').cloneNode(true);
const footer = document.getElementById('generated-footer').cloneNode(true);

// Processa imagens
processarImagensParaBase64(header);
processarImagensParaBase64(menu);
processarImagensParaBase64(gallery);
processarImagensParaBase64(footer);

// Gera HTML
return `<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Site Gerado</title>
<style>${gerarCSS()}</style>
</head>
<body>
${header.outerHTML}
${menu.outerHTML}
<main style="min-height: 60vh; padding: 20px;">
${gallery.outerHTML}
${form.outerHTML}
</main>
${footer.outerHTML}
</body>
</html>`;
}

document.getElementById('show-code-btn').addEventListener('click', mostrarCodigo);
document.getElementById('save-code-btn').addEventListener('click', salvarLocalStorage);
document.getElementById('load-code-btn').addEventListener('click', carregarLocalStorage);
document.getElementById('clear-code-btn').addEventListener('click', limparLocalStorage);

// Atualiza o rodapé na primeira carga
// Adicione junto aos outros event listeners
document.getElementById('footer-text').addEventListener('input', renderFooter);
document.getElementById('footer-font-size').addEventListener('input', renderFooter);
document.getElementById('footer-text-color').addEventListener('input', renderFooter);
document.getElementById('footer-bg-color').addEventListener('input', renderFooter);
document.getElementById('footer-align').addEventListener('change', renderFooter);
window.onload = atualizarFooter;


cardBgColorInput.addEventListener("input", renderGallery);
cardBorderColorInput.addEventListener("input", renderGallery);
cardBorderRadiusInput.addEventListener("input", renderGallery);
cardWidthInput.addEventListener("input", renderGallery);
cardHeightInput.addEventListener("input", renderGallery);
cardTextBgColorInput.addEventListener("input", renderGallery);
cardTextColorInput.addEventListener("input", renderGallery);
cardTextFontSizeInput.addEventListener("input", renderGallery);
gallerySpacingInput.addEventListener("input", renderGallery);
galleryAlignSelect.addEventListener("change", renderGallery);

// Inicializa visualizações
renderHeader();
renderMenu();
renderGallery();

// Renderizar o formulário inicial
renderForm();
