        YUI().use("node", function(Y) {
            

            var COMMANDS = [
                {
                    name: "wish",
                    handler: function(args) {
                        outputToConsole("Hello " + args[0] + ", welcome to Console.");
                    }
                },
                {
                    name: "date",
                    handler: function(args) {
                        outputToConsole("Now it is: " + "<b>" + "\" " + Date() + " \"" + "</b>");
                    }
                },
                {
                    name: "version",
                    handler: function(args) {
                        outputToConsole("App Version is: " + "<b>" + "\" " + navigator.appVersion + " \"" + "</b>");
                    }
                },
                {
                    name: "location",
                    handler: getLocation
                },
                {
                    name: "clear",
                    handler: clear
                },
                {
                    name: "history",
                    handler: history
                },
                {
                    name: "theme",
                    handler: theme
                },
                {
                    name: "help",
                    handler: function() {
                        outputToConsole("You can use commands like" + "<br/>" + "clear" + " - clear all the logs"
                         + "<br/>" + "date" + " - shows the current date"
                          + "<br/>" + "theme: [dark/light]" + " - changes console theme"
                           + "<br/>" + "history" + " - shows the log of inputs"
                            + "<br/>" + "location" + " - gives your geographical location"
                             + "<br/>" + "version" + " - gives you the details of the app you are using");
                    }
                }

            ];

            var input = document.getElementById('in');
            var inputArray = new Array();

            function clear() {
                inputArray = [];
                clearBody();
                //console.log(inputArray);
            }

            function history() {
                //console.table(inputArray);
                var content="<b>History :</b><br/>";
                for(var i = 0; i < inputArray.length; i++) {
                    content +=inputArray[i]+"<br/>";
                }
                outputToConsole(content);
            }

            function clearBody() {
                var pTags = document.getElementById("out");
                pTags.innerHTML = '';
            }

            function theme(args) {
                if (document.body.className == args){
                    error(args[0] + " theme is already set");  
                }
                else{
                    document.body.className = args;
                    outputToConsole("Changed to " + args[0] + " " + "theme");
                }
            }
            function processCommand() {
                var inField = Y.one("#in");
                var input = inField.get("value");
                var parts = input.replace(/\s+/g, " ").split(" ");
                var command = parts[0];
                var args = parts.length > 1 ? parts.slice(1, parts.length) : [];
                //console.log(command);
                inputArray.push(input);
                //console.log(inputArray);
                inField.set("value", "");

                for (var i = 0; i < COMMANDS.length; i++) {
                    if (command === COMMANDS[i].name) {
                        COMMANDS[i].handler(args);
                        return;
                    }
                }
                error("Unsupported Command: " + command);
            }

            function getLocation() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(showPosition);
                } else { 
                    outputToConsole("Geolocation is not supported by this browser.");
                }
            }

            function showPosition(position) {
                outputToConsole("Latitude: " + position.coords.latitude + " " + "Longitude: " + position.coords.longitude);
            }

            function outputToConsole(text) {
                var p = Y.Node.create("<p class=\"op\">" + "<i class=\"fa fa-lg fa-check-circle\">" + "</i>" + text + "</p>");
                Y.one("#out").append(p);
                p.scrollIntoView();
            }
            function error(text) {
                var p = Y.Node.create("<p class=\"op red\">" + "<i class=\"fa fa-lg fa-exclamation-circle\">" + "</i>" + text + "</p>");
                Y.one("#out").append(p);
                p.scrollIntoView();
            }

            Y.on("domready", function(e) {
                Y.one("body").setStyle("paddingBottom", Y.one("#in").get("offsetHeight"));
                Y.one("#in").on("keydown", function(e) {

                    if (e.charCode === 13) {
                        e.preventDefault();
                        processCommand();
                    }

                    var i = 0,
                        n = inputArray.length;
                        //console.table(inputArray);
                    if(e.charCode==38||e.charCode==40){
                        if      (e.charCode==40) inputArray.push(inputArray.shift());
                        else if (e.charCode==38) inputArray.unshift(inputArray.pop());
                        document.getElementById('in').value = inputArray[i];
                        e.preventDefault();
                    }
                    // if (e.charCode === 38 || e.charCode === 40) {
                    //     var i = 0,
                    //     n = inputArray.length;

                    //     i = (e.charCode==38? ++i : --i) <0? n-1 : i%n;
                    //     document.getElementById('in').value = inputArray[i];
                    //     e.preventDefault();
                    // }
                });
            });
        });