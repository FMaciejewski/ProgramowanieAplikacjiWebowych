class Student:
    def __init__(self, id, name, surname, age):
        self.id = int(id)
        self.name = str(name)
        self.surname = str(surname)
        self.age = int(age)
        self.kursy = []

class Kurs:
    def __init__(self, student_id, name):
        self.student_id = int(student_id)
        self.name = str(name)


studenci = []
kursy = []

with open("students.txt", "r") as file:
    for line in file:
        id, name, surname, age = line.strip().split(",")
        student = Student(id, name, surname, age)
        studenci.append(student)

with open("courses.txt", "r") as file:
    for line in file:
        student_id, name = line.strip().split(",")
        kurs = Kurs(student_id, name)
        kursy.append(kurs)

for student in studenci:
    for kurs in kursy:
        if student.id == kurs.student_id:
            student.kursy.append(kurs.name)
    print(f"{student.name} {student.surname} ({student.age} lat) - Kursy: {', '.join(student.kursy)}")
    with open(f"{student.name}_{student.surname}.txt", "w") as file:
        file.write("Kursy:\n")
        for kurs in student.kursy:
            file.write(f"- {kurs}\n")