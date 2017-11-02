        YUI().use("node", function(Y) {
            

            var COMMANDS = [
                {
                    name: "do_stuff",
                    handler: doStuff
                },

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
                    name: "list",
                    handler: function() {
                        outputToConsole("clear"
                         + "<br/>" + "date"
                          + "<br/>" + "theme: dark/light"
                           + "<br/>" + "history");
                    }
                },
                {
                    name: "help",
                    handler: function() {
                        outputToConsole("You can use commands like" + "<br/>" + "clear: clear all the logs."
                         + "<br/>" + "date: displays todays date with time."
                          + "<br/>" + "theme: change theme dark/light"
                           + "<br/>" + "list: list all commands");
                    }
                }

            ];

            var input = document.getElementById('in');
            var inputArray = new Array();

            function clear() {
                inputArray = [];
                clearBody();
                console.log(inputArray);
            }
            function history() {
                console.table(inputArray);
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

            function doStuff(args) {
                outputToConsole("I'll just return the args: " + args);
            }

            // function prevCommands() {
            //     for(var i = 0; i < inputArray.length; i++) {
            //         document.getElementById('in').value = inputArray[i];
            //     }
            // }


            function theme(args) {
                if (document.body.className == args){
                    error("theme already applied");  
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
                console.log(inputArray);
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
                    var i;
                    var n = inputArray.length-1;
                    var i = n;
                    //console.log(inputArray);
                    //console.log(e.charCode);
                    if (e.charCode === 13) {
                        e.preventDefault();
                        processCommand();
                    }
                    if (e.charCode === 38) {
                        let number = 0;
                        if (i <= inputArray.length) {
                            let val = inputArray[i];
                            number = String(val);
                            document.getElementById('in').value = number;
                            i++;
                        }

                        //prevCommands();

                        // var arrayLength = inputArray.length;
                        // for (let i = 0; i < arrayLength; i++) {
                        //     //alert(inputArray[i]);
                        //     document.getElementById('in').value = inputArray[i];
                        // }
                    }
                });
            });
        });