import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
import { useLocation } from "@solidjs/router";
import { createResource, Show, createSignal, createEffect, createMemo } from "solid-js";
import ManagerClientHeader from "./components/clientPage/Manager/managerClientHeader";
import AboutExercise from "./components/exercise/about";
import { createStore } from "solid-js/store";
import ClientStats from "./components/clientPage/stats/clientStats";
import Settings from "./components/clientPage/Manager/settings";
import AssignedProgramme from "./components/clientPage/Manager/assignedProgramme/assignedProgramme";
import MeasurementLibrary from "./components/clientPage/measurements/measurementLibrary";
import MeasurementScreen from "./components/clientPage/measurements/measurementRightScreen";
import ExerciseLibrary from "./components/exercise/exerciseLibrary";
import { useAuth } from "clerk-solidjs";
import Tabs, { TabsContent, TabsIndicator, TabsList, TabsTrigger } from "./components/ui/tabs";
const tabBarItems = ['Overview', 'Assigned Programme', 'Body Measurements', 'Weekly Stats', 'Exercise Statistics', 'Settings'];
import { hc } from "hono/client";
import WorkoutHistory from "./components/clientPage/Manager/assignedProgramme/workoutHistory";
const client = hc('http://localhost:3001/api/measurements');
import { Badge } from "./components/ui/ui/badge";
const [myWorkout, setMyWorkout] = createStore({
    name: '',
    date: '',
    id: 0,
    workout: []
});
const [showProgramme, setShowProgramme] = createSignal('No Programme');
const [programmeExercise, setProgrammeExercise] = createStore([]);
const updateWorkout = (key, internalKey, value, field) => {
    setMyWorkout('workout', key, 'exercise', internalKey, field, value);
    console.log(myWorkout.workout);
};
function removeItem(item, value, id) {
    console.log(item);
    setMyWorkout('workout', item, 'exercise', (current) => current.filter((item) => item.id != value));
    if (myWorkout.workout[item].exercise.length == 0) {
        console.log("LENGTH 0");
        setMyWorkout('workout', (current) => current.filter((item) => item.id != id));
    }
}
function addExercise(item) {
    let index = -1;
    let indexFound = false;
    if (myWorkout.workout.length >= 1) {
        for (let i = 0; i < myWorkout.workout.length; i++) {
            if (myWorkout.workout[i].id === item.id) {
                index = i;
                console.log(index);
                indexFound = true;
                console.log(indexFound);
                break;
            }
        }
        if (indexFound == true) {
            setMyWorkout('workout', index, 'exercise', (current) => [
                ...current, {
                    id: myWorkout.workout[index].exercise.length,
                    set: myWorkout.workout[index].exercise.length + 1,
                    weight: 1,
                    reps: 2
                }
            ]);
            indexFound = false;
            index = -1;
            return;
        }
    }
    setMyWorkout('workout', (current) => [
        ...current, {
            id: item.id,
            name: item.name,
            exercise: [{
                    id: 1,
                    set: 1,
                    reps: 1,
                    weight: 1
                }]
        }
    ]);
    console.log("Workout", myWorkout.workout);
}
function deleteItem(itemId, index, value) {
    setMyWorkout('workout', 'exercise', index, 'exercises', (current) => current.filter((item) => item.id !== value));
    const length = myWorkout.workout.exercise[index].exercises.length;
    if (length == 0) {
        setMyWorkout('workout', 'exercise', (current) => current.filter((item) => item.id != itemId));
    }
}
const updateExercise = (fieldName, key) => (event) => {
    const inputElement = event.currentTarget;
    setMyWorkout("workout", key, (current) => ({
        ...current,
        [fieldName]: Number(inputElement.value)
    }));
};
const resetStore = () => {
    setMyWorkout('workout', []);
};
//submit Workout
const equipment = ['Barbell', 'Dumbell', 'KettleBells', 'Body Weight', 'Cable'];
const bodyPart = ['Chest', 'Quads', 'Hamstrings', 'Rear Delts', 'Tricpes'];
function ViewClient() {
    const { getToken } = useAuth();
    const [startDate, setStartDate] = createSignal('');
    const [endDate, setEndDate] = createSignal('');
    const [exercise, setExercise] = createStore({
        id: 0,
        equipment: '',
        name: '',
        target: ''
    });
    const [selectedTab, setSelectedTab] = createSignal('Overview');
    const [weight, setWeight] = createStore({
        scaleWeight: 0,
        created_at: new Date().toISOString().slice(0, 10)
    });
    const [measurement, setMeasurement] = createStore({
        measurement_id: 0,
        name: '',
        measurement: []
    });
    const [selectedExercise, setSelectedExercise] = createSignal('');
    const [workoutHistoryDate, setWorkoutHistoryDate] = createSignal('');
    const [searchString, setSearchString] = createSignal('');
    const [equipment, setEquipment] = createSignal('Equipment');
    const [type, setType] = createSignal('Type');
    const location = useLocation();
    const id = location.search.slice(4);
    const fetchAllExercises = async () => {
        try {
            const data = await fetch(`http://localhost:3001/api/exercise/all?exerciseName=${searchString()}&type=${type()}&equipment=${equipment()}`, {
                method: "GET",
            });
            return data.json();
        }
        catch (error) {
            console.log(error);
        }
    };
    const fetchWorkoutHistory = async () => {
        try {
            const data = await fetch(`http://localhost:3001/api/clients/${id}/workoutHistory`, {
                method: 'GET',
                headers: {}
            });
            return data.json();
        }
        catch (error) {
            console.log(error);
        }
    };
    const exerciseId = createMemo(() => exercise.id);
    const measurementId = createMemo(() => measurement.measurement_id);
    const fetchStats = async () => {
        try {
            const data = await fetch(`http://localhost:3001/api/clients/${id}/stats?id=${exerciseId()}`, {
                method: "GET"
            });
            return data.json();
        }
        catch (error) {
            console.log(error);
        }
    };
    const fetchAllProgrammes = async () => {
        try {
            const token = await getToken();
            const data = await fetch(`http://localhost:3001/api/programme`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return data.json();
        }
        catch (error) {
            console.log(error);
        }
    };
    const fetchProgrammes = async () => {
        try {
            const data = await fetch(`http://localhost:3001/api/clients/${id}/programmes`);
            return data.json();
        }
        catch (error) {
            console.log(error);
        }
    };
    const fetchMeasurements = async () => {
        try {
            const token = await getToken();
            const data = await fetch(`http://localhost:3001/api/measurements`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return data.json();
        }
        catch (error) {
            console.log(error);
        }
    };
    const fetchMeasurementsData = async () => {
        try {
            const data = await fetch(`http://localhost:3001/api/clients/${id}/measurements?id=${measurementId()}`);
            return data.json();
        }
        catch (error) {
            console.log(error);
        }
    };
    const updateMeasurement = async (key, value) => {
        console.log("HELLO THREER");
        setMeasurementStore('measurement', key, (current) => ({
            ...current,
            value: value
        }));
        console.log(measurementStore.measurement);
    };
    const submitMeasurement = async () => {
        try {
            return;
            const token = await getToken();
            const data = await fetch(`http://localhost:3001/api/clients/${id}/measurement/storeMultiple`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    measurement: measurementStore.measurement,
                    created_at: measurementStore.created_at
                })
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    const submitWorkout = async () => {
        console.log("HI");
        const token = await getToken();
        try {
            const data = await fetch(`http://localhost:3001/api/clients/${id}/workout/store`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    workout: myWorkout
                })
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    const updateSelectExercise = (item) => {
        console.log(item);
        setExercise('id', item.id),
            setExercise('name', item.name);
    };
    const addWeight = async () => {
        try {
            console.log('hi');
            const token = await getToken();
            const data = await fetch(`http://localhost:3001/api/clients/${id}/weights/store`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    scaleWeight: weight.scaleWeight,
                    created_at: weight.created_at
                })
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    const updateShowProgramme = async (item) => {
        confirm("This will reset the workout");
        setShowProgramme(item);
        setMyWorkout('workout', []);
    };
    //Resources
    const [workoutHistory] = createResource(fetchWorkoutHistory);
    const [programmes, { refetch: refetchProgrammes }] = createResource(fetchProgrammes);
    const programmeId = createMemo(() => programmes()?.programme_id);
    const [clientStats, setClientStats] = createResource(exerciseId, fetchStats);
    const [measurements] = createResource(fetchMeasurements);
    const [measurementData] = createResource(measurementId, fetchMeasurementsData);
    const [allProgrammes] = createResource(fetchAllProgrammes);
    //MeasurementSavings
    const [measurementSaving, setMeasurementSaving] = createSignal(false);
    const [measurementDeletionIndicator, setMeasurementDeletionIndicator] = createSignal(false);
    const updateProgramme = async (item) => {
        try {
            const data = await fetch(`http://localhost:3001/api/clients/${id}/updateProgramme`, {
                method: 'POST',
                body: JSON.stringify({
                    id: item
                })
            });
            refetchProgrammes();
        }
        catch (error) {
            console.log(error);
        }
    };
    const [allExercises] = createResource(() => [searchString(), type(), equipment()], ([]) => fetchAllExercises());
    const getClientDetails = async () => {
        try {
            const data = await fetch(`http://localhost:3001/api/clients/${id}`, {
                method: 'GET',
            });
            return data.json();
        }
        catch (error) {
            console.log(error);
        }
    };
    const [myClient, { refetch }] = createResource(getClientDetails);
    createEffect(() => {
        console.log(exerciseId());
    });
    const [measurementStore, setMeasurementStore] = createStore({
        created_at: new Date().toISOString().slice(0, 10),
        measurement: []
    });
    createEffect(() => {
        if (measurements()) {
            for (let i = 0; i < measurements().length; i++) {
                setMeasurementStore('measurement', ((current) => [
                    ...current, {
                        id: measurements()[i].id,
                        name: measurements()[i].name,
                        value: 0
                    }
                ]));
            }
            console.log(measurementStore);
        }
    });
    const [programmeTypeSelected, setProgrammeType] = createStore({
        id: 0,
        name: ''
    });
    const [programmeTypes, setProgrammTypes] = createStore([]);
    const [programmeNames, setProgrammeNames] = createSignal(false);
    const [autoSavingIndicatorClient, setAutosSavingIndicatorClient] = createSignal(false);
    const [workoutFind, setWorkoutFind] = createSignal(0);
    const [initialExercisePut, setInitalExercisePut] = createSignal(-1);
    const [client, setMyClient] = createStore({
        name: '',
        notes: "",
        age: 15
    });
    const deletingMeasurement = (id) => async () => {
        setMeasurement('measurement', ((current) => current.filter((item) => item.id != id)));
        setMeasurementDeletionIndicator(true);
        const timeout = setTimeout(() => {
            setMeasurementDeletionIndicator(false);
        }, 2000);
        try {
            const token = await getToken();
            const data = await fetch(`http://localhost:3001/api/clients/${id}/measurement/delete`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    id: id
                })
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    const updatingMeasurement = (key, field, item) => async () => {
        console.log("HI");
        console.log(measurement.measurement);
        const token = await getToken();
        if (field == 'value') {
            setMeasurement('measurement', key, (current) => ({
                ...current,
                value: Number(item),
            }));
        }
        else if (field == 'created_at') {
            console.log("YES SIR");
            setMeasurement('measurement', key, (current) => ({
                ...current,
                created_at: item,
            }));
        }
        setMeasurementSaving(true);
        const timeout = setTimeout(() => {
            setMeasurementSaving(false);
        }, 2000);
        try {
            const data = await fetch(`http://localhost:3001/api/clients/${id}/measurementUpdate`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                method: "POST",
                body: JSON.stringify({
                    id: measurement.measurement[key].id,
                    measurement_id: measurement.measurement_id,
                    value: Number(measurement.measurement[key].value),
                    created_at: measurement.measurement[key].created_at
                })
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    const updateClient = (fieldName, value) => async () => {
        if (fieldName === 'name') {
            setMyClient('name', value);
        }
        if (fieldName === 'age') {
            setMyClient('age', Number(value));
        }
        if (fieldName === 'notes') {
            setMyClient('notes', value);
        }
        if (client.name != myClient().name || client.age != myClient().age || client.notes != myClient().notes) {
            setAutosSavingIndicatorClient(true);
            const timeout = setTimeout(() => {
                setAutosSavingIndicatorClient(false);
            }, 2000);
            const token = await getToken();
            try {
                const data = await fetch(`http://localhost:3001/api/clients/${id}/updateInformation`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        name: client.name,
                        age: client.age,
                        notes: client.notes
                    })
                });
            }
            catch (error) {
                console.log(error);
            }
        }
    };
    createEffect(() => {
        if (myClient()) {
            setMyClient('age', myClient().age);
            setMyClient('name', myClient().name),
                setMyClient('notes', myClient().notes);
        }
        console.log("Client", client);
    });
    createEffect(() => {
        if (programmes() && initialExercisePut() === -1) {
            console.log("YES SIR");
            const workouts = programmes()?.programme?.programmeWorkout ?? [];
            // Set programme types
            for (let i = 0; i < workouts.length; i++) {
                setProgrammTypes((current) => [
                    ...current,
                    {
                        id: workouts[i].id,
                        name: workouts[i].name,
                    },
                ]);
            }
            console.log("Programme Type Selected", programmeTypeSelected.id);
            const details = workouts[0]?.programmeDetails;
            if (details && details.length > 0) {
                for (let i = 0; i < details.length; i++) {
                    setProgrammeExercise((current) => [
                        ...current,
                        {
                            id: details[i].exercise.id,
                            name: details[i].exercise.name,
                            equipment: details[i].exercise.equipment,
                        },
                    ]);
                }
            }
            setInitalExercisePut(0);
            console.log(programmeExercise);
        }
    });
    createEffect(() => {
        console.log(programmeTypeSelected.id);
        const workouts = programmes()?.programme?.programmeWorkout ?? [];
        const workoutToFind = workouts.findIndex((item) => item.id == programmeTypeSelected.id);
        if (workoutToFind != -1) {
            setProgrammeExercise([]);
            const details = workouts[workoutToFind].programmeDetails;
            for (let i = 0; i < details.length; i++) {
                setProgrammeExercise((current) => [
                    ...current, {
                        id: details[i].exercise.id,
                        name: details[i].exercise.name,
                        equipment: details[i].exercise.equipment
                    }
                ]);
            }
        }
    });
    createEffect(() => {
        if (measurementData()) {
            console.log(measurementData());
            setMeasurement('measurement', []);
            for (let i = 0; i < measurementData().length; i++) {
                setMeasurement('measurement', (current) => [
                    ...current, {
                        created_at: new Date(measurementData()[i].created_at).toISOString().slice(0, 10),
                        value: measurementData()[i].value,
                        id: measurementData()[i].id
                    }
                ]);
            }
        }
    });
    createEffect(() => {
        console.log(measurementStore.measurement);
    });
    return (_jsxs("div", { class: "flex flex-col", children: [_jsx(Show, { when: myClient.loading, children: "Loading" }), _jsxs(Show, { when: myClient(), children: [_jsx(Show, { when: autoSavingIndicatorClient() || measurementSaving() || measurementDeletionIndicator(), children: _jsxs(Badge, { class: "bg-blue-50 text-blue-600 border border-blue-100 animate-pulse w-32", children: [autoSavingIndicatorClient() ? "Updating Client" : "", measurementSaving() ? "Updating Meadurement" : "", measurementDeletionIndicator() ? "Deleting Measurement" : ""] }) }), _jsx(ManagerClientHeader, { measurementDate: measurementStore.created_at, updateMeasurementDate: (item) => setMeasurementStore('created_at', item), submitMeasurement: () => submitMeasurement(), updateProgrammeType: (item) => setProgrammeType('id', item), programmeTypeSelected: programmeTypeSelected, programmeTypes: programmeTypes, showProgramme: showProgramme(), setShowProgramme: (item) => updateShowProgramme(item), programmeExercise: programmeExercise, updateWorkout: (id, value, key, field) => updateWorkout(id, value, key, field), submitWorkout: submitWorkout, updateMeasurement: (key, item) => updateMeasurement(key, item), measurements: measurementStore.measurement, weight: weight.scaleWeight, weightCreated: weight.created_at, updateScaleWeight: (item) => setWeight('scaleWeight', item), updateWeightDate: (item) => setWeight('created_at', item), addWeight: addWeight, removeItem: (number, value, key) => removeItem(number, value, key), setDate: (item) => setMyWorkout('date', item), setWorkoutName: (item) => setMyWorkout('name', item), myExercise: myWorkout.workout, workoutName: myWorkout.name, searchString: searchString(), setSearchString: (item) => setSearchString(item), equipment: equipment(), setEquipment: (item) => setEquipment(item), setType: (item) => setType(item), type: type(), addExercise: (item) => addExercise(item), name: client.name, exercises: allExercises() }), _jsxs(Tabs, { defaultValue: "Overview", class: "w-400px", children: [_jsxs(TabsList, { class: "flex overflow-x-auto whitespace-nowrap no scrollbar gap-2", children: [_jsx(TabsTrigger, { value: "assignedProgramme", children: "Assigned Programme" }), _jsx(TabsTrigger, { class: "", value: "bodyMeasurements", children: "Body Measurements" }), _jsx(TabsTrigger, { value: "exerciseStats", children: "Exercise Statistics" }), _jsx(TabsTrigger, { value: "settings", children: "Settings" }), _jsx(TabsIndicator, { class: "bg-gray-300 cursor-pointer", variant: "block" })] }), _jsx(TabsContent, { value: "exerciseStats", children: _jsxs("div", { class: "grid grid-cols-2 gap-x-3 py-3", children: [_jsx("div", { class: "min-h-screen", children: _jsx(ExerciseLibrary, { selectExercise: selectedExercise(), types: bodyPart, equipment: equipment, updatingExercise: (item) => updateSelectExercise(item), searchExercise: searchString(), myExercises: allExercises() }) }), _jsxs("div", { class: "flex flex-col gap-y-3", children: [selectedExercise(), _jsx(AboutExercise, { targetMuscleGroup: exercise.target, equipment: exercise.equipment, name: exercise.name }), _jsx(ClientStats, { stats: clientStats() })] })] }) }), _jsx("div", { class: "grid grid-cols-2 gap-x-3 py-3", children: _jsxs(Show, { when: selectedTab() === 'Exercise Statistics', children: [_jsx("div", { class: "min-h-screen", children: _jsx(ExerciseLibrary, { selectExercise: selectedExercise(), types: bodyPart, equipment: equipment, updatingExercise: (item) => updateSelectExercise(item), searchExercise: searchString(), myExercises: allExercises() }) }), _jsxs("div", { class: "flex flex-col gap-y-3", children: [selectedExercise(), _jsx(AboutExercise, { targetMuscleGroup: exercise.target, equipment: exercise.equipment, name: exercise.name }), _jsx(ClientStats, { stats: clientStats() })] })] }) }), _jsx(TabsContent, { value: "settings", children: _jsx(Settings, { onChange: (fieldName, value) => updateClient(fieldName, value)(), name: client.name, notes: client.notes, age: client.age }) }), _jsx(TabsContent, { value: "bodyMeasurements", children: _jsxs("div", { class: "grid grid-cols-2 gap-3", children: [_jsx("div", { class: "min-h-screen", children: _jsx(MeasurementLibrary, { setMeasurementId: (item) => setMeasurement('measurement_id', item), setMeasurementName: (item) => setMeasurement('name', item), measurements: measurements() }) }), _jsx(Show, { when: measurementData.loading, children: "Loading" }), _jsx(MeasurementScreen, { deleteMeasurement: (id) => deletingMeasurement(id)(), updateMeasurement: (key, field, item, id) => updatingMeasurement(key, field, item)(), measurement: measurement })] }) }), _jsxs(TabsContent, { value: "assignedProgramme", children: [_jsx(Show, { when: programmes.loading, children: "Updating Programming..." }), _jsxs("div", { class: "grid grid-cols-2 gap-x-3", children: [_jsx(AssignedProgramme, { updateProgramme: (item) => updateProgramme(item), programme_id: programmeId(), allProgramme: allProgrammes(), programme: programmes() }), _jsx(Show, { when: workoutHistory(), children: _jsx(WorkoutHistory, { date: workoutHistoryDate(), setDate: (item) => setWorkoutHistoryDate(item), workout: workoutHistory() }) })] })] })] })] })] }));
}
export default ViewClient;
