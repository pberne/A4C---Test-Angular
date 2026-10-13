export interface OrdreFabricationStatut {
    id: number;
    libelle: string;
}

/** Statut à partir duquel un OF est considéré comme terminé (masqué par défaut dans la liste). */
export const ID_STATUT_TERMINE = 12;
