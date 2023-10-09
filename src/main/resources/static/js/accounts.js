let arcanaAccountsArray = localStorage.getItem('arcanaAccounts') ?
    JSON.parse(localStorage.getItem('arcanaAccounts')) : [];

function addArcanaAccount(newAccount){
    arcanaAccountsArray.push(newAccount);
    localStorage.setItem('arcanaAccounts', JSON.stringify(arcanaAccountsArray));
}

function clearAccounts() {
    arcanaAccountsArray = [];
    localStorage.setItem('arcanaAccounts', JSON.stringify([]));
}

function getLoadedArcanaAccounts() {
    return arcanaAccountsArray;
}