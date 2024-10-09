import { ArrowLeftRight, Pause, Play, StopCircle } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

export function WorkoutActions({
  started,
  openSwichModal,
  startWorkout,
  finishWorkout,
}: {
  started: number;
  openSwichModal: () => void;
  startWorkout: () => void;
  finishWorkout: () => void;
}) {
  return (
    <>
      {started ? (
        <>
          <TouchableOpacity className="rounded-full bg-orange-500 p-2">
            <Pause size={15} color={"#000"} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={finishWorkout}
            className="rounded-full bg-orange-500 p-2"
          >
            <StopCircle size={15} color={"#000"} />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity
            onPress={openSwichModal}
            className="rounded-full bg-orange-500 p-2"
          >
            <ArrowLeftRight size={15} color={"#000"} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={startWorkout}
            className="rounded-full bg-orange-500 p-2"
          >
            <Play size={15} color={"#000"} />
          </TouchableOpacity>
        </>
      )}
    </>
  );
}
