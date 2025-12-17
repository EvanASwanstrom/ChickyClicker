// Using Decimal from break_infinity.js for arbitrary precision

// Load values or set defaults
var ChickenCount = new Decimal(localStorage.getItem('ChickenCount') || 0);
var ChickenRate = new Decimal(localStorage.getItem('ChickenRate') || 0);

var DealerCount = parseInt(localStorage.getItem('DealerStored')) || 0;
var BreederCount = parseInt(localStorage.getItem('BreederStored')) || 0;
var MarketCount = parseInt(localStorage.getItem('MarketStored')) || 0;
var RanchCount = parseInt(localStorage.getItem('RanchStored')) || 0;
var MineCount = parseInt(localStorage.getItem('MineStored')) || 0;
var FactoryCount = parseInt(localStorage.getItem('FactoryStored')) || 0;

// Discount levels
var DealerDiscountLevel = parseInt(localStorage.getItem('DealerDiscountLevel')) || 0;
var BreederDiscountLevel = parseInt(localStorage.getItem('BreederDiscountLevel')) || 0;
var MarketDiscountLevel = parseInt(localStorage.getItem('MarketDiscountLevel')) || 0;
var RanchDiscountLevel = parseInt(localStorage.getItem('RanchDiscountLevel')) || 0;
var MineDiscountLevel = parseInt(localStorage.getItem('MineDiscountLevel')) || 0;
var FactoryDiscountLevel = parseInt(localStorage.getItem('FactoryDiscountLevel')) || 0;

// Format large numbers for display
function formatNumber(decimal) {
    if (decimal.lt(1000)) return decimal.floor().toString();
    if (decimal.lt(1e6)) return decimal.dividedBy(1e3).toFixed(2) + 'K';
    if (decimal.lt(1e9)) return decimal.dividedBy(1e6).toFixed(2) + 'M';
    if (decimal.lt(1e12)) return decimal.dividedBy(1e9).toFixed(2) + 'B';
    if (decimal.lt(1e15)) return decimal.dividedBy(1e12).toFixed(2) + 'T';
    if (decimal.lt(1e18)) return decimal.dividedBy(1e15).toFixed(2) + 'Qa';
    if (decimal.lt(1e21)) return decimal.dividedBy(1e18).toFixed(2) + 'Qi';
    if (decimal.lt(1e24)) return decimal.dividedBy(1e21).toFixed(2) + 'Sx';
    if (decimal.lt(1e27)) return decimal.dividedBy(1e24).toFixed(2) + 'Sp';
    if (decimal.lt(1e30)) return decimal.dividedBy(1e27).toFixed(2) + 'Oc';
    return decimal.toExponential(2);
}

// Calculate cost with discounts
function calculateCost(baseCost, count, discountLevel) {
    let base = new Decimal(baseCost);
    let multiplier = Decimal.pow(1.5, count);
    let discount = 1 - Math.min(discountLevel * 0.05, 0.95); // Max 95% discount
    return base.times(multiplier).times(discount).floor();
}

// Calculate discount cost
function calculateDiscountCost(baseCost, discountLevel) {
    return new Decimal(baseCost).times(Decimal.pow(1.5, discountLevel)).floor();
}

// Get current costs
function getDealerCost() { return calculateCost(15, DealerCount, DealerDiscountLevel); }
function getBreederCost() { return calculateCost(100, BreederCount, BreederDiscountLevel); }
function getMarketCost() { return calculateCost(500, MarketCount, MarketDiscountLevel); }
function getRanchCost() { return calculateCost(2000, RanchCount, RanchDiscountLevel); }
function getMineCost() { return calculateCost(10000, MineCount, MineDiscountLevel); }
function getFactoryCost() { return calculateCost(50000, FactoryCount, FactoryDiscountLevel); }

