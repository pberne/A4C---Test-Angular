export interface BonCoupe {
    id: number;
    refClient: string;
    dateCreation: string;
    dateCloture?: string;
    commentaire?: string;
    ordreFabricationId: number;
}