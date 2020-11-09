var pageCounter = 1;
var dataContainer = document.getElementById("data-info");
var btn = document.getElementById("btn");

btn.addEventListener("click", function() {
    var myRequest = new XMLHttpRequest();
    myRequest.open('GET','https://learnwebcode.github.io/json-example/animals-' + pageCounter + '.json');
    myRequest.onload = function() {
        if (myRequest.status >= 200 && myRequest.status < 400) {
            var myData = JSON.parse(myRequest.responseText);
            renderHTML(myData);
        } else {
            console.log("Connected to server, but returned and error.")
        }
        
    };
    myRequest.onerror = function() {
        console.log("Error")
    };

    myRequest.send();
    pageCounter++;
    if (pageCounter > 3) {
        alert("All pages have been loaded!");
        btn.style.display = "none";
    }
});

function renderHTML(data) {
    var htmlString = "";

    for (i = 0; i < data.length; i++) {
        htmlString += "<p>" + data[i].name + " is a " + data[i].species + " that likes to eat "
        for (ii = 0; ii < data[i].foods.likes.length; ii++) {
            if (ii == 0) {
                htmlString += data[i].foods.likes[ii];
            } else {
                htmlString += " and " + data[i].foods.likes[ii];

            }
        }

        htmlString += ' and dislikes ';
        for (ii = 0; ii < data[i].foods.dislikes.length; ii++) {
            if (ii == 0) {
                htmlString += data[i].foods.dislikes[ii];
            } else {
                htmlString += " and " + data[i].foods.dislikes[ii];

            }
        }

        htmlString += '.</p>';

    }
    dataContainer.insertAdjacentHTML('beforeend', htmlString);
}