function getDealerDiscountCost() { return calculateDiscountCost(100, DealerDiscountLevel); }
function getBreederDiscountCost() { return calculateDiscountCost(500, BreederDiscountLevel); }
function getMarketDiscountCost() { return calculateDiscountCost(2000, MarketDiscountLevel); }
function getRanchDiscountCost() { return calculateDiscountCost(5000, RanchDiscountLevel); }
function getMineDiscountCost() { return calculateDiscountCost(20000, MineDiscountLevel); }
function getFactoryDiscountCost() { return calculateDiscountCost(100000, FactoryDiscountLevel); }

// Update UI on load
function updateAllUI() {
    document.getElementById('ChickenCount').textContent = formatNumber(ChickenCount) + ' Chickens';
    document.getElementById('ChickenRate').textContent = 'per second: ' + ChickenRate.toFixed(1);

    document.getElementById('DealerCount').textContent = DealerCount;
    document.getElementById('DealerCost').textContent = formatNumber(getDealerCost());
    
    document.getElementById('BreederCount').textContent = BreederCount;
    document.getElementById('BreederCost').textContent = formatNumber(getBreederCost());
    
    document.getElementById('MarketCount').textContent = MarketCount;
    document.getElementById('MarketCost').textContent = formatNumber(getMarketCost());
    
    document.getElementById('RanchCount').textContent = RanchCount;
    document.getElementById('RanchCost').textContent = formatNumber(getRanchCost());
    
    document.getElementById('MineCount').textContent = MineCount;
    document.getElementById('MineCost').textContent = formatNumber(getMineCost());
    
    document.getElementById('FactoryCount').textContent = FactoryCount;
    document.getElementById('FactoryCost').textContent = formatNumber(getFactoryCost());

    updateUpgradeUI();
}

function updateUpgradeUI() {
    document.getElementById('DealerDiscountCost').textContent = formatNumber(getDealerDiscountCost());
    document.getElementById('DealerDiscountLevel').textContent = (DealerDiscountLevel * 5) + '%';
    
    document.getElementById('BreederDiscountCost').textContent = formatNumber(getBreederDiscountCost());
    document.getElementById('BreederDiscountLevel').textContent = BreederDiscountLevel * 5 + '%';
    
    document.getElementById('MarketDiscountCost').textContent = formatNumber(getMarketDiscountCost());
    document.getElementById('MarketDiscountLevel').textContent = MarketDiscountLevel * 5 + '%';
    
    document.getElementById('RanchDiscountCost').textContent = formatNumber(getRanchDiscountCost());
    document.getElementById('RanchDiscountLevel').textContent = RanchDiscountLevel * 5 + '%';
    
    document.getElementById('MineDiscountCost').textContent = formatNumber(getMineDiscountCost());
    document.getElementById('MineDiscountLevel').textContent = MineDiscountLevel * 5 + '%';
    
    document.getElementById('FactoryDiscountCost').textContent = formatNumber(getFactoryDiscountCost());
    document.getElementById('FactoryDiscountLevel').textContent = FactoryDiscountLevel * 5 + '%';
}

updateAllUI();

// Auto-increment logic
var lastUpdate = Date.now();
function gameLoop() {
    const now = Date.now();
    const delta = (now - lastUpdate) / 1000; // seconds elapsed
    lastUpdate = now;
    
    if (ChickenRate.gt(0)) {
        ChickenCount = ChickenCount.plus(ChickenRate.times(delta));
        document.getElementById('ChickenCount').textContent = formatNumber(ChickenCount) + ' Chickens';
    }
    
    requestAnimationFrame(gameLoop);
}
gameLoop();

// Manual click
function incrementScore() {
    ChickenCount = ChickenCount.plus(1);
    document.getElementById('ChickenCount').textContent = formatNumber(ChickenCount) + ' Chickens';
    saveGame();
}

// Update shop UI
function updateShopUI(name, count, cost) {
    document.getElementById(name + 'Count').textContent = count;
    document.getElementById(name + 'Cost').textContent = formatNumber(cost);
    document.getElementById('ChickenCount').textContent = formatNumber(ChickenCount) + ' Chickens';
    document.getElementById('ChickenRate').textContent = 'per second: ' + ChickenRate.toFixed(1);
}

