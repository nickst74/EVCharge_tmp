import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';

function ChangeView({ center }) {
  const map = useMap();
  map.setView(center);
  return null;
}

function UserMarker({position, callback}){
  useMapEvents({
    click(e) {
      callback(e);
    }
  })
  return (
    <>
      {position &&(
        <Marker
          key={position[0]}
          position={position}
          interactive={true}
        >
          <Popup>
            User pin
            <br />
          </Popup>
        </Marker>
      )}
    </>
  )
}

export default function Map({center, zoom, stations, userPosition, changeUserPositionCallback}){
  return(
    <div id="mapid" className="map_div" style={{height:"500px"}}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{height:"500px", width: "500px"}}
      >
      <ChangeView center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <UserMarker position={userPosition} callback={changeUserPositionCallback}/>
        {stations && (
          stations.map(station =>
            <Marker key={station.StationId} position={[station.Latitude, station.Longitude]}>
              <Popup>
                {"Operator: " + station.Operator + "\n"
                +"Address: " + station.Address + "\n"
                +"CostPerKWh: " + station.CostPerKWh
                }<br />
              </Popup>
            </Marker>
          )
        )}
      </MapContainer>
    </div>
  );
}
