const styles = [
    { name: 'Bold', fn: text => convertToUnicode(text, 'bold'), category: 'emphasis' },
    { name: 'Italic', fn: text => convertToUnicode(text, 'italic'), category: 'emphasis' },
    { name: 'Bold Italic', fn: text => convertToUnicode(text, 'boldItalic'), category: 'emphasis' },
    { name: 'Small Caps', fn: text => convertToSmallCaps(text), category: 'special' },
    { name: 'Monospace', fn: text => convertToUnicode(text, 'monospace'), category: 'code' },
    { name: 'Serif', fn: text => convertToUnicode(text, 'serif'), category: 'classic' },
    { name: 'Sans Serif', fn: text => convertToUnicode(text, 'sansSerif'), category: 'modern' },
    { name: 'Sans Serif Bold', fn: text => convertToUnicode(text, 'sansSerifBold'), category: 'modern' },
    { name: 'Double-Struck', fn: text => convertToUnicode(text, 'doubleStruck'), category: 'math' },
    { name: 'Fraktur', fn: text => convertToUnicode(text, 'fraktur'), category: 'gothic' },
    { name: 'Script (Cursive)', fn: text => convertToUnicode(text, 'script'), category: 'handwriting' },
    { name: 'Wide Text', fn: text => text.split('').join(' '), category: 'spacing' },
    { name: 'Extra Wide', fn: text => text.split('').join('  '), category: 'spacing' },
    { name: 'Tiny Superscript', fn: text => convertToSuperscript(text), category: 'special' },
    { name: 'Subscript', fn: text => convertToSubscript(text), category: 'special' },
    { name: 'Underlined', fn: text => addCombiningChar(text, '\u0332'), category: 'decoration' },
    { name: 'Double Underline', fn: text => addCombiningChar(text, '\u0333'), category: 'decoration' },
    { name: 'Strikethrough', fn: text => addCombiningChar(text, '\u0336'), category: 'decoration' },
    { name: 'Overlined', fn: text => addCombiningChar(text, '\u0305'), category: 'decoration' },
    { name: 'Dotted Font', fn: text => addCombiningChar(text, '\u0307'), category: 'decoration' },
    { name: 'Upside Down', fn: text => convertUpsideDown(text), category: 'fun' },
    { name: 'Gothic Italic', fn: text => convertToUnicode(text, 'fraktur'), category: 'gothic' },
    { name: 'Braille Font', fn: text => convertToBraille(text), category: 'accessibility' },
    { name: 'Serif Bold Italic', fn: text => convertToUnicode(text, 'serifBoldItalic'), category: 'emphasis' },
    { name: 'Sans Serif Italic', fn: text => convertToUnicode(text, 'sansSerifItalic'), category: 'modern' },
    { name: 'Sans Serif Bold Italic', fn: text => convertToUnicode(text, 'sansSerifBoldItalic'), category: 'emphasis' },
    { name: 'Asian Fullwidth', fn: text => convertToFullwidth(text), category: 'international' },
    { name: 'Pixel Font', fn: text => addCombiningChar(text, '\u034F'), category: 'retro' },
    { name: 'Handwriting Print', fn: text => convertToUnicode(text, 'script'), category: 'handwriting' },
    { name: 'Bubble Text', fn: text => convertToBubble(text), category: 'fun' },
    { name: 'Square Text', fn: text => convertToSquare(text), category: 'shapes' },
    { name: 'Circled Text', fn: text => convertToCircled(text), category: 'shapes' },
    { name: 'Negative Circled', fn: text => convertToNegativeCircled(text), category: 'shapes' },
    { name: 'Parenthesized', fn: text => convertToParenthesized(text), category: 'shapes' },
    { name: 'Mirror Text', fn: text => convertToMirror(text), category: 'fun' },
    { name: 'Zalgo Text', fn: text => convertToZalgo(text), category: 'fun' },
    { name: 'Leet Speak', fn: text => convertToLeet(text), category: 'internet' },
    { name: 'Morse Code', fn: text => convertToMorse(text), category: 'codes' },
    { name: 'Binary Code', fn: text => convertToBinary(text), category: 'codes' },
    { name: 'ROT13', fn: text => convertToROT13(text), category: 'codes' },
    { name: 'Reverse Text', fn: text => text.split('').reverse().join(''), category: 'fun' },
    { name: 'Alternating Case', fn: text => convertToAlternatingCase(text), category: 'fun' },
    { name: 'Title Case', fn: text => convertToTitleCase(text), category: 'formatting' },
    { name: 'Sentence Case', fn: text => convertToSentenceCase(text), category: 'formatting' },
    { name: 'UPPER CASE', fn: text => text.toUpperCase(), category: 'formatting' },
    { name: 'lower case', fn: text => text.toLowerCase(), category: 'formatting' },
    { name: 'iNVERT cASE', fn: text => convertToInvertCase(text), category: 'fun' },
    { name: 'Custom Italic', fn: text => convertToCustomItalic(text), category: 'emphasis' }
];

