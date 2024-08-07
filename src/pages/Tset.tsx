import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RooteState } from "../store/Store";
import {
  askForAnswer,
  askForQuestion,
  saveTest,
} from "../store/gptReducer/gptApi";
import Loader from "../components/Loader";
import { setAnsForNext } from "../store/gptReducer/gptSlice";
import AudioRecord from "../components/AudioRecord";

const Tset = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [arr, setArray] = useState<number[] | null>(null);
  const [val, setVal] = useState<string[] | null>(null);
  const [audioData, setAudioData] = useState<string>("");
  const [askAgain, setAskAgain] = useState<boolean>(true);
  const { user } = useSelector((state: RooteState) => state.user);
  const {
    sentance,
    sentanceGenerationStatus,
    ans,
    answerGenerationStatus,
    lastSavedQuestion,
    saveTestStatus,
  } = useSelector((state: RooteState) => state.tset);
  useEffect(() => {
    if (user) {
      if (askAgain) {
        dispatch(askForQuestion(user.id));
        setAskAgain(false);
      }
    }
  }, [dispatch, user, askAgain]);
  useEffect(() => {
    if (ans) {
      if (askAgain) {
        dispatch(setAnsForNext());
      }
    }
  });
  useEffect(() => {
    const newArr = [1, 3, 2, 4, 5, 6, 7, 8]
      .map((el) => ({ [el]: Math.floor(Math.random() * 100) }))
      .sort((a, b) => Object.values(a)[0] - Object.values(b)[0])
      .map((el) => parseInt(Object.keys(el)[0]));
    setArray(newArr);
    const tArr = [
      "past simple tense",
      "past completed tense",
      "past continue tense",
      "present simple tense",
      "present completed tense",
      "present continue tense",
      "future simple tense",
      "future continue tense",
    ];
    const finalArr = tArr
      .map((_, i) => ({
        [tArr[i]]: newArr[i],
      }))
      .sort((a, b) => Object.values(a)[0] - Object.values(b)[0])
      .map((el) => Object.keys(el)[0]);
    setVal(finalArr);
  }, [askAgain]);
  return sentance ? (
    <div className="w-full min-h-[calc(100vh-48px)] bg-orange-100 px-2 md:px-44 flex flex-col gap-2">
      <div className="p-2 flex flex-col gap-6">
        <div className="self-center text-lg md:text-2xl font-bold text-green-700">
          Time Sense Express Train
        </div>

        <div className="bg-orange-50 min-w-[50%] border border-black text-center font-semibold px-4 py-2.5 rounded-3xl text-lg md:text-xl">
          {sentanceGenerationStatus === "pending" ? <Loader /> : sentance}
        </div>
      </div>
      <div className="p-2">
        <table className="w-full border-collapse border border-black">
          <thead className="text-lg md:text-xl">
            <tr>
              <th className="border border-black w-1/3 h-12">PAST</th>
              <th className="border border-black w-1/3 h-12">PRESENT</th>
              <th className="border border-black w-1/3 h-12">FUTURE</th>
            </tr>
          </thead>
          <tbody className="text-sm md:text-2xl font-semibold">
            <tr>
              <td className="border border-black w-1/3">
                <div className="flex">
                  <span className="flex-1 flex justify-center items-center border-r border-black h-12">
                    S
                  </span>
                  <span className="flex-1 flex justify-center items-center border-r border-black h-12">
                    C.
                  </span>
                  <span className="flex-1 flex justify-center items-center  h-10">
                    C..
                  </span>
                </div>
              </td>
              <td className="border border-black w-1/3">
                <div className="flex">
                  <span className="flex-1 flex justify-center items-center border-r border-black h-10">
                    S
                  </span>
                  <span className="flex-1 flex justify-center items-center border-r border-black h-10">
                    C.
                  </span>
                  <span className="flex-1 flex justify-center items-center  h-10">
                    C..
                  </span>
                </div>
              </td>
              <td className="border border-black w-1/3">
                <div className="flex">
                  <span className="flex-1 flex justify-center items-center border-r border-black h-10">
                    S
                  </span>
                  <span className="flex-1 flex justify-center items-center border-r border-black h-10">
                    C.
                  </span>
                  <span className="flex-1 flex justify-center items-center  h-10">
                    C..
                  </span>
                </div>
              </td>
            </tr>
            {arr && (
              <tr>
                <td className="border border-black w-1/3">
                  <div className="flex">
                    <span className="flex-1 flex justify-center items-center border-r border-black h-10">
                      {arr[0]}
                    </span>
                    <span className="flex-1 flex justify-center items-center border-r border-black h-10">
                      {arr[1]}
                    </span>
                    <span className="flex-1 flex justify-center items-center  h-10">
                      {arr[2]}
                    </span>
                  </div>
                </td>
                <td className="border border-black w-1/3">
                  <div className="flex">
                    <span className="flex-1 flex justify-center items-center border-r border-black h-10">
                      {arr[3]}
                    </span>
                    <span className="flex-1 flex justify-center items-center border-r border-black h-10">
                      {arr[4]}
                    </span>
                    <span className="flex-1 flex justify-center items-center  h-10">
                      {arr[5]}
                    </span>
                  </div>
                </td>
                <td className="border border-black w-1/3">
                  <div className="flex">
                    <span className="flex-1 flex justify-center items-center border-r border-black h-10">
                      {arr[6]}
                    </span>
                    <span className="flex-1 flex justify-center items-center border-r border-black h-10">
                      {}
                    </span>
                    <span className="flex-1 flex justify-center items-center  h-10">
                      {arr[7]}
                    </span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col-reverse lg:flex-row gap-3">
        <div className="w-full flex flex-col gap-3">
          <button
            disabled={sentanceGenerationStatus === "pending"}
            onClick={() => {
              if (user && val) {
                dispatch(askForAnswer({ id: user.id, tenses: val, sentance }));
              }
            }}
            className={`w-[50%] self-center px-3 py-1  font-semibold  rounded-md transition-all   ${
              sentanceGenerationStatus === "pending"
                ? "bg-gray-300 cursor-wait"
                : "bg-green-300 hover:bg-green-400 active:scale-95"
            }`}
          >
            {answerGenerationStatus === "pending" ? (
              <Loader />
            ) : ans ? (
              "Answers"
            ) : (
              "Get Ans"
            )}
          </button>
          <div className="flex justify-center">
            <div className="flex flex-col gap-2 text-lg md:text-xl">
              {ans &&
                ans.map((ans, i) => (
                  <span className="" key={i}>
                    {ans}
                  </span>
                ))}
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-3 ">
          <div className="w-[50%] min-w-fit self-center bg-emerald-100 pb-1 px-6 py-1 rounded-md text-center font-semibold">
            Record Your Answere
          </div>
          <AudioRecord setAudioData={setAudioData} />
        </div>
      </div>

      <div className="w-full flex justify-evenly mt-auto mb-2.5 px-2 md:px-10 gap-2 md:gap-24 lg:gap-56">
        <button
          disabled={
            saveTestStatus === "pending" || lastSavedQuestion === sentance
          }
          onClick={() => {
            if (user && sentance && val && audioData) {
              dispatch(
                saveTest({
                  id: user.id,
                  question: sentance,
                  ans: val,
                  audio: audioData,
                })
              );
            }
          }}
          className={` px-3 md:px-6 py-1 rounded-xl min-w-24  cursor-pointer text-center text-white font-semibold transition-all  ${
            saveTestStatus === "pending"
              ? " bg-gray-300 cursor-wait"
              : lastSavedQuestion === sentance
              ? "bg-gray-300 cursor-default"
              : "bg-cyan-500 hover:bg-cyan-600 active:scale-95"
          }`}
        >
          {saveTestStatus === "pending" ? <Loader /> : "SAVE"}
        </button>
        <button
          disabled={
            saveTestStatus === "pending" ||
            sentanceGenerationStatus === "pending"
          }
          onClick={() => setAskAgain(true)}
          className={` px-3 py-1 md:px-6 rounded-xl min-w-24 cursor-pointer text-center text-white font-semibold transition-all  ${
            saveTestStatus === "pending" ||
            sentanceGenerationStatus === "pending"
              ? " bg-gray-300 cursor-wait"
              : "bg-violet-400 hover:bg-violet-600 active:scale-95"
          }`}
        >
          {sentanceGenerationStatus === "pending" ? <Loader /> : "NEXT"}
        </button>
      </div>
    </div>
  ) : (
    sentanceGenerationStatus === "pending" && (
      <div className="w-full h-[calc(100vh-48px)] flex justify-center items-center">
        <div className="w-24 h-24 bg-gray-200 rounded-xl animate-pulse border-violet-700 flex justify-center items-center">
          <Loader />
        </div>
      </div>
    )
  );
};

export default Tset;
