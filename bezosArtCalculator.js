let bezosWorth = 193200000000;

let priceOfArtwork;
let artistSalary;
let artworkBudget;

//Will be on a slider/editable
let numberOfArtists;
let investorPercentage = 50; //A value between 0 and 100

let numberOfYears;
let bezosCostPercentage;
let salaryPercentageEquivalent;

let amountToInvestors;
let moneyForSalaries;
let salaryYears;
let maximumArtists;
let oneYearSalaryOptions = [];
let timeOptions = [];

internationalNumberFormat = new Intl.NumberFormat('en-US') //use to add commas to #s

//--------------------------------------------------------------
//Get the inputs from the user

let priceOfArtworkInput = document.getElementById("price-of-artwork");
let artistSalaryInput = document.getElementById("artist-salary");
let artworkBudgetInput = document.getElementById("artwork-budget");

//--------------------------------------------------------------
//Get the outputs from the user

let inTextArtworkBudget = document.getElementById("in-text-artwork-budget");
let inTextSalaryYears = document.getElementById("in-text-salary-years");
let inTextArtistCount = document.getElementById("in-text-artist-count");
let inTextSalary = document.getElementById("in-text-salary");
let inTextMinimumSalary = document.getElementById("in-text-minimum-salary");
let inTextNumberOfArtists = document.getElementById("in-text-number-of-artists");
let inTextNumberOfYears = document.getElementById("in-text-number-of-years");
let inTextInvestment = document.getElementById("in-text-investment");
let inTextNetWorth = document.getElementById("in-text-net-worth");
let inTextArtworkPrice = document.getElementById("in-text-artwork-price");
let inTextMinimumSalary2 = document.getElementById("in-text-minimum-salary-2");
let inTextSpendEquivalent = document.getElementById("in-text-spend-equivalent");

//--------------------------------------------------------------
//Add event listeners in inputs and in-text variables

window.addEventListener("load", function () {
    priceOfArtwork = priceOfArtworkInput.value;
    artistSalary = artistSalaryInput.value;
    artworkBudget = artworkBudgetInput.value;

    inTextArtworkPrice.innerText = internationalNumberFormat.format(priceOfArtwork);
    inTextInvestment.innerText   = internationalNumberFormat.format(priceOfArtwork * .5);

    inTextMinimumSalary.innerText = internationalNumberFormat.format(artistSalary);
    inTextMinimumSalary2.innerText = internationalNumberFormat.format(artistSalary);
    
    inTextArtworkBudget.innerText = internationalNumberFormat.format(artworkBudget);

    doTheMath();

}, false);

//------

priceOfArtworkInput.addEventListener("input", function () {
    priceOfArtwork = priceOfArtworkInput.value;
    inTextArtworkPrice.innerText = internationalNumberFormat.format(priceOfArtwork);
    inTextInvestment.innerText   = internationalNumberFormat.format(priceOfArtwork * .5);
    doTheMath();
}, false);

artistSalaryInput.addEventListener("input", function () {
    artistSalary = artistSalaryInput.value;
    inTextMinimumSalary.innerText = internationalNumberFormat.format(artistSalary);
    inTextMinimumSalary2.innerText = internationalNumberFormat.format(artistSalary);
    doTheMath();
}, false);

artworkBudgetInput.addEventListener("input", function () {
    artworkBudget = artworkBudgetInput.value;
    inTextArtworkBudget.innerText = internationalNumberFormat.format(artworkBudget);
    doTheMath();
}, false);

inTextArtistCount.addEventListener("input", function () {
    //doTheMath();
}, false);

inTextNumberOfYears.addEventListener("input", function () {
    //doTheMath();
}, false);


document.addEventListener("change", doTheMath);

function doTheMath() {
    console.log("priceOfArtwork:", priceOfArtwork);
    console.log("artistSalary:", artistSalary);
    console.log("artworkBudget:", artworkBudget);
    

    inTextNetWorth.innerHTML = internationalNumberFormat.format(bezosWorth);
    bezosCostPercentage = percentageOf(priceOfArtwork, bezosWorth);
   

    salaryPercentageEquivalent = (bezosCostPercentage / 100) * artistSalary;
    salaryPercentageEquivalent = +salaryPercentageEquivalent.toFixed(2);

    amountToInvestors = (investorPercentage / 100) * priceOfArtwork;
    moneyForSalaries = priceOfArtwork - artworkBudget - amountToInvestors;


    salaryYears = moneyForSalaries / artistSalary;
    salaryYears = +salaryYears.toFixed(2) //round to 2 decimal points

    maximumArtists = Math.floor(salaryYears);

    oneYearSalaryOptions = [];
    for (let i = 1; i < maximumArtists + 1; i++) {
        let updatedArtistSalary = (moneyForSalaries / i);

        let oneYearOption = {
            "numberOfArtists": i,
            "annualSalary": internationalNumberFormat.format(+updatedArtistSalary.toFixed(0))
        }
        oneYearSalaryOptions.push(oneYearOption)
    }

    inTextArtistCount.max = oneYearSalaryOptions.length; //CHECK THIS

    timeOptions = [];
    for (let i = 1; i < salaryYears; i++) {
        let annualSalarySpend = moneyForSalaries / i;

        let timeOption = {
            "numberOfYears": i,
            "numberOfArtists": Math.floor(annualSalarySpend / artistSalary)
        };

        timeOptions.push(timeOption)

        if (timeOption.numberOfArtists === 1) {
            break;
        }
    };

    //------

    console.log(oneYearSalaryOptions);

    if (numberOfArtists === undefined){ //if it's the first time running it
        numberOfArtists = maximumArtists;
    } else if (inTextArtistCount.value != numberOfArtists){ //if artist count changed
        numberOfArtists = inTextArtistCount.value;
    } else {
        numberOfArtists = maximumArtists;
    }

    if (numberOfYears === undefined){
        numberOfYears = timeOptions.length;
    } else if (inTextNumberOfYears.value != numberOfYears){
        numberOfYears = inTextNumberOfYears.value;
    } else {
        numberOfYears = timeOptions.length;
    }

    //------

    //UPDATE all changing values
    inTextSalaryYears.innerHTML = salaryYears;

    inTextArtistCount.value = oneYearSalaryOptions[numberOfArtists-1].numberOfArtists;
    inTextArtistCount.max = maximumArtists;
    inTextArtistCount.min = 1;
    inTextSalary.innerHTML = oneYearSalaryOptions[numberOfArtists-1].annualSalary;

    inTextNumberOfArtists.innerHTML = timeOptions[numberOfYears - 1].numberOfArtists;
    inTextNumberOfYears.value = timeOptions[numberOfYears - 1].numberOfYears;
    inTextNumberOfYears.max = timeOptions.length;
    inTextNumberOfYears.min = 1;

    inTextSpendEquivalent.innerHTML = salaryPercentageEquivalent;
}


function percentageOf(partialValue, totalValue) {
    return (100 * partialValue) / totalValue;
}


//https://editor.p5js.org/bethfileti/sketches/ntH89Rd22