// Unicode mapping objects with proper fallbacks
const unicodeMaps = {
    bold: { start: 0x1D400, startLower: 0x1D41A },
    italic: { start: 0x1D434, startLower: 0x1D44E },
    boldItalic: { start: 0x1D468, startLower: 0x1D482 },
    script: {
        custom: {
            'A': '𝒜', 'B': 'ℬ', 'C': '𝒞', 'D': '𝒟', 'E': 'ℰ', 'F': 'ℱ', 'G': '𝒢', 'H': 'ℋ',
            'I': 'ℐ', 'J': '𝒥', 'K': '𝒦', 'L': 'ℒ', 'M': 'ℳ', 'N': '𝒩', 'O': '𝒪', 'P': '𝒫',
            'Q': '𝒬', 'R': 'ℛ', 'S': '𝒮', 'T': '𝒯', 'U': '𝒰', 'V': '𝒱', 'W': '𝒲', 'X': '𝒳',
            'Y': '𝒴', 'Z': '𝒵', 'a': '𝒶', 'b': '𝒷', 'c': '𝒸', 'd': '𝒹', 'e': 'ℯ', 'f': '𝒻',
            'g': 'ℊ', 'h': '𝒽', 'i': '𝒾', 'j': '𝒿', 'k': '𝓀', 'l': '𝓁', 'm': '𝓂', 'n': '𝓃',
            'o': 'ℴ', 'p': '𝓅', 'q': '𝓆', 'r': '𝓇', 's': '𝓈', 't': '𝓉', 'u': '𝓊', 'v': '𝓋',
            'w': '𝓌', 'x': '𝓍', 'y': '𝓎', 'z': '𝓏'
        }
    },
    fraktur: {
        custom: {
            'A': '𝔄', 'B': '𝔅', 'C': 'ℭ', 'D': '𝔇', 'E': '𝔈', 'F': '𝔉', 'G': '𝔊', 'H': 'ℌ',
            'I': 'ℑ', 'J': '𝔍', 'K': '𝔎', 'L': '𝔏', 'M': '𝔐', 'N': '𝔑', 'O': '𝔒', 'P': '𝔓',
            'Q': '𝔔', 'R': 'ℜ', 'S': '𝔖', 'T': '𝔗', 'U': '𝔘', 'V': '𝔙', 'W': '𝔚', 'X': '𝔛',
            'Y': '𝔜', 'Z': 'ℨ', 'a': '𝔞', 'b': '𝔟', 'c': '𝔠', 'd': '𝔡', 'e': '𝔢', 'f': '𝔣',
            'g': '𝔤', 'h': '𝔥', 'i': '𝔦', 'j': '𝔧', 'k': '𝔨', 'l': '𝔩', 'm': '𝔪', 'n': '𝔫',
            'o': '𝔬', 'p': '𝔭', 'q': '𝔮', 'r': '𝔯', 's': '𝔰', 't': '𝔱', 'u': '𝔲', 'v': '𝔳',
            'w': '𝔴', 'x': '𝔵', 'y': '𝔶', 'z': '𝔷'
        }
    },
    doubleStruck: {
        custom: {
            'A': '𝔸', 'B': '𝔹', 'C': 'ℂ', 'D': '𝔻', 'E': '𝔼', 'F': '𝔽', 'G': '𝔾', 'H': 'ℍ',
            'I': '𝕀', 'J': '𝕁', 'K': '𝕂', 'L': '𝕃', 'M': '𝕄', 'N': 'ℕ', 'O': '𝕆', 'P': 'ℙ',
            'Q': 'ℚ', 'R': 'ℝ', 'S': '𝕊', 'T': '𝕋', 'U': '𝕌', 'V': '𝕍', 'W': '𝕎', 'X': '𝕏',
            'Y': '𝕐', 'Z': 'ℤ', 'a': '𝕒', 'b': '𝕓', 'c': '𝕔', 'd': '𝕕', 'e': '𝕖', 'f': '𝕗',
            'g': '𝕘', 'h': '𝕙', 'i': '𝕚', 'j': '𝕛', 'k': '𝕜', 'l': '𝕝', 'm': '𝕞', 'n': '𝕟',
            'o': '𝕠', 'p': '𝕡', 'q': '𝕢', 'r': '𝕣', 's': '𝕤', 't': '𝕥', 'u': '𝕦', 'v': '𝕧',
            'w': '𝕨', 'x': '𝕩', 'y': '𝕪', 'z': '𝕫'
        }
    },
    monospace: { start: 0x1D670, startLower: 0x1D68A },
    sansSerif: { start: 0x1D5A0, startLower: 0x1D5BA },
    sansSerifBold: { start: 0x1D5D4, startLower: 0x1D5EE },
    sansSerifItalic: { start: 0x1D608, startLower: 0x1D622 },
    sansSerifBoldItalic: { start: 0x1D63C, startLower: 0x1D656 },
    serif: { start: 0x1D400, startLower: 0x1D41A },
    serifBoldItalic: { start: 0x1D468, startLower: 0x1D482 }
};

