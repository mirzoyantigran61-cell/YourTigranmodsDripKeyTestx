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
    
    // ================== KEY GENERATION ==================
    const generateBtn = document.getElementById('generateBtn');
    const userIDInput = document.getElementById('userID');
    const loadingDiv = document.getElementById('loading');
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');
    const generatedKeySpan = document.getElementById('generatedKey');
    
    // ----- ЖЁСТКО ПРОПИСАННЫЕ КЛЮЧИ (можно менять/дополнять) -----
    const PRESET_KEYS = [
        "YOURTIGRANMODS-7K3X-9M2P-4R8W-QL5V-F6" ,
"YOURTIGRANMODS-A1B2-C3D4-E5F6-G7H8-I9" ,
"YOURTIGRANMODS-B2C3-D4E5-F6G7-H8I9-J0" ,
"YOURTIGRANMODS-XY32-19AK-JF84-BC72-0Z" ,
"YOURTIGRANMODS-PQ09-MN56-UV34-WX12-YZ" ,
"YOURTIGRANMODS-K9L8-M7N6-O5P4-Q3R2-S1" ,
"YOURTIGRANMODS-1A2B-3C4D-5E6F-7G8H-9I" ,
"YOURTIGRANMODS-0Z9Y-8X7W-6V5U-4T3S-2R" ,
"YOURTIGRANMODS-ABCD-EFGH-IJKL-MNOP-QR" ,
"YOURTIGRANMODS-QWER-TYUI-OPAS-DFGH-JK" ,
"YOURTIGRANMODS-LZ95-XT42-MP18-KV73-FD" ,
"YOURTIGRANMODS-23JK-89LM-45NP-67QR-ST" ,
"YOURTIGRANMODS-UV12-XY34-ZA56-BC78-DE" ,
"YOURTIGRANMODS-GH90-IJ12-KL34-MN56-OP" ,
"YOURTIGRANMODS-6H4J-2G8F-0D1S-3A7K-9L" ,
"YOURTIGRANMODS-Q2W3-E4R5-T6Y7-U8I9-O0" ,
"YOURTIGRANMODS-P1L2-K3J4-H5G6-F7D8-S9" ,
"YOURTIGRANMODS-5T6Y-7U8I-9O0P-1A2S-3D" ,
"YOURTIGRANMODS-F4G5-H6J7-K8L9-Z0X1-C2" ,
"YOURTIGRANMODS-V3B4-N5M6-Q7W8-E9R0-T1" ,
"YOURTIGRANMODS-8A9S-2D1F-4G3H-6J5K-7L" ,
"YOURTIGRANMODS-W0E9-R8T7-Y6U5-I4O3-P2" ,
"YOURTIGRANMODS-3S4D-5F6G-7H8J-9K0L-1Z" ,
"YOURTIGRANMODS-2X3C-4V5B-6N7M-8Q9W-E0" ,
"YOURTIGRANMODS-1L2K-3J4H-5G6F-7D8S-A9" ,
"YOURTIGRANMODS-0P9O-8I7U-6Y5T-4R3E-2W" ,
"YOURTIGRANMODS-Q1A2-Z3S4-X5D6-C7F8-V9" ,
"YOURTIGRANMODS-R5T6-Y7U8-I9O0-P1L2-K3" ,
"YOURTIGRANMODS-J4H5-G6F7-D8S9-A0B1-C2" ,
"YOURTIGRANMODS-M3N4-B5V6-C7X8-Z9L0-K1" ,
"YOURTIGRANMODS-2G5H-8J1K-4L9M-0N3P-6Q" ,
"YOURTIGRANMODS-7R8S-1T2Y-3U4I-5O6P-9A" ,
"YOURTIGRANMODS-W4E5-R6T7-Y8U9-I0O1-P2" ,
"YOURTIGRANMODS-5D6F-7G8H-9J0K-1L2Z-3X" ,
"YOURTIGRANMODS-4C5V-6B7N-8M9Q-0W1E-2R" ,
"YOURTIGRANMODS-3A4S-5D6F-7G8H-9J0K-L1" ,
"YOURTIGRANMODS-Z2X3-C4V5-B6N7-M8Q9-W0" ,
"YOURTIGRANMODS-1Y2U-3I4O-5P6A-7S8D-9F" ,
"YOURTIGRANMODS-0G1H-2J3K-4L5Z-6X7C-8V" ,
"YOURTIGRANMODS-9B8N-7M6Q-5W4E-3R2T-1Y" ,
"YOURTIGRANMODS-7U6I-5O4P-3A2S-1D0F-9G" ,
"YOURTIGRANMODS-8H9J-0K1L-2Z3X-4C5V-6B" ,
"YOURTIGRANMODS-3N4M-5Q6W-7E8R-9T0Y-1U" ,
"YOURTIGRANMODS-2I3O-4P5A-6S7D-8F9G-0H" ,
"YOURTIGRANMODS-1J2K-3L4Z-5X6C-7V8B-9N" ,
"YOURTIGRANMODS-0M1Q-2W3E-4R5T-6Y7U-8I" ,
"YOURTIGRANMODS-9O8P-7A6S-5D4F-3G2H-1J" ,
"YOURTIGRANMODS-8K7L-6Z5X-4C3V-2B1N-0M" ,
"YOURTIGRANMODS-7Q6W-5E4R-3T2Y-1U0I-9O" ,
"YOURTIGRANMODS-6P5A-4S3D-2F1G-0H9J-8K" ,
"YOURTIGRANMODS-5L4Z-3X2C-1V0B-9N8M-7Q" ,
"YOURTIGRANMODS-4W3E-2R1T-0Y9U-8I7O-6P" ,
"YOURTIGRANMODS-3A2S-1D0F-9G8H-7J6K-5L" ,
"YOURTIGRANMODS-2Z1X-0C9V-8B7N-6M5Q-4W" ,
"YOURTIGRANMODS-1E0R-9T8Y-7U6I-5O4P-3A" ,
"YOURTIGRANMODS-0S9D-8F7G-6H5J-4K3L-2Z" ,
"YOURTIGRANMODS-9X8C-7V6B-5N4M-3Q2W-1E" ,
"YOURTIGRANMODS-8R7T-6Y5U-4I3O-2P1A-0S" ,
"YOURTIGRANMODS-7D6F-5G4H-3J2K-1L0Z-9X" ,
"YOURTIGRANMODS-6C5V-4B3N-2M1Q-0W9E-8R" ,
"YOURTIGRANMODS-5T4Y-3U2I-1O0P-9A8S-7D" ,
"YOURTIGRANMODS-4F3G-2H1J-0K9L-8Z7X-6C" ,
"YOURTIGRANMODS-3V2B-1N0M-9Q8W-7E6R-5T" ,
"YOURTIGRANMODS-2Y1U-0I9O-8P7A-6S5D-4F" ,
"YOURTIGRANMODS-1G0H-9J8K-7L6Z-5X4C-3V" ,
"YOURTIGRANMODS-0B9N-8M7Q-6W5E-4R3T-2Y" ,
"YOURTIGRANMODS-9U8I-7O6P-5A4S-3D2F-1G" ,
"YOURTIGRANMODS-8H7J-6K5L-4Z3X-2C1V-0B" ,
"YOURTIGRANMODS-7N6M-5Q4W-3E2R-1T0Y-9U" ,
"YOURTIGRANMODS-6I5O-4P3A-2S1D-0F9G-8H" ,
"YOURTIGRANMODS-5J4K-3L2Z-1X0C-9V8B-7N" ,
"YOURTIGRANMODS-4M3Q-2W1E-0R9T-8Y7U-6I" ,
"YOURTIGRANMODS-3O2P-1A0S-9D8F-7G6H-5J" ,
"YOURTIGRANMODS-2K1L-0Z9X-8C7V-6B5N-4M" ,
"YOURTIGRANMODS-1Q0W-9E8R-7T6Y-5U4I-3O" ,
"YOURTIGRANMODS-0P9A-8S7D-6F5G-4H3J-2K" ,
"YOURTIGRANMODS-9L8Z-7X6C-5V4B-3N2M-1Q" ,
"YOURTIGRANMODS-8W7E-6R5T-4Y3U-2I1O-0P" ,
"YOURTIGRANMODS-7A6S-5D4F-3G2H-1J0K-9L" ,
"YOURTIGRANMODS-6Z5X-4C3V-2B1N-0M9Q-8W" ,
"YOURTIGRANMODS-5E4R-3T2Y-1U0I-9O8P-7A" ,
"YOURTIGRANMODS-4S3D-2F1G-0H9J-8K7L-6Z" ,
"YOURTIGRANMODS-3X2C-1V0B-9N8M-7Q6W-5E" ,
"YOURTIGRANMODS-2R1T-0Y9U-8I7O-6P5A-4S" ,
"YOURTIGRANMODS-1D0F-9G8H-7J6K-5L4Z-3X" ,
"YOURTIGRANMODS-0C9V-8B7N-6M5Q-4W3E-2R" ,
"YOURTIGRANMODS-9T8Y-7U6I-5O4P-3A2S-1D" ,
"YOURTIGRANMODS-8F7G-6H5J-4K3L-2Z1X-0C" ,
"YOURTIGRANMODS-7V6B-5N4M-3Q2W-1E0R-9T" ,
"YOURTIGRANMODS-6Y5U-4I3O-2P1A-0S9D-8F" ,
"YOURTIGRANMODS-5G4H-3J2K-1L0Z-9X8C-7V" ,
"YOURTIGRANMODS-4B3N-2M1Q-0W9E-8R7T-6Y" ,
"YOURTIGRANMODS-3U2I-1O0P-9A8S-7D6F-5G" ,
"YOURTIGRANMODS-2H1J-0K9L-8Z7X-6C5V-4B" ,
"YOURTIGRANMODS-1N0M-9Q8W-7E6R-5T4Y-3U" ,
"YOURTIGRANMODS-0I9O-8P7A-6S5D-4F3G-2H" ,
"YOURTIGRANMODS-9J8K-7L6Z-5X4C-3V2B-1N" ,
"YOURTIGRANMODS-8M7Q-6W5E-4R3T-2Y1U-0I" ,
"YOURTIGRANMODS-7O6P-5A4S-3D2F-1G0H-9J" ,
"YOURTIGRANMODS-6K5L-4Z3X-2C1V-0B9N-8M" ,
"YOURTIGRANMODS-5Q4W-3E2R-1T0Y-9U8I-7O" 
    ];
    
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
            
            // Получаем текущий счётчик генераций (сохраняется в браузере)
            let count = parseInt(localStorage.getItem('keyGenCount') || '0');
            const key = PRESET_KEYS[count % PRESET_KEYS.length];
            localStorage.setItem('keyGenCount', count + 1);
            
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
