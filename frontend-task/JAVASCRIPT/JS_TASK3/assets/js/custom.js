// main function of jquery 
$(document).ready(function() {

        let fname = $('#fname');
        let lname = $('#lname');
        let dob = $('#dob');
        let mail = $('#email');
        let address = $('#address');
        let year = $('#year');

//----------------------------- Validation of student details--------------------------------------//
        $('#sub-btn').click(function(event) {
            event.preventDefault();

            var isValid = true;

            // Email validation
            var mail = $('#email').val();
            var regEmail = /^([a-zA-Z0-9\.-]+)@([a-z0-9-]+)\.([a-z]{2,8})$/;
            if (!regEmail.test(mail) || mail === "" || mail === null) {
                $('#email').css('border', '1px solid red');
                isValid = false;
            }

            // DOB validation
            var dobValue = $('#dob').val();
            var currentDate = new Date();
            var birthDate = new Date(dobValue);
            var ageInMillisec = currentDate - birthDate;
            var ageInYear = ageInMillisec / (1000 * 60 * 60 * 24 * 365.25);
            var age = Math.floor(ageInYear);

            if (age < 18 || dobValue === "" || dobValue === null) {
                $('#dob').css('border', '1px solid red');
                isValid = false;
            }

            
            // Graduation year validation
            var graduationYear = $('#year').val();
            var birthYear = parseInt($('#dob').val().split('-')[0]); 
            var currentYear = new Date().getFullYear();

            if (
                graduationYear === "" || 
                graduationYear === null || 
                parseInt(graduationYear.substr(0, 4)) < birthYear || 
                (currentYear - birthYear) < 10 ||
                (parseInt(graduationYear.substr(0, 4)) - birthYear) < 10 
            ) {
                $('#year').css('border', '1px solid red');
                isValid = false;
            }

            // Joining year validation

            var joiningYear = $('.joiningYear').val();
            var currentYear = new Date().getFullYear();
            if (!joiningYear || joiningYear === "" || parseInt(joiningYear.substr(0, 4)) > currentYear || joiningYear.length !== 7) {
                $('.joiningYear').css('border', '1px solid red');
                isValid = false;
            }

            // Passout year validation
            var passoutYear = $('.passoutYear').val();
            if (passoutYear === "" || passoutYear === null || passoutYear <= joiningYear) {
                $('.passoutYear').css('border', '1px solid red');
                isValid = false;
            }
            // Percentage validation

            var percentage = $('.percentage').val();
            var regPercentage = /^\d+(\.\d{1,2})?$/; // Allows one or two decimal places
            if (!regPercentage.test(percentage) || percentage === "" || percentage < 0 || percentage > 100) {
                $('.percentage').css('border', '1px solid red');
                isValid = false;
            }


            // Submit the form if all validations pass
            if (isValid) {
                $('form').submit();
                recordShow();
            } else {
                return false;
            }
            
    });


        let studentInfo = [];
        let count = 0;

        // student details object 
//--------------- if validation corrrect then only this will work else return false--------------//

        function recordShow() {
            // alert("i called") 
            let studentInfoObject = {
                id: count++,
                FirstName: fname.val(),
                LastName: lname.val(),
                DateOfBirth: dob.val(),
                Email: mail.val(),
                Address: address.val(),
                GraduationYear: year.val(),
                Education: []
            };

            // function called for add data row in table
            addData(studentInfoObject, count);

            // push details in array
            studentInfo.push(studentInfoObject)

            console.log("array",studentInfo);

            // education details array 
            let degree = $(".degree");
            let schoolName = $(".schoolName");
            let joiningYear = $(".joiningYear");
            let passoutYear = $(".passoutYear");
            let percentage = $(".percentage");
            let backlog = $(".backlog");

            for (let i = 0; i < degree.length; i++) {
                $(degree[i]).val();
                $(schoolName[i]).val()
                $(joiningYear[i]).val();
                $( passoutYear[i]).val();
                $(percentage[i]).val();
                $(backlog[i]).val();

                let educationObj = {
                        degree: $(degree[i]).val(),
                        schoolName: $(schoolName[i]).val(),
                        joiningYear: $(joiningYear[i]).val(),
                        passoutYear: $( passoutYear[i]).val(),
                        percentage: $(percentage[i]).val(),
                        backlog: $(backlog[i]).val(),
                        }
                        
                        // push education details in array
                studentInfoObject.Education.push(educationObj);
                        
            }

            $('form')[0].reset();
        }

//---------------------- change button submit->update nd vice versa--------------------------------//

        $('#btn-swap').click(function(event) {
            event.preventDefault()
            $('#sub-btn').addClass('d-block');
            $('#update-btn').addClass('d-none');
            $('#sub-btn').removeClass('d-none');
            $('#update-btn').removeClass('d-block');
        });
//----------------add data when click on submit and store in Data Table----------------------------//
        var table = new DataTable('#recordTable');

        // this add our data in record table
        function addData(studentInfoObject) {

            table.row.add([
                `<button class="btn-danger details-control rounded-circle "  data-index="${studentInfoObject.id}"><i class="fa-solid fa-angle-down"></i></button>`,
                studentInfoObject.FirstName,
                studentInfoObject.LastName,
                studentInfoObject.DateOfBirth,
                studentInfoObject.Email,
                studentInfoObject.Address,
                studentInfoObject.GraduationYear,
                `<button class="btn-success edit-btn rounded-circle" data-index="${studentInfoObject.id}" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-pen-to-square "></i></button>`,
                `<button class="btn-danger delete rounded-circle" data-index="${studentInfoObject.id}"><i class="fa-solid fa-trash"></i></button>`
            ]).draw();
// / / / / / / / / / /
        
        }
        
        
/////////////////////nested table ////////////////////////////
    $('#recordTable').on('click', '.details-control' , function(){
        console.log("hihiuh");
        
        let tr = table.row($(this).closest('tr'));
        let row = table.row(tr);
        let rowIndex = row.index();

        if(row.child.isShown()){
            row.child.hide()
        }else{
            row.child(childTable(rowIndex)).show();
        }
    });


        function childTable(index){

            let educationData = studentInfo[index].Education;
            console.log(educationData);
            let eTable = $(`<table class="table educationTable table-hover table-bordered" >`);
            eTable.append(`<thead class="bg-success text-white">
                <th>Degree/Board</th>
                <th>School/College</th>
                <th>Start Date</th>
                <th>Passout Year</th>
                <th>Percentage</th>
                <th>Backlog</th>
                </thead>
                <tbody class="educationDataTableBody"></tbody>`);



            for(const i in educationData){
                let rw = `<tr><td>${educationData[i].degree}</td><td>${educationData[i].schoolName}</td><td>${educationData[i].joiningYear}</td><td>${educationData[i].passoutYear}</td><td>${educationData[i].percentage}</td><td>${educationData[i].backlog}</td></tr>`
                eTable.append(rw);
            }
            return eTable;
        }


////////////////////////////////////////////////////////////////////////////////
//---------------------------------------------------------------------------------//
        var rowId; // for the passing the id into the update row   
        $(document).on('click', '.edit-btn', function() {
            let index = $(this).data('index')
            updateInfo(index);
            rowId = index
            $('#sub-btn').addClass('d-none');
            $('#update-btn').removeClass('d-none');
            $('#update-btn').addClass('d-block');
            
            $(document).on('click','#update-btn',function(){
            
                updateRow(rowId);
            })
        });

//---------------------------------------------------------------------------------//
        // Function to show update form with same data field
        function updateInfo(tempindex) {
            let index = studentInfo.findIndex(student => student.id === tempindex);
            $('#fname').val(studentInfo[index].FirstName);
            $('#lname').val(studentInfo[index].LastName);
            $('#dob').val(studentInfo[index].DateOfBirth);
            $('#email').val(studentInfo[index].Email);
            $('#address').val(studentInfo[index].Address);
            $('#year').val(studentInfo[index].GraduationYear);

            
            for (const i in studentInfo[index].Education) {
                $(($('.degree'))[i]).val(studentInfo[index].Education[i].degree);
                $(($('.schoolName'))[i]).val(studentInfo[index].Education[i].schoolName);
                $(($('.joiningYear'))[i]).val(studentInfo[index].Education[i].joiningYear);
                $(($('.passoutYear'))[i]).val(studentInfo[index].Education[i].passoutYear);
                $(($('.percentage'))[i]).val(studentInfo[index].Education[i].percentage);
                $(($('.backlog'))[i]).val(studentInfo[index].Education[i].backlog);
            }
            
            console.log(studentInfo)

        }
        // this function will save the update information in table when click on update

        function updateRow(id) {
            let tempindex = id
            
            let index = studentInfo.findIndex(student => student.id === tempindex);

            studentInfo[index].FirstName = $('#fname').val();
            studentInfo[index].LastName = $('#lname').val();
            studentInfo[index].DateOfBirth = $('#dob').val();
            studentInfo[index].Address = $('#address').val();
            studentInfo[index].Email = $('#email').val();
            studentInfo[index].GraduationYear = $('#year').val();

            updateRowInDataTable(index);
        }

        // datatable 
        function updateRowInDataTable(index) {
            var table = $('#recordTable').DataTable();
            var row = table.row(index);
            var rowData = [
                studentInfo[index].FirstName,
                studentInfo[index].LastName,
                studentInfo[index].DateOfBirth,
                studentInfo[index].Email,
                studentInfo[index].Address,
                studentInfo[index].GraduationYear,
                '<button class="btn-success edit-btn" data-index="' + index + '" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>',
                '<button class="btn-danger delete" data-index="' + index + '">Delete</button>'
            ];
            row.data(rowData).draw();
        }
        
//-------------------------------------------------------------------------------------//
        // remove  row from record table when click on delete
        // delete button event listener
        $(document).on('click','.delete',function() {
            let tempindex = $(this).data('index')

            let index = studentInfo.findIndex(student => student.id === tempindex);
            studentInfo.splice(index, 1);           
            table.row(tempindex).remove().draw();
        });
// ---------------------------------------------------------------------------------------//
        // Education rows add and remove 
        $('#educationRow').click(function() {
            let tableBody = $('#tb').append('<tr><td><input type="text" class="degree" placeholder="standard" required></td><td><input type="text" class="schoolName" placeholder="college/school" required></td><td><input type="month" class="joiningYear" placeholder="MM-YYYY" required></td><td><input type="month" class="passoutYear" placeholder="MM-YYYY" required></td><td><input type="number" class="percentage" placeholder="00.00 " required></td><td><input type="number" class="backlog" min="0" placeholder="No. of backlog" required></td><td><button class="btn-danger" id="remove"><i class="fa-solid fa-minus"></i></button></td></tr>');
        });

        // Remove
        $('#tb').on('click', '#remove', function() {
            $(this).closest('tr').remove();
        });

    });

//-------------------------------------------------------------------------------------------//