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
                        outputToConsole("Now it is: " + "\"" + Date() + "\"");
                    }
                },
                {
                    name: "version",
                    handler: function(args) {
                        outputToConsole("App Version is: " + "\"" + navigator.appVersion + "\"");
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

            var cmds = document.getElementById('in');
            var inputArray = [];

            function storeInput() {
                inputArray.push(cmds.value);
                console.log(inputArray);
            };

            function doStuff(args) {
                outputToConsole("I'll just return the args: " + args);
            }

            function theme(args) {
                if (document.body.className == args){
                    error("Same theme");  
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
                console.log(command);
                inField.set("value", "");

                for (var i = 0; i < COMMANDS.length; i++) {
                    if (command === COMMANDS[i].name) {
                        COMMANDS[i].handler(args);
                        return;
                    }
                }
                error("Unsupported Command: " + command);

            }

            function clear() {
                inputArray = [];
                console.log(inputArray);
                clearBody();
            }
            function history() {
                outputToConsole(inputArray);
                console.log(inputArray);
            }
            function clearBody() {
                var pTags = document.getElementById("out");
                pTags.innerHTML = '';
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
                var p = Y.Node.create("<p class=\"op\">" + "<i class=\"fa fa-lg fa-check\">" + "</i>" + text + "</p>");
                Y.one("#out").append(p);
                p.scrollIntoView();
            }
            function error(text) {
                var p = Y.Node.create("<p class=\"op red\">" + "<i class=\"fa fa-lg fa-close\">" + "</i>" + text + "</p>");
                Y.one("#out").append(p);
                p.scrollIntoView();
            }

            Y.on("domready", function(e) {
                Y.one("body").setStyle("paddingBottom", Y.one("#in").get("offsetHeight"));
                Y.one("#in").on("keydown", function(e) {
                    if (e.charCode === 13) {
                        processCommand();
                        storeInput();
                    }
                    // if (e.charCode === 38 || e.charCode === 40) {
                    //     e.preventDefault();
                    //     console.history();
                    // }
                });
            });
        });