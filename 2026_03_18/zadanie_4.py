with open("sygnaly.txt", "r") as file:
    x = 1
    wyraz = ""
    max_suma = 0
    max_wyraz = ""
    wyrazy = []
    for line in file:
        slowo = line.strip()
        if x % 40 == 0:
            wyraz += slowo[9]
        x += 1

        litery = []
        suma = 0
        for litera in slowo:
            if litera.isalpha() and litera not in litery:
                litery.append(litera)
                suma += 1
        if suma > max_suma:
            max_suma = suma
            max_wyraz = slowo

        pasujace = True
        for j in range(len(slowo) - 1):
            for i in range(j + 1, len(slowo)):
                if abs(ord(slowo[j]) - ord(slowo[i])) > 10:
                    pasujace = False
                    break
        if pasujace:
            wyrazy.append(slowo)

    with open("wynik4.txt", "w") as output_file:
        output_file.write("Zadanie 4.1\n" + wyraz)
        output_file.write("\nZadanie 4.2\n" + max_wyraz + " " + str(max_suma))
        output_file.write("\nZadanie 4.3\n")
        for wyraz in wyrazy:
            output_file.write(wyraz + "\n")