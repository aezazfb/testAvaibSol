// Form validation
$(document).ready(function () {
    $('.standardButton').click(function () {
        saveData();
    });
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
    
    AjaxCall("https://localhost:44384/marks/", JSON.stringify(studentDataObj), "POST", onSuccessMarksPost, null, null, null, null, null);
    function onSuccessMarksPost(data) {
        alert("Record added successfully!");
    }
}

// Function to populate grid
function populateGrid(data) {
    var grid = document.getElementById('studentGrid');
    grid.innerHTML = ''; // Clear existing content

    data.forEach(function(student) {
        var row = document.createElement('div');
        row.innerHTML = `
            <input type="checkbox">
            <span>${student.fullName}</span>
            <span>${student.marks}</span>
            <span>${student.feePaid}</span>
            <span>${student.status}</span>
            <span>
                <a href="#" onclick="editStudent(${student.id})">Edit</a>
            </span>
        `;
        if (student.status === 'Pass') {
            row.style.color = 'green';
        } else {
            row.style.color = 'red';
        }
        grid.appendChild(row);
    });
}

// Function to edit student
function editStudent(id) {
    // Implement logic to populate form with student data for editing
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