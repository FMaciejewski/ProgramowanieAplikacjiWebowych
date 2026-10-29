import { useState } from "react";
import { students as initialStudents } from "./data/students";
import AddStudentForm from "./components/AddStudentForm";
import StudentList from "./components/StudentList";

function App() {
  const [students, setStudents] = useState(initialStudents);
  const [onlyAbove3, setOnlyAbove3] = useState(false);

  const addStudent = (name, grade) => {
    const newId =
        students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1;
    setStudents([...students, { id: newId, name, grade }]);
  };

  // Warunek renderowania / filtrowanie
  const visibleStudents = onlyAbove3
      ? students.filter((s) => s.grade > 3)
      : students;

  return (
      <div
          className="container"
          style={{ maxWidth: "800px", margin: "10px auto", padding: "10px" }}
      >
        <h1 style={{ margin: "10px", padding: "10px" }}>Lista uczniów:</h1>

        <AddStudentForm onAdd={addStudent} />

        <div
            className="form-check form-switch"
            style={{ margin: "10px", padding: "10px 10px 10px 3rem" }}
        >
          <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="filterSwitch"
              checked={onlyAbove3}
              onChange={(e) => setOnlyAbove3(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="filterSwitch">
            Pokaż tylko uczniów z oceną powyżej 3
          </label>
        </div>

        <StudentList students={visibleStudents} />
      </div>
  );
}

export default App;