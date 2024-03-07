let bezosWorth = 198500000000;
//let bezosWorth = 60000;

//--------------------------------------------------------------

let footerText = "Not updated to be live. Bezos' net worth, as of March 2024: 198.5 Billion."
updateFooter(footerText);
console.log("DEFAULT to Bezos Net Worth as of March 2024: 198.5 billion")

//--------------------------------------------------------------
// VARIABLES
//--------------------------------------------------------------

//------ Fixed Variables
const investorPercentage = 0.5; //A value between 0 and 1
const materialsPercentage = 0.3; //A value between 0 and 1, using 30% for now

//------ User-defined variables
let priceOfArtwork = 5000000; //start at 5000000
let artistSalary = 120000; // start at 120000

//------ Calculated variables
let artworkBudget; 
let amountToInvestors;
let moneyForSalaries;
let salaryYears;
let investorPayout;

let bezosCostPercentage;
let salaryPercentageEquivalent;

internationalNumberFormat = new Intl.NumberFormat('en-US') //use to add commas to #s

//--------------------------------------------------------------
//Setup the inputs as variables
let priceOfArtworkInput = document.getElementById("price-of-artwork");
let artistSalaryInput = document.getElementById("artist-salary");

//--------------------------------------------------------------
//Setup the outputs as variables
let inTextSalaryYears = document.getElementById("in-text-salary-years");
let inTextSalary = document.getElementById("in-text-salary");
let inTextMinimumSalary = document.getElementById("in-text-minimum-salary");
let inTextNetWorth = document.getElementById("in-text-net-worth");
let inTextArtworkPrice = document.getElementById("in-text-artwork-price");
let inTextMinimumSalary2 = document.getElementById("in-text-minimum-salary-2");
let inTextSpendEquivalent = document.getElementById("in-text-spend-equivalent");
let inTextMaterialsBudget = document.getElementById("in-text-materials-budget");
let inTextNumberOfArtists = document.getElementById("in-text-number-of-artists")
let inTextMaterialsPercentage = document.getElementById("in-text-materials-percentage");
let inTextInvestorPercentage = document.getElementById("in-text-investor-percentage");
let inTextArtistsGetPaid = document.getElementById("in-text-artists-get-paid");
let inTextInvestorPayout = document.getElementById("in-text-investor-payout");
let inTextTotalSalaryFund = document.getElementById("in-text-total-salary-fund");
let inTextTotalSalaryYears = document.getElementById("in-text-total-salary-years");

//--------------------------------------------------------------
// STARTING VALUES

//------ HOUSEKEEPING
//------ Update materials percentages
inTextMaterialsPercentage.innerHTML = materialsPercentage * 100;
inTextInvestorPercentage.innerHTML = investorPercentage * 100;

//------ Display net worth being used for calculations
inTextNetWorth.innerHTML = numberWithCommas(bezosWorth); 

//------ Get starting input for artwork price & update starting calculations for top
priceOfArtworkInput.value = priceOfArtwork;
investorPayout = priceOfArtwork/2;
inTextInvestorPayout.innerHTML = numberWithCommas(investorPayout);

//------ Get starting input for artist salaries
artistSalaryInput.value = artistSalary;
inTextSalary.innerHTML = numberWithCommas(artistSalary);
inTextMinimumSalary.innerHTML = numberWithCommas(artistSalary);
inTextArtistsGetPaid.innerHTML = numberWithCommas(artistSalary);

//------ Get equivalency
console.log("getting equivalencies using net worth of", bezosWorth);
getEquivalency(priceOfArtwork, bezosWorth, artistSalary);

//------ Get budgets
getBudgets(priceOfArtwork);


//--------------------------------------------------------------
// EVENT LISTENERS
//--------------------------------------------------------------

priceOfArtworkInput.addEventListener("input", function () {
    priceOfArtwork = priceOfArtworkInput.value;
    artistSalary = artistSalaryInput.value;
    
    // Value matches input
    inTextNetWorth.innerHTML = internationalNumberFormat.format(bezosWorth);

    getEquivalency(priceOfArtwork, bezosWorth, artistSalary);
    getBudgets(priceOfArtwork);
}, false);

artistSalaryInput.addEventListener("input", function () {

    artistSalary = artistSalaryInput.value;
    getEquivalency(priceOfArtwork, bezosWorth, artistSalary);
    getBudgets(priceOfArtwork);

    inTextSalary.innerHTML = numberWithCommas(artistSalary);
    inTextMinimumSalary.innerHTML = numberWithCommas(artistSalary);
    inTextArtistsGetPaid.innerHTML = numberWithCommas(artistSalary);
}, false);


//--------------------------------------------------------------
// GET API DATA
//--------------------------------------------------------------

const url = 'https://forbes-billionaires-api.p.rapidapi.com/detail.php?id=jeff-bezos';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '024de129fbmshaa7e219902f4270p18649ajsn5998280ff41b',
		'X-RapidAPI-Host': 'forbes-billionaires-api.p.rapidapi.com'
	}
};

