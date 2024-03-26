import { useEffect, useState } from "react";
import { getDocs, addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";

export const Repository = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [answer, setAnswer] = useState("");

    const questionsCollectionRef = collection(db, "questions");

    const getQuestions = async () => {
        try {
            const data = await getDocs(questionsCollectionRef);
            const filteredData = data.docs.map((doc) => ({...doc.data()}));
            console.log(filteredData);
        } catch (error) {
            console.error(error);
        }
    }

    const addQuestion = async () => {
        try {
            await addDoc(questionsCollectionRef, {title:title, description:description, answer:answer});
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getQuestions();
    });

    return (
        <div>
            <input placeholder="Titre" onChange={(e) => setTitle(e.target.value)} />
            <input placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
            <input placeholder="Réponse" onChange={(e) => setAnswer(e.target.value)} />
            <button onClick={addQuestion}>Ajouter</button>
        </div>
    );
};