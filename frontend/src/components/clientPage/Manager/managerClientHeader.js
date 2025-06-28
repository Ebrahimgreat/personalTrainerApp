import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
import { createSignal, For } from "solid-js";
const tabBar = ['Overview', 'WorkoutProgramme', 'Exercise Statistics'];
import { useNavigate } from "@solidjs/router";
import CreateWeight from "../../weight/createWeight";
import CreateWorkout from "../../workout/createWorkout";
import { Button } from "../../ui/button";
import AddMeasurement from "../measurements/addMeasurement";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
function ManagerClientHeader(props) {
    const [open, setOpen] = createSignal(false);
    function updateSearchString(item) {
        console.log("item", item);
        props.setSearchString(item);
    }
    function updateType(item) {
        props.setType(item);
    }
    function updateEquipment(item) {
        props.setEquipment(item);
    }
    function updateWorkoutName(item) {
        props.setWorkoutName(item);
    }
    function updateDate(item) {
        props.setDate(item);
    }
    function addExercise(item) {
        props.addExercise(item);
    }
    function removeItem(item, value, id) {
        props.removeItem(item, value, id);
    }
    function updateProgrammeType() {
    }
    const navigate = useNavigate();
    return (_jsx("div", { class: "w-full p-4 bg-white", children: _jsxs("div", { class: "grid grid-cols-1 md:grid-cols-5 gap-4", children: [_jsx(For, { each: props.myExercise.exercise, children: (item) => _jsx("p", { children: item }) }), _jsx("span", { class: " text-2xl font-semibold text-gray-800  pl-4 text-gray-600", children: props.name ? props.name : '' }), _jsxs(Dialog, { open: open(), onOpenChange: setOpen, children: [_jsx(DialogTrigger, { children: _jsx(Button, { variant: "outline", children: "Log Measurement" }) }), _jsx(DialogContent, { class: "bg-white w-full  ", children: _jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "New Measurement" }), _jsx(DialogDescription, { children: "All values must be entered in inches. Ensure accurate input to help track your progress effectively." }), _jsx(AddMeasurement, { setCloseDialog: () => setOpen(false), measurementDate: props.measurementDate, updateDate: (item) => props.updateMeasurementDate(item), submitMeasurement: () => props.submitMeasurement(), updateMeasurement: (key, number) => props.updateMeasurement(key, number), measurements: props.measurements })] }) })] }), _jsxs(Dialog, { children: [_jsx(DialogTrigger, { children: _jsx(Button, { variant: "outline", children: "Quick Weight Add" }) }), _jsxs(DialogContent, { class: "sm:max-w-[425px] bg-white ", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Create Weight" }) }), _jsx(CreateWeight, { weightCreated: props.weightCreated, addWeight: props.addWeight, updateDate: (item) => props.updateWeightDate(item), updateScaleWeight: (item) => props.updateScaleWeight(item), clientName: props.name, scaleWeight: props.weight })] })] }), _jsxs(Dialog, { children: [_jsx(DialogTrigger, { children: _jsx(Button, { variant: "outline", children: "Create Workout" }) }), _jsxs(DialogContent, { class: "bg-white w-full h-full max-w-none", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "New Workout" }) }), _jsx(CreateWorkout, { updateProgrammeType: (item) => props.updateProgrammeType(item), programmeTypeSelected: props.programmeTypeSelected, programmeTypes: props.programmeTypes, showProgramme: props.showProgramme, programmeExercises: props.programmeExercise, setShowProgramme: (item) => props.setShowProgramme(item), updateWorkout: (key, internalKey, value, field) => props.updateWorkout(key, internalKey, value, field), submitWorkout: props.submitWorkout, removeItem: (number, value, key) => removeItem(number, value, key), workoutName: props.workoutName, setWorkoutName: (item) => updateWorkoutName(item), myExercise: props.myExercise, equipment: props.equipment, setEquipment: (item) => updateEquipment(item), setType: (item) => updateType(item), type: props.type, searchString: props.searchString, setSearchString: (item) => updateSearchString(item), addExercise: (item) => addExercise(item), exercises: props.exercises, clientName: props.name })] })] })] }) }));
}
export default ManagerClientHeader;
