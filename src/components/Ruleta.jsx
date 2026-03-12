import React, { useState, useRef } from "react";

function Ruleta() {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const canvasRef = useRef(null);

  const opciones = [
    "🎁 Premio 1",
    "🎉 Premio 2",
    "🌟 Premio 3",
    "🏆 Premio 4",
    "💎 Premio 5",
    "🎊 Premio 6",
    "🚀 Premio 7",
    "⭐ Premio 8",
  ];

  const colores = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#FFA07A",
    "#98D8C8",
    "#F7DC6F",
    "#BB8FCE",
    "#85C1E2",
  ];

  const dibujarRuleta = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Aplicar rotación
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.translate(-centerX, -centerY);

    const sliceAngle = 360 / opciones.length;

    // Dibujar segmentos
    opciones.forEach((opcion, index) => {
      const startAngle = (index * sliceAngle * Math.PI) / 180;
      const endAngle = ((index + 1) * sliceAngle * Math.PI) / 180;

      // Segmento
      ctx.fillStyle = colores[index];
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fill();

      // Borde
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Texto
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + (endAngle - startAngle) / 2);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 14px Arial";
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillText(opcion, radius - 20, 0);
      ctx.restore();
    });

    ctx.restore();
  };

  React.useEffect(() => {
    dibujarRuleta();
  }, [rotation, opciones]);

  const girarRuleta = () => {
    if (isSpinning) return;

    setIsSpinning(true);

    // Cantidad de giros completos + rotación aleatoria
    const rotacionesCompletas = 5;
    const rotacionAleatoria = Math.random() * 360;
    const rotacionTotal = rotacionesCompletas * 360 + rotacionAleatoria;

    let rotacionActual = rotation;
    let velocidad = 20;
    let aceleracion = 0.98;
    let velocidadActual = velocidad;

    const animar = () => {
      rotacionActual += velocidadActual;
      velocidadActual *= aceleracion;

      if (velocidadActual > 0.5) {
        setRotation(rotacionActual % 360);
        requestAnimationFrame(animar);
      } else {
        const rotacionFinal = (rotation + rotacionTotal) % 360;
        setRotation(rotacionFinal);
        setIsSpinning(false);

        // Determinar ganador
        const sliceAngle = 360 / opciones.length;
        const indiceGanador = Math.floor((360 - (rotacionFinal % 360)) / sliceAngle) % opciones.length;
        alert(`¡Ganaste! ${opciones[indiceGanador]}`);
      }
    };

    animar();
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center gap-8">
      <h1 className="text-5xl font-bold text-white mb-4">🎡 La Ruleta</h1>

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="rounded-full shadow-2xl border-8 border-yellow-400"
        />
        {/* Indicador */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 text-4xl">
          🔺
        </div>
      </div>

      <button
        onClick={girarRuleta}
        disabled={isSpinning}
        className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-xl rounded-lg hover:from-yellow-500 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transform hover:scale-105 transition-transform"
      >
        {isSpinning ? "🔄 Girando..." : "¡Girar Ruleta!"}
      </button>

      <p className="text-white text-lg opacity-80">Haz clic en el botón para girar</p>
    </div>
  );
}

export default Ruleta;