const smallCapsMap = { 'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ', 'f': 'ꜰ', 'g': 'ɢ', 'h': 'ʜ', 'i': 'ɪ', 'j': 'ᴊ', 'k': 'ᴋ', 'l': 'ʟ', 'm': 'ᴍ', 'n': 'ɴ', 'o': 'ᴏ', 'p': 'ᴘ', 'q': 'ǫ', 'r': 'ʀ', 's': 'ꜱ', 't': 'ᴛ', 'u': 'ᴜ', 'v': 'ᴠ', 'w': 'ᴡ', 'x': 'x', 'y': 'ʏ', 'z': 'ᴢ' };
const superscriptMap = { 'a': 'ᵃ', 'b': 'ᵇ', 'c': 'ᶜ', 'd': 'ᵈ', 'e': 'ᵉ', 'f': 'ᶠ', 'g': 'ᵍ', 'h': 'ʰ', 'i': 'ⁱ', 'j': 'ʲ', 'k': 'ᵏ', 'l': 'ˡ', 'm': 'ᵐ', 'n': 'ⁿ', 'o': 'ᵒ', 'p': 'ᵖ', 'r': 'ʳ', 's': 'ˢ', 't': 'ᵗ', 'u': 'ᵘ', 'v': 'ᵛ', 'w': 'ʷ', 'x': 'ˣ', 'y': 'ʸ', 'z': 'ᶻ', 'A': 'ᴬ', 'B': 'ᴮ', 'D': 'ᴰ', 'E': 'ᴱ', 'G': 'ᴳ', 'H': 'ᴴ', 'I': 'ᴵ', 'J': 'ᴶ', 'K': 'ᴷ', 'L': 'ᴸ', 'M': 'ᴹ', 'N': 'ᴺ', 'O': 'ᴼ', 'P': 'ᴾ', 'R': 'ᴿ', 'T': 'ᵀ', 'U': 'ᵁ', 'V': 'ⱽ', 'W': 'ᵂ' };
const subscriptMap = { 'a': 'ₐ', 'e': 'ₑ', 'h': 'ₕ', 'i': 'ᵢ', 'j': 'ⱼ', 'k': 'ₖ', 'l': 'ₗ', 'm': 'ₘ', 'n': 'ₙ', 'o': 'ₒ', 'p': 'ₚ', 'r': 'ᵣ', 's': 'ₛ', 't': 'ₜ', 'u': 'ᵤ', 'v': 'ᵥ', 'x': 'ₓ', '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉' };
const upsideDownMap = { 'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ', 'i': 'ᴉ', 'j': 'ɾ', 'k': 'ʞ', 'l': 'ʃ', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd', 'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x', 'y': 'ʎ', 'z': 'z', ' ': ' ', '.': '˙', ',': "'", '?': '¿', '!': '¡' };
const brailleMap = { 'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑', 'f': '⠋', 'g': '⠛', 'h': '⠓', 'i': '⠊', 'j': '⠚', 'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝', 'o': '⠕', 'p': '⠏', 'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞', 'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭', 'y': '⠽', 'z': '⠵', ' ': '⠀' };

// Custom italic character mapping
const italicMap = {
    // Uppercase letters
    'A': '𝐴', 'B': '𝐵', 'C': '𝐶', 'D': '𝐷', 'E': '𝐸',
    'F': '𝐹', 'G': '𝐺', 'H': '𝐻', 'I': '𝐼', 'J': '𝐽',
    'K': '𝐾', 'L': '𝐿', 'M': '𝑀', 'N': '𝑁', 'O': '𝑂',
    'P': '𝑃', 'Q': '𝑄', 'R': '𝑅', 'S': '𝑆', 'T': '𝑇',
    'U': '𝑈', 'V': '𝑉', 'W': '𝑊', 'X': '𝑋', 'Y': '𝑌',
    'Z': '𝑍',
    
    // Lowercase letters
    'a': '𝑎', 'b': '𝑏', 'c': '𝑐', 'd': '𝑑', 'e': '𝑒',
    'f': '𝑓', 'g': '𝑔', 'h': 'ℎ', 'i': '𝑖', 'j': '𝑗',
    'k': '𝑘', 'l': '𝑙', 'm': '𝑚', 'n': '𝑛', 'o': '𝑜',
    'p': '𝑝', 'q': '𝑞', 'r': '𝑟', 's': '𝑠', 't': '𝑡',
    'u': '𝑢', 'v': '𝑣', 'w': '𝑤', 'x': '𝑥', 'y': '𝑦',
    'z': '𝑧'
};

function convertToCustomItalic(text) {
    return [...text].map(char => italicMap[char] || char).join('');
}

// Add to styles array
const customItalicStyle = {
    name: 'Custom Italic',
    fn: text => convertToCustomItalic(text),
    category: 'emphasis'
};

// Update the styles array

let currentFilter = '';
let showingFavorites = false;
let userFavorites = JSON.parse(localStorage.getItem('fontFavorites') || '[]');
let editorHistory = [];
let historyIndex = -1;

function convertToUnicode(text, style) {
    if (!unicodeMaps[style]) return text;
    const map = unicodeMaps[style];
    if (map.custom) {
        return [...text].map(char => map.custom[char] || char).join('');
    }
    return [...text].map(char => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) { // A-Z
            return String.fromCodePoint(map.start + code - 65);
        } else if (code >= 97 && code <= 122) { // a-z
            return String.fromCodePoint(map.startLower + code - 97);
        }
        return char;
    }).join('');
}

