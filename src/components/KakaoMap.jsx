import axios from "axios";
import React, { useEffect, useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import styled from "styled-components";

const KakaoMap = () => {
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: 37.5124, lng: 126.931 });
  const [east, setEast] = useState(0);
  const [west, setWest] = useState(0);
  const [south, setSouth] = useState(0);
  const [north, setNorth] = useState(0);
  const [houses, setHouses] = useState([]);

  const handleMapCreate = (mapInstance) => {
    setMap(mapInstance);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://192.168.206.66:8080/home/search?west=${west}&east=${east}&south=${south}&north=${north}`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (map) {
      const kakao = window.kakao;
      const handleDragEnd = () => {
        const bounds = map.getBounds();
        const swLatLng = bounds.getSouthWest();
        const neLatLng = bounds.getNorthEast();

        console.log("SouthWest:", swLatLng.toString());
        console.log("NorthEast:", neLatLng.toString());

        setSouth(swLatLng.getLat());
        setWest(swLatLng.getLng());
        setNorth(neLatLng.getLat());
        setEast(neLatLng.getLng());
        fetchData();
      };

      kakao.maps.event.addListener(map, "dragend", handleDragEnd);

      handleDragEnd();

      return () => {
        kakao.maps.event.removeListener(map, "dragend", handleDragEnd);
      };
    }
  }, [map]);

  useEffect(() => {
    console.log("East:", east);
    console.log("West:", west);
    console.log("South:", south);
    console.log("North:", north);
  }, [east, west, south, north]);

  return (
    <div style={{ overflow: "hidden" }}>
      <Map
        center={center}
        style={{
          width: "100vw",
          height: "100vh",
          position: "absolute",
          top: "0",
        }}
        level={5}
        onCreate={handleMapCreate}
      ></Map>
    </div>
  );
};

export default KakaoMap;
