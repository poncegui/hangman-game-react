
import '../styles/App.scss';
import {useEffect, useState } from "react";
import getApi  from '../services/API';



function App() {
  //Estados
  const [wordsData, setWordsData] = useState("");

  //Services
  useEffect(() => {
    getApi().then((words) => {
      setWordsData(words.body.Word)
    }) 
   
  }, []);

  console.log(wordsData)

  const wordRandom = wordsData.split("").map((wordSelected) => {
    return (
    console.log(wordSelected)
    )
  })

  const [word, setWord] = useState("");
  const [userLetters, setUserLetters] = useState([]);
  const [lastLetter, setLastLetter] = useState();

  const wordLetters = word.split('');

  const handleLastLetter = (ev) => {
    if (ev.target.value.match(/^[a-zA-ZáäéëíïóöúüÁÄÉËÍÏÓÖÚÜñÑ]/) && !userLetters.includes(ev.target.value)) {
      setLastLetter(ev.currentTarget.value);
      setUserLetters([...userLetters, ev.currentTarget.value]);
    }
  }
  const renderSolutionLetters = () => {
    return wordLetters.map(eachLetter => {
      if (userLetters.includes(eachLetter)) {
        return <li className='letter'>{eachLetter}</li>
      } else {
        return <li className='letter'></li>
      }
    })
  }

  const renderErrorLetters = () => {
    return (
      userLetters
        .filter(eachLetter => {
          return !wordLetters.includes(eachLetter);
        })
        .map(eachLetter => {
          return <li className='letter'>{eachLetter}</li>;
        })
    )
  }

  const renderDummy = () => {
    return userLetters.filter(eachLetter => {
      return !wordLetters.includes(eachLetter);
    }).length;
  }

  return (
    <div id="root">
      <div className="page">
        <header>
          <h1 className="header__title">Juego del ahorcado</h1>
        </header>
        <main className="main">
          <section>
            <div className="solution">
              <h2 className="title">Solución:</h2>
              <ul className="letters">
                {renderSolutionLetters()}
              </ul>
            </div>
            <div className="error">
              <h2 className="title">Letras falladas:</h2>
              <ul className="letters">
                {renderErrorLetters()}
              </ul>
            </div>
            <form className="form">
              <label className="title" htmlFor="last-letter">Escribe una letra:</label>
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
          {/* <button onClick={handleError}>test</button> */}
          <section className={`dummy error-${renderDummy()}`}>
            <span className="error-13 eye"></span>
            <span className="error-12 eye"></span>
            <span className="error-11 line"></span>
            <span className="error-10 line"></span>
            <span className="error-9 line"></span>
            <span className="error-8 line"></span>
            <span className="error-7 line"></span>
            <span className="error-6 head"></span>
            <span className="error-5 line"></span>
            <span className="error-4 line"></span>
            <span className="error-3 line"></span>
            <span className="error-2 line"></span>
            <span className="error-1 line"></span>
          </section>
        </main>
      </div>
    </div >
  );
}

export default App;
