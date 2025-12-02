
// Discount levels and costs
var DealerDiscountLevel = parseInt(localStorage.getItem('DealerDiscountLevel')) || 0;
var DealerDiscountCost = parseInt(localStorage.getItem('DealerDiscountCost')) || 100;


function calculateCost(baseCost, count, discountLevel) {
    let discountMultiplier = 1 - (discountLevel * 0.05); // 5% per discount level
    return Math.floor(baseCost * Math.pow(1.5, count) * discountMultiplier);
}

function updateShopUI(name, count, cost) {
    document.getElementById(name + 'Count').textContent = count;
    document.getElementById(name + 'Cost').textContent = cost;
    document.getElementById('ChickenCount').textContent = Math.floor(ChickenCount) + ' Chickens';
    document.getElementById('ChickenRate').textContent = 'per second: ' + ChickenRate.toFixed(1);
}

function saveGame() {
    localStorage.setItem('ChickenCount', ChickenCount);
    localStorage.setItem('ChickenRate', ChickenRate);
    localStorage.setItem('DealerStored', DealerCount);
    localStorage.setItem('BreederStored', BreederCount);
    localStorage.setItem('MarketStored', MarketCount);
    localStorage.setItem('RanchStored', RanchCount);
    localStorage.setItem('MineStored', MineCount);
    localStorage.setItem('FactoryStored', FactoryCount);
}


function buyDiscount(name) {
    switch (name) {
        case 'Dealer':
            if (ChickenCount >= DealerDiscountCost) {
                ChickenCount -= DealerDiscountCost;
                DealerDiscountLevel++;
                DealerDiscountCost = Math.floor(100 * Math.pow(1.5, DealerDiscountLevel));

                localStorage.setItem('DealerDiscountLevel', DealerDiscountLevel);
                localStorage.setItem('DealerDiscountCost', DealerDiscountCost);
                localStorage.setItem('ChickenCount', ChickenCount);

                document.getElementById('DealerDiscountCost').textContent = DealerDiscountCost;
                document.getElementById('DealerDiscountLevel').textContent = DealerDiscountLevel * 5 + '%';
                document.getElementById('ChickenCount').textContent = Math.floor(ChickenCount) + ' Chickens';
                
                updateShopUI('Dealer', DealerCount, calculateCost(15, DealerCount, DealerDiscountLevel));

            }
            break;

        case 'Breeder':
            if (ChickenCount >= BreederDiscountCost) {
                ChickenCount -= BreederDiscountCost;
                BreederDiscountLevel++;
                BreederDiscountCost = Math.floor(500 * Math.pow(1.5, BreederDiscountLevel));

                localStorage.setItem('BreederDiscountLevel', BreederDiscountLevel);
                localStorage.setItem('BreederDiscountCost', BreederDiscountCost);
                localStorage.setItem('ChickenCount', ChickenCount);

                document.getElementById('BreederDiscountCost').textContent = BreederDiscountCost;
                document.getElementById('BreederDiscountLevel').textContent = BreederDiscountLevel * 5 + '%';
                document.getElementById('ChickenCount').textContent = Math.floor(ChickenCount) + ' Chickens';
            
                updateShopUI
            }
            break;

        case 'Market':
            if (ChickenCount >= MarketDiscountCost) {
                ChickenCount -= MarketDiscountCost;
                MarketDiscountLevel++;
                MarketDiscountCost = Math.floor(2000 * Math.pow(1.5, MarketDiscountLevel));

                localStorage.setItem('MarketDiscountLevel', MarketDiscountLevel);
                localStorage.setItem('MarketDiscountCost', MarketDiscountCost);
                localStorage.setItem('ChickenCount', ChickenCount);

                document.getElementById('MarketDiscountCost').textContent = MarketDiscountCost;
                document.getElementById('MarketDiscountLevel').textContent = MarketDiscountLevel * 5 + '%';
                document.getElementById('ChickenCount').textContent = Math.floor(ChickenCount) + ' Chickens';
            
                updateShopUI('Market', MarketCount, calculateCost(500, MarketCount, MarketDiscountLevel));
            }
            break;

        case 'Ranch':
            if (ChickenCount >= RanchDiscountCost) {
                ChickenCount -= RanchDiscountCost;
                RanchDiscountLevel++;
                RanchDiscountCost = Math.floor(5000 * Math.pow(1.5, RanchDiscountLevel));

                localStorage.setItem('RanchDiscountLevel', RanchDiscountLevel);
                localStorage.setItem('RanchDiscountCost', RanchDiscountCost);
                localStorage.setItem('ChickenCount', ChickenCount);

                document.getElementById('RanchDiscountCost').textContent = RanchDiscountCost;
                document.getElementById('RanchDiscountLevel').textContent = RanchDiscountLevel * 5 + '%';
                document.getElementById('ChickenCount').textContent = Math.floor(ChickenCount) + ' Chickens';
            
                updateShopUI('Ranch', RanchCount, calculateCost(2000, RanchCount, RanchDiscountLevel));
            }
            break;

        case 'Mine':
            if (ChickenCount >= MineDiscountCost) {
                ChickenCount -= MineDiscountCost;
                MineDiscountLevel++;
                MineDiscountCost = Math.floor(20000 * Math.pow(1.5, MineDiscountLevel));

                localStorage.setItem('MineDiscountLevel', MineDiscountLevel);
                localStorage.setItem('MineDiscountCost', MineDiscountCost);
                localStorage.setItem('ChickenCount', ChickenCount);

                document.getElementById('MineDiscountCost').textContent = MineDiscountCost;
                document.getElementById('MineDiscountLevel').textContent = MineDiscountLevel * 5 + '%';
                document.getElementById('ChickenCount').textContent = Math.floor(ChickenCount) + ' Chickens';
            
                updateShopUI('Mine', MineCount, calculateCost(10000, MineCount, MineDiscountLevel));
            }
            break;

        case 'Factory':
            if (ChickenCount >= FactoryDiscountCost) {
                ChickenCount -= FactoryDiscountCost;
                FactoryDiscountLevel++;
                FactoryDiscountCost = Math.floor(100000 * Math.pow(1.5, FactoryDiscountLevel));

                localStorage.setItem('FactoryDiscountLevel', FactoryDiscountLevel);
                localStorage.setItem('FactoryDiscountCost', FactoryDiscountCost);
                localStorage.setItem('ChickenCount', ChickenCount);

                document.getElementById('FactoryDiscountCost').textContent = FactoryDiscountCost;
                document.getElementById('FactoryDiscountLevel').textContent = FactoryDiscountLevel * 5 + '%';
                document.getElementById('ChickenCount').textContent = Math.floor(ChickenCount) + ' Chickens';
            
                updateShopUI('Factory', FactoryCount, calculateCost(50000, FactoryCount, FactoryDiscountLevel));
            }
            break;
    }
}