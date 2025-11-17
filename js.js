/*Main Bugs / Future Features:
Accessories have a clickable box

Achievments
Visual Buildings
Upgrades


*/

var ChickenCount = localStorage.getItem('ChickenStored') || 0;

var ChickenSeconds = localStorage.getItem('ChickenSeconds') || 0;

            var DealerSeconds = localStorage.getItem('DealerSeconds') || 0;
            
            var BreederSeconds = localStorage.getItem('BreederSeconds') || 0;

            var MarketSeconds = localStorage.getItem('MarketSeconds') || 0;

            var RanchSeconds = localStorage.getItem('RanchSeconds') || 0;

            var MineSeconds = localStorage.getItem('MineSeconds') || 0;

            var FactorySeconds = localStorage.getItem('FactorySeconds') || 0;

                var dealerCost = localStorage.getItem('dealerCost') || 150;

                var breederCost = localStorage.getItem('breederCost') || 500;
                
                var marketCost = localStorage.getItem('marketCost') || 2000;

                var ranchCost = localStorage.getItem('ranchCost') || 7000;

                var mineCost = localStorage.getItem('mineCost') || 50000;

                var factoryCost = localStorage.getItem('factoryCost') || 1000000;

                var cpcCost = localStorage.getItem('cpcCost') || 10;

                
                var ChickensperClick = localStorage.getItem('Chickensperclick') || 0;


var cpcincrement = localStorage.getItem('cpcincrement') || 1

var DealerCount = localStorage.getItem('DealerStored') || 0;

var BreederCount = localStorage.getItem('BreederStored') || 0;

var MarketCount = localStorage.getItem('MarketStored') || 0;

var RanchCount = localStorage.getItem('RanchStored') || 0;

var MineCount = localStorage.getItem('MineStored') || 0;

var FactoryCount = localStorage.getItem('FactoryStored') || 0;

if(ChickenCount != 0){
    ChickenCount = parseInt(localStorage.getItem('ChickenStored'));
    }

if(ChickenSeconds != 0){
    ChickenSeconds = parseInt(localStorage.getItem('ChickenSeconds'));
    }

if(DealerCount != 0){
    DealerCount = parseInt(localStorage.getItem('DealerStored'));
    }

if(BreederCount != 0){
    BreederCount = parseInt(localStorage.getItem('BreederStored'));
    }

if(MarketCount != 0){
    MarketCount = parseInt(localStorage.getItem('MarketStored'));
    }

if(RanchCount != 0){
    RanchCount = parseInt(localStorage.getItem('RanchStored'));
    }

if(MineCount != 0){
    MineCount = parseInt(localStorage.getItem('MineStored'));
     }

if(FactoryCount != 0){
    FactoryCount = parseInt(localStorage.getItem('FactoryStored'));
    }

if(ChickensperClick != 0){
    ChickensperClick = parseInt(localStorage.getItem('Chickensperclick'));
}

if(ChickensperClick == 0){
    ChickensperClick += 1;
}


//Defining Document Variables
var ChickensPerSecond = document.getElementById('cpsdisplay')
var ChickenDisplay = document.getElementById('ChickenDisplay');
var dealer = document.getElementById("dealer");
var breeder = document.getElementById("breeder");
var market = document.getElementById("market");
var ranch = document.getElementById("ranch");
var mine = document.getElementById("mine");
var factory = document.getElementById("factory");
var cpcDisplay = document.getElementById("cpcdisplay");
var Chickenflow = ChickenSeconds;
//Accessory Variables
var nerd = document.getElementById("nerd");
var makeup = document.getElementById("makeup");

var dealerAcc = false;
var breederAcc = false;
var marketAcc = false;
var ranchAcc = false;
var mineAcc = false;
var factoryAcc = false;

var nerdButton = document.getElementById("accToggle1");
var makeupButton = document.getElementById("accToggle2");
var tearButton = document.getElementById("accToggle3");
var disguiseButton = document.getElementById("accToggle4");
var fedoraButton = document.getElementById("accToggle5");
var dripButton = document.getElementById("accToggle6");

nerdButton.onclick = function(){
    if(DealerCount >= 50){
        if(dealerAcc == false){
            nerd.style.visibility = "visible";
            dealerAcc = !dealerAcc;
        }
        else{
            nerd.style.visibility = "hidden";
            dealerAcc = false;

        }
    }
}


makeupButton.onclick = function(){
    if(BreederCount >= 50){
        if(breederAcc == false){
            makeup.style.visibility = "visible";
            breederAcc = !breederAcc;
        }
        else{
            makeup.style.visibility = "hidden";
            breederAcc = false;

        }
    }
}


