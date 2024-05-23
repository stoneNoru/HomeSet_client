import axios from "axios";
import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useMatch, useLocation } from "react-router-dom";
import pin from "../assets/icons/pin.png";
import { useRecoilState, useRecoilValue } from "recoil";
import { houseState, markerState, subsState, typedState } from "../state/atoms.js";

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
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const typedText = useRecoilValue(typedState);
  const clickedSubs = useRecoilValue(subsState); //전역상태 변수
  const transactionsMatch = useMatch("/home/transactions");
  const subscriptionMatch = useMatch("/home/subscription");
  const location = useLocation();
  const imageSrc = pin;
  const imageSize = new window.kakao.maps.Size(40, 40);
  const imageOption = { offset: new window.kakao.maps.Point(27, 69) };
  const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

  //====================================
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (!map) return;
    const ps = new window.kakao.maps.services.Places();

    ps.keywordSearch(clickedSubs, (data, status, _pagination) => {
      if (status === window.kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new window.kakao.maps.LatLngBounds();
        let markers = [];

        for (var i = 0; i < data.length; i++) {
          // @ts-ignore
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
          });
          // @ts-ignore
          bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(markers);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    });
  }, [map, clickedSubs]);

  // 입력창 텍스트를 위도 경도 데이터로 변환
  useEffect(() => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    if (typedText !== "") {
      const callback = (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          console.log(result);
          setLatitude(result[0].y);
          setLongitude(result[0].x);
        }
      };
      geocoder.addressSearch(`${typedText}`, callback);
    }
  }, [typedText]);

  // 지도 중심을 입력한 텍스트의 위도 경도로 변경
  useEffect(() => {
    if (latitude !== 0 && longitude !== 0) {
      setCenter({ lat: latitude, lng: longitude });
      setHouses([]);
    }
  }, [latitude, longitude]);

  // 지도 인스턴스 생성
  const handleMapCreate = (mapInstance) => {
    setMapInstance(mapInstance);
  };

  // 동서남북 보내서 현 화면에 위치한 집들 리스트 얻어옴
  const fetchHouses = async () => {
    try {
      const response = await axios.get(`http://183.107.121.150:8080/home/search`, {
        params: {
          west: west,
          east: east,
          south: south,
          north: north,
        },
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhY2Nlc3MtdG9rZW4iLCJpYXQiOjE3MTYwMDM4ODMsImV4cCI6MTcxNzIxMzQ4MywidXNlcklkIjoic3NhZnkifQ.hMyxtoR4Q-t5Q_LrL-B6BY3OoKKHd9GoHpWEYFR4edg`,
        },
      });
      setHouses(response.data.data);
      setHousesAtom(response.data.data);
      console.log("houses", houses);
    } catch (error) {
      console.log(error);
    }
  };

  // 지도 설정, 드래그 끝나면 동서남북 추출
  useEffect(() => {
    if (map) {
      map.setMaxLevel(4);
      const kakao = window.kakao;
      const handleDragEnd = () => {
        const bounds = map.getBounds();
        const swLatLng = bounds.getSouthWest();
        const neLatLng = bounds.getNorthEast();

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

  // 지도 드래그 끝나서 위치 변경되면 집들 데이터 가져옴
  useEffect(() => {
    if (transactionsMatch) {
      fetchHouses();
    } else {
      setHouses([]);
      setHousesAtom([]);
    }
  }, [transactionsMatch, east, west, south, north]);

  useEffect(() => {
    setHouses([]);
    setHousesAtom([]);
  }, [location]);

  useEffect(() => {
    if (subscriptionMatch) {
      setMarkers([]);
    }
  }, [subscriptionMatch]);

  useEffect(() => {
    if (!subscriptionMatch) {
      setMarkers([]);
    }
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
          setMarkerAtom(house.aptCode); // 클릭한 마커의 집 번호를 전역상태로 저장
          setCenter({ lat: house.lat, lng: house.lng });
          console.log("마커번호", house.aptCode);
        });
      });
      return () => {
        markers.forEach((marker) => marker.setMap(null));
      };
    }
  }, [map, houses]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Map
        center={center}
        style={{
          width: "100%",
          height: "100%",
        }}
        level={5}
        onCreate={handleMapCreate}
      >
        {markers.map((marker) => (
          <MapMarker key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`} position={marker.position} onClick={() => setInfo(marker)}>
            {info && info.content === marker.content && <div style={{ color: "#000" }}>{marker.content}</div>}
          </MapMarker>
        ))}
      </Map>
    </div>
  );
};

export default KakaoMap;
