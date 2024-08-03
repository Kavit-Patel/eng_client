import { useState } from "react";
import { ReactMic, ReactMicStopEvent } from "react-mic";

const AudioRecord = ({
  setAudioData,
}: {
  setAudioData: (data: string) => void;
}) => {
  const [record, setRecord] = useState<boolean>(false);
  const [audioFile, setAudioFile] = useState<string>("");
  const startRecording = () => {
    setRecord(true);
  };
  const stopRecording = () => {
    setRecord(false);
  };
  const handleStop = (recordedBlob: ReactMicStopEvent) => {
    const audioUrl = URL.createObjectURL(recordedBlob.blob);
    setAudioFile(audioUrl);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = (reader.result as string).split(",")[1];
      setAudioData(base64String);
    };
    reader.readAsDataURL(recordedBlob.blob);
  };
  return (
    <div className="flex flex-col self-center lg:mt-10 items-center gap-5">
      <ReactMic
        className="rounded-xl w-96"
        record={record}
        onStop={(recording) => handleStop(recording)}
      />
      <div className="flex justify-around gap-4 lg:gap-20">
        <button
          onClick={() => startRecording()}
          className="px-4 py-1.5 bg-emerald-300 transition-all hover:bg-emerald-400 active:scale-95 rounded-md"
        >
          Start Recording
        </button>
        <button
          onClick={() => stopRecording()}
          className="px-4 py-1.5 bg-red-200 transition-all hover:bg-red-300 active:scale-95 rounded-md"
        >
          Stop Recording
        </button>
      </div>
      <audio className="self-center" src={audioFile} controls></audio>
    </div>
  );
};

export default AudioRecord;
