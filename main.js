var employees = [];

function Employee(id, lightPic, fullPic, fn, ln, ttl, desc) {
    this.id = id;
    this.lightPicture = lightPic;
    this.fullPicture = fullPic;
    this.firstName = fn || "";
    this.lastName = ln || "";
    this.title = ttl || "";
    this.description = desc || "";
}

function openNav() {
    document.getElementById("mySidenav").style.width = "20%";
    document.getElementById("container").style.width = "80%";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("container").style.width = "100%";
}

$.getJSON("https://techi.envivent.com/images.json", function (data) {
    var items = [];
    $.each(data, function (key, val) {
        if (key == "employees") {
            items.push({
                key: key,
                val: val
            });
        }
    });
    for (var i = 0; i < items[0].val.length; i++) {
        employees.push(new Employee(items[0].val[i].id, "https://techi.envivent.com/employees/" + items[0].val[i].light, "https://techi.envivent.com/employees/" + items[0].val[i].full))
    }
});
$.getJSON("https://techi.envivent.com/description.json", function (data) {
    var items = [];
    $.each(data, function (key, val) {
        if (key == "employees") {
            items.push({
                key: key,
                val: val
            });
        }
    });
    for (var i = 0; i < items[0].val.length; i++) {
        for (var j = 0; j < employees.length; j++) {
            if (employees[j].id == items[0].val[i].id) {
                employees[j].description = items[0].val[i].description;
                employees[j].title = items[0].val[i].title;
            }
        }
    }
});
$.getJSON("https://techi.envivent.com/names.json", function (data) {
    var items = [];
    $.each(data, function (key, val) {
        if (key == "employees") {
            items.push({
                key: key,
                val: val
            });
        }
    });
    for (var i = 0; i < items[0].val.length; i++) {
        for (var j = 0; j < employees.length; j++) {
            if (employees[j].id == items[0].val[i].id) {
                employees[j].firstName = items[0].val[i].first_name;
                employees[j].lastName = items[0].val[i].last_name;
            }
        }
    }
    shuffle(employees)
    console.log(employees)
    printUsers();
});

function printUsers() {
    $('.display').html('')
    var $display = $('.display')
    $('.sidebarDisplay').html('')
    var $sidebarDisplay = $('.sidebarDisplay')
    for (var i = 0; i < 3; i++) {
        console.log(employees[i])
        var $divOne = $("<div class='teamCard'></div>")
        var $divTwo = $("<div class='teamCard'></div>")
        var $nameCardOne = $("<h1>" + employees[i].firstName + " " + employees[i].lastName + "</h1>");
        var $titleCardOne = $("<h1>" + employees[i].title + "</h1>");
        var $nameCardTwo = $("<h1>" + employees[i].firstName + " " + employees[i].lastName + "</h1>")
        var $titleCardTwo = $("<h1>" + employees[i].title + "</h1>")

        $divOne.append($nameCardOne)
        $divOne.append($titleCardOne)
        $sidebarDisplay.append($divOne)

        $divTwo.append($nameCardTwo)
        $divTwo.append($titleCardTwo)
        $display.append($divTwo)
    }
}
console.log(employees)

function shuffle(array) {
    var currentIndex = array.length;
  
    while (0 !== currentIndex) {
      var randomIndex = Math.floor(Math.random() * array.length);
      currentIndex -= 1;
  
      if(randomIndex == currentIndex){
        if(randomIndex == 0){
            randomIndex +=1;
        }
        if(randomIndex == array.length-1){
            randomIndex -=1;
        }
      }
      // And swap it with the current element.
      var temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  