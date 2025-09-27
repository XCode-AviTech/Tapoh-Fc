//contact message character counter
const messageInput = document.getElementById('message');
const charCounter = document.getElementById('charCounter');
const error = document.getElementById('msg-error');
const charMax = 250;

charCounter.textContent = `${messageInput.value.length}/${charMax}`;

messageInput.addEventListener('input', () => {
    charCounter.textContent = `${messageInput.value.length}/${charMax}`;

    if(messageInput.value.length == charMax){
        error.textContent = "Character Limit reached!";
    }else{
        error.textContent = "";
    }
});

document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Message sent!');
});