function convertToSmallCaps(text) { return [...text].map(char => smallCapsMap[char.toLowerCase()] || char.toUpperCase()).join(''); }
function convertToSuperscript(text) { return [...text].map(char => superscriptMap[char] || char).join(''); }
function convertToSubscript(text) { return [...text].map(char => subscriptMap[char] || char).join(''); }
function convertUpsideDown(text) { return text.split('').reverse().map(char => upsideDownMap[char.toLowerCase()] || char).join(''); }
function convertToBraille(text) { return [...text].map(char => brailleMap[char.toLowerCase()] || char).join(''); }
function convertToFullwidth(text) { return [...text].map(char => { if (char === ' ') return '　'; const code = char.charCodeAt(0); if (code >= 33 && code <= 126) { return String.fromCharCode(code + 0xFEE0); } return char; }).join(''); }
function addCombiningChar(text, combiningChar) { return [...text].map(char => char === ' ' ? char : char + combiningChar).join(''); }

function generateStyles() {
    const text = document.getElementById('inputText').value;
    const container = document.getElementById('outputContainer');
    const displayText = text || 'Sample Text';
    const filteredStyles = styles.filter(style =>
        (!currentFilter || style.name.toLowerCase().includes(currentFilter.toLowerCase())) &&
        (!showingFavorites || userFavorites.includes(style.name))
    );
    container.innerHTML = '';
    if (filteredStyles.length === 0) {
        container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: #999; font-style: italic; padding: 2rem;">No fonts match your search. Try a different keyword! 🔍</div>';
        return;
    }
    filteredStyles.forEach((style, index) => {
        const div = document.createElement('div');
        div.className = 'style-block';
        div.setAttribute('data-style', style.name);
        const styledText = style.fn(displayText);
        const isFavorited = userFavorites.includes(style.name);
        div.innerHTML = `<div class="style-name">${style.name}</div><div class="style-output" onclick="copyToClipboard('${styledText.replace(/'/g, "\\'")}', '${style.name}')">${styledText}</div><button class="copy-btn" onclick="copyToClipboard('${styledText.replace(/'/g, "\\'")}', '${style.name}')" title="Copy to clipboard">📋</button><button class="fav-btn ${isFavorited ? 'favorited' : ''}" onclick="toggleFavorite(event, '${style.name}')" title="${isFavorited ? 'Remove from favorites' : 'Add to favorites'}">${isFavorited ? '❤️' : '🤍'}</button>`;
        div.style.animationDelay = `${index * 0.02}s`;
        container.appendChild(div);
    });
}

