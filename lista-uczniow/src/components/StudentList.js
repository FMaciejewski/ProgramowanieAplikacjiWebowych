function StudentList({ students }) {
    return (
        <table
            className="table table-striped table-bordered"
            style={{ margin: "10px", padding: "10px" }}
        >
            <thead>
            <tr>
                <th>Imię i nazwisko</th>
                <th>Ocena</th>
            </tr>
            </thead>
            <tbody>
            {students.map((student) => (
                <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.grade}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default StudentList;