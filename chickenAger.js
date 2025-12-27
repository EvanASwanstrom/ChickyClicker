// Simple Chicken Aging - Loops through 6 stages using image URLs

const stages = [
    'Full_Egg',
    'Cracked_Egg',
    'Hatchling',
    'Chick',
    'Juvenile',
    'Adult'
];

// Costs to progress to each stage (index 0 has no cost, index 1+ are the progression costs)
const stageCosts = [
    0,           // Full_Egg - starting stage, no cost
    2500,       // Cracked_Egg
    25000,      // Hatchling
    150000,     // Chick
    1000000,    // Juvenile
    75000000     // Adult
];

// Buffs per stage (production %, click damage %)
const stageBuffs = [
    { production: 0,    clickDamage: 0 },    // Full_Egg - no buff
    { production: 0.05, clickDamage: 0.05 }, // Cracked_Egg - +5%
    { production: 0.10, clickDamage: 0.10 }, // Hatchling - +10%
    { production: 0.20, clickDamage: 0.20 }, // Chick - +20%
    { production: 0.40, clickDamage: 0.40 }, // Juvenile - +40%
    { production: 0.80, clickDamage: 0.80 }  // Adult - +80%
];

// Building requirements to progress to each stage
const stageRequirements = [
    {},                                                          // Full_Egg - no requirements
    { Dealer: 5 },                                               // Cracked_Egg - requires 5 Dealers
    { Dealer: 10, Breeder: 5 },                                  // Hatchling - requires 10 Dealers, 5 Breeders
    { Dealer: 20, Breeder: 10, Market: 5 },                      // Chick - requires 20 Dealers, 10 Breeders, 5 Markets
    { Dealer: 30, Breeder: 20, Market: 10, Ranch: 5 },           // Juvenile - requires 30 Dealers, 20 Breeders, 10 Markets, 5 Ranches
    { Breeder: 30, Market: 20, Ranch: 10, Mine: 5, Factory: 1 }  // Adult - requires 30 Breeders, 20 Markets, 10 Ranches, 5 Mines, 1 Factory
];

// Store as URL path instead of number
let currentStageUrl = localStorage.getItem('chickenStageUrl') || `images/${stages[0]}.png`;

function getCurrentStageIndex() {
    // Extract stage name from URL (e.g., "images/Chick.png" -> "Chick")
    const match = currentStageUrl.match(/images\/(.+)\.png/);
    if (match) {
        const stageName = match[1];
        const index = stages.indexOf(stageName);
        return index >= 0 ? index : 0;
    }
    return 0;
}

function getCurrentBuffs() {
    const index = getCurrentStageIndex();
    return stageBuffs[index] || { production: 0, clickDamage: 0 };
}

function getProductionMultiplier() {
    const buffs = getCurrentBuffs();
    return 1 + buffs.production;
}

function getClickDamageMultiplier() {
    const buffs = getCurrentBuffs();
    return 1 + buffs.clickDamage;
}

function getNextStageCost() {
    const currentIndex = getCurrentStageIndex();
    const nextIndex = (currentIndex + 1) % 6;
    return stageCosts[nextIndex];
}

function checkBuildingRequirements(stageIndex) {
    const requirements = stageRequirements[stageIndex];
    const missing = [];
    
    for (const [building, required] of Object.entries(requirements)) {
        const owned = window[`${building}Count`] || 0;
        if (owned < required) {
            missing.push(`${building}: ${owned}/${required}`);
        }
    }
    
    return missing;
}

function getBuildingRequirementsText(stageIndex) {
    const requirements = stageRequirements[stageIndex];
    if (Object.keys(requirements).length === 0) return 'None';
    
    return Object.entries(requirements)
        .map(([building, required]) => {
            const owned = window[`${building}Count`] || 0;
            const met = owned >= required;
            const color = met ? 'lime' : 'red';
            return `<span style="color: ${color}">${building}: ${owned}/${required}</span>`;
        })
        .join(', ');
}

function cycleStage() {
    const currentIndex = getCurrentStageIndex();
    const nextIndex = (currentIndex + 1) % 6;
    const nextCost = stageCosts[nextIndex];
    
    // Check building requirements first
    const missingBuildings = checkBuildingRequirements(nextIndex);
    if (missingBuildings.length > 0) {
        alert(`Missing buildings!\n\nRequired: ${missingBuildings.join(', ')}`);
        return;
    }
    
    // Check if player has enough chickens
    if (ChickenCount.lt(nextCost)) {
        const needed = ChickenCount.sub ? ChickenCount.sub(nextCost).abs() : nextCost - ChickenCount;
        alert(`Not enough chickens! You need ${needed.toLocaleString()} more.`);
        return;
    }
    
    // Deduct cost and advance stage (using Decimal math)
    ChickenCount = ChickenCount.minus(nextCost);
    currentStageUrl = `images/${stages[nextIndex]}.png`;
    localStorage.setItem('chickenStageUrl', currentStageUrl);
    updateStageDisplay();
    updateButtonDisplay();
    updateAllUI(); // Update the main display
}

function updateButtonDisplay() {
    const button = document.getElementById('ageUpButton');
    const costEl = document.getElementById('ageUpCost');
    const reqEl = document.getElementById('ageRequirements');
    
    if (!button || !costEl) return;
    
    const nextCost = getNextStageCost();
    const currentIndex = getCurrentStageIndex();
    const nextIndex = (currentIndex + 1) % 6;
    
    // Disable button if at final stage or not enough chickens
    if (currentIndex >= 5) {
        button.disabled = true;
        costEl.textContent = 'Max stage reached!';
        if (reqEl) reqEl.innerHTML = '';
    } else {
        const missingBuildings = checkBuildingRequirements(nextIndex);
        const canAfford = ChickenCount >= nextCost;
        const hasBuildings = missingBuildings.length === 0;
        button.disabled = !canAfford || !hasBuildings;
        
        // Format cost similar to shop items
        const formattedCost = typeof formatNumber === 'function' 
            ? formatNumber(new Decimal(nextCost))
            : nextCost.toLocaleString();
        costEl.textContent = `$${formattedCost}`;
        
        // Display requirements
        if (reqEl) {
            reqEl.innerHTML = `Requires: ${getBuildingRequirementsText(nextIndex)}`;
        }
    }
}

function getCurrentStageName() {
    const index = getCurrentStageIndex();
    return stages[index];
}

function updateStageDisplay() {
    const chickenElement = document.querySelector('.chicken');

    if (chickenElement) {
        chickenElement.style.setProperty('--chicken-image', `url('${currentStageUrl}')`);
    }
}

// Initialize on load
window.addEventListener('load', () => {
    getCurrentStageName();
    updateStageDisplay();
    updateButtonDisplay();
    
    // Update button state periodically as player gains/spends chickens
    setInterval(updateButtonDisplay, 100);
});

//every hour it releads the page
setInterval(() => {
    location.reload();
}, 3600000); // 3600000 ms = 1 hour

setInterval(() => {
    if (localStorage.getItem('version') < '2.0.0') {
        killCookies();
        localStorage.setItem('version', '2.0.0');
        location.reload();
    }
    
}, 60000); // Check every minute