// Save game
function saveGame() {
    localStorage.setItem('ChickenCount', ChickenCount.toString());
    localStorage.setItem('ChickenRate', ChickenRate.toString());
    localStorage.setItem('DealerStored', DealerCount);
    localStorage.setItem('BreederStored', BreederCount);
    localStorage.setItem('MarketStored', MarketCount);
    localStorage.setItem('RanchStored', RanchCount);
    localStorage.setItem('MineStored', MineCount);
    localStorage.setItem('FactoryStored', FactoryCount);
    localStorage.setItem('DealerDiscountLevel', DealerDiscountLevel);
    localStorage.setItem('BreederDiscountLevel', BreederDiscountLevel);
    localStorage.setItem('MarketDiscountLevel', MarketDiscountLevel);
    localStorage.setItem('RanchDiscountLevel', RanchDiscountLevel);
    localStorage.setItem('MineDiscountLevel', MineDiscountLevel);
    localStorage.setItem('FactoryDiscountLevel', FactoryDiscountLevel);
}

// Buy upgrade
function buyUpgrade(name) {
    const upgrades = {
        'Dealer': { cost: getDealerCost(), rate: 0.1, base: 15 },
        'Breeder': { cost: getBreederCost(), rate: 0.5, base: 100 },
        'Market': { cost: getMarketCost(), rate: 2, base: 500 },
        'Ranch': { cost: getRanchCost(), rate: 5, base: 2000 },
        'Mine': { cost: getMineCost(), rate: 10, base: 10000 },
        'Factory': { cost: getFactoryCost(), rate: 50, base: 50000 }
    };

    const upgrade = upgrades[name];
    if (!upgrade || ChickenCount.lt(upgrade.cost)) return;

    ChickenCount = ChickenCount.minus(upgrade.cost);
    ChickenRate = ChickenRate.plus(upgrade.rate);
    
    // Increment count
    window[name + 'Count']++;
    
    // Get discount level
    const discountLevel = window[name + 'DiscountLevel'];
    const newCost = calculateCost(upgrade.base, window[name + 'Count'], discountLevel);
    
    updateShopUI(name, window[name + 'Count'], newCost);
    saveGame();
}

// Buy discount
function buyDiscount(name) {
    const discounts = {
        'Dealer': { getCost: getDealerDiscountCost, base: 15 },
        'Breeder': { getCost: getBreederDiscountCost, base: 100 },
        'Market': { getCost: getMarketDiscountCost, base: 500 },
        'Ranch': { getCost: getRanchDiscountCost, base: 2000 },
        'Mine': { getCost: getMineDiscountCost, base: 10000 },
        'Factory': { getCost: getFactoryDiscountCost, base: 50000 }
    };

    const discount = discounts[name];
    const cost = discount.getCost();
    
    if (ChickenCount.lt(cost)) return;

    if  (window[name + 'DiscountLevel'] >= 19){
        //set discount level to 19 and cost to Max
        window[name + 'DiscountLevel'] = 19;
        document.getElementById(name + 'DiscountCost').textContent = 'Max';
        return;
    }

    ChickenCount = ChickenCount.minus(cost);
    window[name + 'DiscountLevel']++; 
    
    const discountLevel = window[name + 'DiscountLevel'];
    const count = window[name + 'Count'];
    
    document.getElementById(name + 'DiscountCost').textContent = formatNumber(discount.getCost());
    document.getElementById(name + 'DiscountLevel').textContent = discountLevel * 5 + '%';
    document.getElementById('ChickenCount').textContent = formatNumber(ChickenCount) + ' Chickens';
    
    updateShopUI(name, count, calculateCost(discount.base, count, discountLevel));
    saveGame();
}

// Reset function
function killCookies() {
    localStorage.clear();
    location.reload();
}

// Auto-save every 10 seconds
setInterval(saveGame, 10000);