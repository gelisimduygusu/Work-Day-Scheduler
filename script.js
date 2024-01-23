$(document).ready(function () {
    $("#currentDay").text(dayjs().format("dddd, MMMM D"));

    //time blocks
    function createTimeBlocks() {
    var currentHour = dayjs().hour();

    for (var hour = 9; hour <= 22; hour++) {
        var $row = $("<div>").addClass("row time-block");
        var $hourCol = $("<div>").addClass("col-1 hour").text(formatHour(hour));
        var $textCol = $("<textarea>").addClass("col description").attr("data-hour", hour);
        var $saveBtn = $("<button>").addClass("col-1 saveBtn").html('<i class="fas fa-save"></i>');

        // Color-code the time blocks
        if (hour < currentHour) {
        $textCol.addClass("past");
        } else if (hour === currentHour) {
        $textCol.addClass("present");
        } else {
        $textCol.addClass("future");
        }
        // Retrieve events from local storage
        var savedEvent = localStorage.getItem("event_" + hour);
        if (savedEvent) {
        $textCol.val(savedEvent);
        }
        // Append columns to the row
        $row.append($hourCol, $textCol, $saveBtn);
        $(".container").append($row);
    }
    }

    // Format the hour for display
    function formatHour(hour) {
    return dayjs().hour(hour).format("hA");
    }
    // Save event to local storage when the save button is clicked
    $(".container").on("click", ".saveBtn", function () {
    var hour = $(this).siblings(".description").attr("data-hour");
    var eventText = $(this).siblings(".description").val();
    localStorage.setItem("event_" + hour, eventText);
    });
    // Create time blocks when the page loads
    createTimeBlocks();
});