function copyToClipboard(text, styleName) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification(`${styleName} copied!`);
    }).catch(() => {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification(`${styleName} copied!`);
    });
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => { notification.classList.remove('show'); }, 2000);
}

function clearText() { document.getElementById('inputText').value = ''; generateStyles(); }

function advancedTextEditor() {
    const targetElement = document.getElementById('textEditor');
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }
}

function copyAllStyles() {
    const text = document.getElementById('inputText').value;
    if (!text.trim()) return;
    let allStyles = '';
    styles.forEach(style => { allStyles += `${style.name}: ${style.fn(text)}\n\n`; });
    copyToClipboard(allStyles, 'All styles');
}

function filterStyles() { currentFilter = document.getElementById('searchInput').value; generateStyles(); }

function toggleFavorites() {
    showingFavorites = !showingFavorites;
    document.getElementById('favBtn').textContent = showingFavorites ? 'Show All' : `Show Favorites (${getFavoriteCount() || ''})`.trim();
    generateStyles();
    if (showingFavorites && userFavorites.length === 0) {
        showNotification('No favorites yet! Click the heart ❤️ to add one.');
    }
}

function toggleFavorite(event, styleName) {
    event.stopPropagation();
    const index = userFavorites.indexOf(styleName);
    if (index === -1) {
        userFavorites.push(styleName);
        showNotification(`${styleName} added to favorites! ❤️`);
    } else {
        userFavorites.splice(index, 1);
        showNotification(`${styleName} removed from favorites! 💔`);
    }
    localStorage.setItem('fontFavorites', JSON.stringify(userFavorites));
    updateFavoritesButton();
    if (showingFavorites) {
        const block = document.querySelector(`.style-block[data-style="${styleName}"]`);
        if (block) block.remove();
    } else {
        const favButton = event.target;
        favButton.innerHTML = userFavorites.includes(styleName) ? '❤️' : '🤍';
        favButton.classList.toggle('favorited', userFavorites.includes(styleName));
    }
}

function showAllFonts() {
    showingFavorites = false;
    currentFilter = '';
    updateFavoritesButton();
    document.getElementById('searchInput').value = '';
    generateStyles();
    showNotification(`Showing all ${styles.length} font styles! 🎨`);
}

function getFavoriteCount() { return userFavorites.length; }

