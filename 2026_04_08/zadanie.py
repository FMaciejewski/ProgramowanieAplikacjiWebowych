class Graph:
    def __init__(self, vertices: int):
        self.vertices = vertices
        self.adjacency_list: list[list[int]] = [[] for _ in range(self.vertices)]

def read_graph(filename) -> Graph:
    with open(filename, 'r') as file:
        vertices = int(file.readline().strip())
        graph = Graph(vertices)
        for line in file:
            parts : list[int] = line.strip().split()
            for i in range(1, len(parts)):
                graph.adjacency_list[int(parts[0])].append(int(parts[i]))
        return graph

def write_neighbours_list(adjencency_list: list[list[int]]) -> None:
    for i in range(len(adjencency_list)):
        print(f"Sąsiadami wierzchołka {i} są: {', '.join(map(str, adjencency_list[i]))}")

def list_to_matrix(adjencency_list: list[list[int]]) -> list[list[int]]:
    size = len(adjencency_list)
    matrix = [[0] * size for _ in range(size)]
    for i in range(size):
        for j in adjencency_list[i]:
            matrix[i][j] = 1
    return matrix

def write_matrix(matrix: list[list[int]]) -> None:
    for row in matrix:
        print(' '.join(map(str, row)))

def main() -> None:
    graph = read_graph('graph.txt')
    write_neighbours_list(graph.adjacency_list)
    matrix = list_to_matrix(graph.adjacency_list)
    write_matrix(matrix)

if __name__ == "__main__":
    main()