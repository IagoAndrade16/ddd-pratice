import { Entity } from './entity'

// Entidade principal que representa um objeto de domínio que é agregado de outros objetos de domínio.
export abstract class AggregateRoot<Props> extends Entity<Props> {}
