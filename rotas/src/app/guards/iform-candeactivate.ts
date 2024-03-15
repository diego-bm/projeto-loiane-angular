export interface IFormCanDeactivate {
    // Adicionei o tipo boolean, pois parece ser necessário em versões mais novas do TypeScript
    podeDesativar(): boolean;
}