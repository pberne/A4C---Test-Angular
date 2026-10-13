export interface BonCoupe {
    id: number;
    numero: number;
    refClient: string;
    artisan: string;
    statut: string;
    dateCreation: string;
    dateCloture?: string;
    quantiteOf: number;
    quantiteRecoupe: number;
    commentaire?: string;
    ordreFabricationId: number;
}
