//map basé a Paris parce que flemme de faire a géoloc maintenant

const leafletMapDocument = `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
      crossorigin=""
    />
    <style>
      html, body, #map { width: 100%; height: 100%; margin: 0; }
      body { overflow: hidden; }
      .leaflet-control-attribution { font-size: 10px !important; }
      .leaflet-control-zoom a {
        width: 40px !important;
        height: 40px !important;
        line-height: 40px !important;
        font-size: 22px !important;
      }
    </style>
  </head>
  <body>
    <div id="map" role="application" aria-label="Carte interactive"></div>
    <script
      src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
      integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
      crossorigin=""
    ></script>


    
    <script>
      const map = L.map("map", {
        center: [48.8566, 2.3522],
        zoom: 13,
        zoomControl: false,
        scrollWheelZoom: false
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);

      L.control.zoom({ position: "topright" }).addTo(map);
      L.marker([48.8566, 2.3522]).addTo(map).bindPopup("Paris, France");
    </script>
  </body>
</html>`;

export default leafletMapDocument;
