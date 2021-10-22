import * as React from "react";
import { Link } from "react-router-dom";
import database from "./database";
import "./deck-selection.css";

interface ModuleSelectionProps {}

export interface ModuleSelectionState {
  id: number;
  title: string;
}

const ModuleSelection: React.FunctionComponent<ModuleSelectionProps> = () => {
  const [module, setModule] = React.useState<ModuleSelectionState[]>([]);

  React.useEffect(() => {
    console.log("AINT NO WAY");
    database.getModules().then((response) => {
      setModule(response);
    });
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
  return (
    <React.Fragment>
      <div className="placeholder-title">
        you can select a m o d u l e here.. if you'd like..
      </div>
      <main>
        <div className="createModule">
          <input type="text" name="title" id="title" placeholder="Modulname" />

          <button type="submit" onClick={handleOnClick}>
            Erstellen
          </button>
        </div>
        <div className="listModules">
          <p>-- now the available ones.. sir.. --</p>
          {module.map((module, i) => (
            <Link to={`/module/${module.id}`} key={i}>
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
      </main>
    </React.Fragment>
  );
};

export default ModuleSelection;
