import '../styles/App.scss';
import { Route, Link, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getApi from '../services/API';
import Dummy from './Dummy';
import SolutionLetters from './SolutionLetters';
import Footer from './Footer';

function App() {
  //Estados
  const [wordsData, setWordsData] = useState('');

  //Services
  useEffect(() => {
    getApi().then((words) => {
      setWordsData(words.body.Word);
    });
  }, []);

  console.log(wordsData);

  const wordRandom = wordsData.split('').map((wordSelected) => {
    return console.log(wordSelected);
  });

  const [word, setWord] = useState('');
  const [userLetters, setUserLetters] = useState([]);
  const [lastLetter, setLastLetter] = useState();

  const wordLetters = wordsData.split('');

  const handleLastLetter = (ev) => {
    if (
      ev.target.value.match(/^[a-zA-ZáäéëíïóöúüÁÄÉËÍÏÓÖÚÜñÑ]/) &&
      !userLetters.includes(ev.target.value)
    ) {
      setLastLetter(ev.currentTarget.value);
      setUserLetters([...userLetters, ev.currentTarget.value]);
    }
  };

  const renderErrorLetters = () => {
    return userLetters
      .filter((eachLetter) => {
        return !wordLetters.includes(eachLetter);
      })
      .map((eachLetter, index) => {
        return (
          <li key={index} className="letter">
            {eachLetter}
          </li>
        );
      });
  };

  const renderDummy = () => {
    return userLetters.filter((eachLetter) => {
      return !wordLetters.includes(eachLetter);
    }).length;
  };

  return (
    <div id="root">
      <div className="page">
        <header>
          <h1 className="header__title">Juego del ahorcado</h1>
        </header>
        <main className="main">
          <section>
            <SolutionLetters
              wordLetters={wordLetters}
              userLetters={userLetters}
            />
            <div className="error">
              <h2 className="title">Letras falladas:</h2>
              <ul className="letters">{renderErrorLetters()}</ul>
            </div>
            <form className="form">
              <label className="title" htmlFor="last-letter">
                Escribe una letra:
              </label>
              <input
                autoComplete="off"
                className="form__input"
                maxLength="1"
                type="text"
                name="last-letter"
                id="last-letter"
                // value={lastLetter}
                onChange={handleLastLetter}
              />
            </form>
          </section>
          <Dummy renderDummy={renderDummy()} />
          {/* <button onClick={handleError}>test</button> */}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