function convertToBubble(text) { const map = { 'a': 'ⓐ', 'b': 'ⓑ', 'c': 'ⓒ', 'd': 'ⓓ', 'e': 'ⓔ', 'f': 'ⓕ', 'g': 'ⓖ', 'h': 'ⓗ', 'i': 'ⓘ', 'j': 'ⓙ', 'k': 'ⓚ', 'l': 'ⓛ', 'm': 'ⓜ', 'n': 'ⓝ', 'o': 'ⓞ', 'p': 'ⓟ', 'q': 'ⓠ', 'r': 'ⓡ', 's': 'ⓢ', 't': 'ⓣ', 'u': 'ⓤ', 'v': 'ⓥ', 'w': 'ⓦ', 'x': 'ⓧ', 'y': 'ⓨ', 'z': 'ⓩ' }; return [...text].map(char => map[char.toLowerCase()] || char).join(''); }
function convertToSquare(text) { const map = { 'a': '🄰', 'b': '🄱', 'c': '🄲', 'd': '🄳', 'e': '🄴', 'f': '🄵', 'g': '🄶', 'h': '🄷', 'i': '🄸', 'j': '🄹', 'k': '🄺', 'l': '🄻', 'm': '🄼', 'n': '🄽', 'o': '🄾', 'p': '🄿', 'q': '🅀', 'r': '🅁', 's': '🅂', 't': '🅃', 'u': '🅄', 'v': '🅅', 'w': '🅆', 'x': '🅇', 'y': '🅈', 'z': '🅉' }; return [...text].map(char => map[char.toLowerCase()] || char).join(''); }
function convertToCircled(text) { const map = { 'a': 'Ⓐ', 'b': 'Ⓑ', 'c': 'Ⓒ', 'd': 'Ⓓ', 'e': 'Ⓔ', 'f': 'Ⓕ', 'g': 'Ⓖ', 'h': 'Ⓗ', 'i': 'Ⓘ', 'j': 'Ⓙ', 'k': 'Ⓚ', 'l': 'Ⓛ', 'm': 'Ⓜ', 'n': 'Ⓝ', 'o': 'Ⓞ', 'p': 'Ⓟ', 'q': 'Ⓠ', 'r': 'Ⓡ', 's': 'Ⓢ', 't': 'Ⓣ', 'u': 'Ⓤ', 'v': 'Ⓥ', 'w': 'Ⓦ', 'x': 'Ⓧ', 'y': 'Ⓨ', 'z': 'Ⓩ' }; return [...text].map(char => map[char.toLowerCase()] || char).join(''); }
function convertToNegativeCircled(text) { const map = { 'a': '🅐', 'b': '🅑', 'c': '🅒', 'd': '🅓', 'e': '🅔', 'f': '🅕', 'g': '🅖', 'h': '🅗', 'i': '🅘', 'j': '🅙', 'k': '🅚', 'l': '🅛', 'm': '🅜', 'n': '🅝', 'o': '🅞', 'p': '🅟', 'q': '🅠', 'r': '🅡', 's': '🅢', 't': '🅣', 'u': '🅤', 'v': '🅥', 'w': '🅦', 'x': '🅧', 'y': '🅨', 'z': '🅩' }; return [...text].map(char => map[char.toLowerCase()] || char).join(''); }
function convertToParenthesized(text) { const map = { 'a': '⒜', 'b': '⒝', 'c': '⒞', 'd': '⒟', 'e': '⒠', 'f': '⒡', 'g': '⒢', 'h': '⒣', 'i': '⒤', 'j': '⒥', 'k': '⒦', 'l': '⒧', 'm': '⒨', 'n': '⒩', 'o': '⒪', 'p': '⒫', 'q': '⒬', 'r': '⒭', 's': '⒮', 't': '⒯', 'u': '⒰', 'v': '⒱', 'w': '⒲', 'x': '⒳', 'y': '⒴', 'z': '⒵' }; return [...text].map(char => map[char.toLowerCase()] || char).join(''); }
function convertToMirror(text) { const map = { 'a': 'ɒ', 'b': 'd', 'c': 'ɔ', 'd': 'b', 'e': 'ɘ', 'f': 'ʇ', 'g': 'ϱ', 'h': 'ʜ', 'i': 'i', 'j': 'Ⴑ', 'k': 'ʞ', 'l': '|', 'm': 'm', 'n': 'n', 'o': 'o', 'p': 'q', 'q': 'p', 'r': 'ɿ', 's': 'ꙅ', 't': 'ƚ', 'u': 'u', 'v': 'v', 'w': 'w', 'x': 'x', 'y': 'ʏ', 'z': 'z' }; return [...text].map(char => map[char.toLowerCase()] || char).join(''); }
function convertToZalgo(text) { const zalgoChars = ['̀', '́', '̂', '̃', '̄', '̅', '̆', '̇', '̈', '̉', '̊', '̋', '̌', '̍', '̎', '̏']; return [...text].map(char => { if (char === ' ') return char; let zalgoChar = char; for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) { zalgoChar += zalgoChars[Math.floor(Math.random() * zalgoChars.length)]; } return zalgoChar; }).join(''); }
function convertToLeet(text) { const map = { 'a': '4', 'b': '8', 'c': '<', 'd': '|)', 'e': '3', 'f': '|=', 'g': '6', 'h': '|-|', 'i': '1', 'j': '_|', 'k': '|<', 'l': '|_', 'm': '|\\/|', 'n': '|\\|', 'o': '0', 'p': '|°', 'q': '9', 'r': '|2', 's': '5', 't': '7', 'u': '|_|', 'v': '\\/', 'w': '\\/\\/', 'x': '><', 'y': '`/', 'z': '2' }; return [...text].map(char => map[char.toLowerCase()] || char).join(''); }
function convertToMorse(text) { const map = { 'a': '.-', 'b': '-...', 'c': '-.-.', 'd': '-..', 'e': '.', 'f': '..-.', 'g': '--.', 'h': '....', 'i': '..', 'j': '.---', 'k': '-.-', 'l': '.-..', 'm': '--', 'n': '-.', 'o': '---', 'p': '.--.', 'q': '--.-', 'r': '.-.', 's': '...', 't': '-', 'u': '..-', 'v': '...-', 'w': '.--', 'x': '-..-', 'y': '-.--', 'z': '--..', ' ': '/' }; return [...text].map(char => map[char.toLowerCase()] || char).join(' '); }
function convertToBinary(text) { return [...text].map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' '); }
function convertToROT13(text) { return [...text].map(char => { if (char >= 'a' && char <= 'z') return String.fromCharCode((char.charCodeAt(0) - 97 + 13) % 26 + 97); else if (char >= 'A' && char <= 'Z') return String.fromCharCode((char.charCodeAt(0) - 65 + 13) % 26 + 65); return char; }).join(''); }
function convertToAlternatingCase(text) { return [...text].map((char, index) => index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()).join(''); }
function convertToTitleCase(text) { return text.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()); }
function convertToSentenceCase(text) { return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase(); }
function convertToInvertCase(text) { return [...text].map(char => char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()).join(''); }

