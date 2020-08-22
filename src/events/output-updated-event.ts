export type OutputChangedEventHandler<S> = (
  status: S,
  hasChanged: boolean,
  cycleNumber: number,
) => void;

export interface OutputUpdatedEvent<S> {
  register(handler: OutputChangedEventHandler<S>): void;
}
