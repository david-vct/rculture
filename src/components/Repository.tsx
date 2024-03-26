import { useEffect, useState } from "react";
import { createQuestion, findAllQuestions } from "../services/store";

export const Repository = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [answer, setAnswer] = useState("")

    useEffect(() => {
        findAllQuestions()
    });

    return (
        <div>
            <input placeholder="Titre" onChange={(e) => setTitle(e.target.value)} />
            <input placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
            <input placeholder="Réponse" onChange={(e) => setAnswer(e.target.value)} />
            <button onClick={() => createQuestion({title, description, answer})}>Ajouter</button>
        </div>
    )
}