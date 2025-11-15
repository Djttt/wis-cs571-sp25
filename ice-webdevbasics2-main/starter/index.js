// This is where your JS goes!

// You can fetch data from https://cs571api.cs.wisc.edu/rest/s25/ice/chili
// When you are complete, you should also be able to fetch data from...
//  https://cs571api.cs.wisc.edu/rest/s25/ice/pasta
//  https://cs571api.cs.wisc.edu/rest/s25/ice/pizza

let recipe;

fetch("https://cs571.org/rest/s25/ice/pasta", {
    headers: {
        "X-CS571-ID": CS571.getBadgerId()
    }
})
.then((d) => {
    console.log(d.status)
    return d.json()
})
.then((data) => {

    recipe = data
    console.log("I have received some data!");
    console.log(data);

    document.getElementById("recipe-name").innerText = data.name;
    document.getElementById("recipe-author").innerText = data.author;
    document.getElementById("recipe-img").src = data.img.location;
    document.getElementById("recipe-img").alt = data.img.description;
})

function updateYield() {
    if (recipe) {
        // DOTO updata yield
    } else {
        alert("Sorry, no data yet.")
    }
    
}

function displayReview() {
    if (recipe) {
        // TODO Display review
    } else {
        alert("Sorry, no data yet.");
    }
}

console.log(":)")