document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.href.includes('admin.html')) return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Update active nav
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Show target section
            sections.forEach(s => s.classList.add('hidden'));
            document.getElementById(targetId).classList.remove('hidden');
        });
    });
    
    // Key generation
    const generateBtn = document.getElementById('generateBtn');
    const userIDInput = document.getElementById('userID');
    const loadingDiv = document.getElementById('loading');
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');
    const generatedKeySpan = document.getElementById('generatedKey');
    
    generateBtn.addEventListener('click', async function() {
        const userID = userIDInput.value.trim();
        const email = document.getElementById('userEmail').value.trim();
        
        // Reset
        resultDiv.classList.add('hidden');
        errorDiv.classList.add('hidden');
        
        // Validation
        if (!userID) {
            showError('Введите User ID');
            return;
        }
        
        if (userID.length < 3 || userID.length > 32) {
            showError('User ID должен быть от 3 до 32 символов');
            return;
        }
        
        // Show loading
        loadingDiv.classList.remove('hidden');
        
        // Simulate API call
        setTimeout(() => {
            loadingDiv.classList.add('hidden');
            
            // Generate key
            const digits = Math.floor(1000000000 + Math.random() * 9000000000);
            const key = `CreatedYourTigranmods-${digits}`;
            
            // Display result
            generatedKeySpan.textContent = key;
            resultDiv.classList.remove('hidden');
            
            // Log (simulated)
            console.log(`Generated key ${key} for User ID: ${userID}, Email: ${email || 'N/A'}`);
        }, 1500);
    });
    
    // Copy key
    document.getElementById('copyBtn').addEventListener('click', function() {
        const key = generatedKeySpan.textContent;
        navigator.clipboard.writeText(key).then(() => {
            alert('Ключ скопирован в буфер обмена!');
        });
    });
    
    // Save key
    document.getElementById('saveBtn').addEventListener('click', function() {
        const key = generatedKeySpan.textContent;
        const blob = new Blob([`Your DRIP CLIENT Key: ${key}\nGenerated: ${new Date().toLocaleString()}\n\nKeep this key safe!`], 
            { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `DRIP_CLIENT_Key_${Date.now()}.txt`;
        a.click();
    });
    
    // Share key
    document.getElementById('shareBtn').addEventListener('click', function() {
        const key = generatedKeySpan.textContent;
        if (navigator.share) {
            navigator.share({
                title: 'Мой ключ DRIP CLIENT',
                text: `Получил ключ для DRIP CLIENT MOBILE: ${key}`,
                url: window.location.href
            });
        } else {
            alert(`Поделитесь ключом вручную: ${key}`);
        }
    });
    
    // Error helper
    function showError(message) {
        errorDiv.classList.remove('hidden');
        document.getElementById('errorText').textContent = message;
    }
    
    // Auto-select User ID input
    userIDInput.focus();
});
