"use client";

import React from "react";

const SupremeBox3D = () => {
  return (
    <div className="relative flex h-full w-full items-center justify-center" style={{ perspective: "1000px" }}>
      <style jsx>{`
        .supreme-cube-container {
          transform-style: preserve-3d;
          animation: slow-spin 12s linear infinite;
          width: 200px;
          height: 200px;
          position: relative;
        }

        @keyframes slow-spin {
          0% { transform: rotateX(20deg) rotateY(0deg); }
          100% { transform: rotateX(20deg) rotateY(360deg); }
        }

        .face {
          position: absolute;
          width: 200px;
          height: 200px;
          background: rgba(255, 255, 255, 0.03); /* Very light, glassy */
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(2px);
          backface-visibility: visible;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.05);
        }

        /* Inner glowing core */
        .core {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100px;
          height: 100px;
          background: rgba(168, 85, 247, 0.4); /* Purple */
          border-radius: 20px;
          filter: blur(15px);
          transform-style: preserve-3d;
          animation: breathe 3s ease-in-out infinite alternate;
        }

        /* A second solid core for the "object" feel inside */
        .core-solid {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #a855f7, #7c3aed);
          border-radius: 12px;
          box-shadow: 0 0 30px rgba(168, 85, 247, 0.8);
          animation: breathe-solid 3s ease-in-out infinite alternate;
        }

        @keyframes breathe {
          0% {
            width: 100px;
            height: 100px;
            opacity: 0.5;
            filter: blur(15px);
          }
          100% {
            width: 130px;
            height: 130px;
            opacity: 0.8;
            filter: blur(20px);
          }
        }

         @keyframes breathe-solid {
          0% {
             transform: translate(-50%, -50%) scale(0.9) rotate(0deg);
             box-shadow: 0 0 30px rgba(168, 85, 247, 0.6);
          }
          100% {
             transform: translate(-50%, -50%) scale(1.0) rotate(5deg);
             box-shadow: 0 0 60px rgba(168, 85, 247, 1);
          }
        }
      `}</style>
      
      <div className="supreme-cube-container">
        {/* Inner Glowing Core (simulated as a centered element, not 3d rotating with faces to look like it's inside) 
            Actually, if I put it inside the container, it will rotate with the container. 
            The user wants the box to represent the object.
        */}
        
        {/* We need 6 faces for the cube */}
        {/* Front */}
        <div className="face" style={{ transform: "translateZ(100px)" }} />
        {/* Back */}
        <div className="face" style={{ transform: "rotateY(180deg) translateZ(100px)" }} />
        {/* Right */}
        <div className="face" style={{ transform: "rotateY(90deg) translateZ(100px)" }} />
        {/* Left */}
        <div className="face" style={{ transform: "rotateY(-90deg) translateZ(100px)" }} />
        {/* Top */}
        <div className="face" style={{ transform: "rotateX(90deg) translateZ(100px)" }} />
        {/* Bottom */}
        <div className="face" style={{ transform: "rotateX(-90deg) translateZ(100px)" }} />

        {/* The Core - placed inside the container so it spins with it, or maybe counter spins? 
            If it's a glowing energy ball, maybe it stays centered? 
            Let's put a "box" inside.
        */}
        <div className="core" style={{ transform: "translate(-50%, -50%) translateZ(0)" }}></div>
        <div className="core-solid" style={{ transform: "translate(-50%, -50%) translateZ(0)" }}></div>
      </div>
    </div>
  );
};

export default SupremeBox3D;
