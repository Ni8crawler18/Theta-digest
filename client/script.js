document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const videoLink = document.getElementById('videoLink').value;
    const response = await fetch('http://localhost:3000/summarize', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ link: videoLink })
    });
    const data = await response.json();
    document.getElementById('summary').innerText = data.summary;
});

document.getElementById('connectWallet').addEventListener('click', async () => {
    if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    } else {
        alert('MetaMask is not installed!');
    }
});

document.getElementById('payWithTFuel').addEventListener('click', async () => {
    alert('Payment processing is not implemented in this demo.');
});
