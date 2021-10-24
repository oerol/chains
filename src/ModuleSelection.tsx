import * as React from "react";
import { Link } from "react-router-dom";
import database from "./database";
import "./deck-selection.css";
import "./styles/module-selection.css";

import dna from "./assets/dna.png";
import alembic from "./assets/alembic.png";
import robot from "./assets/robot.png";

interface ModuleSelectionProps {}

export interface ModuleSelectionState {
  id: number;
  title: string;
}

type ModuleDirection = "next" | "previous";

const ModuleSelection: React.FunctionComponent<ModuleSelectionProps> = () => {
  const [module, setModule] = React.useState<ModuleSelectionState[]>([]);
  const [currentModule, setCurrentModule] = React.useState(1);

  React.useEffect(() => {
    console.log("AINT NO WAY");
    database.getModules().then((response) => {
      setModule(response);
    });
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
  }, []);

  const handleOnClick = () => {
    let titleText = (document.getElementById("title") as HTMLInputElement)
      .value;
    console.log(titleText);
    database.createModule(titleText).then((response) => {
      let copy = [...module];
      copy.push(response);
      console.log(copy);
      setModule(copy);
    });
  };
  const switchToModuleOverview = (module: ModuleSelectionState) => {
    console.log(module);
  };

  const getModule = (direction: ModuleDirection) => {
    let newModule = currentModule;
    if (direction === "next" && currentModule < module.length) {
      newModule = currentModule + 1;
    } else if (direction === "previous" && currentModule > 1) {
      newModule = currentModule - 1;
    }
    console.log(newModule);
    setCurrentModule(newModule);
  };

  return (
    <React.Fragment>
      <div className="placeholder-title">
        you can select a m o d u l e here.. if you'd like..
      </div>
      <main>
        <div className="overview">
          <div className="greeting">
            <span className="bold">Hello, </span>{" "}
            <span id="learner-name">Özgür 👋</span>
            <p className="description">
              Nice to have you back! Let's get warmed up with a quick review of
              your last lessons.
            </p>
          </div>
          <div className="today">
            <span className="heading">Today's assignments</span>
            <div className="module-card">
              <div className="percentage">
                <div className="image-holder">
                  <img src={dna} alt="" />
                </div>
                <span>80%</span>
              </div>
              <div className="description">
                <div className="module-title">Biology Molecular</div>
                <div className="module-info">
                  <ul>
                    <li>21 Questions</li>
                    <li>15 min</li>
                    <li>3 Decks</li>
                    <li>1 Student</li>
                  </ul>
                  <div className="button-wrapper">
                    <button className="button-secondary">Skip</button>
                    <button className="button-primary">Continue</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="module-card">
              <div className="percentage">
                <div className="image-holder">
                  <img src={robot} alt="" />
                </div>
                <span>80%</span>
              </div>
              <div className="description">
                <div className="module-title">Biology Molecular</div>
                <div className="module-info">
                  <ul>
                    <li>21 Questions</li>
                    <li>15 min</li>
                    <li>3 Decks</li>
                    <li>1 Student</li>
                  </ul>
                  <div className="button-wrapper">
                    <button className="button-secondary">Skip</button>
                    <button className="button-primary">Continue</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="learning-history">
            <span className="heading">Your last reviews</span>
            <div className="selection">
              <ul>
                <li>
                  <a href="" className="active">
                    All
                  </a>
                </li>
                <li>
                  <a href="">Design</a>
                </li>
                <li>
                  <a href="">Science</a>
                </li>
                <li>
                  <a href="">Coding</a>
                </li>
              </ul>
            </div>
            <div className="module-card module-highlighted">
              <div className="percentage">
                <div className="image-holder image-holder-small">
                  <img className="small" src={alembic} alt="" />
                </div>
              </div>
              <div className="description">
                <div className="module-title">Biology Molecular</div>
                <div className="module-info ">
                  <ul>
                    <li>21 Questions</li>
                    <li>15 min</li>
                    <li>3 Decks</li>
                    <li>1 Student</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="profile">
          <div className="all-modules">
            <div className="module-selector">
              <button onClick={() => getModule("previous")}>&lt;</button>
              <button onClick={() => getModule("next")}>&gt;</button>
            </div>
            {module
              .filter((module) => module.id === currentModule)
              .map((module) => (
                <Link
                  to={{
                    pathname: `/module/${module.id}`,
                    state: {
                      title: module.title,
                    },
                  }}
                >
                  <div
                    className="module-selection"
                    key={module.id}
                    onClick={(event: React.MouseEvent<HTMLElement>) => {
                      switchToModuleOverview(module);
                    }}
                  >
                    {module.title}
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default ModuleSelection;

/* 
<div className="createModule">
          <input type="text" name="title" id="title" placeholder="Modulname" />

          <button type="submit" onClick={handleOnClick}>
            Erstellen
          </button>
        </div>
        <div className="listModules">
          <p>-- now the available ones.. sir.. --</p>
          {module.map((module, i) => (
            <Link
              to={{
                pathname: `/module/${module.id}`,
                state: {
                  title: module.title,
                },
              }}
              key={i}
            >
              <div
                className="moduleOverview"
                key={module.id}
                onClick={(event: React.MouseEvent<HTMLElement>) => {
                  switchToModuleOverview(module);
                }}
              >
                {module.title}
              </div>
            </Link>
          ))}
        </div> 
*/

/* 
            {module.map((module) => (
              <Link
                to={{
                  pathname: `/module/${module.id}`,
                  state: {
                    title: module.title,
                  },
                }}
              >
                <div
                  className="moduleOverview"
                  key={module.id}
                  onClick={(event: React.MouseEvent<HTMLElement>) => {
                    switchToModuleOverview(module);
                  }}
                >
                  {module.title}
                </div>
              </Link>
            ))}
             */