// --- New Functions for Selective Editor ---
function populateStyleSelector() {
    const selector = document.getElementById('styleSelector');
    selector.innerHTML = '';
    // Filter for styles that are good for selective application (visual transformations)
    const applicableStyles = styles.filter(s => ['emphasis', 'classic', 'modern', 'gothic', 'handwriting', 'math', 'special', 'shapes', 'decoration'].includes(s.category));

    applicableStyles.forEach(style => {
        const option = document.createElement('option');
        option.value = style.name;
        option.textContent = style.name;
        selector.appendChild(option);
    });
}

function applySelectedStyle() {
    const selector = document.getElementById('styleSelector');
    const styleName = selector.value;
    const style = styles.find(s => s.name === styleName);

    if (!style) return;

    const selection = window.getSelection();
    if (!selection.rangeCount || selection.isCollapsed) {
        showNotification('Please select some text in the editor first!');
        return;
    }

    const range = selection.getRangeAt(0);
    const selectedText = selection.toString();

    // Always apply effect to the plain text version of the selection
    // Remove any previous font effects by extracting only the textContent
    const plainText = selectedText.normalize('NFKD').replace(/[\u0300-\u036F]/g, '');

    const styledText = style.fn(plainText);

    range.deleteContents();
    range.insertNode(document.createTextNode(styledText));
    saveEditorState(); // Save after applying style
}

function copyEditorContent() {
    const editor = document.getElementById('textEditor');
    const text = editor.innerText;
    if (!text.trim()) {
        showNotification('Nothing to copy!');
        return;
    }
    copyToClipboard(text, 'Editor content');
}

function clearEditor() {
    document.getElementById('textEditor').innerHTML = '';
}

function updateFavoritesButton() {
    const favBtn = document.getElementById('favBtn');
    const count = getFavoriteCount();
    favBtn.textContent = `Show Favorites ${count > 0 ? `(${count})` : ''}`.trim();
}

// History management for the editor
function saveEditorState() {
    const editor = document.getElementById('textEditor');
    // Save both HTML and selection
    editorHistory = editorHistory.slice(0, historyIndex + 1);
    editorHistory.push(editor.innerHTML);
    historyIndex = editorHistory.length - 1;
}

