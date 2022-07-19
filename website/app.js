// Global Variables
const apiKey = "&appid=1227c0d32f6e336e44a2ed9dbd6c9994&units=imperial";
const apiUrl = "http://localhost:8000/";
const zipCodeElement = document.getElementById('zip');
const feelingsCodeElement = document.getElementById('feelings');
const dateElement = document.getElementById('date');
const tempElement = document.getElementById('temp');
const contentElement = document.getElementById('content');
// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', onGenerate);
// Post Data To API 
function onGenerate() { 
    let data = { zipCode: zipCodeElement.value, content: feelingsCodeElement.value, date: new Date() };    
    getZCode(data.zipCode).then(zipInfo => {
        data.temp = zipInfo.list[0].main.temp; saveData(data);
    });
};
// Function to GET Project Data 
async function getZCode(zipCode) { 
    return (await fetch(`http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}${apiKey}`)).json() 
}
//Function to POST Project Data
async function saveData(data) {
    let res = await fetch(`${apiUrl}postData`, { method: 'POST',  headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data), });
    res.json().then(data => { if (res.ok) updateUI(); });
}
// Function to update UI
async function updateUI() { const res = await fetch(`${apiUrl}All`);
    res.json().then(data => {
        dateElement.innerHTML = `Date: ${data.date}`;
        tempElement.innerHTML = `Temp: ${data.temp}`;
        contentElement.innerHTML = `Feelings: ${data.content}`;
    });
}