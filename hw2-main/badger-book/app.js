let studentNumbers;

let searchNameTag = document.getElementById("search-name");
let searchMajorTag = document.getElementById("search-major");
let searchInterestTag = document.getElementById("search-interest");

fetch("https://cs571.org/rest/s25/hw2/students", {
	headers : {
		"X-CS571-ID": "bid_dc56d365e836ff175237d8976f1c3b307e4fd6ae5fe4aa149a45d6f567466e04"
	}
})
.then(res => res.json())
.then(data => {
	studentNumbers = data.length;
	document.getElementById("num-results").innerText = studentNumbers;
	console.log(data);
	buildStudents(data);
})


function studentInterestsList(interests) {
	let interestsContainer = document.createElement("div");
	let totalInterests = document.createElement("p");
	totalInterests.innerText = `He(She) has ${interests.length} interests including...`;
	let interestsUl = document.createElement("ul");
	for (let interest of interests) {
		let li = document.createElement("li");
		li.innerText = interest;
		li.addEventListener("click", (e) => {
			searchNameTag.value = "";
			searchMajorTag.value = "";
			searchInterestTag.value = li.innerText;
			handleSearch(e);
		});
		interestsUl.appendChild(li);
	}
	interestsContainer.appendChild(totalInterests);
	interestsContainer.appendChild(interestsUl);

	return interestsContainer;
}

function studentCard(student) {
	let container = document.createElement("div");

	let nameHeader = document.createElement("h3");
	nameHeader.innerText = student.name.first + " " + student.name.last;
	
	let major = document.createElement("b");
	major.innerText = student.major;
	
	let creditsAndIsWis = document.createElement("p");
	creditsAndIsWis.innerText = `${student.name.first} is taking ${student.numCredits} credits and is ${student.fromWisconsin ? "" : "not"} from Wisconsin.`;
	
	let interestsContainer = studentInterestsList(student.interests);
	
	container.appendChild(nameHeader);
	container.appendChild(major);
	container.appendChild(creditsAndIsWis);
	container.appendChild(interestsContainer);
	
	return container;
}


function buildStudents(studs) {
	// TODO This function is just a suggestion! I would suggest calling it after
	//      fetching the data or performing a search. It should populate the
	//      index.html with student data by using createElement and appendChild.

	const studentsContainer = document.getElementById("students");
	studentsContainer.innerHTML = "";

	for (let student of studs) {
		let stuCard = studentCard(student);
		stuCard.classList.add("col-12", "col-sm-12", "col-md-6", "col-lg-4", "col-xl-3");
		studentsContainer.appendChild(stuCard);
		console.log(student)
	}
	
}

function handleSearch(e) {
	e?.preventDefault(); // You can ignore this; prevents the default form submission!

	// TODO Implement the search
	let searchName = searchNameTag.value.toLowerCase().trim();
	let searchMajor = searchMajorTag.value.toLowerCase().trim();
	let searchInterest = searchInterestTag.value.toLowerCase().trim();

	console.log(`search name is ${searchName}, search major is ${searchMajor}, search interest is ${searchInterest}`)
	fetch("https://cs571.org/rest/s25/hw2/students", {
	headers : {
		"X-CS571-ID": "bid_dc56d365e836ff175237d8976f1c3b307e4fd6ae5fe4aa149a45d6f567466e04"
		}
	})
	.then(res => res.json())
	.then(data => {
		let filteredName =  data.filter((stu) => {
			let name = stu.name.first + " " + stu.name.last;
			if (name.toLocaleLowerCase().includes(searchName)) {
				return true;
			} 
		});

		let filteredMajor = filteredName.filter((stu) => {
			let major = stu.major.toLocaleLowerCase();
			if (major.includes(searchMajor)) {
				return true;
			}
		});

		let filteredInterest = filteredMajor.filter((stu) => {
			let interests = stu.interests;  // this is a array!
			for (let interest of interests) {
				if (interest.toLocaleLowerCase().includes(searchInterest)) {
					return true;
				}
			}
		});

		buildStudents(filteredInterest);
		document.getElementById("num-results").innerText = filteredInterest.length;
	})	
}

document.getElementById("search-btn").addEventListener("click", handleSearch);