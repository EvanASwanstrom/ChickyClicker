// Firebase Leaderboard for Chicken Clicker

// console.log('Leaderboard.js loaded');
// console.log('Firebase available?', typeof firebase !== 'undefined');
// console.log('Database available?', typeof firebase?.database !== 'undefined');


let playerId = localStorage.getItem('playerId');

if (!playerId) {
    // First time player - generate a unique ID
    playerId = 'player_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('playerId', playerId);
    // // console.log('New player ID created');
} else {
    // // console.log('Existing player ID found:', playerId);
}



let playerName = localStorage.getItem('playerName') || null;

function promptForName() {
    const name = prompt('Enter your name for the leaderboard (max 20 characters):');
    
    if (name && name.trim().length > 0) {
        // Clean the name: max 20 chars, remove special characters
        playerName = name.trim().substring(0, 20).replace(/[^a-zA-Z0-9 _-]/g, '');
        localStorage.setItem('playerName', playerName);
        // // console.log('Player name set to:', playerName);
    } else {
        // User cancelled or entered nothing
        playerName = 'Anonymous';
        localStorage.setItem('playerName', playerName);
    }
}


function submitScore() {
    // Safety checks: make sure all required data exists
    if (!playerName) {
        promptForName();
    }
    
    if (typeof ChickenCount === 'undefined' || typeof ChickenRate === 'undefined') {
        return;
    }
    
    try {
        // Prepare the score data object
        const scoreData = {
            name: playerName,
            chickens: ChickenCount.toString(), // Convert Decimal to string for storage
            rate: ChickenRate.toString(),
            timestamp: firebase.database.ServerValue.TIMESTAMP, // Server timestamp
            playerId: playerId
        };
        
        
        // Send to Firebase
        // Path: leaderboard/player_123456/
        firebase.database()
            .ref('leaderboard/' + playerId)
            .set(scoreData)
            .then(() => {
                // console.log('Score submitted successfully!');
            })
            .catch((error) => {
                console.error('Error submitting score:', error);
            });
            
    } catch (error) {
        console.error('Error in submitScore:', error);
    }
}




function loadLeaderboard() {
    // console.log('Loading leaderboard...');
    
    // Get reference to the leaderboard in Firebase
    const leaderboardRef = firebase.database().ref('leaderboard');
    
    // Listen for ANY changes to the leaderboard
    // This fires immediately on load, then again whenever data changes
    leaderboardRef.on('value', (snapshot) => {
        
        const data = snapshot.val();
        
        // Check if any data exists
        if (!data) {
            updateLeaderboardUI([]);
            return;
        }
        
        
        // Convert object to array
        // Firebase returns: { player_123: {...}, player_456: {...} }
        // We need: [ {...}, {...} ]
        const entries = Object.values(data);
        
        
        // Sort by chicken count (highest first)
        entries.sort((a, b) => {
            const aChickens = new Decimal(a.rate);
            const bChickens = new Decimal(b.rate);
            
            // Compare using Decimal library (handles huge numbers)
            if (bChickens.gt(aChickens)) return 1;  // b is greater
            if (bChickens.lt(aChickens)) return -1; // a is greater
            return 0; // equal
        });
        
        
        // Take only top 5
        // const top5 = entries.slice(0, 5);
        
        // Update the HTML display
        updateLeaderboardUI(entries);
    });
}

function updateLeaderboardUI(entries) {
    
    const container = document.getElementById('leaderboard');
    
    if (!container) {
        console.error('Leaderboard container not found!');
        return;
    }
    
    // Handle empty leaderboard
    if (entries.length === 0) {
        container.innerHTML = '<p>No scores yet. </p>';
        return;
    }
    
    // Build the HTML
    let html = '<ol>';
    //loops 5 times
    entries.slice(0, 10).forEach((entry, index) => {
        // Format the numbers for display
        const chickens = formatNumber(new Decimal(entry.chickens));
        const rate = new Decimal(entry.rate).toFixed(1);
        
        // Check if this is the current player's score
        const isCurrentPlayer = entry.playerId === playerId;
    
        html += `<li${isCurrentPlayer ? ' style="font-weight: bold; color: green;"' : ''}>
            <span class="leaderboard-name">${escapeHtml(entry.name)}</span> - 
            <span class="leaderboard-chickens">${chickens} chickens</span> - 
            <span class="leaderboard-rate">(${rate} chickens/sec)</span>
        </li>`;
        
        
        
    });

    // shows slot 6 as current player and rank
    const currentPlayerIndex = entries.findIndex(e => e.playerId === playerId);
    //console.log(entries);
    if (currentPlayerIndex > 10) {
        const currentPlayer = entries[currentPlayerIndex];
        const chickens = formatNumber(new Decimal(currentPlayer.chickens));
        const rate = new Decimal(currentPlayer.rate).toFixed(1);
        const actualRank = currentPlayerIndex + 1; // Convert index to rank (1-based)
        html += `<li value="${actualRank}" style="font-weight: bold; color: green;">
            <span class="leaderboard-name">${escapeHtml(currentPlayer.name)}</span> - 
            <span class="leaderboard-chickens">${chickens} chickens</span> - 
            <span class="leaderboard-rate">(${rate} chickens/sec)</span>
        </li>`;
    }
    
    html += '</ol>';
    
    // Insert into the page
    container.innerHTML = html;
    // console.log('Leaderboard UI updated');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Submit score every 30 seconds
setInterval(() => {
    submitScore();
}, 30000);

// Submit score when page is closed
window.addEventListener('beforeunload', () => {
    submitScore();
});

// Manual submit button
function submitScoreManually() {
    submitScore();
    alert('Score submitted to leaderboard!');
}

// Change name function
function changePlayerName() {
    playerName = null;
    localStorage.removeItem('playerName');
    promptForName();
    submitScore();
}

// Initialize leaderboard on page load
loadLeaderboard();

// Submit initial score
setTimeout(() => {
    submitScore();
    loadLeaderboard();

    const testRef = firebase.database().ref('leaderboard');

    testRef.once('value')
        .then((snapshot) => {
        })
        .catch((error) => {
            console.error('Connection failed:', error);
        });
}, 2000);