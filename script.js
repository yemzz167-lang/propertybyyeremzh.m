// ============================================
// AI ASISTEN GENERATIF — Yeremia Estate
// ============================================
// AI ini menggunakan Pollinations AI (gratis, tanpa API key)
// Respons dihasilkan secara generatif, BUKAN if-else statis.

const SYSTEM_PROMPT = `Kamu adalah asisten properti mewah "Yeremia Estate" yang ramah, sopan, dan profesional. 
Kamu membantu klien menemukan properti impian mereka. 
Koleksi properti unggulan:
- The Grand Mansion (Jakarta Selatan) - Rp 15 Miliar - mansion mewah 5 kamar tidur, kolam renang pribadi
- Skyline Penthouse (Jakarta Pusat) - Rp 8.5 Miliar - penthouse dengan view kota 360 derajat
- Bali Tropical Villa (Bali) - Rp 12 Miliar - villa dengan pemandangan laut langsung

Jawab dengan singkat (maksimal 3 kalimat), ramah, dan gunakan bahasa Indonesia yang natural. 
Jika klien ingin membeli, arahkan ke WhatsApp: +6282258421215.
Selalu tawarkan bantuan lebih lanjut.`;

let isProcessing = false;

function toggleChat() {
    const chat = document.getElementById('chatContainer');
    chat.style.display = (chat.style.display === 'flex') ? 'none' : 'flex';
}

function handleKeyPress(e) {
    if (e.key === 'Enter' && !isProcessing) kirimPesan();
}

function addMessage(text, sender) {
    const chatBox = document.getElementById('chatBox');
    const div = document.createElement('div');
    div.className = sender === 'user' ? 'msg-user' : 'msg-bot';
    div.textContent = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
    return div;
}

function showTyping() {
    const chatBox = document.getElementById('chatBox');
    const typing = document.createElement('div');
    typing.className = 'typing';
    typing.id = 'typingIndicator';
    typing.innerHTML = '<span></span><span></span><span></span>';
    chatBox.appendChild(typing);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function hideTyping() {
    const t = document.getElementById('typingIndicator');
    if (t) t.remove();
}

async function kirimPesan() {
    const input = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const pesan = input.value.trim();
    if (pesan === "" || isProcessing) return;

    // Tampilkan pesan user
    addMessage(pesan, 'user');
    input.value = "";
    isProcessing = true;
    sendBtn.disabled = true;

    // Tampilkan indikator mengetik
    showTyping();

    try {
        // Panggil AI generatif via Pollinations AI (gratis, tanpa API key)
        const url = `https://text.pollinations.ai/${encodeURIComponent(
            SYSTEM_PROMPT + "\n\nPertanyaan klien: " + pesan
        )}?model=openai`;

        const response = await fetch(url);
        let balasan = await response.text();

        // Bersihkan jika ada karakter aneh
        balasan = balasan.trim();
        if (!balasan || balasan.length < 2) {
            balasan = "Maaf, saya sedang sibuk. Silakan hubungi +6282258421215 untuk bantuan langsung.";
        }

        hideTyping();
        addMessage(balasan, 'bot');

    } catch (error) {
        hideTyping();
        addMessage(
            "Ups, koneksi saya terganggu. Silakan hubungi kami langsung di WhatsApp +6282258421215 😊",
            'bot'
        );
        console.error('AI Error:', error);
    } finally {
        isProcessing = false;
        sendBtn.disabled = false;
        input.focus();
    }
}