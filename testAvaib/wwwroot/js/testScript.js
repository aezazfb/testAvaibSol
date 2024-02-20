// Form validation
$(document).ready(function () {
    $('#submitData').click(function () {
        saveData();
    });
    populateGrid();
    $('#feePaidNo').prop("checked", true);
});
//document.getElementById('studentForm').addEventListener('submit', function(event) {
//    event.preventDefault();
//    var fullName = document.getElementById('fullName').value;
//    var marks = document.getElementById('marks').value;
//    var feePaid = document.querySelector('input[name="feePaid"]:checked');
    
//    if (!fullName || !marks || !feePaid) {
//        alert('Please fill in all required fields.');
//        return;
//    }

//    if (isNaN(marks) || marks < 1 || marks > 100) {
//        alert('Marks must be a numeric value between 1 and 100.');
//        return;
//    }

//    // Proceed with form submission if all validations pass
//    // Call function to save data to the database
//    saveData(fullName, marks, feePaid.value);
//});

// Function to save data to the database
function saveData() {
    var fullName = $('#fullName').val();
    var marks = $('#marksObtained').val();
    var feePaid = $('#fessPaidYes').prop("checked");

    if (!fullName || !marks || feePaid == null) {
        alert('Please fill in all required fields.');
        return;
    }

    if (isNaN(marks) || marks < 1 || marks > 100) {
        alert('Marks must be a numeric value between 1 and 100.');
        return;
    }

    studentDataObj = {
        fullName: fullName,
        marksObt: marks,
        feePaid: feePaid,
        passed: (marks ?? 0) >= 60
    }
    
    AjaxCall("https://localhost:44384/marks/", JSON.stringify(studentDataObj), "POST", null, null, null, onSuccessMarksPost, null, null);
    function onSuccessMarksPost() {
        
        alert("Record added successfully!");
        populateGrid();
        $('#fullName').val("");
        $('#marksObtained').val("");
        $('#fessPaidYes').prop("checked", false);
        $('#feePaidNo').prop("checked", true);
    }
}

// Function to populate grid
function populateGrid() {

    
    var grid = document.getElementById('studentsGrid');
    grid.innerHTML = `<tr>
				<td style="width: 20px;" class="heading-cell">&nbsp;</td>
				<td class="heading-cell">Full Name</td>
				<td class="heading-cell">Marks</td>
				<td class="heading-cell">Fee Paid</td>
				<td class="heading-cell">Pass/Fail</td>
				<td class="heading-cell">Edit</td>
			</tr>`; // Clear existing content

    AjaxCall("https://localhost:44384/marks/", null, "GET", onSuccessGet, null, null, null, null, null);
    function onSuccessGet(dataOfStudents) {

        //alert(data);
        $.each(dataOfStudents, function () {
            var row = document.createElement('tr');
            row.innerHTML = `
            <td class="grid-cell">${this.id}</td>
            <td class="grid-cell">${this.name}</td>
            <td class="grid-cell">${this.marks}</td>
            <td class="grid-cell">${this.feePaid ? "Paid" : "Unpaid"}</td>`
                +
            `
            <td class="grid-cell" style="color: ${this.pass ? "green" : "red"};">${this.pass ? "Pass" : "Not"}</td>`
                +
            `
            <td class="grid-cell">
                <a href="#" onclick="editStudent(${this.id})">Edit</a>
            </td>
        `
            var x = this.id;
                ;
            //if (this.pass === true) {
            //    row.style.color = 'green';
            //} else {
            //    row.style.color = 'red';
            //}
            grid.appendChild(row);
        });

    }
    

    
}

// Function to edit student
function editStudent(id) {
    AjaxCall("https://localhost:44384/marks/" + id, null, "GET", onSuccessGetById, null, null, null, null, null);
    function onSuccessGetById(student) {
        $('#fullName').val(student.name);
        $('#marksObtained').val(student.marks);
        if (student.feePaid == true) {
            $('#fessPaidYes').prop("checked", true);
            $('#fessPaidNo').prop("checked", false);
        } else {
            $('#fessPaidYes').prop("checked", false);
            $('#fessPaidNo').prop("checked", true);
        }
    }
}
function AjaxCall(url, dataToService, methodType, successCallBack, failureCallBack, errorCallBack, completeCallBack, loaderShowCalBack, loaderHideCallBack ) {
    if (loaderShowCalBack !== null && typeof loaderShowCalBack !== 'undefined') {
        loaderShowCalBack.call();
    }
    jQuery.ajax({
        type: methodType,
        url: url,
        data: dataToService,
        beforeSend: function (xhr) {
            //xhr.setRequestHeader(Apikey, Apivalue);
        },
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        processData: true,
        success: function (result) {
            if (successCallBack !== null && typeof successCallBack !== 'undefined') {
                successCallBack.call(undefined, result, dataToService);
            }
          
        },
        failure: function (xhr) {
            if (failureCallBack !== null && typeof failureCallBack !== 'undefined') {
                failureCallBack.call(undefined, xhr);
            }
        },
        error: function (xhr) {
            if (errorCallBack !== null && typeof errorCallBack !== 'undefined') {
                errorCallBack.call(undefined, xhr);
            }
        },
        complete: function (result) {
            if (completeCallBack !== null && typeof completeCallBack !== 'undefined') {
                completeCallBack.call(undefined, result);
            }
            if (loaderHideCallBack !== null && typeof loaderHideCallBack !== 'undefined') {
                loaderHideCallBack.call();
            }
        }
    });
}