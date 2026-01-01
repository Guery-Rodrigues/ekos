import React, { useState, useEffect } from 'react';
import { Play, Pause, ChevronRight, Map, Clock, Tractor, Activity, Zap, CheckCircle, Share2, BarChart3, AlertCircle, ArrowRight, Route, RotateCw } from 'lucide-react';

const DATA = {
  area: "48,7 M",
  totalTime: "3,5 M",
  operationTime: "1,1 M",
  maneuverTime: "226,4 K",
  displacementTime: "592,1 K",
  idleTime: "1,5 M",
  avgSpeed: "14,66",
  efficiency: "40,81%",
  yield: "34,56",
  machines: "10.450"
};

// Cores da Marca
const JACTO_ORANGE = "#F96302";
const JACTO_BLUE_DARK = "#003B4D";

// Logos
const JactoLogo = ({ className }) => (
  <svg className={className} viewBox="0 0 290 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M42.8419 36.2926C40.2704 36.2926 37.7037 35.8562 35.234 34.9881C32.765 34.1188 30.4696 32.8952 28.4609 31.3283L31.7251 26.5947C33.4569 27.9296 35.3501 28.9854 37.4074 29.7689C39.4642 30.5454 41.7324 30.9398 44.2077 30.9398C48.5021 30.9398 51.7953 30.0923 54.1219 28.3852C56.4423 26.6804 57.6091 24.0311 57.6091 20.417V19.6563H30.2198V0H84.1222V20.9744C84.1222 28.9088 81.3843 35.5092 75.8871 40.7957C70.3939 46.0804 62.416 48.7291 51.9355 48.7291C48.2071 48.7291 44.5497 48.1018 41.0745 46.845C37.5979 45.5954 34.4135 43.7797 31.612 41.3986L34.9717 36.7379C37.4847 38.7559 40.1991 40.2871 43.111 41.3415C46.017 42.3948 48.9942 42.9191 52.0367 42.9191C59.7509 42.9191 65.681 40.9558 69.8663 37.0244C74.0447 33.105 76.1425 27.8604 76.1425 21.2633V19.6563H65.5776V20.6459C65.5776 22.6009 65.0674 24.2902 64.0373 25.7108C62.9937 27.1389 61.3302 28.2853 59.0438 29.1438C56.7457 30.005 54.0221 30.4402 50.8714 30.4402C47.7961 30.4402 45.1165 30.0593 42.8419 29.3128V36.2926Z" fill="currentColor"/>
    <path d="M111.804 48.7291H94.6701V0H111.804V48.7291Z" fill="currentColor"/>
    <path d="M126.353 36.2926H143.549V29.3128C141.275 30.0593 138.595 30.4402 135.52 30.4402C132.369 30.4402 129.646 30.005 127.347 29.1438C125.061 28.2853 123.397 27.1389 122.354 25.7108C121.324 24.2902 120.814 22.6009 120.814 20.6459V19.6563H110.249V21.2633C110.249 27.8604 112.347 33.105 116.525 37.0244C120.71 40.9558 126.64 42.9191 134.355 42.9191C137.397 42.9191 140.374 42.3948 143.28 41.3415C146.192 40.2871 148.907 38.7559 151.42 36.7379L154.779 41.3986C151.978 43.7797 148.793 45.5954 145.317 46.845C141.842 48.1018 138.184 48.7291 134.456 48.7291C123.975 48.7291 115.997 46.0804 110.504 40.7957C105.007 35.5092 102.269 28.9088 102.269 20.9744V0H158.233V19.6563H130.844V20.417C130.844 24.0311 132.011 26.6804 134.331 28.3852C136.658 30.0923 139.951 30.9398 144.245 30.9398C146.721 30.9398 148.989 30.5454 151.046 29.7689C153.103 28.9854 154.996 27.9296 156.728 26.5947L159.992 31.3283C157.984 32.8952 155.688 34.1188 153.219 34.9881C150.749 35.8562 148.183 36.2926 145.611 36.2926H126.353Z" fill="currentColor"/>
    <path d="M186.756 48.7291C182.487 48.7291 178.366 48.0962 174.461 46.825C170.558 45.557 167.081 43.7781 164.062 41.4787L167.535 36.8966C170.177 38.8745 173.049 40.3997 176.155 41.4562C179.258 42.5185 182.702 43.043 186.454 43.043C191.556 43.043 195.763 42.1913 199.089 40.4885C202.417 38.7829 204.081 36.2479 204.081 32.8885V29.393H190.824C183.717 29.393 177.971 27.7334 173.59 24.4024C169.211 21.0777 167.022 16.4747 167.022 10.601V0H184.174V10.328C184.174 14.2247 185.366 17.2831 187.751 19.4966C190.135 21.7142 193.595 22.8194 198.144 22.8194H212.052V32.544C212.052 37.9023 209.587 42.067 204.656 45.0484C199.717 48.0256 193.765 49.5162 186.814 49.5162L186.756 48.7291Z" fill="currentColor"/>
    <path d="M250.081 48.7291H232.948V25.3354H220.86V19.6563H262.169V25.3354H250.081V48.7291Z" fill="currentColor"/>
    <path d="M279.297 19.6563H263.432V0H279.297C282.748 0 285.694 0.54021 288.123 1.61637C290.551 2.6942 291.765 4.75034 291.765 7.78224V11.8741C291.765 14.906 290.551 16.9621 288.123 18.0399C285.694 19.1161 282.748 19.6563 279.297 19.6563ZM279.297 13.9771H279.677V5.67918H279.297C278.216 5.67918 277.345 5.52909 276.663 5.22124C275.985 4.91847 275.647 4.32448 275.647 3.44787V2.91439H271.974V16.742H275.647V16.2085C275.647 15.3319 275.985 14.7379 276.663 14.4351C277.345 14.1272 278.216 13.9771 279.297 13.9771Z" fill="currentColor"/>
    <path d="M279.677 22.1589H275.996V21.6254C275.996 20.7488 275.657 20.1548 274.979 19.852C274.297 19.5442 273.426 19.3941 272.345 19.3941H257.659V48.7291H272.345C275.796 48.7291 278.742 48.1889 281.171 47.1127C283.599 46.0349 284.813 43.9787 284.813 40.9468V36.855C284.813 33.8231 283.599 31.7669 281.171 30.6891C278.742 29.6129 275.796 29.0727 272.345 29.0727H258.748V25.6051H272.345C273.426 25.6051 274.297 25.455 274.979 25.1472C275.657 24.8444 275.996 24.2504 275.996 23.3738V22.8403H279.677V22.1589ZM272.345 43.0497H271.974V34.7517H272.345C273.426 34.7517 274.297 34.9018 274.979 35.2097C275.657 35.5124 275.996 36.1064 275.996 36.983V37.5165H279.677V40.4224H275.996V40.9559C275.996 41.8325 275.657 42.4265 274.979 42.7292C274.297 43.0371 273.426 43.1872 272.345 43.1872V43.0497Z" fill="currentColor"/>
  </svg>
);

