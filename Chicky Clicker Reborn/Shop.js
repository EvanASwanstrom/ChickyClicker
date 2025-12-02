

// Load values from localStorage or set defaults
var ChickenCount = parseFloat(localStorage.getItem('ChickenCount')) || 0;
var ChickenRate = parseFloat(localStorage.getItem('ChickenRate')) || 0;

var DealerCount = parseInt(localStorage.getItem('DealerStored')) || 0;
var BreederCount = parseInt(localStorage.getItem('BreederStored')) || 0;
var MarketCount = parseInt(localStorage.getItem('MarketStored')) || 0;
var RanchCount = parseInt(localStorage.getItem('RanchStored')) || 0;
var MineCount = parseInt(localStorage.getItem('MineStored')) || 0;
var FactoryCount = parseInt(localStorage.getItem('FactoryStored')) || 0;

// Dynamic costs
var DealerCost = Math.floor(15 * Math.pow(1.5, DealerCount));
var BreederCost = Math.floor(100 * Math.pow(1.5, BreederCount));
var MarketCost = Math.floor(500 * Math.pow(1.5, MarketCount));
var RanchCost = Math.floor(2000 * Math.pow(1.5, RanchCount));
var MineCost = Math.floor(10000 * Math.pow(1.5, MineCount));
var FactoryCost = Math.floor(50000 * Math.pow(1.5, FactoryCount));

// Update UI on load
document.getElementById('ChickenCount').textContent = Math.floor(ChickenCount) + ' Chickens';
document.getElementById('ChickenRate').textContent = 'per second: ' + ChickenRate.toFixed(1);

document.getElementById('DealerCount').textContent = DealerCount;
document.getElementById('DealerCost').textContent = DealerCost;

document.getElementById('BreederCount').textContent = BreederCount;
document.getElementById('BreederCost').textContent = BreederCost;

document.getElementById('MarketCount').textContent = MarketCount;
document.getElementById('MarketCost').textContent = MarketCost;

document.getElementById('RanchCount').textContent = RanchCount;
document.getElementById('RanchCost').textContent = RanchCost;

document.getElementById('MineCount').textContent = MineCount;
document.getElementById('MineCost').textContent = MineCost;

document.getElementById('FactoryCount').textContent = FactoryCount;
document.getElementById('FactoryCost').textContent = FactoryCost;

// Auto-increment logic
var autoIncrement;
function startAutoIncrement() {
    clearInterval(autoIncrement);
    if (ChickenRate > 0) {
        autoIncrement = setInterval(() => {
            ChickenCount++;
            document.getElementById('ChickenCount').textContent = Math.floor(ChickenCount) + ' Chickens';
            localStorage.setItem('ChickenCount', ChickenCount);
        }, 1000 / ChickenRate); // interval based on rate
    }
}
startAutoIncrement();

// Manual click
function incrementScore() {
    ChickenCount++;
    document.getElementById('ChickenCount').textContent = Math.floor(ChickenCount) + ' Chickens';
    localStorage.setItem('ChickenCount', ChickenCount);
}

// Buy upgrade

function buyUpgrade(name) {
    switch (name) {
        case 'Dealer':
            if (ChickenCount >= DealerCost) {
                ChickenRate += 0.1;
                DealerCount++;
                ChickenCount -= DealerCost;

                // Recalculate cost with discount
                DealerCost = calculateCost(15, DealerCount, DealerDiscountLevel);

                updateShopUI('Dealer', DealerCount, DealerCost);
                saveGame();
                startAutoIncrement();
            }
            break;

        case 'Breeder':
            if (ChickenCount >= BreederCost) {
                ChickenRate += 0.5;
                BreederCount++;
                ChickenCount -= BreederCost;

                BreederCost = calculateCost(100, BreederCount, BreederDiscountLevel);

                updateShopUI('Breeder', BreederCount, BreederCost);
                saveGame();
                startAutoIncrement();
            }
            break;

        case 'Market':
            if (ChickenCount >= MarketCost) {
                ChickenRate += 2;
                MarketCount++;
                ChickenCount -= MarketCost;

                MarketCost = calculateCost(500, MarketCount, MarketDiscountLevel);

                updateShopUI('Market', MarketCount, MarketCost);
                saveGame();
                startAutoIncrement();
            }
            break;

        case 'Ranch':
            if (ChickenCount >= RanchCost) {
                ChickenRate += 5;
                RanchCount++;
                ChickenCount -= RanchCost;

                RanchCost = calculateCost(2000, RanchCount, RanchDiscountLevel);

                updateShopUI('Ranch', RanchCount, RanchCost);
                saveGame();
                startAutoIncrement();
            }
            break;

        case 'Mine':
            if (ChickenCount >= MineCost) {
                ChickenRate += 10;
                MineCount++;
                ChickenCount -= MineCost;

                MineCost = calculateCost(10000, MineCount, MineDiscountLevel);

                updateShopUI('Mine', MineCount, MineCost);
                saveGame();
                startAutoIncrement();
            }
            break;

        case 'Factory':
            if (ChickenCount >= FactoryCost) {
                ChickenRate += 50;
                FactoryCount++;
                ChickenCount -= FactoryCost;

                FactoryCost = calculateCost(50000, FactoryCount, FactoryDiscountLevel);

                updateShopUI('Factory', FactoryCount, FactoryCost);
                saveGame();
                startAutoIncrement();
            }
            break;
    }
}


// Reset function
function killCookies() {
    localStorage.clear();
    location.reload();
}