tearButton.onclick = function(){
    if(MarketCount >= 50){
        if(marketAcc == false){
            tear.style.visibility = "visible";
            marketAcc = !marketAcc;
        }
        else{
            tear.style.visibility = "hidden";
            marketAcc = false;

        }
    }
}

disguiseButton.onclick = function(){
    if(RanchCount >= 50){
        if(ranchAcc == false){
            disguise.style.visibility = "visible";
            ranchAcc = !ranchAcc;
        }
        else{
            disguise.style.visibility = "hidden";
            ranchAcc = false;

        }
    }
}

fedoraButton.onclick = function(){
    if(MineCount >= 50){
        if(mineAcc == false){
            fedora.style.visibility = "visible";
            mineAcc = !mineAcc;
        }
        else{
            fedora.style.visibility = "hidden";
            mineAcc = false;

        }
    }
}

dripButton.onclick = function(){
    if(FactoryCount >= 50){
        if(factoryAcc == false){
            drip.style.visibility = "visible";
            factoryAcc = !factoryAcc;
        }
        else{
            drip.style.visibility = "hidden";
            factoryAcc = false;

        }
    }
}

//Updating Text
ChickenDisplay.innerHTML = "Chickens: " + ChickenCount;
ChickensPerSecond.innerHTML = "Chickens Per Second: " + ChickenSeconds;
dealer.innerHTML = "Dealers: " + DealerCount;
breeder.innerHTML = "Breeders: " + BreederCount;
market.innerHTML = "Markets: " + MarketCount;
ranch.innerHTML = "Ranches: " + RanchCount;
mine.innerHTML = "Mines: " + MineCount;
factory.innerHTML = "Factories: " + FactoryCount;
cpcDisplay.innerHTML = "Chickens Per Cluck: " + ChickensperClick;



setInterval(function x(){
    
    ChickenDisplay.innerHTML = "Chickens: " + (SimpleBeautify((parseInt(ChickenCount).toFixed(0))));
    cpcDisplay.innerHTML = "Chickens Per Cluck: " + ChickensperClick;
    ChickensPerSecond.innerHTML = "Chickens Per Second: " + ChickenSeconds;

    if(DealerCount >= 50){
        nerdButton.style.backgroundColor = "rgb(236, 225, 122)"
    }

    if(BreederCount >= 50){
        makeupButton.style.backgroundColor = "rgb(236, 225, 122)"

    }

    if(MarketCount >= 50){
        tearButton.style.backgroundColor = "rgb(236, 225, 122)"

    }

    if(RanchCount >= 50){
        disguiseButton.style.backgroundColor = "rgb(236, 225, 122)"

    }

    if(MineCount >= 50){
        fedoraButton.style.backgroundColor = "rgb(236, 225, 122)"

    }

    if(FactoryCount >= 50){
        dripButton.style.backgroundColor = "rgb(236, 225, 122)"

    }
    
    
    
    return x;
  }, 1);


  /*setInterval(function x(){
    ChickensPerSecond.innerHTML = "Chickens Per Second: " + (ChickenSeconds);

  }, 1000);
*/

  setInterval(function x(){
      if(ChickenCount>=10){
    ChickenCount += (ChickenSeconds/100);
    ChickenDisplay.innerHTML = "Chickens: " + ((SimpleBeautify((parseInt(ChickenCount).toFixed(0)))));
    localStorage.setItem('ChickenStored', ChickenCount);
}
    return x;
  }, 10);
  




  console.log(SimpleBeautify(10000000000));


  function SimpleBeautify(val){
	var str=val.toString();
	var str2='';
	for (var i in str)//add commas
	{
		if ((str.length-i)%3==0 && i>0) str2+=',';
		str2+=str[i];
	}
	return str2;
}
/*
AdvancedBeautify = function(num) {
    var units = ["Million","Billion","Trillion","Quadrillion","Quintillion","Sextillion"]
    var unit = Math.floor((num / 1.0e+1).toFixed(0).toString().length)
    var r = unit%3
    var x =  Math.abs(Number(num))/Number('1.0e+'+(unit-r)).toFixed(2)
    return x.toFixed(2)+ ' ' + units[Math.floor(unit / 3) - 2]
}


*/




//Chicken Button Script

var Chicken_button = document.getElementById('clickspot');
Chicken_button.onclick = function(){
 ChickenCount += ChickensperClick;
 ChickenDisplay.innerHTML = "Chickens: " + (SimpleBeautify((parseInt(ChickenCount).toFixed(0))));
 localStorage.setItem('ChickenStored', (ChickenCount));
 
}

var reset = document.getElementById("reset")

