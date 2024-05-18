import axios from "axios";
import React, { useEffect, useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import { useMatch, useLocation } from "react-router-dom";
import pin from "../assets/icons/pin.png";
import { useRecoilState } from "recoil";
import { houseState, markerState } from "../state/atoms.js";

const KakaoMap = () => {
  const [map, setMapInstance] = useState(null);
  const [center, setCenter] = useState({ lat: 37.5124, lng: 126.931 });
  const [east, setEast] = useState(0);
  const [west, setWest] = useState(0);
  const [south, setSouth] = useState(0);
  const [north, setNorth] = useState(0);
  const [houses, setHouses] = useState([]);
  const [housesAtom, setHousesAtom] = useRecoilState(houseState);
  const [markerAtom, setMarkerAtom] = useRecoilState(markerState);
  const transactionsMatch = useMatch("/home/transactions");
  const location = useLocation();
  const imageSrc = pin;
  const imageSize = new window.kakao.maps.Size(40, 40);
  const imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
  const markerImage = new window.kakao.maps.MarkerImage(
    imageSrc,
    imageSize,
    imageOption
  );

  const handleMapCreate = (mapInstance) => {
    setMapInstance(mapInstance);
  };

  //현재 화면 동서남북 좌표로 화면 내 부동산 정보 가져오는 함수
  //강의실 : 192.168.206.66:8080
  const fetchHouses = async () => {
    try {
      const response = await axios.get(
        `http://183.107.121.150:8080/home/search`,
        {
          params: {
            west: west,
            east: east,
            south: south,
            north: north,
          },
          headers: {
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhY2Nlc3MtdG9rZW4iLCJpYXQiOjE3MTYwMDM4ODMsImV4cCI6MTcxNzIxMzQ4MywidXNlcklkIjoic3NhZnkifQ.hMyxtoR4Q-t5Q_LrL-B6BY3OoKKHd9GoHpWEYFR4edg`,
          },
        }
      );
      setHouses(response.data.data);
      setHousesAtom(response.data.data);
      console.log("houses", houses);
    } catch (error) {
      console.log(error);
    }
  };

  //마우스 드래그가 끝나 화면이 이동됐으면 동서남북 좌표 설정
  useEffect(() => {
    if (map) {
      map.setMaxLevel(4);
      const kakao = window.kakao;
      const handleDragEnd = () => {
        const bounds = map.getBounds();
        const swLatLng = bounds.getSouthWest();
        const neLatLng = bounds.getNorthEast();

        // console.log("SouthWest:", swLatLng.toString());
        // console.log("NorthEast:", neLatLng.toString());

        setSouth(swLatLng.getLat());
        setWest(swLatLng.getLng());
        setNorth(neLatLng.getLat());
        setEast(neLatLng.getLng());
      };

      kakao.maps.event.addListener(map, "dragend", handleDragEnd);

      handleDragEnd();

      return () => {
        kakao.maps.event.removeListener(map, "dragend", handleDragEnd);
      };
    }
  }, [map]);

  //현재 url이 /home/transacion이면
  useEffect(() => {
    if (transactionsMatch) {
      fetchHouses();
    } else {
      setHouses([]);
      setHousesAtom([]);
    }
  }, [transactionsMatch, east, west, south, north]);

  // URL 변경을 감지하여 houses 상태를 빈 배열로 설정
  useEffect(() => {
    setHouses([]);
    setHousesAtom([]);
  }, [location]);

  useEffect(() => {
    if (map && houses.length > 0) {
      const kakao = window.kakao;
      const markers = [];
      houses.forEach((house) => {
        const markerPosition = new kakao.maps.LatLng(house.lat, house.lng);
        const marker = new kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });
        marker.setClickable(true);
        marker.setMap(map);
        markers.push(marker);
        window.kakao.maps.event.addListener(marker, "click", function () {
          // alert(house.aptCode);
          setMarkerAtom(house.aptCode); //클릭한 마커의 집 번호를 전역상태로 저장
          setCenter({ lat: house.lat, lng: house.lng });
          console.log("마커번호", house.aptCode);
        });
      });
      return () => {
        // Remove markers when component unmounts or dependencies change
        markers.forEach((marker) => marker.setMap(null));
      };
    }
  }, [map, houses]);

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
