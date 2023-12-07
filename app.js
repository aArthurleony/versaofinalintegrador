class MobileNavbar {
    constructor(mobileMenu, navList, navLinks) {
        this.mobileMenu = document.querySelector(mobileMenu);
        this.navList = document.querySelector(navList);
        this.navLinks = document.querySelectorAll(navLinks);
        this.activeClass = "active";

        this.handleClick = this.handleClick.bind(this);
    }

    animateLinks() {
        this.navLinks.forEach((link, index) => {
            link.style.animation
                ? (link.style.animation = "")
                : (link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3
                    }s`);
        });
    }

    handleClick() {
        this.navList.classList.toggle(this.activeClass);
        this.mobileMenu.classList.toggle(this.activeClass);
        this.animateLinks();
    }

    addClickEvent() {
        this.mobileMenu.addEventListener("click", this.handleClick);
    }

    init() {
        if (this.mobileMenu) {
            this.addClickEvent();
        }
        return this;
    }
}

const mobileNavbar = new MobileNavbar(
    ".mobile-menu",
    ".nav-list",
    ".nav-list li",
);
mobileNavbar.init();

//---------------------------------------pagina de inicio-------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
    // Seu código JavaScript vai aqui
    var cadastroBtn = document.getElementById('cadastro-btn');  
    var loginBtn = document.getElementById('login-btn');

    if (cadastroBtn) {
        cadastroBtn.addEventListener('click', function () {
            window.location.href = './pages/cadastro.html';
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', function () {
            window.location.href = './pages/login.html';
        });
    }
});

//------------------------------------------PARTE DO LOGIN-----------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const reservationForm = document.getElementById("reservationForm");
    const reservationList = document.getElementById("reservationList");
    const guestListButton = document.getElementById("guestListButton");
    const loginButton = document.getElementById("loginButton");
    const logoutButton = document.getElementById("logoutButton");
    const guestList = document.getElementById("guestList");

    loginButton.addEventListener("click", function () {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Lógica simplificada de login
        if (username === "cliente" && password === "senha123") {
            window.location.href = './Reserva.html'

        } else {
            alert("Credenciais inválidas. Tente novamente.");
        }
    });

    logoutButton.addEventListener("click", function () {
        loginForm.style.display = "block"; // Exibe o formulário de login
        reservationForm.style.display = "none"; // Esconde o formulário de reservas
        reservationList.style.display = "none"; // Esconde a lista de reservas
        guestListButton.style.display = "none"; // Esconde o botão para ver a lista de hóspedes
        guestList.style.display = "none"; // Esconde a lista de hóspedes
        logoutButton.style.display = "none"; // Esconde o botão de logout
    });
});
//---------------PARTE DA RESERVA-----------------------------------------------------------

function submitReservation() {
    const guestName = document.getElementById("guestName").value;
    const roomType = document.getElementById("roomType").value;
    const checkIn = document.getElementById("checkIn").value;
    const checkOut = document.getElementById("checkOut").value;

    // Validar se o nome do hóspede foi inserido antes de permitir a reserva
    if (guestName === "") {
        alert("Por favor, insira o nome do hóspede.");
        return;
    }

    // Validar se as datas estão corretas antes de permitir a reserva
    if (checkIn === "" || checkOut === "" || checkIn >= checkOut) {
        alert("Por favor, insira datas válidas para Check-In e Check-Out.");
        return;
    }

    // Aqui você pode adicionar a lógica para armazenar a reserva ou exibi-la na lista
    const reservationDetails = `Hóspede: ${guestName}, Quarto: ${roomType}, Check-In: ${checkIn}, Check-Out: ${checkOut}`;

    const reservationList = document.getElementById("reservationList");
    const reservationItem = document.createElement("div");
    reservationItem.textContent = reservationDetails;
    reservationList.appendChild(reservationItem);

    // Lógica adicional para armazenar em um banco de dados ou fazer outras operações necessárias

    // Após a reserva, atualize o botão de lista de hóspedes se houver reservas
    updateGuestListButton();
}

function toggleGuestList() {
    const guestList = document.getElementById("guestList");

    // Verifica se há reservas antes de exibir a lista de hóspedes
    if (reservationList.childElementCount > 0) {
        if (guestList.style.display === "block") {
            guestList.style.display = "none";
        } else {
            showGuestList();
        }
    } else {
        alert("Não há reservas para exibir a lista de hóspedes.");
    }
}

function showGuestList() {
    const guestList = document.getElementById("guestList");

    // Adicione os nomes dos hóspedes conforme necessário
    const guestNames = Array.from(document.querySelectorAll(".reservation-list div")).map(reservation => {
        // Extrai o nome do hóspede da reserva
        return reservation.textContent.split(":")[1].split(",")[0].trim();
    });

    // Limpa a lista de hóspedes antes de exibir
    guestList.innerHTML = "";

    // Adiciona cada nome de hóspede à lista
    guestNames.forEach(function (guest) {
        const guestItem = document.createElement("div");
        guestItem.textContent = guest;
        guestList.appendChild(guestItem);
    });

    // Exibe a lista de hóspedes
    guestList.style.display = "block";
}

function updateGuestListButton() {
    const guestListButton = document.getElementById("guestListButton");

    // Atualiza o botão de lista de hóspedes se houver reservas
    guestListButton.style.display = reservationList.childElementCount > 0 ? "block" : "none";
}
function calculateTotal() {
    const roomType = document.getElementById("roomType").value;
    const checkInDate = new Date(document.getElementById("checkIn").value);
    const checkOutDate = new Date(document.getElementById("checkOut").value);

    // Calcula a diferença em dias entre as datas de check-in e check-out
    const timeDiff = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

    // Obtém o preço do quarto selecionado
    let roomPrice = 0;
    switch (roomType) {
        case "single":
            roomPrice = 100;
            break;
        case "double":
            roomPrice = 150;
            break;
        case "suite":
            roomPrice = 200;
            break;
    }

    // Calcula o custo total
    const totalCost = nights * roomPrice;

    // Exibe o custo total na página
    document.getElementById("totalCost").style.display = "block";
    document.getElementById("costAmount").textContent = totalCost.toFixed(2);
}
function submitReservation() {
    // Lógica de submissão da reserva...

    // Limpar dados e custos após a reserva
    document.getElementById("guestName").value = "";
    document.getElementById("roomType").value = "single";
    document.getElementById("checkIn").value = "";
    document.getElementById("checkOut").value = "";
    document.getElementById("totalCost").style.display = "none";
    document.getElementById("costAmount").textContent = "0.00";

    // Mostrar mensagem de alerta
    alert("Reserva efetuada com sucesso!");
}
//variáveis para armazenar a lista de reservas e hóspedes
let reservations = [];
let guests = [];
const reservationListContainer = document.getElementById("reservationList");
const guestListContainer = document.getElementById("guestList");

function submitReservation() {
    // Lógica de submissão da reserva

    // Obter dados da reserva
    const guestName = document.getElementById("guestName").value;
    const roomType = document.getElementById("roomType").value;
    const checkInDate = document.getElementById("checkIn").value;
    const checkOutDate = document.getElementById("checkOut").value;

    // Limpar dados e custos após a reserva
    document.getElementById("guestName").value = "";
    document.getElementById("roomType").value = "single";
    document.getElementById("checkIn").value = "";
    document.getElementById("checkOut").value = "";
    document.getElementById("totalCost").style.display = "none";
    document.getElementById("costAmount").textContent = "0.00";

    // Criar objeto de reserva
    const reservation = {
        guestName: guestName,
        roomType: roomType,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate
    };

    // Adicionar reserva à lista
    reservations.push(reservation);

    // Adicionar hóspede à lista se ainda não estiver presente
    if (!guests.find(guest => guest === guestName)) {
        guests.push(guestName);
    }

    // Atualizar lista de reservas e hóspedes na interface
    updateReservationList();
    updateGuestList();

    // Mostrar mensagem de alerta
    alert("Reserva efetuada com sucesso!");
}

function updateReservationList() {
    // Limpar conteúdo atual
    reservationListContainer.innerHTML = "";

    // Adicionar cada reserva à lista
    reservations.forEach(reservation => {
        const reservationItem = document.createElement("div");
        reservationItem.innerHTML = `<p><strong>Hóspede:</strong> ${reservation.guestName}</p>
                <p><strong>Quarto:</strong> ${reservation.roomType}</p>
                <p><strong>Check-In:</strong> ${reservation.checkInDate}</p>
                <p><strong>Check-Out:</strong> ${reservation.checkOutDate}</p>`;
        reservationListContainer.appendChild(reservationItem);
    });
}

function updateGuestList() {
    // Limpar conteúdo atual
    guestListContainer.innerHTML = "";

    // Adicionar cada hóspede à lista .
    guests.forEach(guest => {
        const guestItem = document.createElement("div");
        guestItem.innerHTML = `<p><strong>Hóspede:</strong> ${guest}</p>`;
        guestListContainer.appendChild(guestItem);
    });
}

function toggleGuestList() {
    // Mostrar ou ocultar a lista de hóspedes
    guestListContainer.style.display = guestListContainer.style.display === "none" ? "block" : "none";
}
function validarFormulario(){
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Validar se o nome do hóspede foi inserido antes de permitir a reserva
    if (name === "" || email === "" || message === "") {
        alert("Por Favor, preencha todos os campos");   
    } else {
        alert("Mensagem enviada com sucesso!!")
    }
    document.getElementById("name").value;
    document.getElementById("email").value;
    document.getElementById("message").value;
}
// // PÁGINA DE SUPORTE PARA O CONTATO
// // evento de clique do mouse no botão
  document.getElementById('buttoncontact').addEventListener('click', function() {
    // Redireciona para a outra página HTML
    window.location.href = './contato.html';
  });   
// //   PAGINA DE CADASTRO
function cadastro(){
    const nomeCompleto = document.getElementById("nomeCompleto").value;
    const cpf = document.getElementById("cpf").value;
    const Email = document.getElementById("Email").value;
    const dataNascimento = document.getElementById("dataNascimento").value;
    const endereco = document.getElementById("endereco").value;
    const telefone = document.getElementById("telefone").value;
    // Validar
    if(nomeCompleto === "" || cpf === "" || Email === "" || dataNascimento === "" || endereco === "" || telefone === ""){
        alert("Por Favor, preencha todos os campos");
    }else {
        alert("Cadastro realizado com sucesso")
        window.location.href = './Reserva.html'

    }
    document.getElementById('nomeCompleto').value = '';
    document.getElementById('cpf').value = '';
    document.getElementById('dataNascimento').value = '';
    document.getElementById('endereco').value = '';
    document.getElementById('telefone').value = '';

}
