import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { BlockPicker, HuePicker, MaterialPicker, SketchPicker, SwatchesPicker } from 'react-color';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ChoosingBar from './components/ChoosingBar';

import './App.css';

function App() {
  const [buttonTextColor, setButtonTextColor] = useState('#202020');
  const [currentColor, setCurrentColor] = useState('#FFFFFF');
  const colorPicersList = [
    {
      name: 'Scetch',
      href: '/scetch',
    },
    {
      name: 'Block',
      href: '/block',
    },
    {
      name: 'Hue',
      href: '/hue',
    },
    {
      name: 'Material',
      href: '/material',
    },
    {
      name: 'Swatches',
      href: '/swatches ',
    },
  ];

  const notify = () => toast('Сolor has been copied!');

  const handleCopyClick = () => {
    navigator.clipboard.writeText(currentColor);
    notify();
  };

  const pickTextColorBasedOnBgColorAdvanced = (bgColor, lightColor, darkColor) => {
    const color = bgColor.charAt(0) === '#' ? bgColor.substring(1, 7) : bgColor;
    const r = parseInt(color.substring(0, 2), 16); // hexToR
    const g = parseInt(color.substring(2, 4), 16); // hexToG
    const b = parseInt(color.substring(4, 6), 16); // hexToB
    const uicolors = [r / 255, g / 255, b / 255];
    const c = uicolors.map((col) => {
      if (col <= 0.03928) {
        return col / 12.92;
      }
      return Math.pow((col + 0.055) / 1.055, 2.4);
    });
    const L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
    return L > 0.179 ? setButtonTextColor(darkColor) : setButtonTextColor(lightColor);
  };

  useEffect(() => {
    pickTextColorBasedOnBgColorAdvanced(currentColor, '#FAFAFA', '#202020');
  }, [currentColor]);

  return (
    <div className="mainContainer">
      <ChoosingBar colorPicersList={colorPicersList} />

      <div className="pickerContainer">
        <Routes>
          <Route path="*" element={<Navigate to={'/scetch'} />} />
          <Route
            path="/scetch"
            element={
              <SketchPicker
                color={currentColor}
                onChange={(color) => {
                  setCurrentColor(color.hex);
                }}
              />
            }
          />

          <Route
            path="/block"
            element={
              <BlockPicker
                color={currentColor}
                onChange={(color) => {
                  setCurrentColor(color.hex);
                }}
              />
            }
          />

          <Route
            path="/hue"
            element={
              <HuePicker
                color={currentColor}
                onChange={(color) => {
                  setCurrentColor(color.hex);
                }}
              />
            }
          />

          <Route
            path="/material"
            element={
              <MaterialPicker
                color={currentColor}
                onChange={(color) => {
                  setCurrentColor(color.hex);
                }}
              />
            }
          />

          <Route
            path="/swatches"
            element={
              <SwatchesPicker
                style={{ marginLeft: 20 }}
                color={currentColor}
                onChange={(color) => {
                  setCurrentColor(color.hex);
                }}
              />
            }
          />
        </Routes>
      </div>

      <button
        onClick={handleCopyClick}
        style={{
          color: buttonTextColor,
          background: currentColor,
        }}
        className="copyColorButton">
        Copy to Clipboard: {currentColor}
      </button>
      <ToastContainer />
    </div>
  );
}

export default App;
