import { useState } from "react";

function AddStudentForm({ onAdd }) {
    const [name, setName] = useState("");
    const [grade, setGrade] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // 1. Sprawdzenie pustych pól / samych spacji
        if (name.trim() === "" || String(grade).trim() === "") {
            alert("Pola muszą być wypełnione!");
            return;
        }

        // 2. Sprawdzenie zakresu oceny
        const gradeNumber = Number(grade);
        if (isNaN(gradeNumber) || gradeNumber < 1 || gradeNumber > 6) {
            alert("Ocena musi być z zakresu <1;6>");
            return;
        }

        // 3. Dodanie ucznia i wyczyszczenie pól
        onAdd(name.trim(), gradeNumber);
        setName("");
        setGrade("");
    };

    return (
        <form onSubmit={handleSubmit} style={{ margin: "10px", padding: "10px" }}>
            <div className="mb-3">
                <label className="form-label">Imię i nazwisko:</label>
                <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Ocena:</label>
                <select
                    className="form-select"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                >
                    <option value=""></option>
                    {[1, 2, 3, 4, 5, 6].map((g) => (
                        <option key={g} value={g}>
                            {g}
                        </option>
                    ))}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">
                Dodaj ucznia
            </button>
        </form>
    );
}

export default AddStudentForm;