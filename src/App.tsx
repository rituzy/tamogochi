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
import { useLoadPetState } from './hook/useLoadPetState.ts';
import { useRefreshPetState } from './hook/useRefreshState.ts'
import { petAction } from './api/petAction.ts'

function App() {
  console.log("Start App!");
  const { loading } = useTelegram();
  const { petState, loadingPetState } = useLoadPetState();
  useRefreshPetState();

  if (loading || loadingPetState) {
    return <div>Загрузка...</div>
  }

  console.log("petstate: ");
  console.log(petState);

  // Кормление питомца
  const feedPet = () => petAction(petState, "/api/pets/feed");

  // Игра с питомцем
  const playWithPet = () => petAction(petState, "/api/pets/play");

  // Сон питомца
  const sleepPet = () => petAction(petState, "/api/pets/sleep");

  // Обучение питомца
  const educatePet = () => petAction(petState, "/api/pets/educate");


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
      console.log("The user wants to reset data...");
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
