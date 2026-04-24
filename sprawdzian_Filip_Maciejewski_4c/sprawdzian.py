from models.Teacher import Teacher
from models.Subject import Subject
from models.Student import Student
from models.Grades import Grades
import year_grade
import datetime as dt
import json

__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Filip Maciejewski 4c"

teachers : list[Teacher] = []
subjects : list[Subject] = []
students : list[Student] = []
grades_tab : list[Grades] = []

with open("teachers.txt", "r") as file:
    for line in file:
        data = line.strip().split(" ")
        teacher = Teacher(int(data[0]), data[1], data[2])
        teachers.append(teacher)

with open("subjects.txt", "r") as file:
    for line in file:
        data = line.strip().split(" ")
        for teacher in teachers:
            if teacher._id == int(data[2]):
                subject = Subject(int(data[0]), data[1], teacher)
                subjects.append(subject)

with open("students.txt", "r") as file:
    for line in file:
        data = line.strip().split(" ")
        birth_date = dt.datetime.strptime(data[3], "%Y-%m-%d").date()
        student = Student(int(data[0]), data[1], data[2], birth_date)
        students.append(student)

with open("grades.txt", "r") as file:
    for line in file:
        data = line.strip().split(" ")
        grades = list(map(int, data[2].split(",")))
        student = None
        subject = None
        for s in students:
            if s._id == int(data[0]):
                student = s
                break
        for sub in subjects:
            if sub._id == int(data[1]):
                subject = sub
                break
        if student and subject:
            grade = Grades(grades, student, subject)
            grades_tab.append(grade)

print("Oceny i średnie poszczególnych uczniów:")
for student in students:
    print(student.__str__() + ":")
    for grade in grades_tab:
        if grade.student._id == student._id:
            print(f"  {grade.subject.name}:")
            grades_list = grade.get_grades()
            print(f"    Oceny: {', '.join(map(str, grades_list))}")
            print(f"    Średnia: {grade.get_average():.2f}")
            print(f"    Ocena końcowa: {year_grade.year_grade(grade.get_average())}")
    print()      


output = {}

for student in students:
    key = student.__str__()

    output[key] = {}

    for grade in grades_tab:
        if grade.student._id == student._id:
            grades_list = grade.get_grades()

            output[key][grade.subject.name] = {
                "Oceny": ", ".join(map(str, grades_list)),
                "Srednia": round(grade.get_average(), 2),
                "Ocena roczna": year_grade.year_grade(grade.get_average())
            }

with open("students.json", "w", encoding="utf-8") as f:
    json.dump(output, f, indent=4, ensure_ascii=False)

for i in range(1, 50):
    print("=", end="")

print()

for subject in subjects:
    print(subject.name + ":")
    print(f"  Nauczyciel: {subject.teacher.__str__()}")
    
    list_of_grades_avg : list[float] = []
    all_grades : list[int] = []
    for grade in grades_tab:
        if grade.subject._id == subject._id:
            all_grades.extend(grade.get_grades())
            list_of_grades_avg.append(grade.get_average())
    print(f"  Oceny: ", ", ".join(map(str, all_grades)))
    print(f"  Średnia: {sum(list_of_grades_avg) / len(list_of_grades_avg):.2f}")
    print()

output_subjects = {}

for subject in subjects:
    key = subject.name

    output_subjects[key] = {
        "Nauczyciel": subject.teacher.__str__(),
        "Oceny": all_grades,
        "Srednia": round(sum(list_of_grades_avg) / len(list_of_grades_avg), 2)
    }

with open("subjects.json", "w", encoding="utf-8") as f:
    json.dump(output_subjects, f, indent=4, ensure_ascii=False)