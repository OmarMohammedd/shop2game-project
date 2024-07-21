"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleToBC, toggleToFF } from "@/redux/slices/gameslice";
import Image from "next/image";
import { changeLan } from "@/redux/slices/settingsSlice";

const Gameselection = () => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.lan.language);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");
    if (savedLanguage) {
      dispatch(changeLan(savedLanguage));
    }
  }, [dispatch]);

  const game = useSelector((state) => state.game.value);
  const user = useSelector((state) => state.user.user);

  // display: language === 'en' ? 'none' : '',
  // dir={language === 'en' ? 'rtl' : 'ltr'}

  return (
    <div
      style={{
        backgroundImage:
          language !== "en" ? `url("/assets/game-selection-bg.png")` : "none",
        direction: language === "en" && "rtl",
      }}
      className={`bg-[#efefef] w-full h-[200px] ${
        language === "ar" ? "pr-80" : "pl-80"
      } flex items-end flex-col justify-center  ${
        language === "ar" ? "max-[1100px]:pr-5" : "max-[1100px]:pl-5"
      } mt-5
      
      ${
        language === "ar" ? "max-[1390px]:pr-20" : "max-[1390px]:pl-20"
      }
      `}
    >
      <p className=" font-ar  text-2xl font-bold mb-5">
        {language === "en" ? "Choose the game" : "اختيار اللعبة"}
      </p>

      <div className="flex  items-center justify-end gap-8">
        {user.loggedIn ? (
          <>
            {user.game === "blackclover" ? (
              <div
                onClick={() => dispatch(toggleToBC())}
                className="flex items-center gap-2 justify-center flex-col"
              >
                <Image
                  className={` ${
                    game === "blackclover" &&
                    "border-4 rounded-[20px] border-[#d81a0d]"
                  } hover:cursor-pointer`}
                  src="/assets/blackclover-selector.png"
                  alt="selector"
                  height={80}
                  width={80}
                />
                <p
                  className={
                    game === "blackclover"
                      ? "font-custom font-semibold text-[#d81a0d]"
                      : "font-custom font-[500] text-[15px]"
                  }
                >
                  Black Clover M
                </p>
              </div>
            ) : (
              <div
                onClick={() => dispatch(toggleToFF())}
                className="flex items-center gap-2 justify-center flex-col"
              >
                <Image
                  className={` ${
                    game === "freefire" &&
                    "border-4 rounded-[20px] border-[#d81a0d]"
                  } hover:cursor-pointer`}
                  src="/assets/freefire-selector.png"
                  alt="selector"
                  height={80}
                  width={80}
                />
                <p
                  className={
                    game === "freefire"
                      ? "font-custom font-semibold text-[#d81a0d]"
                      : "font-custom font-[500] text-[15px]"
                  }
                >
                  Free Fire
                </p>
              </div>
            )}
          </>
        ) : (
          <>
            <div
              onClick={() => dispatch(toggleToBC())}
              className="flex items-center gap-2 justify-center flex-col"
            >
              <Image
                className={` ${
                  game === "blackclover" &&
                  "border-4 rounded-[20px] border-[#d81a0d]"
                } hover:cursor-pointer`}
                src="/assets/blackclover-selector.png"
                alt="selector"
                height={80}
                width={80}
              />
              <p
                className={
                  game === "blackclover"
                    ? "font-custom font-semibold text-[#d81a0d]"
                    : "font-custom font-[500] text-[15px]"
                }
              >
                Black Clover M
              </p>
            </div>
            <div
              onClick={() => dispatch(toggleToFF())}
              className="flex items-center gap-2 justify-center flex-col"
            >
              <Image
                className={` ${
                  game === "freefire" &&
                  "border-4 rounded-[20px] border-[#d81a0d]"
                } hover:cursor-pointer`}
                src="/assets/freefire-selector.png"
                alt="selector"
                height={80}
                width={80}
              />
              <p
                className={
                  game === "freefire"
                    ? " font-custom font-semibold text-[#d81a0d]"
                    : "font-custom font-[500] text-[15px]"
                }
              >
                Free Fire
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Gameselection;
