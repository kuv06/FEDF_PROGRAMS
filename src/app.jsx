import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  memo,
} from "react";

const StudentItem = memo(({ name, index, onDelete }) => {
  console.log("Rendering:", name);

  return (
    <li>
      {name}
      <button onClick={() => onDelete(index)}> Delete </button>
    </li>
  );
});

function StudentManagement() {
  const [students, setStudents] = useState([
    "Alice",
    "Bob",
    "Charlie",
  ]);
  const [studentName, setStudentName] = useState("");

  const inputRef = useRef(null);

  // Focus input on component load
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Update browser tab title
  useEffect(() => {
    document.title = `Students: ${students.length}`;
  }, [students]);

  const addStudent = () => {
    if (studentName.trim() === "") return;

    setStudents([...students, studentName]);
    setStudentName("");
  };

  // Memoized delete function
  const deleteStudent = useCallback((index) => {
    setStudents((prevStudents) =>
      prevStudents.filter((_, i) => i !== index)
    );
  }, []);

  // Memoized calculations
  const totalStudents = useMemo(() => {
    return students.length;
  }, [students]);

  const totalCharacters = useMemo(() => {
    return students.reduce(
      (total, student) => total + student.length,
      0
    );
  }, [students]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Student Management Dashboard</h2>

      <input
        ref={inputRef}
        type="text"
        placeholder="Enter student name"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
      />

      <button onClick={addStudent}>Add Student</button>

      <button onClick={() => inputRef.current.focus()}>
        Focus Input
      </button>

      <h3>Total Students: {totalStudents}</h3>
      <h3>Total Characters: {totalCharacters}</h3>

      <ul>
        {students.map((student, index) => (
          <StudentItem
            key={index}
            name={student}
            index={index}
            onDelete={deleteStudent}
          />
        ))}
      </ul>
    </div>
  );
}

export default StudentManagement;