import { useState, useEffect } from 'react';
import './App.css';
import TopPanel from './components/TopPanel';
import ActionButtons from './components/ActionButtons';
import PetContainer from './components/PetContainer';
import Background from './components/Background';
import backgroundImage from './assets/images/background.png';

import petLevel1Image from './assets/images/pets/pet-level1.png';
import petLevel2Image from './assets/images/pets/pet-level2.png';
import petLevel3Image from './assets/images/pets/pet-level3.png';
import petLevel4Image from './assets/images/pets/pet-level4.png';
import { useTelegram } from './hook/useTelegram.ts'
import {Pet} from './types.ts'

const ROOT_URL = "https://tamogochi-app.vercel.app";

function App() {
  console.log("Start App!");
  const [petState, setPetState] = useState({});
  const { isTelegram, user, loading } = useTelegram();
  
  console.log("User from userTelegram ");
  console.log(user);
  console.log("isTelegram: " + isTelegram);
  
  useEffect(() => {
    if (user) { 
    loadPetState(user)
      .then( data => {
        if (data) {
          setPetState(data as Pet) 
        };
    });
    }
  }, [user])

  // Периодическое обновление показателей
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     commonPetAction("/api/pets/state")
  //       .then(data => {
  //         if (data) {
  //           setPetState(data as Pet) 
  //         };
  //       }
  //       );
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, [petState]);

  if (loading) {
    return <div>Загрузка...</div>
  }

  // Загружаем данные из бэка при старте приложения
  const loadPetState = async (usr) => {
    try {
      console.log("usr");
      console.log(usr);
      const responseJson = await fetch(ROOT_URL + "/login", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usr)
      })
        .then(function (response) {
          console.log("User response: " + JSON.stringify(response));
          return response.json();
        })
      // .then(function(r) {
      //   console.log("User response: " + JSON.stringify(r));
      // });

      const message = responseJson.message;
      console.log(message);
      const userParsed = JSON.parse(message)
      const userId = userParsed.id;
      if (userId) {
        const rawResponsePet = await fetch(ROOT_URL + "/api/pets/my?userId=" + userId, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        })
          .then(function (response) {
            return response.json();
          });

        const petData = rawResponsePet.message;
        console.log('pet content: ');
        console.log(petData);
        return petData as Pet;
      }
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    }
    return null;
  };

  // Функция сброса данных (для отладки)
  const resetPetData = () => {
    try {
      localStorage.removeItem('petState');
      window.location.reload(); // Перезагрузка страницы для применения начальных данных
    } catch (error) {
      console.error('Ошибка при сбросе данных:', error);
    }
  };

  const commonPetAction = async (path: string) => {
    if (!petState || !petState.id) {
      return null;
    }
    const pid = {
      "petId": petState.id,
    };
    const rawResponsePet = await fetch(ROOT_URL + path, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pid)
    })
      .then(function (response) {
        return response.json();
      });

    const petData = rawResponsePet.pet as Pet;
    console.log("Pet result: ");
    console.log(petData);
    return petData as Pet;
  }

  // Кормление питомца
  const feedPet = () => commonPetAction("/api/pets/feed");

  // Игра с питомцем
  const playWithPet = () => commonPetAction("/api/pets/play");

  // Сон питомца
  const sleepPet = () => commonPetAction("/api/pets/sleep");

  // Обучение питомца
  const educatePet = () => commonPetAction("/api/pets/educate");


  // Определение состояния питомца
  const getPetStatus = () => {
    const average = (petState!.hunger + petState!.happiness + petState!.energy + petState!.knowledge) / 4;
    if (average > 70) return "Питомец счастлив!";
    if (average > 40) return "Нормальное состояние";
    return "Питомец несчастлив!";
  };

  // Определение имени следующей эволюции в зависимости от текущего уровня
  const getNextEvolutionName = (): string => {
    switch (petState!.level) {
      case 1: return "малыш";
      case 2: return "подросток";
      case 3: return "взрослый";
      case 4: return "мудрец";
      default: return "суперформа";
    }
  };

  // Определение картинки питомца в зависимости от уровня
  const getPetImage = (): string => {
    // Здесь будет логика выбора разных картинок питомца
    // в зависимости от уровня эволюции
    switch (petState!.level) {
      case 1:
        return petLevel1Image;
      case 2:
        return petLevel2Image;
      case 3:
        return petLevel3Image;
      case 4:
        return petLevel4Image;
      default:
        return petLevel1Image;
    }
  };

  // Обработчик двойного клика для сброса данных (отладочная функция)
  const handleResetClick = () => {
    if (window.confirm('Сбросить все данные питомца? Питомец начнет с 1 уровня.')) {
      resetPetData();
    }
  }

  return (
    <div className="app">
      <div className="tamagotchi-container">
        <Background backgroundImage={backgroundImage} />

        <div className="top-panel-wrapper">
          <TopPanel
            level={petState!.level}
            hunger={Math.round(petState!.hunger / 2)} // уменьшенное значение для демонстрации
            health={Math.round(petState!.health)}
            energy={Math.round(petState!.energy)}
          />
        </div>

        <PetContainer
          petImage={getPetImage()}
          status={getPetStatus()}
          knowledge={petState!.knowledge}
          nextEvolutionName={getNextEvolutionName()}
          nextEvolutionLevel={petState!.level + 1}
          onDoubleClick={handleResetClick}
        />

        <div className="action-buttons-wrapper">
          <ActionButtons
            onFeed={feedPet}
            onPlay={playWithPet}
            onSleep={sleepPet}
            onEducate={educatePet}
          />
        </div>
      </div>
    </div>
  );

}

export default App;
