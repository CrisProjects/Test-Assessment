import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AsertividadQuiz = () => {
  const [respuestas, setRespuestas] = useState(
    Object.fromEntries([...Array(36)].map((_, i) => [`pregunta${i + 1}`, 0]))
  );

  const [mostrarResultados, setMostrarResultados] = useState(false);

  // Definición de grupos temáticos
  const gruposPreguntas = {
    autoexpresion: {
      nombre: "Autoexpresión",
      descripcion: "Capacidad para expresar opiniones y sentimientos",
      preguntas: [1, 4, 7, 15, 20, 22, 24, 27, 29],
    },
    manejoConflictos: {
      nombre: "Manejo de Conflictos",
      descripcion: "Habilidad para manejar situaciones difíciles",
      preguntas: [2, 3, 8, 11, 13, 19, 25, 30],
    },
    autoestima: {
      nombre: "Autoestima",
      descripcion: "Valoración personal y confianza en uno mismo",
      preguntas: [6, 18, 26, 32, 36],
    },
    establecerLimites: {
      nombre: "Establecimiento de Límites",
      descripcion: "Capacidad para decir no y establecer límites saludables",
      preguntas: [5, 12, 28, 33, 34],
    },
    comunicacionEfectiva: {
      nombre: "Comunicación Efectiva",
      descripcion: "Habilidades de comunicación clara y directa",
      preguntas: [14, 16, 17, 21, 31],
    },
    relacionesInterpersonales: {
      nombre: "Relaciones Interpersonales",
      descripcion: "Manejo de relaciones con otros",
      preguntas: [9, 10, 23, 35],
    }
  };

  const preguntas = [
    "Me siento incómodo cuando tengo que enfrentar a alguien para resolver un problema",
    "Pierdo la paciencia con facilidad, soy de 'mecha corta'",
    "Cuando alguien es irónico o sarcástico conmigo, reacciono de la misma manera",
    "Prefiero que las personas perciban lo que deseo o necesito, en lugar de decírselos",
    "Es importante para mí obtener lo que necesito y deseo, aunque esto pueda herir a otra persona",
    "No me molesta admitir mis errores ante los demás",
    "Expreso mi desacuerdo con las opiniones de otros sin dificultad",
    "Cuando necesito imponerme, suelo aumentar el tono de voz y usar una mirada penetrante",
    "Cuando algo sale mal, busco un chivo expiatorio",
    "Es importante para mí ganarme la simpatía de la gente, incluso si tengo que hacer cosas que normalmente no haría",
    "Tengo habilidad para resolver satisfactoriamente la mayoría de los conflictos con otras personas",
    "Tengo dificultades para decir no a las peticiones y me siento culpable cuando lo hago",
    "Cuando es necesario, soy duro e inflexible y no doy explicaciones sobre mis decisiones",
    "Soy objetivo y siempre digo la verdad, sin importar a quién le duela",
    "Prefiero quedarme callado y no expresar mis opiniones",
    "Cuando lo necesito, me siento cómodo pidiendo ayuda",
    "Cuando alguien me critica, prefiero quedarme callado para no generar conflicto",
    "Me siento incómodo cuando alguien me da un regalo",
    "Cuando digo algo es porque estoy seguro. Por eso me irrito con quien no está de acuerdo",
    "Expreso mis sentimientos franca y honestamente, sin vergüenza",
    "Me gusta pedir retroalimentación para saber si otros están de acuerdo con mi punto de vista",
    "Cuando tengo dudas, evito hacer preguntas por miedo a parecer ridículo",
    "Noto que frecuentemente las personas se aprovechan de mí",
    "Me gusta iniciar conversaciones con desconocidos",
    "Cuando alguien es agresivo, me bloqueo y no puedo reaccionar",
    "Me siento una persona importante, competente y querida",
    "Soy espontáneo y afectuoso con las personas que aprecio",
    "Me resulta difícil decir 'no quiero ninguno' a un vendedor que se ha esforzado en mostrarme productos",
    "Cuando hago algo que no considero bueno, hago que las personas lo sepan",
    "Si alguien habla de mí a terceros algo que me desagrada, lo busco para conversar y mostrar mi insatisfacción",
    "Cuando alguien me critica, procuro cambiar rápidamente mi comportamiento para adaptarme",
    "Noto que las personas tienen en cuenta mis opiniones",
    "Me involucro fácilmente con problemas ajenos y asumo la responsabilidad de ayudar. Si no lo hago, me siento mal",
    "Me siento más cómodo ayudando a otros que siendo ayudado",
    "Tengo más facilidad para criticar que para elogiar",
    "Cuando alguien me elogia, me incomodo y digo que no hice más que mi deber"
  ];

  const opciones = [
    { valor: 1, texto: "Casi siempre" },
    { valor: 2, texto: "Con frecuencia" },
    { valor: 3, texto: "Raramente" }
  ];

  const handleRespuesta = (pregunta, valor) => {
    setRespuestas(prev => ({
      ...prev,
      [pregunta]: valor
    }));
  };

  const calcularPuntajePorGrupo = (grupo) => {
    let total = 0;
    grupo.preguntas.forEach(numPregunta => {
      const valor = respuestas[`pregunta${numPregunta}`];
      const preguntasInvertidas = [5, 6, 7, 11, 16, 20, 21, 24, 26, 27, 29, 30, 32];
      
      if (preguntasInvertidas.includes(numPregunta)) {
        total += valor;
      } else {
        total += (4 - valor);
      }
    });
    return (total / grupo.preguntas.length).toFixed(2);
  };

  const calcularPuntajeTotal = () => {
    let total = 0;
    Object.entries(respuestas).forEach(([pregunta, valor]) => {
      const preguntasInvertidas = [5, 6, 7, 11, 16, 20, 21, 24, 26, 27, 29, 30, 32];
      const numPregunta = parseInt(pregunta.replace('pregunta', ''));
      
      if (preguntasInvertidas.includes(numPregunta)) {
        total += valor;
      } else {
        total += (4 - valor);
      }
    });
    return total;
  };

  const interpretarResultado = (puntaje) => {
    if (puntaje <= 36) {
      return "Baja asertividad: Estás usando un comportamiento defensivo con mucha intensidad. Tiendes a la pasividad o agresividad en tus relaciones, lo que puede estar generando conflictos y afectando tu autoestima.";
    } else if (puntaje <= 72) {
      return "Media asertividad: En situaciones difíciles o amenazantes, tiendes a defenderte con pasividad o agresividad. Sin embargo, logras ser asertivo en situaciones menos amenazadoras.";
    } else if (puntaje <= 85) {
      return "Buena asertividad: En la mayoría de las situaciones te afirmas positivamente. Estate atento a las situaciones que te causan incomodidad y a aquellas donde puntuaste menos.";
    } else {
      return "Excelente asertividad: Según tu percepción, negocias bien tus derechos respetando los de los demás, te comunicas con eficacia y cuidas tu autoestima.";
    }
  };

  const todasLasPreguntasRespondidas = () => {
    return Object.values(respuestas).every(valor => valor !== 0);
  };

  const handleSubmit = () => {
    setMostrarResultados(true);
  };

  const prepararDatosGrafico = () => {
    return Object.entries(gruposPreguntas).map(([key, grupo]) => ({
      nombre: grupo.nombre,
      puntaje: calcularPuntajePorGrupo(grupo),
      descripcion: grupo.descripcion
    }));
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 shadow-lg rounded-lg border">
          <p className="font-bold">{label}</p>
          <p className="text-sm">{payload[0]?.payload?.descripcion}</p>
          <p className="text-blue-600">Puntaje promedio: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Test de Asertividad
        </h1>
        
        {!mostrarResultados ? (
          <>
            <p className="mb-4 text-gray-600">
              Evalúa cómo es tu comportamiento asertivo. Selecciona la opción que mejor corresponda a tu respuesta.
            </p>
            {preguntas.map((pregunta, index) => (
              <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg">
                <p className="font-medium mb-2">{`${index + 1}. ${pregunta}`}</p>
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
              Puntaje Total: {calcularPuntajeTotal()} puntos
            </p>
            <p className="text-lg mb-6 text-left bg-blue-50 p-4 rounded-lg">
              {interpretarResultado(calcularPuntajeTotal())}
            </p>

            <div className="mb-6 text-left bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-bold mb-2">Recomendación:</h4>
              <p>Es interesante pedir a otras personas que te conocen bien que respondan este test sobre ti. Otras percepciones pueden aportar valor a tu autoconocimiento y búsqueda de crecimiento personal. Ten en cuenta que el comportamiento asertivo se aprende, solo necesitas querer hacerlo.</p>
            </div>

            <div className="h-96 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={prepararDatosGrafico()}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nombre" angle={-45} textAnchor="end" height={100} />
                  <YAxis domain={[0, 3]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="puntaje" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {Object.entries(gruposPreguntas).map(([key, grupo]) => (
                <div key={key} className="bg-gray-50 p-4 rounded-lg text-left">
                  <h4 className="font-bold text-blue-600">{grupo.nombre}</h4>
                  <p className="text-sm text-gray-600 mb-2">{grupo.descripcion}</p>
                  <p className="font-medium">Puntaje: {calcularPuntajePorGrupo(grupo)}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setMostrarResultados(false);
                setRespuestas(Object.fromEntries([...Array(36)].map((_, i) => [`pregunta${i + 1}`, 0])));
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