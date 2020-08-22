import {
  OutputUpdatedEvent,
  OutputChangedEventHandler,
} from '@src/events/output-updated-event';

export class FunctionBlock<S> implements OutputUpdatedEvent<S> {
  protected _handlers: OutputChangedEventHandler<S>[];
  protected _state: S;

  public register(handler: OutputChangedEventHandler<S>): void {
    this._handlers.push(handler);
  }

  public get state(): S {
    return this._state;
  }

  protected notifyListeners(
    status: S,
    statusChanged: boolean,
    cycleNumber: number,
  ): void {
    for (const handler of this._handlers) {
      handler(status, statusChanged, cycleNumber);
    }
  }

  constructor() {
    this._handlers = [];
  }
}
