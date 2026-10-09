import {OrdreFabricationStatut} from './ordre-fabrication-statut';
export type TypeOrdreFabrication = 'OF1' | 'PROTOTYPE' | 'PRE SERIE' |'DEV';

export interface OrdreFabrication {
    numero: number;
    client: string;
    type: TypeOrdreFabrication;
    statut: OrdreFabricationStatut;
    reference: string;
    quantite: number;
    reste: number;
    dateClotureSas?: string;
    depotTable: string;
    depotCoupe: string;
    commentaire?: string;
}