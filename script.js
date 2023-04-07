$(function () {

  var today = dayjs();
  $("#currentDay").text(today.format("dddd, MMM D, YYYY HH:mm:ss"));
  setTask(today);

  function setTask(nowDayTime) {
    var currentTime = nowDayTime.hour();
   
    $(".time-block").each(function () {
      var key = $(this).get(0).id;
      var currentItem = localStorage.getItem(key);
      $(this).children("textarea.description").val(currentItem);
      var taskTime = key.split('-')[1];
      
      if (taskTime < currentTime) {
        $(this).addClass("past");
      }
      else if (taskTime == currentTime) {
        $(this).addClass("present");
      }
      else {
        $(this).addClass("future");
      }
    });
  }

  $(".saveBtn").click(function() {
    var parent = $(this).parent();
    var key = parent.get(0).id;
    var description = parent.children("textarea.description").val();
    localStorage.removeItem(key);
    localStorage.setItem(key, description);
  });

  $(".deleteBtn").click(function() {
    var parent = $(this).parent();
    localStorage.removeItem(parent.get(0).id);
    parent.children("textarea.description").val("");
  });
});
