

const finalArray = (localStorage.getItem('finalR')) ? JSON.parse(localStorage.getItem('finalR')): [];


document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();


  const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  const dob = document.getElementById("dob").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  const year = document.getElementById("year").value;

  let newObj = {
    FirstName: fname,
    LastName: lname,
    DateOfBirth: dob,
    EmailId: email,
    Address: address,
    GraduationYear: year,
  };

  const data = JSON.stringify(newObj);
  const final = JSON.parse(data);
  finalArray.push(final);

  localStorage.setItem("finalR",JSON.stringify(finalArray));
  window.location.href = "record.html";
  console.log(finalArray);

  console.log(data);
  console.log(final);

  var recordBody = document.getElementById("tbody");
  var nwRow = document.createElement("tr");
  nwRow.innerHTML = `
    <td>${fname}</td>
    <td>${lname}</td>
    <td>${dob}</td>
    <td>${email}</td>
    <td>${address}</td>
    <td>${year}</td>`;

  recordBody.appendChild(nwRow);
//   const tempdata = JSON.parse(localStorage.getItem("finalArray")) || [];

//   localStorage.setItem("finalArray", JSON.stringify([...tempdata, newObj]));
//   finalArray.push(newObj);
//   addRows();
 
});

// add row

function addRows() {
  var tableBody = document.querySelector("#educationtable tbody");

  // Create new row
  var newRow = document.createElement("tr");

  // cells for the new row
  var cell1 = document.createElement("td");
  var cell2 = document.createElement("td");
  var cell3 = document.createElement("td");
  var cell4 = document.createElement("td");
  var cell5 = document.createElement("td");
  var cell6 = document.createElement("td");
  var cell7 = document.createElement("td");
  // Add content to the cells
  cell1.innerHTML = `<td><input type="text" placeholder="standard"></td>`;
  cell2.innerHTML = `<td><input type="text" placeholder="college/school"></td>`;
  cell3.innerHTML = `<td><input type="month" placeholder="MM-YYYY"></td>`;
  cell4.innerHTML = `<td><input type="month" placeholder="MM-YYYY"></td>`;
  cell5.innerHTML = `<td><input type="text" placeholder="00.00 "></td>`;
  cell6.innerHTML = `<td><input type="number" min="0" placeholder="No. of backlog"></td>`;
  cell7.innerHTML = `<td><button class="btn-danger" onclick="removeRow(this)"><i class="fa-solid fa-minus"></i></button></td>`;

  // Append cells to the new row
  newRow.appendChild(cell1);
  newRow.appendChild(cell2);
  newRow.appendChild(cell3);
  newRow.appendChild(cell4);
  newRow.appendChild(cell5);
  newRow.appendChild(cell6);
  newRow.appendChild(cell7);

  tableBody.appendChild(newRow);
}

// delete row
function removeRow(r) {
  r.parentNode.parentNode.remove();
}
