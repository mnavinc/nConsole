        YUI().use("node", function(Y) {

            var COMMANDS = [
                {
                    name: "do_stuff",
                    handler: doStuff
                },

                {
                    name: "greet",
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
                    name: "isOnline",
                    handler: function(args) {
                        outputToConsole("online: " + "\"" + navigator.onLine + "\"");
                    }
                },
                {
                    name: "location",
                    handler: getLocation
                },

            ];

            function doStuff(args) {
                outputToConsole("I'll just return the args: " + args);
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
                var p = Y.Node.create("<p class=\"op\">" + "> " + text + "</p>");
                Y.one("#out").append(p);
                p.scrollIntoView();
            }
            function error(text) {
                var p = Y.Node.create("<p class=\"op red\">" + "> " + text + "</p>");
                Y.one("#out").append(p);
                p.scrollIntoView();
            }

            Y.on("domready", function(e) {
                Y.one("body").setStyle("paddingBottom", Y.one("#in").get("offsetHeight"));
                Y.one("#in").on("keydown", function(e) {
                    if (e.charCode === 13) {
                        processCommand();
                    }
                    // if (e.charCode === 38 || e.charCode === 40) {
                    //     e.preventDefault();
                    //     console.history();
                    // }
                });
            });
        });