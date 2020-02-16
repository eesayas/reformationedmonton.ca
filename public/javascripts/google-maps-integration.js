let map;
        document.addEventListener("DOMContentLoaded", () => {
            let s = document.createElement("script");
            document.head.appendChild(s);
            s.addEventListener("load", () => {
                //script has loaded
                console.log("script has loaded");
                map = new google.maps.Map(document.getElementById("map"), {
                    center: {
                        lat: 53.4776184,
                        lng: -113.535205
                    },
                    zoom: 16,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });

                marker = new google.maps.Marker(
                    {
                        position: {
                            lat: 53.4776184,
                            lng: -113.535205
                        },
                        map: map
                    }
                );
            });
            s.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAP2Mgp9OC5w93SxPRQdxpDXB_-CUF50P4`;
        });