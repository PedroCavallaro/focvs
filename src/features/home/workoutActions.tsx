import { BaseModal } from "@/src/components/baseModal";
import { useModal } from "@/src/providers/modalProvider";
import {
  AlarmClock,
  ArrowLeftRight,
  Play,
  StopCircle,
} from "lucide-react-native";
import { TouchableOpacity } from "react-native";
import { RestTimer } from "./restimer/restTimer";

export function WorkoutActions({
  started,
  openSwichModal,
  startWorkout,
  finishWorkout,
}: {
  started: boolean;
  openSwichModal: () => void;
  startWorkout: () => void;
  finishWorkout: () => void;
}) {
  const {
    openModal: openFinishWorkoutModal,
    closeModal: closeFinishWorkoutModal,
  } = useModal(
    () => (
      <BaseModal
        positionVariant="center"
        sizeVariant="medium"
        title="Tem certeza que deseja finalizar o treino?"
        onClose={() => closeFinishWorkoutModal()}
      >
        <BaseModal.BaseButtons
          onClose={() => closeFinishWorkoutModal()}
          onOk={() => {
            finishWorkout();
            closeFinishWorkoutModal();
          }}
        />
      </BaseModal>
    ),
    [],
  );

  const { openModal: openTimerModal, closeModal: closeTimerModal } = useModal(
    () => (
      <BaseModal title="Tempo de descanso" onClose={() => closeTimerModal()}>
        <RestTimer />
      </BaseModal>
    ),
    [],
  );

  return (
    <>
      {started ? (
        <>
          <TouchableOpacity
            onPress={openTimerModal}
            className="rounded-full bg-orange-500 p-2"
          >
            <AlarmClock size={15} color={"#000"} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={openFinishWorkoutModal}
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