reset.onclick = function(){
    localStorage.clear();
    location.reload();
}
//Dealer Script


var Cpcupgrade = document.getElementById('Cpcupgrade');
Cpcupgrade.innerHTML = "Cpc + " + cpcincrement;
Cpcupgrade.onclick = function(){
if(ChickenCount >= cpcCost){
        ChickenCount -= cpcCost;
        cpcCost = (10 * (Math.pow(100, ChickensperClick)));
        ChickensperClick = parseInt(ChickensperClick);
        ChickensperClick += parseInt(cpcincrement);
        cpcincrement = parseInt(cpcincrement) * 2;
        Cpcupgrade.innerHTML = "Cpc + " + cpcincrement;
        cpcDisplay.innerHTML = "Chickens Per Cluck: " + ChickensperClick;
        localStorage.setItem('Chickensperclick', ChickensperClick);
        localStorage.setItem('ChickenStored', ChickenCount);
        localStorage.setItem('cpcCost', cpcCost);
        localStorage.setItem('cpcincrement', cpcincrement);
        cpctext();
    }
}

var ClickText = document.getElementById('ClickText');
function cpctext(){
    ClickText.innerHTML = "Cost: " + cpcCost;
}
cpctext();





dealer.onclick = function() {
    if (ChickenCount >= dealerCost){
            ChickenCount -= dealerCost;
        DealerCount += 1;
            dealerCost = 150 *(Math.pow(1.1, (DealerCount + 1)));
            dealerCost = dealerCost.toFixed(1);
            dealer.innerHTML = "Dealers: " + DealerCount;
        ChickenSeconds += 1;
        DealerSeconds += 1;
            ChickenDisplay.innerHTML = "Chickens: " + (SimpleBeautify((parseInt(ChickenCount).toFixed(0))));
        localStorage.setItem('DealerStored', DealerCount);
        localStorage.setItem('ChickenStored', ChickenCount);
        ChickensPerSecond.innerHTML = "Chickens Per Second: " + ChickenSeconds
        localStorage.setItem('ChickenSeconds', ChickenSeconds);
        localStorage.setItem('DealerSeconds', DealerSeconds);
        localStorage.setItem('dealerCost', dealerCost);
dealerupd();
}};


//Breeder Script

breeder.onclick = function() {
    if (ChickenCount >= breederCost){
            ChickenCount -= breederCost;
        BreederCount += 1;
            breederCost = 500 *(Math.pow(1.1, (BreederCount + 1)));
            breederCost = breederCost.toFixed(1);
            breeder.innerHTML = "Breeders: " + BreederCount;
        ChickenSeconds += 4;
        BreederSeconds += 4;
            ChickenDisplay.innerHTML = "Chickens: " + (SimpleBeautify((parseInt(ChickenCount).toFixed(0))));
        localStorage.setItem('BreederStored', BreederCount);
        localStorage.setItem('ChickenStored', ChickenCount);
        ChickensPerSecond.innerHTML = "Chickens Per Second: " + ChickenSeconds
        localStorage.setItem('ChickenSeconds', ChickenSeconds);
        localStorage.setItem('BreederSeconds', BreederSeconds);
        localStorage.setItem('breederCost', breederCost);
breederupd();
}};



market.onclick = function() {
    if (ChickenCount >= marketCost){
            ChickenCount -= marketCost;
            MarketCount += 1;
            marketCost = 2000 *(Math.pow(1.1, (MarketCount + 1)));
            marketCost = marketCost.toFixed(1);
            market.innerHTML = "Markets: " + MarketCount;
        ChickenSeconds += 10;
        MarketSeconds += 10;
            ChickenDisplay.innerHTML = "Chickens: " + (SimpleBeautify((parseInt(ChickenCount).toFixed(0))));
        localStorage.setItem('MarketStored', MarketCount);
        localStorage.setItem('ChickenStored', ChickenCount);
        ChickensPerSecond.innerHTML = "Chickens Per Second: " + ChickenSeconds
        localStorage.setItem('ChickenSeconds', ChickenSeconds);
        localStorage.setItem('MarketSeconds', MarketSeconds);
        localStorage.setItem('marketCost', marketCost);
marketupd();
}};



