import React, {useState} from "react";
import Select from "react-select";
import AddingCompito from "./AddingCompito.jsx";
import AddingFile from "./AddingFile.jsx";
import AddingTest from "./AddingTest.jsx";
import AddingFlashcards from "./AddingFlashcards.jsx";

export default function AddingHome() {

    const options = [
        {value: 'compito', label: 'Compito'},
        {value: 'file', label: 'File'},
        {value: 'test', label: 'Test'},
        {value: 'flashcards', label: 'Flashcards'},
    ]

    const [selectedValue, setSelectedValue] = useState(null);

    const handleChange = (selectedOption) => {
        setSelectedValue(selectedOption);
    };

    return (
        <>
            <Select
                value={selectedValue}
                onChange={handleChange}
                options={options}
                placeholder="Aggiungi..."
            />

            {selectedValue && selectedValue.value === "compito" ? <AddingCompito /> : null}
            {selectedValue && selectedValue.value === "file" ? <AddingFile /> : null}
            {selectedValue && selectedValue.value === "test" ? window.location.href = "/adding/test" : null}
            {selectedValue && selectedValue.value === "flashcards" ? window.location.href = "/adding/flashcards" : null}
        < />
    )
}