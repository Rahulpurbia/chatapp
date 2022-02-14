const socket = io('http://localhost:8000');
const chatbox = document.querySelector('.chatbox');
const button = document.querySelector('button');
const inputd = document.querySelector('input[name="messageinput"]')


function appendfunc(rl, Name, message) {
    let newelem = document.createElement('div');
    newelem.classList.add(`${rl}`);
    newelem.innerText = `${Name} :${message}`
    chatbox.appendChild(newelem);
}


const naam = prompt("Enter your name");
// const naam = "rahul";
socket.emit('new-user-joined', naam);
socket.on('user-joined', (nameishere) => {
    appendfunc("joined", nameishere, "joined the chat")

})

button.addEventListener('click', (e) => {
    e.preventDefault();
    socket.emit('message-sent', inputd.value)
    appendfunc('right', "You", inputd.value)
    inputd.value = "";

})
socket.on('receive-msg', (data) => {


    appendfunc('left', data.name, data.message);

})
socket.on('left', (userkanaam) => {
    appendfunc('chatleft', userkanaam, 'left the chat');
})