ranch.onclick = function() {
    if (ChickenCount >= ranchCost){
            ChickenCount -= ranchCost;
            RanchCount += 1;
            ranchCost = 7000 *(Math.pow(1.1, (RanchCount + 1)));
            ranchCost = ranchCost.toFixed(1);
            ranch.innerHTML = "Ranches: " + RanchCount;
        ChickenSeconds += 20;
        RanchSeconds += 20;
            ChickenDisplay.innerHTML = "Chickens: " + (SimpleBeautify((parseInt(ChickenCount).toFixed(0))));
        localStorage.setItem('RanchStored', RanchCount);
        localStorage.setItem('ChickenStored', ChickenCount);
        ChickensPerSecond.innerHTML = "Chickens Per Second: " + ChickenSeconds
        localStorage.setItem('ChickenSeconds', ChickenSeconds);
        localStorage.setItem('RanchSeconds', RanchSeconds);
        localStorage.setItem('ranchCost', ranchCost);
ranchupd();
}};

mine.onclick = function() {
    if (ChickenCount >= mineCost){
            ChickenCount -= mineCost;
            MineCount += 1;
            mineCost = 50000 *(Math.pow(1.1, (MineCount + 1)));
            mineCost = mineCost.toFixed(1);
            mine.innerHTML = "Mines: " + MineCount;
        ChickenSeconds += 100;
        MineSeconds += 100;
            ChickenDisplay.innerHTML = "Chickens: " + (SimpleBeautify((parseInt(ChickenCount).toFixed(0))));
        localStorage.setItem('MineStored', MineCount);
        localStorage.setItem('ChickenStored', ChickenCount);
        ChickensPerSecond.innerHTML = "Chickens Per Second: " + ChickenSeconds
        localStorage.setItem('ChickenSeconds', ChickenSeconds);
        localStorage.setItem('MineSeconds', MineSeconds);
        localStorage.setItem('mineCost', mineCost);
mineupd();
}};


factory.onclick = function() {
    if (ChickenCount >= factoryCost){
            ChickenCount -= factoryCost;
            FactoryCount += 1;
            factoryCost = 1000000 *(Math.pow(1.1, (FactoryCount + 1)));
            factoryCost = factoryCost.toFixed(1);
            factory.innerHTML = "Factories: " + FactoryCount;
        ChickenSeconds += 1333;
        FactorySeconds += 1333;
            ChickenDisplay.innerHTML = "Chickens: " + (SimpleBeautify((parseInt(ChickenCount).toFixed(0))));
        localStorage.setItem('FactoryStored', FactoryCount);
        localStorage.setItem('ChickenStored', ChickenCount);
        ChickensPerSecond.innerHTML = "Chickens Per Second: " + ChickenSeconds
        localStorage.setItem('ChickenSeconds', ChickenSeconds);
        localStorage.setItem('FactorySeconds', FactorySeconds);
        localStorage.setItem('factoryCost', factoryCost);
factoryupd();
}};







var dealerProduction = document.getElementById("dealerProduction");

function dealerupd(){
    DealerSeconds = parseInt(DealerSeconds);
    dealerProduction.innerHTML = "Your " + DealerCount + " Dealers are Producing: " + parseInt(DealerSeconds) + " Total Chickens Per Second. They Cost " + dealerCost + " Chickens Each";
}
dealerupd();

var breederProduction = document.getElementById("breederProduction");

function breederupd(){
    BreederSeconds = parseInt(BreederSeconds);
    breederProduction.innerHTML = "Your " + BreederCount + " Breeders are Producing: " + BreederSeconds + " Total Chickens Per Second. They Cost " + breederCost + " Chickens Each";
}
breederupd();

var marketProduction = document.getElementById("marketProduction");

function marketupd(){
    MarketSeconds = parseInt(MarketSeconds);
    marketProduction.innerHTML = "Your " + MarketCount + " Markets are Producing: " + MarketSeconds + " Total Chickens Per Second. They Cost " + marketCost + " Chickens Each";
}
marketupd();

var ranchProduction = document.getElementById("ranchProduction");

function ranchupd(){
    RanchSeconds = parseInt(RanchSeconds);
    ranchProduction.innerHTML = "Your " + RanchCount + " Ranches are Producing: " + RanchSeconds + " Total Chickens Per Second. They Cost " + ranchCost + " Chickens Each";
}
ranchupd();

var mineProduction = document.getElementById("mineProduction");

function mineupd(){
    MineSeconds = parseInt(MineSeconds);
    mineProduction.innerHTML = "Your " + MineCount + " Mines are Producing: " + MineSeconds + " Total Chickens Per Second. They Cost " + mineCost + " Chickens Each";
}
mineupd();

var factoryProduction = document.getElementById("factoryProduction");

function factoryupd(){
    FactorySeconds = parseInt(FactorySeconds);
    factoryProduction.innerHTML = "Your " + FactoryCount + " Factories are Producing: " + FactorySeconds + " Total Chickens Per Second. They Cost " + factoryCost + " Chickens Each";
}
factoryupd();
