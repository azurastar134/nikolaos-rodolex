import "./App.css";

import { Component } from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users").then((response) =>
      response.json().then((users) =>
        this.setState(() => {
          return { monsters: users };
        })
      )
    );
  }

  onSearchChange = (event) => {
    // [{name: 'Leane'}, {name: 'Nick'}]
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return { searchField };
    });
  };

  render() {
    console.log("Rendered from js component");
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <h1 className="app-title">Monsters Rodolex</h1>
        <SearchBox
          className="monsters-search-box"
          onChangeHandler={onSearchChange}
          placeholder="search monsters"
        />
        <CardList monsters={filteredMonsters} anything={["a", "z"]} />
      </div>
    );
  }
}

export default App;
