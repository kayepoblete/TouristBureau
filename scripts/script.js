import { categories } from "./activities.js"
import { activities } from "./activities.js"

"use strict";

window.onload = function () {
  // On page load, have category dropdown
  createNewDropdown(categories, "myCategories");
  const myCategories = document.getElementById("myCategories");
  myCategories.onchange = onCategorySelectionChanged;
  const myActivities = document.getElementById("myActivities");
  myActivities.onchange = onActivitySelectionChanged;
};
// Create new dropdown list
function createNewDropdown(_myArrayList, _nameOfDropdown){
  const newDropdown = document.getElementById(_nameOfDropdown);
  let length = _myArrayList.length;
  for(let i = 0; i < length; i++){
    let theOption = new Option(_myArrayList[i]);
    newDropdown.appendChild(theOption);
  }
}
// Display activities based on category selected
function onCategorySelectionChanged() {
  const myActivities = document.getElementById("myActivities");
  const index = document.getElementById("myCategories").selectedIndex;
  const selectedCategoryText = document.getElementById("myCategories")[index].text;
  showHideActivitiesList();
  document.getElementById("myActivities").innerHTML = "";
  myActivities.appendChild(new Option("Select one"));
  for(let i = 0; i < activities.length; i++){
    if(activities[i].category === selectedCategoryText){
      let theOption = new Option(activities[i].name);
      myActivities.appendChild(theOption);
    }
  }
}
// Display information about activity when selected
function onActivitySelectionChanged() {
  const index = document.getElementById("myActivities").selectedIndex;
  const selectedActivityText = document.getElementById("myActivities")[index].text;
  showHideDisplayInfo();
  for(let i = 0; i < activities.length; i++){
    if(activities[i].name === selectedActivityText){
      document.getElementById("displayInfo").innerHTML = 
      `<b>${activities[i].name}</b> (${activities[i].id}) <br> <i>${activities[i].description}</i> <br> 
      Contact: <u>${activities[i].location}</u> <br> <strong>$${activities[i].price.toFixed(2)}</strong>`;
      if(activities[i].price > 0){
        document.getElementById("formPay").style.display = "block";
      }
      else{
        document.getElementById("formPay").style.display = "none";
      }
    }
  }
}
// Calculate
function calculatePurchase(){
  const numTix = document.getElementById("numTix").value;
  const index = document.getElementById("myActivities").selectedIndex;
  const selectedActivity = document.getElementById("myActivities")[index].text;
  const email = document.getElementById("payEmail").value;
  const price = activities[index-1].price;
  const cost = numTix * price;
  document.getElementById("messagePay").innerHTML = `Your credit card has been charged $${cost.toFixed(2)} for ${numTix} to
  ${selectedActivity}. A confirmation email has been sent to ${email}.`
  ;

}
// Hide/Show activities list
function showHideActivitiesList(){
  const index = document.getElementById("myCategories").selectedIndex;
  const selectedCategoryText = document.getElementById("myCategories")[index].text;
  if(selectedCategoryText === "Select one"){
    document.getElementById("myActivities").style.display = "none";
    document.getElementById("displayInfo").style.display = "none";
    document.getElementById("formPay").style.display = "none";
  }
  else{
    document.getElementById("myActivities").style.display = "block";
  }
}
// Hide/show information and form
function showHideDisplayInfo(){
  const index = document.getElementById("myActivities").selectedIndex;
  const selectedActivityText = document.getElementById("myActivities")[index].text;
  if(selectedActivityText === "Select one"){
    document.getElementById("displayInfo").style.display = "none";
    document.getElementById("formPay").style.display = "none";
  }
  else{
    document.getElementById("displayInfo").style.display = "block";
    document.getElementById("formPay").style.display = "block";
  }
}
// Submit button
formPay.addEventListener("submit", (e) => {
  e.preventDefault();
  calculatePurchase();
});