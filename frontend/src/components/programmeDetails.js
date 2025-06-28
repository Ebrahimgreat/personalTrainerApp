import { createStore } from "solid-js/store";
const [programmeDetails, setProgrammeDetails] = createStore({
    exercise: ''
});
const updateProgrammeDetails = (item) => {
    console.log;
    const newExercise = item.map((value) => ({
        exercise: value.exercise.name,
        sets: value.sets,
        repRange: value.repRange
    }));
    setProgrammeDetails('exercise', newExercise);
};
export { programmeDetails, setProgrammeDetails, updateProgrammeDetails };
