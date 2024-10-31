import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AsertividadQuiz = () => {
  const [respuestas, setRespuestas] = useState({
    pregunta1: 0,
    pregunta2: 0,
    pregunta3: 0,
    pregunta4: 0
  });

  const [mostrarResultados, setMostrarResultados] = useState(false);

  const preguntas = [
    "¿Expresas tus opiniones de manera directa pero respetuosa?",
    "¿Dices 'no' cuando es necesario sin sentirte culpable?",
    "¿Reconoces y defiendes tus derechos mientras respetas los de los demás?",
    "¿Manejas los conflictos de manera constructiva y buscando soluciones?"
  ];

  const opciones = [
    { valor: 1, texto: "Nunca" },
    { valor: 2, texto: "Casi nunca" },
    { valor: 3, texto: "A veces" },
    { valor: 4, texto: "Usualmente" },
    { valor: 5, texto: "Siempre" }
  ];

  const handleRespuesta = (pregunta, valor) => {
    setRespuestas(prev => ({
      ...prev,
      [pregunta]: valor
    }));
  };

  const calcularPuntajeTotal = () => {
    return Object.values(respuestas).reduce((a, b) => a + b, 0);
  };

  const interpretarResultado = (puntaje) => {
    if (puntaje >= 16) {
      return "¡Excelente! Muestras un alto nivel de asertividad en tus interacciones.";
    } else if (puntaje >= 12) {
      return "Bien. Tienes una base sólida de asertividad, pero hay espacio para mejorar.";
    } else {
      return "Podrías beneficiarte de practicar más la comunicación asertiva en tu día a día.";
    }
  };

  const todasLasPreguntasRespondidas = () => {
    return Object.values(respuestas).every(valor => valor !== 0);
  };

  const handleSubmit = () => {
    setMostrarResultados(true);
  };

  const prepararDatosGrafico = () => {
    return preguntas.map((pregunta, index) => ({
      nombre: `Pregunta ${index + 1}`,
      puntaje: respuestas[`pregunta${index + 1}`],
      preguntaCompleta: pregunta
    }));
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 shadow-lg rounded-lg border">
          <p className="font-bold">{label}</p>
          <p className="text-sm">{payload[0]?.payload?.preguntaCompleta}</p>
          <p className="text-blue-600">Puntaje: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Test de Asertividad
        </h1>
        
        {!mostrarResultados ? (
          <>
            {preguntas.map((pregunta, index) => (
              <div key={index} className="mb-6">
                <p className="font-medium mb-2">{pregunta}</p>
                <div className="flex flex-wrap gap-2">
                  {opciones.map((opcion) => (
                    <button
                      key={opcion.valor}
                      onClick={() => handleRespuesta(`pregunta${index + 1}`, opcion.valor)}
                      className={`px-4 py-2 rounded-md ${
                        respuestas[`pregunta${index + 1}`] === opcion.valor
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {opcion.texto}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <button
              onClick={handleSubmit}
              disabled={!todasLasPreguntasRespondidas()}
              className={`w-full py-2 rounded-md ${
                todasLasPreguntasRespondidas()
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Ver Resultados
            </button>
          </>
        ) : (
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Resultados</h3>
            <p className="text-2xl font-bold mb-4">
              Puntaje Total: {calcularPuntajeTotal()} de 20
            </p>
            <p className="text-lg mb-6">
              {interpretarResultado(calcularPuntajeTotal())}
            </p>

            <div className="h-80 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={prepararDatosGrafico()}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nombre" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="puntaje" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <button
              onClick={() => {
                setMostrarResultados(false);
                setRespuestas({
                  pregunta1: 0,
                  pregunta2: 0,
                  pregunta3: 0,
                  pregunta4: 0
                });
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Volver a Intentar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AsertividadQuiz;