//Interfície per l'estructura d'una tasca
//Definim les propietats que tindrà cada tasca

export interface Task {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
    createdAt: Date;
    priority: 'Alta' | 'Mitjana' | 'Baixa';
    usuari: string;
}
