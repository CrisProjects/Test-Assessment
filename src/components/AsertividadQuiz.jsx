import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  MessageSquare, 
  Shield, 
  Heart, 
  HandStop, 
  MessageCircle, 
  Users,
  ChevronDown
} from 'lucide-react';

const AsertividadQuiz = () => {
  // ... [mantener todo el código anterior hasta gruposPreguntas]

  const gruposPreguntas = {
    autoexpresion: {
      nombre: "Autoexpresión",
      descripcion: "Capacidad para expresar opiniones y sentimientos",
      preguntas: [1, 4, 7, 15, 20, 22, 24, 27, 29],
      icon: MessageSquare,
      color: "#4299E1" // blue-500
    },
    manejoConflictos: {
      nombre: "Manejo de Conflictos",
      descripcion: "Habilidad para manejar situaciones difíciles",
      preguntas: [2, 3, 8, 11, 13, 19, 25, 30],
      icon: Shield,
      color: "#2B6CB0" // blue-700
    },
    autoestima: {
      nombre: "Autoestima",
      descripcion: "Valoración personal y confianza en uno mismo",
      preguntas: [6, 18, 26, 32, 36],
      icon: Heart,
      color: "#2C5282" // blue-800
    },
    establecerLimites: {
      nombre: "Establecimiento de Límites",
      descripcion: "Capacidad para decir no y establecer límites saludables",
      preguntas: [5, 12, 28, 33, 34],
      icon: HandStop,
      color: "#2A4365" // blue-900
    },
    comunicacionEfectiva: {
      nombre: "Comunicación Efectiva",
      descripcion: "Habilidades de comunicación clara y directa",
      preguntas: [14, 16, 17, 21, 31],
      icon: MessageCircle,
      color: "#3182CE" // blue-600
    },
    relacionesInterpersonales: {
      nombre: "Relaciones Interpersonales",
      descripcion: "Manejo de relaciones con otros",
      preguntas: [9, 10, 23, 35],
      icon: Users,
      color: "#63B3ED" // blue-400
    }
  };

  // ... [mantener el resto del código existente hasta el return]

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
        <div className="bg-blue-700 text-white p-6 -mx-6 -mt-6 rounded-t-lg mb-6">
          <h1 className="text-3xl font-bold text-center">
            Assessment de Asertividad
          </h1>
          <p className="text-center mt-2 text-blue-100">
            Evalúa tu nivel de asertividad en diferentes aspectos
          </p>
        </div>
        
        {!mostrarResultados ? (
          <>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <p className="text-blue-700">
                Evalúa cómo es tu comportamiento asertivo. Selecciona la opción que mejor corresponda a tu respuesta.
              </p>
            </div>
            {preguntas.map((pregunta, index) => (
              <div key={index} className="mb-6">
                <div className="flex items-center gap-2 mb-2 bg-gray-50 p-4 rounded-t-lg border border-gray-200">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </span>
                  <p className="font-medium">{pregunta}</p>
                </div>
                <div className="flex flex-wrap gap-2 bg-white p-4 rounded-b-lg border border-t-0 border-gray-200">
                  {opciones.map((opcion) => (
                    <button
                      key={opcion.valor}
                      onClick={() => handleRespuesta(`pregunta${index + 1}`, opcion.valor)}
                      className={`px-6 py-2 rounded-full transition-all ${
                        respuestas[`pregunta${index + 1}`] === opcion.valor
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
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
              className={`w-full py-3 rounded-lg transition-all ${
                todasLasPreguntasRespondidas()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Ver Resultados
            </button>
          </>
        ) : (
          <div>
            <div className="text-center bg-blue-50 rounded-lg p-6 mb-6">
              <h3 className="text-2xl font-bold text-blue-800 mb-4">Resultados</h3>
              <p className="text-3xl font-bold text-blue-600 mb-4">
                Puntaje Total: {calcularPuntajeTotal()} puntos
              </p>
              <p className="text-lg text-left bg-white p-4 rounded-lg border border-blue-200">
                {interpretarResultado(calcularPuntajeTotal())}
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <h4 className="font-bold text-yellow-800 mb-2">Recomendación:</h4>
              <p className="text-yellow-800">Es interesante pedir a otras personas que te conocen bien que respondan este test sobre ti. Otras percepciones pueden aportar valor a tu autoconocimiento y búsqueda de crecimiento personal.</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h4 className="text-xl font-bold text-blue-800 mb-4">Resultados por Categoría</h4>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={prepararDatosGrafico()}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="nombre" 
                      angle={-45} 
                      textAnchor="end" 
                      height={100}
                      tick={{ fill: '#2D3748', fontSize: 12 }}
                    />
                    <YAxis domain={[0, 3]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="puntaje" 
                      fill="#3B82F6"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {Object.entries(gruposPreguntas).map(([key, grupo]) => {
                const Icon = grupo.icon;
                return (
                  <div key={key} className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: `${grupo.color}20` }}>
                        <Icon size={24} color={grupo.color} />
                      </div>
                      <h4 className="font-bold" style={{ color: grupo.color }}>{grupo.nombre}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{grupo.descripcion}</p>
                    <p className="font-medium text-lg">
                      Puntaje: {calcularPuntajePorGrupo(grupo)}
                    </p>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => {
                setMostrarResultados(false);
                setRespuestas(Object.fromEntries([...Array(36)].map((_, i) => [`pregunta${i + 1}`, 0])));
              }}
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-all"
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