async function fetchData() {
    try {
        const response = await fetch(url, options);
        const result = await response.text();

        const result_json = JSON.parse(result);
        let bezosBillions = result_json["current_worth"];
        let dateOfData = result_json["worth_as_of"];

        footerText = "Bezos' net worth, as of "+ dateOfData +", is $" + bezosBillions + " billion. /// Data from Forbes 400 via Rapid API";
        updateFooter(footerText);
        console.log("Using net worth from API:", bezosBillions);

        bezosWorth = bezosBillions * 1000000000; 
        console.log("Using net worth of:", bezosWorth);

        //------
        priceOfArtwork = priceOfArtworkInput.value;
        artistSalary = artistSalaryInput.value;
        
        // Value matches input
        inTextNetWorth.innerHTML = internationalNumberFormat.format(bezosWorth);
    
        getEquivalency(priceOfArtwork, bezosWorth, artistSalary);
        getBudgets(priceOfArtwork);

    } catch (error) {
        console.error(error);
    }
}

// Call the asynchronous function
fetchData();

//--------------------------------------------------------------
// FUNCTIONS
//--------------------------------------------------------------

function logVariables(){
    console.log("")
    console.log("//------")
    console.log("artworkBudget", artworkBudget); 
    console.log("amountToInvestors", amountToInvestors);
    console.log("moneyForSalaries", moneyForSalaries);
    console.log("salaryYears", salaryYears);

    console.log("bezosCostPercentage", bezosCostPercentage);
    console.log("salaryPercentageEquivalent",salaryPercentageEquivalent);
    console.log("//------")
    console.log("")
}

//------
function getEquivalency(priceOfArtwork, bezosWorth, artistSalary){
    let equivalentSpend = calculateBezosEquivalent(priceOfArtwork, bezosWorth, artistSalary)
    if (equivalentSpend < .01) {
        console.log("less than a penny", equivalentSpend)
        inTextSpendEquivalent.innerText = "0.00 and " + equivalentSpend * 1000 +"% of a penny"
    } else {
        equivalentSpend = +equivalentSpend.toFixed(2);
        inTextSpendEquivalent.innerText = internationalNumberFormat.format(equivalentSpend)
    }
    inTextArtworkPrice.innerText = numberWithCommas(priceOfArtwork);
}

//------ Update budgets based on priceOfArtwork
function getBudgets(priceOfArtwork) {
    let newBudgets = calculateBudgets(priceOfArtwork);
    let newMaterialsBudget = newBudgets[0];
    let newAmountToInvestors = newBudgets[1]; 
    let newMoneyForSalaries = newBudgets[2]; 
    let newSalaryYears = newBudgets[3];

    inTextMaterialsBudget.innerHTML = numberWithCommas(newMaterialsBudget);
    inTextInvestorPayout.innerHTML = numberWithCommas(newAmountToInvestors);
    inTextTotalSalaryFund.innerHTML = numberWithCommas(newMoneyForSalaries);
    inTextSalaryYears.innerHTML = newSalaryYears;
    inTextTotalSalaryYears.innerHTML = newSalaryYears;
    inTextArtistsGetPaid.innerHTML = numberWithCommas(artistSalary);
}

//--------------------------------------------------------------
// CALCULATORS
//------ Calculate Bezos equivalency
function calculateBezosEquivalent(whatBezosPays, bezosWorth, artistWorth){
    bezosCostPercentage = percentageOf(whatBezosPays, bezosWorth);
    salaryPercentageEquivalent = (bezosCostPercentage / 100) * artistWorth;
    salaryPercentageEquivalent = +salaryPercentageEquivalent.toFixed(6);
    //console.log("Calculating Bezos Equivalency → Bezos (net worth: " + bezosWorth + ") spending $" + numberWithCommas(whatBezosPays) + " is like a person whose net worth is $" + numberWithCommas(artistWorth) + " spending $"+ salaryPercentageEquivalent);
    return salaryPercentageEquivalent;
}

function calculateBudgets(priceOfArtwork) {
    let materialsBudget = priceOfArtwork * materialsPercentage;
    let amountToInvestors = priceOfArtwork * 0.5;
    let moneyForSalaries = amountToInvestors - materialsBudget;

    let salaryYears = moneyForSalaries / artistSalary;
    salaryYears = +salaryYears.toFixed(1); //round to 1 decimal points
    let budgets = [materialsBudget, amountToInvestors, moneyForSalaries, salaryYears]
    return budgets;
}

//--------------------------------------------------------------

//------ Return percentage
function percentageOf(partialValue, totalValue) {
    return (100 * partialValue) / totalValue;
}


//------ Update footer
function updateFooter(footerText){
    let footerDiv = document.getElementById("footer-p");
    footerDiv.innerHTML = footerText;
}

//------ Format numbers with commas
function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

function stringToNoCommasNumber(x) {
    string = x;
    const stripped = string.replace(/,/g, "");
    const number = parseFloat(stripped);
    return number;
}
