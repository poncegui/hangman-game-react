import '../styles/components/_letters.scss';

function SolutionLetters(props) {
  const renderSolutionLetters = () => {
    return props.wordLetters.map((eachLetter, index) => {
      return (
        <li key={index} className="letter">
          <small>
            {props.userLetters.includes(eachLetter) ? eachLetter : ''}
          </small>
        </li>
      );
    });
  };
  return (
    <div className="solution">
      <h2 className="title">Solución:</h2>
      <ul className="letters">{renderSolutionLetters()}</ul>
    </div>
  );
}

export default SolutionLetters;
