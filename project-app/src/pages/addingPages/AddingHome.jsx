import React from "react";
import Select from "react-select";

export default function AddingHome() {

    const options = [
        {value: 'compito', label: 'Compito'},
        {value: 'file', label: 'File'},
        {value: 'test', label: 'Test'},
        {value: 'flashcards', label: 'Flashcards'},
    ]

    return (
        <>
            <Select options={options} placeholder="Aggungi..."/>
        </>
    )
}