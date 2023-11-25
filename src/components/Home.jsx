import React, { useState, useEffect, useRef } from "react";
import {
  PageContainer,
  FishList,
  FishItem,
  FishForm,
  Input,
  RadioInput,
  Button,
  Buttons,
  TabButtons,
  AquariumForm,
  AquariumButton,
} from "./HomeStyle";
import fishes from "../fishList";

const Home = () => {
  const fishesCount = useRef(fishes.length);
  const [valid, setValid] = useState(false);
  const [listOfFishes, setListOfFishes] = useState(fishes);
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [requirement, setRequirment] = useState(0);
  const [fishRequirments, setFishRequirments] = useState(0);
  const [validAquariumSize, setValidAquariumSize] = useState(false);
  const [newfish, setNewfish] = useState({
    id: fishesCount.current + 1,
    name: "",
    size: "",
  });
  const [activeTab, setActiveTab] = useState("list-of-fish");
  const [aquariumSize, setAquariumSize] = useState({
    a: 4,
    b: 4,
    c: 2
});

  const handleChange = (e) => {
    const updatefish = { ...newfish, [e.target.name]: e.target.value };
    setNewfish(updatefish);
    validateData(updatefish);

    const inputValue = e.target.value;
    const inputName = e.target.name;

  switch (inputName) {
    case "name": {
      setName(inputValue);
      break;
    }
    case "size": {
      setSize(inputValue);
      setRequirment(inputValue === "small" ? parseInt(10) : parseInt(20));

      break;
    }

    case "a": {
      setA(parseInt(inputValue));
      break;
    }
    case "b": {
      setB(parseInt(inputValue));
      break;
    }
    case "c": {
      setC(parseInt(inputValue));
      break;
    }

    default:
      alert("Došlo k nějaké divné chybě");
      break;
  }
  };

  const validateData = (fishes) => {
  if (fishes.name.trim().length === 0) {
      return setValid(false);
  } else if (fishes.size.trim().length === 0) {
    return setValid(false);
  }
  setValid(true);
 };


  const handleAdd = (e) => {
  const levelRadios = document.querySelectorAll('input[name="size"]');
  levelRadios.forEach((radio) => {
    radio.checked = false;
  });
  newfish.name = "";

  fishesCount.current++;
  const updatefish = [
    ...listOfFishes,
    {
      id: fishesCount.current,
      name: name,
      size: size,
      requirement: requirement,
    },
  ];

  const resetFish = {
    name: "",
    size: "",
  };

  validateData(resetFish);
  setListOfFishes(updatefish);
};

const handleDelete = (idToDelete) => {
  setListOfFishes(listOfFishes.filter((fish) => fish.id !== idToDelete));
};

useEffect(() => {
  const updateFishRequirments = listOfFishes
    .map((fish) => fish.requirement)
    .reduce((total, requirement) => total + requirement, 0);
  setFishRequirments(updateFishRequirments);
}, []);

useEffect(() => {
  const updateFishRequirments = listOfFishes
    .map((fish) => fish.requirement)
    .reduce((total, requirement) => total + requirement, 0);
  setFishRequirments(updateFishRequirments);
}, [listOfFishes]);

useEffect(() => {
  if (name.trim().length > 0 && size !== "") {
    setValid(true);
  } else {
    setValid(false);
  }
}, [name, size]);

useEffect(() => {
  if (a !== 0 && b !== "" && c !== "" && a * b * c >= fishRequirments) {
    setValidAquariumSize(true);
  } else {
    setValidAquariumSize(false);
  }
}, [a, b, c, fishRequirments]);

const sendData = () => {
  console.log("akvárium půjde nastavit");
  const updateAq = { a, b, c };
  setAquariumSize(updateAq);
  setA("");
  setB("");
  setC("");

  alert("The data was update")
};

  return (
    <PageContainer>
      <Buttons>
        <TabButtons
          name="list-of-fish"
          data-active={activeTab}
          onClick={() => setActiveTab("list-of-fish")}
        >
          List of fish
        </TabButtons>
        <TabButtons
          name="aquarium-planing"
          data-active={activeTab}
          onClick={() => setActiveTab("aquarium-planing")}
        >
          Plan
        </TabButtons>
      </Buttons>
      {activeTab === "list-of-fish" && (
        <>
          <FishList name="fishList">
            {listOfFishes.map((fish) => {
              return (
                <FishItem key={fish.id}>
                  {fish.name} - {fish.size}{" "}
                  <button
                    style={{
                      color: "white",
                      border: "none",
                      backgroundColor: "transparent",
                      fontWeight: "bolder",
                    }}
                    onClick={() => handleDelete(fish.id)}
                  >
                    X
                  </button>
                </FishItem>
              );
            })}
          </FishList>
          <FishForm>
            <Input
              type="text"
              placeholder="Fish name"
              name="name"
              value={newfish.name}
              onChange={handleChange}
            ></Input>
            <label><RadioInput
              type="radio"
              name="size"
              value="small"
              onChange={handleChange}
            ></RadioInput>Small</label>
            <label><RadioInput
              type="radio"
              name="size"
              value="big"
              onChange={handleChange}
            ></RadioInput>Big</label>
            <Button 
              id="add_employee" 
              disabled={!valid}
              onClick={handleAdd}
              >
              Add Fish
            </Button>
          </FishForm>
        </>
      )}
      {activeTab === "aquarium-planing" && (
        <>
          <h3>Current dimensions of the aquarium</h3>
          <p>Width: {aquariumSize.a} dm</p>
          <p>Length: {aquariumSize.b} dm</p>
          <p>Height: {aquariumSize.c} dm</p>
          <p>Total capacity: {aquariumSize.a * aquariumSize.b * aquariumSize.c} l</p>
          <p>Required capacity: {fishRequirments} l</p>
          <AquariumForm>
            <Input
              type="number"
              name="a"
              placeholder="Enter width in dm..."
              min="0"
              value={a}
              onChange={handleChange}
            />
            <Input
              type="number"
              name="b"
              placeholder="Enter length in dm..."
              min="0"
              value={b}
              onChange={handleChange}
            />
            <Input
              type="number"
              name="c"
              placeholder="Enter height in dm..."
              min="0"
              value={c}
              onChange={handleChange}
            />
            <AquariumButton
              onClick={sendData}
              disabled={validAquariumSize === false}
            >
              Approve dimensions
            </AquariumButton>
          </AquariumForm>
        </>
      )}
    </PageContainer>
  );
};
export default Home;
