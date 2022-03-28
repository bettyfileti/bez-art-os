let bezosWorth = 193200000000;

let priceOfArtwork;
let artistSalary;
let artworkBudget;

let numberOfArtists;
let investorPercentage = 50; //A value between 0 and 100

let numberOfYears;
let bezosCostPercentage;
let salaryPercentageEquivalent;
let materialsBudget;

let amountToInvestors;
let moneyForSalaries;
let salaryYears;

internationalNumberFormat = new Intl.NumberFormat('en-US') //use to add commas to #s

//--------------------------------------------------------------
//Setup the inputs as variables
let priceOfArtworkInput = document.getElementById("price-of-artwork");
let artistSalaryInput = document.getElementById("artist-salary");
let artworkBudgetInput = document.getElementById("artwork-budget");

//--------------------------------------------------------------
//Setup the outputs as variables
let inTextArtworkBudget = document.getElementById("in-text-artwork-budget");
let inTextSalaryYears = document.getElementById("in-text-salary-years");
let inTextSalary = document.getElementById("in-text-salary");
let inTextMinimumSalary = document.getElementById("in-text-minimum-salary");
let inTextNetWorth = document.getElementById("in-text-net-worth");
let inTextArtworkPrice = document.getElementById("in-text-artwork-price");
let inTextMinimumSalary2 = document.getElementById("in-text-minimum-salary-2");
let inTextSpendEquivalent = document.getElementById("in-text-spend-equivalent");
let inTextMaterialsBudget = document.getElementById("in-text-materials-budget");

//--------------------------------------------------------------
//Add event listeners in inputs and in-text variables
window.addEventListener("load", function () {

    //Read starting values
    priceOfArtwork = priceOfArtworkInput.value; 
    console.log(numberWithCommas(priceOfArtwork))
    artistSalary = artistSalaryInput.value;

    //Starting Calculations
    calculateBezosEquivalent();
    calculateMaterialsBudget();
    calculateAvailableSalaryYears()

}, false);

//------

priceOfArtworkInput.addEventListener("input", function () {
    priceOfArtwork = priceOfArtworkInput.value;
    inTextArtworkPrice.innerText = internationalNumberFormat.format(priceOfArtwork);   
    
    // Value matches input
    inTextNetWorth.innerHTML = internationalNumberFormat.format(bezosWorth);

    calculateBezosEquivalent();
    calculateMaterialsBudget();
    calculateAvailableSalaryYears()

}, false);

artistSalaryInput.addEventListener("input", function () {
    artistSalary = artistSalaryInput.value;

    //Update the in-text salary
    inTextMinimumSalary2.innerText = internationalNumberFormat.format(artistSalary);

    calculateBezosEquivalent();
    calculateMaterialsBudget();
    calculateAvailableSalaryYears()
}, false);

//--------------------------------------------------------------
//
function calculateMaterialsBudget(){
    materialsBudget = (priceOfArtwork * 0.5) / 3;
    materialsBudget = Math.round(materialsBudget/1000) * 1000;
    inTextMaterialsBudget.innerText = internationalNumberFormat.format(materialsBudget);
}

function calculateBezosEquivalent(){
    bezosCostPercentage = percentageOf(priceOfArtwork, bezosWorth);
    salaryPercentageEquivalent = (bezosCostPercentage / 100) * artistSalary;
    salaryPercentageEquivalent = +salaryPercentageEquivalent.toFixed(2);
    inTextSpendEquivalent.innerText = internationalNumberFormat.format(salaryPercentageEquivalent)

}

function calculateAvailableSalaryYears(){
    amountToInvestors = priceOfArtwork / 2;
    moneyForSalaries = amountToInvestors - materialsBudget;

    salaryYears = moneyForSalaries / artistSalary;
    salaryYears = +salaryYears.toFixed(1); //round to 1 decimal points
    inTextSalaryYears.innerText = internationalNumberFormat.format(salaryYears);
}

function percentageOf(partialValue, totalValue) {
    return (100 * partialValue) / totalValue;
}
//
//--------------------------------------------------------------
//https://editor.p5js.org/bethfileti/sketches/ntH89Rd22

//--------------------------------------------------------------
// Thousand Seperator

function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}