const EkosLogo = ({ className }) => (
    <div className={`flex items-center justify-center ${className}`}>
        <span className="font-black text-2xl tracking-widest text-white border-l-4 border-orange-500 pl-3">EKOS</span>
    </div>
);

const Slide = ({ children, bgClass = "bg-[#003B4D]" }) => (
  <div className={`h-full w-full flex flex-col justify-center items-center p-4 md:p-6 text-center transition-all duration-500 ${bgClass} relative overflow-hidden`}>
    <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSI+PHBhdGggZD0iTTAgMGgyMHYyMEgweiIvPjxwYXRoIGQ9Ik0wIDBoMXYxaDFWMEgweiIgZmlsbD0iIzAwM0I0RCIvPjwvZz48L3N2Zz4=')] mix-blend-overlay pointer-events-none"></div>
    {children}
  </div>
);

const ProgressBar = ({ active, progress }) => (
  <div className="h-1 flex-1 bg-white/20 rounded-full mx-1 overflow-hidden backdrop-blur-sm">
    <div 
      className={`h-full transition-all duration-100 ease-linear ${active ? 'opacity-100' : 'opacity-0'}`}
      style={{ width: `${active ? progress : 0}%`, backgroundColor: JACTO_ORANGE }}
    />
  </div>
);

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const slides = [
    {
      id: 'intro',
      content: (
        <Slide bgClass="bg-gradient-to-br from-[#F96302] to-[#c24e00]">
          <div className="flex flex-col items-center justify-center mb-6 md:mb-10 animate-fade-in">
            <EkosLogo className="h-10 md:h-12 scale-100 md:scale-125" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tight drop-shadow-lg">Sua<br/>Safra<br/>2025</h1>
          
          <div className="mb-8 max-w-sm mx-auto bg-white/10 p-4 md:p-6 rounded-2xl backdrop-blur-md border border-white/20">
             <p className="text-white text-sm md:text-lg font-bold leading-relaxed">
               "Tecnologia que conecta o campo e impulsiona resultados reais."
             </p>
          </div>

          <p className="text-white/90 text-[10px] md:text-sm font-medium uppercase tracking-widest mt-4">Os números que moveram o mundo</p>
          <div className="mt-8 md:mt-12 animate-bounce relative z-10">
            <ChevronRight className="w-8 h-8 md:w-10 md:h-10 text-white mx-auto rotate-90 drop-shadow" />
          </div>
        </Slide>
      )
    },
    {
      id: 'area',
      content: (
        <Slide bgClass="bg-[#003B4D]">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#F96302]/40 via-transparent to-transparent pointer-events-none"></div>
          <div className="relative z-10 p-4 md:p-8 bg-[#003B4D]/50 rounded-full mb-4 md:mb-6 ring-4 ring-[#F96302]/20">
            <Map className="w-12 h-12 md:w-20 md:h-20 text-[#F96302]" />
          </div>
          <h2 className="text-xl md:text-3xl text-white font-bold mb-2 uppercase tracking-wider">Monitoramos Tudo</h2>
          <div className="text-5xl md:text-8xl font-black text-white mb-2 tracking-tighter drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">{DATA.area}</div>
          <p className="text-lg md:text-2xl text-[#F96302] font-bold uppercase">Hectares</p>
          
          <div className="mt-6 md:mt-8 bg-[#002A38] p-4 rounded-xl border border-white/10 max-w-xs">
            <p className="text-white/90 font-medium italic text-xs md:text-base">
              "Isso é maior que a área total da Alemanha ou da Califórnia."
            </p>
          </div>
        </Slide>
      )
    },
    {
      id: 'machines',
      content: (
        <Slide bgClass="bg-[#003B4D]">
          <div className="grid grid-cols-6 gap-2 md:gap-4 opacity-10 absolute inset-0 p-4 md:p-8 pointer-events-none">
             {[...Array(48)].map((_, i) => <Tractor key={i} size={20} className="text-white md:w-6 md:h-6" />)}
          </div>
          <div className="relative z-10 p-4 md:p-6 bg-[#F96302] rounded-3xl mb-4 md:mb-6 shadow-lg shadow-[#F96302]/30 transform -rotate-6">
            <Tractor className="w-12 h-12 md:w-24 md:h-24 text-white transform rotate-6" />
          </div>
          <h2 className="text-2xl md:text-4xl text-white font-bold mb-2 md:mb-4 relative z-10 uppercase">A Frota Laranja</h2>
          <div className="text-6xl md:text-9xl font-black text-[#F96302] mb-2 md:mb-4 tracking-tighter relative z-10 drop-shadow-lg">{DATA.machines}</div>
          <p className="text-lg md:text-2xl text-white font-bold uppercase relative z-10">Máquinas Ativas</p>
          
          <p className="mt-6 md:mt-8 text-white/80 font-medium relative z-10 max-w-xs mx-auto italic text-xs md:text-base">
            "Se enfileiradas, formariam uma linha de mais de 60km de tecnologia pura."
          </p>
        </Slide>
      )
    },
    {
      id: 'time-breakdown',
      content: (
        <Slide bgClass="bg-[#003B4D]">
          <div className="bg-[#005F7A]/30 p-4 rounded-full mb-4 md:mb-6 ring-2 ring-[#F96302]/50">
            <Clock className="w-10 h-10 md:w-16 md:h-16 text-[#F96302]" />
          </div>
          <h2 className="text-xl md:text-3xl text-white font-bold mb-4 md:mb-6 uppercase tracking-wider">Raio-X do Tempo</h2>
          
          <div className="w-full max-w-md flex flex-col gap-4 relative z-10 px-2">
            
            {/* Barras de Progresso Principais */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-white mb-1 items-end whitespace-nowrap">
                  <span className="font-bold text-sm md:text-base flex items-center gap-2"><Zap size={14} className="text-[#F96302]"/> Operando</span>
                  <span className="text-[#F96302] font-black text-base md:text-xl ml-2">{DATA.operationTime}h</span>
                </div>
                <div className="w-full bg-[#002A38] rounded-full h-2 md:h-3 p-[2px] shadow-inner overflow-hidden">
                  <div className="bg-gradient-to-r from-[#F96302] to-orange-400 h-full rounded-full shadow-lg" style={{width: '73%'}}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-white mb-1 items-end whitespace-nowrap">
                  <span className="font-bold text-sm md:text-base flex items-center gap-2"><AlertCircle size={14} className="text-red-400"/> Parado</span>
                  <span className="text-red-400 font-black text-base md:text-xl ml-2">{DATA.idleTime}h</span>
                </div>
                <div className="w-full bg-[#002A38] rounded-full h-2 md:h-3 p-[2px] shadow-inner relative overflow-hidden">
                  <div className="bg-gradient-to-r from-red-500 to-red-400 h-full rounded-full shadow-lg relative z-10" style={{width: '100%'}}></div>
                </div>
              </div>
            </div>

            {/* Grid de Métricas Secundárias (Novo) */}
            <div className="grid grid-cols-2 gap-3 mt-2">
               <div className="bg-[#002A38] p-3 rounded-xl border border-white/5 flex flex-col items-center">
                 <RotateCw size={16} className="text-blue-400 mb-1" />
                 <span className="text-white/60 text-[10px] uppercase font-bold">Manobra</span>
                 <span className="text-white font-bold text-sm">{DATA.maneuverTime}h</span>
               </div>
               <div className="bg-[#002A38] p-3 rounded-xl border border-white/5 flex flex-col items-center">
                 <Route size={16} className="text-purple-400 mb-1" />
                 <span className="text-white/60 text-[10px] uppercase font-bold">Deslocamento</span>
                 <span className="text-white font-bold text-sm">{DATA.displacementTime}h</span>
               </div>
            </div>

            <div className="bg-[#002A38] p-3 rounded-xl border-l-4 border-blue-400 mt-2">
               <p className="text-white/90 font-medium italic text-xs">
                 "3,5 Milhões de horas totais. O equivalente a 400 anos em uma única safra."
               </p>
            </div>
          </div>
        </Slide>
      )
    },
    {
      id: 'efficiency',
      content: (
        <Slide bgClass="bg-[#003B4D]">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#F96302]/30 via-transparent to-transparent pointer-events-none"></div>
          <div className="relative z-10 mb-2">
            <Activity className="w-12 h-12 md:w-20 md:h-20 text-[#F96302] animate-pulse" />
          </div>
          <h2 className="text-lg md:text-2xl text-[#F96302] font-bold uppercase tracking-[0.2em] mb-2">Eficiência Operacional</h2>
          
          {/* Ajuste de Tamanho de Fonte para Mobile */}
          <div className="text-5xl md:text-8xl font-black text-white mb-6 drop-shadow-xl relative z-10 tracking-tight">{DATA.efficiency}</div>
          
          <div className="flex flex-col gap-3 w-full max-w-md relative z-10 px-4">
            <div className="flex items-center space-x-3 bg-[#002A38] px-4 py-3 rounded-2xl border-l-4 border-[#F96302] shadow-lg">
              <Zap className="text-[#F96302] w-5 h-5 md:w-6 md:h-6" />
              <div className="text-left flex-1">
                <p className="text-[10px] md:text-xs text-white/60 uppercase font-bold">Velocidade Média</p>
                <div className="flex items-baseline justify-between w-full">
                    <p className="text-lg md:text-xl font-black text-white leading-none">{DATA.avgSpeed}</p>
                    <span className="text-[10px] font-bold text-[#F96302] uppercase">km/h</span>
                </div>
              </div>
            </div>
             <div className="flex items-center space-x-3 bg-[#002A38] px-4 py-3 rounded-2xl border-l-4 border-green-500 shadow-lg">
              <CheckCircle className="text-green-500 w-5 h-5 md:w-6 md:h-6" />
              <div className="text-left flex-1">
                <p className="text-[10px] md:text-xs text-white/60 uppercase font-bold">Rendimento Médio</p>
                <div className="flex items-baseline justify-between w-full">
                    <p className="text-lg md:text-xl font-black text-white leading-none">{DATA.yield}</p>
                    <span className="text-[10px] font-bold text-green-500 uppercase">ha/h</span>
                </div>
              </div>
            </div>
             <p className="mt-2 text-white/80 font-medium italic text-[10px] md:text-xs text-center">
               "Cada segundo contou para maximizar a colheita."
             </p>
          </div>
        </Slide>
      )
    },
    {
      id: 'summary',
      content: (
        <Slide bgClass="bg-[#003B4D]">
          <div className="w-full max-w-sm bg-[#002A38] border-2 border-[#F96302]/50 p-4 md:p-6 rounded-[2rem] shadow-2xl shadow-[#F96302]/10 relative z-10">
            <div className="flex items-center justify-between mb-4 md:mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="border-l-4 border-[#F96302] pl-3">
                   <h3 className="text-white font-black text-xl md:text-2xl tracking-widest leading-none">EKOS</h3>
                   <p className="text-white/50 text-[10px] font-medium uppercase tracking-wider mt-1">Report Safra 2025</p>
                </div>
              </div>
              <BarChart3 className="text-[#F96302]/50 w-5 h-5 md:w-6 md:h-6" />
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="bg-[#003B4D] p-2 md:p-3 rounded-2xl text-center">
                <p className="text-[#F96302] text-[10px] md:text-xs font-bold uppercase mb-1">Área Total</p>
                <p className="text-white font-black text-lg md:text-xl">{DATA.area}</p>
              </div>
              <div className="bg-[#003B4D] p-2 md:p-3 rounded-2xl text-center">
                <p className="text-green-500 text-[10px] md:text-xs font-bold uppercase mb-1">Eficiência</p>
                <p className="text-white font-black text-lg md:text-xl">{DATA.efficiency}</p>
              </div>
              <div className="bg-[#003B4D] p-2 md:p-3 rounded-2xl text-center">
                <p className="text-[#F96302] text-[10px] md:text-xs font-bold uppercase mb-1">Frota Ativa</p>
                <p className="text-white font-black text-lg md:text-xl">{DATA.machines}</p>
              </div>
              <div className="bg-[#003B4D] p-2 md:p-3 rounded-2xl text-center">
                <p className="text-blue-400 text-[10px] md:text-xs font-bold uppercase mb-1">Horas Totais</p>
                <p className="text-white font-black text-lg md:text-xl">{DATA.totalTime}</p>
              </div>
            </div>
            
            {/* Indicador visual de que há mais uma página */}
             <div className="flex justify-center animate-bounce text-white/50 text-xs mt-4">
                 <p className="flex items-center gap-1">Próximo: O Futuro <ChevronRight size={14}/></p>
             </div>
          </div>
        </Slide>
      )
    },
    {
      id: 'outro',
      content: (
        <Slide bgClass="bg-gradient-to-br from-[#003B4D] to-[#002A38]">
          <div className="flex flex-col items-center justify-center h-full relative z-10 px-6">
            
            <h1 className="text-2xl md:text-4xl font-black text-white mb-6 md:mb-8 leading-tight tracking-tight text-center max-w-md drop-shadow-2xl">
              Transforme cada dado em uma decisão estratégica.
            </h1>
            
            <div className="w-16 h-1 md:w-20 md:h-1 bg-[#F96302] rounded-full mb-6 md:mb-8"></div>
            
            <p className="text-[#F96302] text-sm md:text-lg font-bold uppercase tracking-widest mb-8 md:mb-12 text-center animate-pulse">
              O futuro da sua operação é conectado.
            </p>

            <button 
               onClick={() => {
                 setIsPlaying(false);
                 setCurrentSlide(0);
                 setTimeout(() => setIsPlaying(true), 100);
               }}
               className="flex items-center gap-3 text-white bg-white/10 hover:bg-[#F96302] border border-white/20 hover:border-[#F96302] px-6 py-3 md:px-8 md:py-4 rounded-full font-bold transition-all hover:scale-105 group text-sm md:text-base"
            >
               <Share2 size={18} className="group-hover:rotate-12 transition-transform md:w-5 md:h-5"/> Replay Retrospectiva
            </button>
          </div>
        </Slide>
      )
    }
  ];

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            if (currentSlide < slides.length - 1) {
              setCurrentSlide(c => c + 1);
              return 0;
            } else {
              setIsPlaying(false);
              return 100;
            }
          }
          return prev + 0.5;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentSlide, slides.length]);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(c => c + 1);
      setProgress(0);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(c => c - 1);
      setProgress(0);
    }
  };

  return (
    <div className="w-full h-[100dvh] bg-[#002A38] flex items-center justify-center font-sans overflow-hidden">
      {/* Background pattern - keep only visible on desktop background or subtle overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiMwMDVGN0EiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2Utb3BhY2l0eT0iMC4yIj48cGF0aCBkPSJNMCAyMGg0ME0yMCAwdjQwIi8+PC9nPjwvc3ZnPg==')] opacity-20 pointer-events-none"></div>
      
      {/* Container Principal: Fullscreen no mobile, Moldura no Desktop */}
      <div className="w-full h-full md:max-w-md md:h-[90vh] md:max-h-[850px] relative shadow-2xl shadow-black/50 bg-[#003B4D] overflow-hidden md:rounded-[2rem] md:border-x md:border-[#F96302]/20">
        
        <div className="absolute top-6 left-0 right-0 z-50 flex px-4 gap-1">
          {slides.map((_, idx) => (
            <ProgressBar 
              key={idx} 
              active={idx <= currentSlide} 
              progress={idx === currentSlide ? progress : 100} 
            />
          ))}
        </div>

        <div className="absolute inset-0 z-40 flex">
          <div className="w-1/3 h-full" onClick={handlePrev}></div>
          <div className="w-2/3 h-full" onClick={handleNext}></div>
        </div>

        {slides[currentSlide].content}

        <div className="absolute bottom-6 right-6 z-50 pointer-events-auto">
            <button 
                onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }}
                className="p-3 bg-[#002A38]/80 text-[#F96302] rounded-full backdrop-blur-md hover:bg-[#F96302] hover:text-white transition-all border border-[#F96302]/30 shadow-lg"
            >
                {isPlaying ? <Pause size={20} fill="currentColor"/> : <Play size={20} fill="currentColor"/>}
            </button>
        </div>

      </div>
    </div>
  );
}