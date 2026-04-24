from .Teacher import Teacher

__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Filip Maciejewski 4c"

class Subject:
    def __init__(self, _id: int, name: str, teacher: Teacher):
        self._id = _id
        self.name = name
        self.teacher = teacher

    def __str__(self):
        return f"{self.name} {self.teacher.__str__()}"