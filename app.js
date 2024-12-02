javascript
document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        const data = await response.json();
        document.getElementById('patientName').textContent = data.name;
        const recordsList = document.getElementById('recordsList');
        recordsList.innerHTML = '';
        data.records.forEach(record => {
            const li = document.createElement('li');
            li.textContent = record;
            recordsList.appendChild(li);
        });
        document.getElementById('patientData').classList.remove('hidden');
    } else {
        alert('Login failed');
    }
});