function restoreEditorState() {
    const editor = document.getElementById('textEditor');
    if (historyIndex >= 0 && historyIndex < editorHistory.length) {
        editor.innerHTML = editorHistory[historyIndex];
    }
}

document.getElementById('textEditor').addEventListener('input', saveEditorState);

document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'z') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            restoreEditorState();
        }
    }
    if (e.ctrlKey && e.key === 'y') {
        e.preventDefault();
        if (historyIndex < editorHistory.length - 1) {
            historyIndex++;
            restoreEditorState();
        }
    }
});

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('inputText').value = '';
    updateFavoritesButton();
    generateStyles(); // This will now show "Sample Text" in all font styles
    populateStyleSelector(); // Populate the dropdown for the new editor
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'a' && e.target.id !== 'inputText' && e.target.id !== 'textEditor') {
        e.preventDefault();
        copyAllStyles();
    }
});

// Add these new maps after your existing Unicode maps
const sansSerifAllCapsMap = {
    'a': '𝖠', 'b': '𝖡', 'c': '𝖢', 'd': '𝖣', 'e': '𝖤',
    'f': '𝖥', 'g': '𝖦', 'h': '𝖧', 'i': '𝖨', 'j': '𝖩',
    'k': '𝖪', 'l': '𝖫', 'm': '𝖬', 'n': '𝖭', 'o': '𝖮',
    'p': '𝖯', 'q': '𝖰', 'r': '𝖱', 's': '𝖲', 't': '𝖳',
    'u': '𝖴', 'v': '𝖵', 'w': '𝖶', 'x': '𝖷', 'y': '𝖸',
    'z': '𝖹',
    'A': '𝖠', 'B': '𝖡', 'C': '𝖢', 'D': '𝖣', 'E': '𝖤',
    'F': '𝖥', 'G': '𝖦', 'H': '𝖧', 'I': '𝖨', 'J': '𝖩',
    'K': '𝖪', 'L': '𝖫', 'M': '𝖬', 'N': '𝖭', 'O': '𝖮',
    'P': '𝖯', 'Q': '𝖰', 'R': '𝖱', 'S': '𝖲', 'T': '𝖳',
    'U': '𝖴', 'V': '𝖵', 'W': '𝖶', 'X': '𝖷', 'Y': '𝖸',
    'Z': '𝖹'
};

const sansSerifAllCapsBoldMap = {
    'a': '𝗔', 'b': '𝗕', 'c': '𝗖', 'd': '𝗗', 'e': '𝗘',
    'f': '𝗙', 'g': '𝗚', 'h': '𝗛', 'i': '𝗜', 'j': '𝗝',
    'k': '𝗞', 'l': '𝗟', 'm': '𝗠', 'n': '𝗡', 'o': '𝗢',
    'p': '𝗣', 'q': '𝗤', 'r': '𝗥', 's': '𝗦', 't': '𝗧',
    'u': '𝗨', 'v': '𝗩', 'w': '𝗪', 'x': '𝗫', 'y': '𝗬',
    'z': '𝗭',
    'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘',
    'F': '𝗙', 'G': '𝗚', 'H': '𝗛', 'I': '𝗜', 'J': '𝗝',
    'K': '𝗞', 'L': '𝗟', 'M': '𝗠', 'N': '𝗡', 'O': '𝗢',
    'P': '𝗣', 'Q': '𝗤', 'R': '𝗥', 'S': '𝗦', 'T': '𝗧',
    'U': '𝗨', 'V': '𝗩', 'W': '𝗪', 'X': '𝗫', 'Y': '𝗬',
    'Z': '𝗭'
};

// Add these conversion functions
function convertToSansSerifAllCaps(text) {
    return [...text].map(char => sansSerifAllCapsMap[char] || char).join('');
}

function convertToSansSerifAllCapsBold(text) {
    return [...text].map(char => sansSerifAllCapsBoldMap[char] || char).join('');
}

// Add these new styles to your styles array
const newStyles = [
    { 
        name: 'Sans Serif All Caps', 
        fn: text => convertToSansSerifAllCaps(text), 
        category: 'modern' 
    },
    { 
        name: 'Sans Serif All Caps Bold', 
        fn: text => convertToSansSerifAllCapsBold(text), 
        category: 'modern' 
    }
];

// Update your styles array by adding these at the beginning of your existing styles array
styles.unshift(...newStyles);
