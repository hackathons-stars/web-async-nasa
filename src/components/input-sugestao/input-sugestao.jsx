import React, { useState } from 'react';
import "./input-sugestao.scss";

export default function ElementInputSugestao({ onSend, disable }) {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    onSend(inputValue);
    setInputValue(''); // Limpa o campo após o envio
  };

  return (
    <div className="elementInputSugestao">
      <h2>Consulte na região quais são os cultivos mais propícios, com dados históricos !</h2>
      <p>O que você cultiva ?</p>
      <textarea
        type=""
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Digite aqui sobre"
      />
      <button className="buttonSend" onClick={handleSend} disabled={disable}>{disable ? "Carregando !" : "Enviar"}</button>
    </div>
  );
};
